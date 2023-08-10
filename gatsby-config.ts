import type { GatsbyConfig } from "gatsby";
import * as dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Remnant",
    siteUrl: "https://remnant.rkuiper.nl",
    gitlab: "https://gitlab.com/RobinKuiper",
    linkedIn: "https://www.linkedin.com/in/robin-kuiper-4a15a669/",
    discord: "https://discordapp.com/users/81445002168774656",
    website: "https://www.rkuiper.nl",
    patreon: "https://www.patreon.com/bePatron?u=10835266",
    paypal: "https://paypal.me/robinkuiper",
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
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    // {
    //   resolve: `gatsby-plugin-gdpr-cookies`,
    //   options: {
    //     googleAnalytics: {
    //       trackingId: "G-5DDHSZZHS9", // leave empty if you want to disable the tracker
    //       cookieName: "remnantdb-gdpr-google-analytics", // default
    //       anonymize: true, // default
    //       allowAdFeatures: false // default
    //     },
    //     // defines the environments where the tracking should be available  - default is ["production"]
    //     environments: ["production", "development"]
    //   },
    // }
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-8D16HJ20PQ", // Firebase
          "G-5DDHSZZHS9", // Gitlab
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [],
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Fontdiner Swanky`],
        display: "swap",
      },
    },
  ],
};

export default config;
