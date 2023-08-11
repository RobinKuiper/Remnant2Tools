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

              a {
                color: darkred;
                text-decoration: none;
                transition: color 0.3s ease;

                &:hover {
                  color: red;
                }
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
      }
    }
  }
`;

const Description = styled.div`
  .unlock-information {
    margin-top: 30px;

    h3 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      line-height: 1.5;
    }
  }
`;

const REDACTED_COLOR = "#bbbbbb";

const Category = ({ data, pageContext, location }) => {
  const { item, category } = pageContext;
  const { image } = data;
  const unlocked = isUnlocked(item.category, item.id);

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
              { path: `/${location.state?.type ?? "database"}/${category.fragment}`, label: category.label },
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
                    {Object.entries(item.stats).map(([key, value]) => (
                      <ItemStat key={key} valueKey={key} value={value} />
                    ))}
                  </div>
                )}
              </div>

              <div className="right">
                {item.description && (
                  <div className="unlock-information">
                    <h3>Description</h3>

                    <p>{item.description}</p>
                  </div>
                )}

                {item.unlock && (
                  <Description>
                    <div className="unlock-information">
                      <h3>Unlock Information</h3>

                      <p>
                        <Redacted value={item.unlock} defaultShow={unlocked} bgColor={REDACTED_COLOR} />
                      </p>
                    </div>
                  </Description>
                )}
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
  }
`;