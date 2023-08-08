import data from "./src/data/data.json";
import type { GatsbyNode, NodeInput } from "gatsby";
import { resolve } from "path";
import { CATEGORIES } from "./src/constants";

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
};
