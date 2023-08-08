import data from "./src/data/data.json";
import type {GatsbyNode, NodeInput} from "gatsby"

export const sourceNodes: GatsbyNode[`sourceNodes`] = (gatsbyApi) => {
  data.forEach(data => {
    const node = {
      ...data,
      externalId: data.id,
      // Required fields
      id: gatsbyApi.createNodeId(data.id),
      internal: {
        type: `item`,
        contentDigest: gatsbyApi.createContentDigest(data)
      }
    } as NodeInput;

    gatsbyApi.actions.createNode(node)
  });
}
