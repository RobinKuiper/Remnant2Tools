import data from "./src/data/data.json";
import type { GatsbyNode, NodeInput } from "gatsby";
import { resolve } from "path";
import { CATEGORIES } from "./src/constants";
import { calculateStringMatchPercentage, slugify } from "./src/helpers";

export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "File" && node.relativePath && typeof node.relativePath === "string") {
    const arr = node.relativePath.split("/");
    const categoryFragment = arr[1];
    if (!arr[2] || typeof arr[2] !== "string") {
      return;
    }
    const name = arr[2].split(".")[0];

    const item = data.find(
      item => item.category === categoryFragment && calculateStringMatchPercentage(slugify(item.name), name) > 80,
    );

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
  data.forEach(data => {
    const node = {
      ...data,
      externalId: data.id,
      // Required fields
      id: gatsbyApi.createNodeId(data.id),
      internal: {
        type: `item`,
        contentDigest: gatsbyApi.createContentDigest(data),
      },
    } as NodeInput;

    gatsbyApi.actions.createNode(node);
  });
};

export const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
  const { createPage } = actions;

  CATEGORIES.forEach(category => {
    const page = {
      path: `/tracker/${category.fragment}`,
      component: resolve(__dirname, "./src/templates/category.tsx"),
      context: {
        settings: category,
        categoryFragment: category.fragment,
        imgRegex: `/${category.fragment}/`,
      },
    };

    if (category.tracker) {
      page.path = `/tracker/${category.fragment}`;

      createPage(page);
    }

    if (category.database) {
      page.path = `/database/${category.fragment}`;

      createPage(page);
    }
  });

  // Create a page for every item
  data.forEach(item => {
    const name = slugify(item.name),
      page = {
        path: `/database/${item.category}/${name}`,
        component: resolve(__dirname, "./src/templates/item.tsx"),
        context: {
          item,
          itemId: item.id,
          category: CATEGORIES.find(c => c.fragment === item.category),
        },
      };

    createPage(page);
  });
};
