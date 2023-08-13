import { Link, Slice, graphql } from "gatsby";
import React from "react";
import { styled } from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { isUnlocked } from "../dataHelpers";
import { slugify, uppercaseFirstLetter } from "../helpers";
import ItemStatistics from "../components/database/ItemStatistics";
import Layout from "../components/layout/Layout";
import LinkedItem from "../components/LinkedItem";

const Page = styled.div`
  display: flex;
  flex-direction: row;

  .item-content {
    position: relative;
    background: url("/images/bg3.webp");
    background-size: cover;
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

    .background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 1) 11%,
        rgba(231, 231, 231, 1) 40%,
        rgba(255, 255, 255, 0) 100%
      );
      z-index: -1;
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
              &.gi-item:not(:last-child) {
                border-right: 1px solid #000;
                padding: 0 10px 0 0;
              }

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
  const { category, item } = pageContext;
  const { image } = data;
  const unlocked = isUnlocked(item.category, item.externalId);
  const type = category.onlyDB ? "database" : location.state?.type ?? "database";

  return (
    <Layout>
      <Slice alias="Head" title={item.name} description="Track your progress in Remnant II." />

      <Page>
        <Slice alias="CategorySidebar" type="database" />

        <div className="item-content">
          <div className="background" />

          <Slice
            alias="Breadcrumb"
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
                  <span className="gi-item">{category.singular}</span>

                  {item.type && <span className="gi-item">{item.type}</span>}

                  {item.armorset && (
                    <span className="gi-item">
                      <Link to={`/database/armorset/${slugify(item.armorset)}`} title={item.armorset}>
                        {item.armorset}
                      </Link>
                    </span>
                  )}

                  {item.world && (
                    <span className="gi-item">
                      <Slice alias="Redacted" value={item.world} defaultShow={unlocked} bgColor={REDACTED_COLOR} />
                      {item.location && (
                        <>
                          &nbsp;-&nbsp;
                          <Slice
                            alias="Redacted"
                            value={item.location}
                            defaultShow={unlocked}
                            bgColor={REDACTED_COLOR}
                            tooltip={item.locationInformation}
                          />
                        </>
                      )}
                    </span>
                  )}

                  {item.hasMod && <LinkedItem className="gi-item" item={item.mod} />}
                  {item.weapon && <LinkedItem className="gi-item" item={item.weapon} />}
                  {item.trait && <LinkedItem className="gi-item" item={item.trait} />}
                  {item.archetype && <LinkedItem className="gi-item" item={item.archetype} />}
                </div>
              </div>
            </div>

            <div className="information">
              <div className="left">
                <ItemStatistics item={item} />
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
                      <Slice alias="Redacted" value={item.unlock} defaultShow={unlocked} bgColor={REDACTED_COLOR} />
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
