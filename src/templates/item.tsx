import { Link, graphql } from "gatsby";
import React from "react";
import { styled } from "styled-components";
import CategorySidebar from "../components/database/CategorySidebar";
import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Redacted from "../components/database/Redacted";
import { calculateWeightType, isUnlocked } from "../dataHelpers";
import ItemStat from "../components/item/ItemStat";
import { slugify, uppercaseFirstLetter } from "../helpers";
import Breadcrumb from "../components/layout/Breadcrumb";
import { Tooltip } from "react-tooltip";

const Page = styled.div`
  display: flex;
  flex-direction: row;

  .item-content {
    z-index: 65;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    width: 90%;
    padding: 50px;
    box-sizing: border-box;
    margin-left: 235px;
    min-height: 87.5vh;

    @media (max-width: 1200px) {
      margin-left: 0;
      width: 100%;
    }

    @media (max-width: 1500px) {
      width: 100%;
    }

    .item {
      display: flex;
      flex-direction: column;
      gap: 30px;

      a {
        color: darkred;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: red;
        }
      }

      .top {
        display: flex;
        gap: 50px;

        .image {
          border: 1px solid #ddd;
          background: #f9f9f9;
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          overflow: hidden;
          flex-basis: 200px;
          flex-grow: 0;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
        }

        .title {
          .general-information {
            display: flex;
            gap: 10px;
            margin-top: 10px;
            font-size: 0.9em;

            span {
              .key {
                font-weight: 900;
                margin-right: 5px;
              }
            }
          }
        }
      }

      .information {
        display: flex;
        gap: 30px;

        .left {
          .stats {
            padding: 20px;
            border: 1px solid #ddd;
            background: #f9f9f9;
            color: #333;
            width: 300px;
            border-radius: 10px;

            display: flex;
            flex-direction: column;
            gap: 20px;
          }
        }

        .right {
          .section {
            h3 {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }

            p {
              font-size: 16px;
              line-height: 1.5;
            }

            ul {
              list-style: disc;
              margin-left: 20px;

              li {
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
`;

const REDACTED_COLOR = "#bbbbbb";

const Category = ({ data, pageContext, location }) => {
  const { category } = pageContext;
  const { image, item } = data;
  const unlocked = isUnlocked(item.category, item.externalId);
  const type = category.onlyDB ? "database" : location.state?.type ?? "database";

  return (
    <Layout>
      <Head title={item.name} description="Track your progress in Remnant II." />

      <Page>
        <CategorySidebar type="database" />

        <div className="item-content">
          <Breadcrumb
            data={[
              { path: "/", label: "Home" },
              { label: location.state?.type ? uppercaseFirstLetter(location.state.type) : "Database" },
              { path: `/${type}/${category.fragment}`, label: category.label },
              { path: `/database/${item.category}/${slugify(item.name)}`, label: item.name },
            ]}
          />

          <div className="item">
            <div className="top">
              {image && (
                <div className="image">
                  {image && (
                    <GatsbyImage image={getImage(image)} alt={item.name} title={item.name} placeholder="none" />
                  )}
                </div>
              )}

              <div className="title">
                <h1>{item.name}</h1>

                <div className="general-information">
                  <span>{category.singular}</span>

                  {item.type && (
                    <>
                      <span> | </span>
                      <span>{item.type}</span>
                    </>
                  )}

                  {item.armorset && (
                    <>
                      <span> | </span>
                      <span>
                        <Link to={`/database/armorset/${slugify(item.armorset)}`} title={item.armorset}>
                          {item.armorset}
                        </Link>
                      </span>
                    </>
                  )}

                  {item.world && (
                    <>
                      <span> | </span>
                      <span>
                        <Redacted value={item.world} defaultShow={unlocked} bgColor={REDACTED_COLOR} />
                        {item.location && (
                          <>
                            &nbsp;-&nbsp;
                            <Redacted
                              value={item.location}
                              defaultShow={unlocked}
                              bgColor={REDACTED_COLOR}
                              tooltip={item.locationInformation}
                            />
                          </>
                        )}
                      </span>
                    </>
                  )}

                  {item.hasMod && (
                    <>
                      <span> | </span>
                      <span>
                        <span className="key">Mod:</span>
                        <Link to={`/database/mods/${slugify(item.mod)}`} title={item.mod}>
                          {item.mod}
                        </Link>
                      </span>
                    </>
                  )}

                  {item.weapon && (
                    <>
                      <span> | </span>
                      <span>
                        <span className="key">Weapon:</span>
                        <Link to={`/database/weapons/${slugify(item.weapon)}`} title={item.weapon}>
                          {item.weapon}
                        </Link>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="information">
              <div className="left">
                {item.stats && (
                  <div className="stats">
                    {item.stats.weight && (
                      <ItemStat valueKey="Weight type" value={calculateWeightType(item.stats.weight)} />
                    )}
                    {Object.entries(item.stats)
                      .filter(([key, value]) => key && value)
                      .map(([key, value]) => (
                        <ItemStat key={key} valueKey={key} value={value} />
                      ))}
                  </div>
                )}
              </div>

              <div className="right">
                {item.description && (
                  <div className="section">
                    <h3>Description</h3>

                    <p>{item.description}</p>
                  </div>
                )}

                {item.unlock && (
                  <div className="section">
                    <h3>Unlock Information</h3>

                    <p>
                      <Redacted value={item.unlock} defaultShow={unlocked} bgColor={REDACTED_COLOR} />
                    </p>
                  </div>
                )}

                {item.links &&
                  item.links.length > 0 &&
                  item.links.map(link => (
                    <div key={link.label} className="section">
                      <h3>{link.label}</h3>

                      <ul>
                        {link.items.map(i => (
                          <li key={i.name}>
                            <Link to={`/database/${i.category}/${slugify(i.name)}`} title={i.name}>
                              {i.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Page>
      <Tooltip id="item" />
    </Layout>
  );
};

export default Category;

export const query = graphql`
  query ($itemId: Int!) {
    image: file(fields: { itemId: { eq: $itemId } }) {
      name
      relativePath
      childImageSharp {
        gatsbyImageData(quality: 80, layout: CONSTRAINED)
      }
    }
    item: item(externalId: { eq: $itemId }) {
      category
      externalId
      name
      description
      type
      armorset
      world
      location
      locationInformation
      hasMod
      mod
      weapon
      unlock
      links {
        label
        items {
          name
          category
        }
      }
      stats {
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
    }
  }
`;
