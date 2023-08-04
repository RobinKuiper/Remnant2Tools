import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Remnant",
    siteUrl: "https://remnant.rkuiper.nl",
    gitlab: "https://gitlab.com/RobinKuiper",
    linkedIn: "https://www.linkedin.com/in/robin-kuiper-4a15a669/",
    discord: "https://discordapp.com/users/81445002168774656",
    website: "https://www.rkuiper.nl",
  },
  pathPrefix: "/remnantcollectables",
  // More easily incorporate content into your pages through
  // automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-pnpm",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};

export default config;
