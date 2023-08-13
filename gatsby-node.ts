import data from "./src/data/data.json";
import type { GatsbyNode, NodeInput } from "gatsby";
import { resolve } from "path";
import { CATEGORIES } from "./src/constants";
import { calculateStringMatchPercentage } from "./src/helpers";

const SLICES = [
  {
    id: `BuildStatisticsSidebar`,
    component: resolve(__dirname, "./src/components/builder/BuildStatisticsSidebar.tsx"),
  },
  {
    id: `TopBar`,
    component: resolve(__dirname, "./src/components/layout/TopBar.tsx"),
  },
  {
    id: `Layout`,
    component: resolve(__dirname, "./src/components/layout/Layout.tsx"),
  },
  {
    id: `Head`,
    component: resolve(__dirname, "./src/components/layout/Head.tsx"),
  },
  {
    id: `Breadcrumb`,
    component: resolve(__dirname, "./src/components/layout/Breadcrumb.tsx"),
  },
  {
    id: `SettingsSidebar`,
    component: resolve(__dirname, "./src/components/layout/SettingsSidebar.tsx"),
  },
  {
    id: `CategorySidebar`,
    component: resolve(__dirname, "./src/components/database/CategorySidebar.tsx"),
  },
  {
    id: `ItemCategory`,
    component: resolve(__dirname, "./src/components/database/ItemCategory.tsx"),
  },
  {
    id: `ItemTooltip`,
    component: resolve(__dirname, "./src/components/database/ItemTooltip.tsx"),
  },
  {
    id: `Redacted`,
    component: resolve(__dirname, "./src/components/database/Redacted.tsx"),
  },
  {
    id: `ItemStat`,
    component: resolve(__dirname, "./src/components/item/ItemStat.tsx"),
  },
  {
    id: `SecretWorldsPanel`,
    component: resolve(__dirname, "./src/components/statistics/SecretWorldsPanel.tsx"),
  },
  {
    id: `StatisticsPanel`,
    component: resolve(__dirname, "./src/components/statistics/StatisticsPanel.tsx"),
  },
  {
    id: `LinkedItem`,
    component: resolve(__dirname, "./src/components/LinkedItem.tsx"),
  },
  {
    id: `Loader`,
    component: resolve(__dirname, "./src/components/Loader.tsx"),
  },
];

export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  // Add item id to images
  if (node.internal.type === "File" && node.relativePath && typeof node.relativePath === "string") {
    const arr = node.relativePath.split("/");
    const categoryFragment = arr[1];
    if (!arr[2] || typeof arr[2] !== "string" || !data[categoryFragment]) {
      return;
    }
    const name = arr[2].split(".")[0];

    const item = data[categoryFragment].items.find(item => calculateStringMatchPercentage(item.fragment, name) > 80);

    if (item) {
      createNodeField({
        node,
        name: "itemId",
        value: item.id,
      });
    }
  }
};

export const sourceNodes: GatsbyNode[`sourceNodes`] = gatsbyApi => {
  // Loop over all categories
  Object.values(data).forEach(category => {
    const settings = category.settings;
    const items = category.items;

    category.items = items.map(item => ({ ...item, externalId: item.id }));

    // Create a category node
    const node = {
      ...category,
      itemCount: category.items.length,
      // Required fields
      id: gatsbyApi.createNodeId(settings.fragment),
      internal: {
        type: "category",
        contentDigest: gatsbyApi.createContentDigest(category),
      },
    } as NodeInput;
    gatsbyApi.actions.createNode(node);

    // Loop over all items in the category
    items.forEach(item => {
      // Link linked items to this item
      if (settings.linkedBy && settings.linkedBy.length > 0) {
        item.links = [];
        settings.linkedBy.forEach(link => {
          const linkedItems = data[link.category].items.filter(i => item[link.link[0]] === i[link.link[1]]);

          item.links.push({
            label: link.label,
            items: linkedItems,
          });
        });
      }

      // Create a node in the correct category
      let node = {
        ...item,
        externalId: item.id,
        // Required fields
        id: item.id.toString(),
        internal: {
          type: settings.singular.replace(" ", ""),
          contentDigest: gatsbyApi.createContentDigest(item),
        },
      } as NodeInput;
      gatsbyApi.actions.createNode(node);

      // Create a node in all items
      node = {
        ...item,
        externalId: item.id,
        // Required fields
        id: gatsbyApi.createNodeId(item.id),
        internal: {
          type: "item",
          contentDigest: gatsbyApi.createContentDigest(item),
        },
      } as NodeInput;
      gatsbyApi.actions.createNode(node);
    });
  });
};

export const createPages: GatsbyNode["createPages"] = async ({ actions, getNodesByType }) => {
  const { createPage, createSlice } = actions;

  // Create slices for components
  SLICES.forEach(({ id, component }) => {
    createSlice({ id, component });
  });

  // Create category pages for tracker and database
  const categories = getNodesByType("category");
  categories.forEach(category => {
    const page = {
      path: `/tracker/${category.settings.fragment}`,
      component: resolve(__dirname, "./src/templates/category.tsx"),
      context: {
        settings: category.settings,
        items: category.items.map(i => ({ ...i, externalId: i.id })),
        imgRegex: `/${category.settings.fragment}/`,
      },
    };

    // Create tracker category page
    if (category.settings.tracker) {
      page.path = `/tracker/${category.settings.fragment}`;

      createPage(page);
    }

    // Create database category page
    if (category.settings.database) {
      page.path = `/database/${category.settings.fragment}`;

      createPage(page);
    }
  });

  // Create a page for every item
  const items = getNodesByType("item");
  items.forEach(item => {
    const newItem = { ...item };
    // Link items
    if (newItem.weapon && newItem.weapon !== "") {
      const weapons = getNodesByType("Weapon");
      newItem.weapon = weapons.find(weapon => weapon.name === newItem.weapon);
    } else if (newItem.mod && newItem.mod !== "") {
      const mods = getNodesByType("Mod");
      newItem.mod = mods.find(mod => mod.name === newItem.mod);
    } else if (newItem.trait && newItem.trait !== "") {
      const traits = getNodesByType("Trait");
      newItem.trait = traits.find(trait => trait.name === newItem.trait);
    } else if (newItem.archetype && newItem.archetype !== "") {
      const archetypes = getNodesByType("Archetype");
      newItem.archetype = archetypes.find(archetype => archetype.name === newItem.archetype);
    }

    const page = {
      path: `/database/${newItem.category}/${newItem.fragment}`,
      component: resolve(__dirname, "./src/templates/item.tsx"),
      context: {
        item: newItem,
        category: CATEGORIES.find(c => c.fragment === newItem.category),
        itemId: newItem.externalId,
      },
    };

    createPage(page);
  });
};
