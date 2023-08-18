import data from "./src/data/data.json";
import type { GatsbyNode, NodeInput } from "gatsby";
import { resolve } from "path";
import { calculateStringMatchPercentage } from "./src/helpers";

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

    const items = data[categoryFragment].items.filter(item => calculateStringMatchPercentage(item.fragment, name) > 80);

    let item;
    if (items.length > 1) {
      let biggestIndex;
      let currentMatchPerc = 0;
      items.forEach((item, index) => {
        const matchPerc = calculateStringMatchPercentage(item.fragment, name);
        if (matchPerc > currentMatchPerc) {
          currentMatchPerc = parseFloat(matchPerc);
          biggestIndex = index;
        }
      });
      item = items[biggestIndex];
    } else {
      item = items[0];
    }

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
      // Create a node in the correct category
      if (item.category === "traits") {
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
      }

      // Create a node in all items
      let node = {
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
  const { createPage } = actions;

  // Create category pages for tracker and database
  const categories = getNodesByType("category");
  categories.forEach(category => {
    const page = {
      path: `/tracker/${category.settings.fragment}`,
      component: resolve(__dirname, "./src/templates/category.tsx"),
      context: {
        categoryFragment: category.settings.fragment,
        imgRegex: `/${category.settings.fragment}/`,
        type: "tracker",
      },
    };

    // Create tracker category page
    if (category.settings.tracker) {
      page.path = `/tracker/${category.settings.fragment}`;
      page.context.type = "tracker";

      createPage(page);
    }

    // Create database category page
    if (category.settings.database) {
      page.path = `/database/${category.settings.fragment}`;
      page.context.type = "database";

      createPage(page);
    }
  });

  const POSSIBLE_LINKS = ["weapon", "mod", "trait", "archetype", "pieces"];

  // Create a page for every item
  const items = getNodesByType("item");
  items.forEach(item => {
    const linkedItemIds = [];

    // get linked item id's
    POSSIBLE_LINKS.forEach(field => {
      if (item.links && item.links[field]) {
        if (Array.isArray(item.links[field])) {
          item.links[field].forEach(id => linkedItemIds.push(id));
        } else {
          linkedItemIds.push(item.links[field].externalId);
        }
      }
    });

    const page = {
      path: `/database/${item.category}/${item.fragment}`,
      component: resolve(__dirname, "./src/templates/item.tsx"),
      context: {
        itemId: item.externalId,
        linkedItemIds,
        category: data[item.category].settings,
      },
    };

    createPage(page);
  });
};
