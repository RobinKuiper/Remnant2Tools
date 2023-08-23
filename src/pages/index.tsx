import "./homepage.scss";
import * as React from "react";
import type { PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import StatisticsPanel from "../components/statistics/StatisticsPanel";
import SecretWorldsPanel from "../components/statistics/SecretWorldsPanel";
import { BiLogoPatreon, BiLogoPaypal } from "react-icons/bi";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import PageLayout from "../components/layout/PageLayout";

const IndexPage: React.FC<PageProps> = props => {
  const { data } = props;
  const { bgImage } = data;
  const gatsbyImage = getImage(bgImage);

  return (
    <Layout>
      <Head
        description={
          "Stay in the loop with your Remnant 2 progress " + "using these handy tools. Get ready to level up!"
        }
      />

      <PageLayout>
        <div className="homepage-container">
          <div className="herobanner">
            {gatsbyImage && <GatsbyImage className="bg" alt="" image={gatsbyImage} />}

            <div className="left">
              <h1>Remnant II Tools</h1>
              <p>Track Your Triumphs and Collectibles: Your Ultimate Remnant II Companion!</p>
              <div className="buttons">
                <Link className="button" to="/tracker/statistics">
                  Tracker
                </Link>
                <Link className="button" to="/builds">
                  Builds
                </Link>
              </div>
            </div>

            <div className="image">
              <StaticImage src="../images/builds_ss.png" alt="Builds" />
            </div>
          </div>

          <div className="panels">
            <StatisticsPanel />
            <SecretWorldsPanel />

            <div className="panel">
              <h3>Buy me a coffee!</h3>

              <p>
                Hey fellow Remnant 2 enthusiasts! 🎮☕
                <br />
                If you're finding these tools handy and they're enhancing your gaming experience, consider supporting me
                with a virtual cup of coffee! <br />
                Your support helps me keep the tools up-to-date. <br />
                Every sip counts in our journey to conquer the challenges of the game together. <br />
                Thanks for being a part of our adventure! Cheers! 🚀🔥
              </p>

              <div className="buttons">
                <Link to={data.site.siteMetadata.patreon} title="Robin Kuiper's Patreon" target="_blank">
                  <button className="donation-button patreon">
                    <div>
                      <span className="icon">
                        <BiLogoPatreon size="20px" />
                      </span>
                      <span>Become a patron</span>
                    </div>
                  </button>
                </Link>

                <Link to={data.site.siteMetadata.paypal} title="Robin Kuiper's Paypal" target="_blank">
                  <div className="donation-button paypal">
                    <div>
                      <span className="icon">
                        <BiLogoPaypal size="20px" />
                      </span>
                      <span>Paypal donate</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  {
    site {
      siteMetadata {
        patreon
        paypal
      }
    }
    bgImage: file(name: { eq: "bg3" }) {
      ...imageFragment
    }
  }

  fragment imageFragment on File {
    childImageSharp {
      gatsbyImageData(quality: 80, layout: CONSTRAINED)
    }
  }

  fragment itemStatsFragment on itemStats {
    weight
    armor
    damage
    rps
    magazine
    idealRange
    falloffRange
    maxAmmo
    criticalHitChance
    weakSpotDamageBonus
    staggerModifier
    weakspot
    accuracy
    resistance
    weakness
    immunity
    resistances {
      bleed
      fire
      shock
      blight
      corrosion
    }
  }

  fragment itemLinksFragment on itemLinks {
    mod {
      externalId
      name
    }
    weapon {
      externalId
      name
    }
    trait {
      externalId
      name
    }
    archetype {
      externalId
      name
    }
  }

  fragment itemLinkIdsFragment on itemLinks {
    mod {
      externalId
    }
    weapon {
      externalId
    }
    trait {
      externalId
    }
    archetype {
      externalId
    }
  }

  fragment itemLinkNamesFragment on itemLinks {
    mod {
      name
    }
    weapon {
      name
    }
    trait {
      name
    }
    archetype {
      name
    }
  }
`;
