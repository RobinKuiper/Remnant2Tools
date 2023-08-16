import { Link, graphql } from "gatsby";
import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { slugify, uppercaseFirstLetter } from "../helpers";
import ItemStatistics from "../components/database/ItemStatistics";
import LinkedItem from "../components/LinkedItem";
import Redacted from "../components/database/Redacted";
import CategorySidebarContent from "../components/database/CategorySidebarContent";
import Breadcrumb from "../components/layout/Breadcrumb";
import Head from "../components/layout/Head";
import { SettingContext } from "../context/SettingContext";
import { DataContext } from "../context/DataContext";
import BackgroundImage from "../components/BackgroundImage";
import Checkbox from "../components/Checkbox";
import Layout from "../components/layout/Layout";
import PageLayout from "../components/layout/PageLayout";

const Container = styled.div`
  .item {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 50px;

    @media (max-width: 850px) {
      padding-right: 80px;
    }

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

        @media (max-width: 450px) {
          width: 100%;
        }
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
          @media (max-width: 450px) {
            justify-content: center;
          }

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

    .item-descriptions {
      display: flex;
      flex-wrap: nowrap;
      gap: 30px;

      @media (max-width: 850px) {
        flex-wrap: wrap;
        justify-content: center;
      }

      .item-descriptions-left {
        
      }

      .item-descriptions-right {
        .section {
          max-width: 400px;
          
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
`;

const REDACTED_COLOR = "#bbbbbb";
const STATE_CLASSES = {
  true: "unlocked",
  false: "locked",
};

const Category = ({ data, pageContext, location }) => {
  const ref = useRef();
  const { startSaving, stopSaving } = useContext(SettingContext);
  const { toggleUnlock, unlocks } = useContext(DataContext);
  const { category } = pageContext;
  const { item, image, linkedItems, bgImage } = data;
  const gatsbyImage = getImage(image);
  const [unlocked, setUnlocked] = useState(unlocks.includes(item.externalId));
  const type = category.onlyDB ? "database" : location.state?.type ?? "database";

  useEffect(() => {
    setUnlocked(unlocks.includes(item.externalId));
  }, [unlocks]);

  const handleLockStateChange = e => {
    startSaving();
    const id = parseInt(e.target.id);
    toggleUnlock(id);
    setUnlocked(!unlocked);
    stopSaving();
  };

  return (
    <Layout>
      <Head title={item.name} description="Track your progress in Remnant II." />

      <PageLayout leftSidebarContent={<CategorySidebarContent type={type} />}>
        <Container ref={ref} className={`${STATE_CLASSES[unlocked]}`}>
          <BackgroundImage image={bgImage}>
            <div className="item">
              <Breadcrumb
                data={[
                  { path: "/", label: "Home" },
                  { label: location.state?.type ? uppercaseFirstLetter(location.state.type) : "Database" },
                  { path: `/${type}/${category.fragment}`, label: category.label },
                  { path: `/database/${item.category}/${item.fragment}`, label: item.name },
                ]}
              />

              <div className="top">
                {gatsbyImage && (
                  <div className="image">
                    <GatsbyImage image={gatsbyImage} alt={item.name} title={item.name} placeholder="none" />
                  </div>
                )}

                <div className="general-information">
                  <div className="title">
                    <Checkbox id={item.externalId} checked={unlocked} handleChange={handleLockStateChange} />

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

              <div className="item-descriptions">
                <div className="item-descriptions-left">{(item.values || item.stats) && <ItemStatistics item={item} />}</div>

                <div className="item-descriptions-right">
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
          </BackgroundImage>
        </Container>
      </PageLayout>
    </Layout>
  );
};

export default Category;

export const query = graphql`
  query ($itemId: Int!, $linkedItemIds: [Int]!) {
    image: file(fields: { itemId: { eq: $itemId } }) {
      ...imageFragment
    }
    bgImage: file(name: { eq: "bg3" }) {
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
