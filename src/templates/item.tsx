import { Link, graphql } from "gatsby";
import React, {useContext, useRef} from "react";
import { styled } from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { isUnlocked } from "../dataHelpers";
import { slugify, uppercaseFirstLetter } from "../helpers";
import ItemStatistics from "../components/database/ItemStatistics";
import Layout from "../components/layout/Layout";
import LinkedItem from "../components/LinkedItem";
import Redacted from "../components/database/Redacted";
import CategorySidebar from "../components/database/CategorySidebar";
import Breadcrumb from "../components/layout/Breadcrumb";
import Head from "../components/layout/Head";
import {SettingContext} from "../context/SettingContext";
import {DataContext} from "../context/DataContext";

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

    @media (max-width: 850px) {
      padding-right: 80px;
    }

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
        flex-wrap: wrap;
        gap: 50px;

        @media (max-width: 850px) {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

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

        .general-information {
          .title {
            display: flex;
            align-items: center;
            gap: 20px;

            @media (max-width: 850px) {
              justify-content: center;
            }
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
            font-size: 0.9em;

            //@media (max-width: 850px) {
            //  margin-left: 0;
            //  width: 100%;
            //}

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
        flex-wrap: wrap;
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
const STATE_CLASSES = {
  true: "unlocked",
  false: "locked",
};

const Category = ({ data, pageContext, location }) => {
  const ref = useRef();
  const { startSaving, stopSaving } = useContext(SettingContext);
  const { toggleUnlock } = useContext(DataContext);
  const { category } = pageContext;
  const { item, image, linkedItems } = data;
  const unlocked = isUnlocked(item.category, item.externalId);
  const type = category.onlyDB ? "database" : location.state?.type ?? "database";

  const handleLockStateChange = e => {
    startSaving();
    const id = parseInt(e.target.id);

    if (ref.current) {
      ref.current.classList.toggle("unlocked");
      ref.current.classList.toggle("locked");
    }

    toggleUnlock(category.fragment, id);
    stopSaving();
  };

  return (
    <Layout>
      <Head title={item.name} description="Track your progress in Remnant II." />

      <Page ref={ref} className={`${STATE_CLASSES[unlocked]}`}>
        <CategorySidebar type="database" />

        <div className="item-content">
          <div className="background" />

          <Breadcrumb
            data={[
              { path: "/", label: "Home" },
              { label: location.state?.type ? uppercaseFirstLetter(location.state.type) : "Database" },
              { path: `/${type}/${category.fragment}`, label: category.label },
              { path: `/database/${item.category}/${item.fragment}`, label: item.name },
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

              <div className="general-information">
                <div className="title">
                  <div className="checkbox-wrapper">
                    <label className="checkbox">
                      <input
                        id={item.externalId}
                        className="checkbox__trigger visuallyhidden"
                        type="checkbox"
                        checked={unlocked}
                        onChange={handleLockStateChange}
                      />
                      <span className="checkbox__symbol">
                    <svg
                      aria-hidden="true"
                      className="icon-checkbox"
                      width="28px"
                      height="28px"
                      viewBox="0 0 28 28"
                      version="1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                    </label>
                  </div>

                  <h1>{item.name}</h1>
                </div>

                <div className="tags">
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
                  )}

                  {item.links &&
                    Object.values(item.links)
                      .filter(link => link !== null)
                      .map(link => (
                        <LinkedItem
                          key={link.externalId}
                          className="gi-item"
                          item={linkedItems.nodes.find(i => i.externalId === link.externalId)}
                        />
                      ))}
                </div>
              </div>
            </div>

            <div className="information">
              <div className="left">{(item.values || item.stats) && <ItemStatistics item={item} />}</div>

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

                {item.links?.pieces && item.links.pieces.length > 0 && (
                  <div className="section">
                    <h3>Pieces</h3>
                    <ul>
                      {item.links.pieces.map(id => {
                        const item = linkedItems.nodes.find(i => i.externalId === id);

                        if (!item) return "";

                        return (
                          <li key={id}>
                            <LinkedItem item={item} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
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
  query ($itemId: Int!, $linkedItemIds: [Int]!) {
    image: file(fields: { itemId: { eq: $itemId } }) {
      ...imageFragment
    }
    item: item(externalId: { eq: $itemId }) {
      name
      fragment
      externalId
      category
      description
      armorset
      world
      type
      location
      locationInformation
      links {
        ...itemLinkIdsFragment
        pieces
      }
      unlock
      unitSymbol
      values {
        max
        min
      }
      stats {
        ...itemStatsFragment
      }
    }
    linkedItems: allItem(filter: { externalId: { in: $linkedItemIds } }) {
      nodes {
        name
        fragment
        externalId
        category
        type
        armorset
        links {
          ...itemLinkNamesFragment
        }
        stats {
          ...itemStatsFragment
        }
      }
    }
  }
`;
