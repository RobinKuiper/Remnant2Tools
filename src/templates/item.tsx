import "./item.scss";
import { Link, graphql } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { slugify, uppercaseFirstLetter } from "../helpers";
import ItemStatistics from "../components/database/ItemStatistics";
import LinkedItem from "../components/LinkedItem";
import Redacted from "../components/database/Redacted";
import CategorySidebarContent from "../components/database/CategorySidebarContent";
import Breadcrumb from "../components/layout/Breadcrumb";
import Head from "../components/layout/Head";
import BackgroundImage from "../components/BackgroundImage";
import Checkbox from "../components/Checkbox";
import Layout from "../components/layout/Layout";
import PageLayout from "../components/layout/PageLayout";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { RootState } from "../store";
import { toggleUnlock } from "../features/data/dataSlice";
import { googleSaveWithDelay } from "../features/data/dataActions";

const REDACTED_COLOR = "#bbbbbb";
const STATE_CLASSES = {
  true: "unlocked",
  false: "locked",
};

const Category = ({ data, pageContext, location }) => {
  const ref = useRef();
  const dispatch = useAppDispatch();
  const { unlocks, pending } = useAppSelector((state: RootState) => state.data);
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth);
  const { category } = pageContext;
  const { item, image, linkedItems } = data;
  const gatsbyImage = getImage(image);
  const [unlocked, setUnlocked] = useState(unlocks.includes(item.externalId));
  const type = category.onlyDB ? "database" : location.state?.type ?? "database";

  useEffect(() => {
    setUnlocked(unlocks.includes(item.externalId));
  }, [unlocks]);

  const handleLockStateChange = e => {
    const id = parseInt(e.target.id);
    dispatch(toggleUnlock(id));
    if (isLoggedIn && !pending) {
      dispatch(googleSaveWithDelay());
    }
    setUnlocked(!unlocked);
  };

  const titles = [
    `Discover the Secrets of ${item.name} in Remnant 2!`,
    `Unleash the Power of ${item.name} in Remnant II!`,
    `Unlock the Mystery: ${item.name} Revealed!`,
  ];

  return (
    <Layout>
      <Head title={item.name} description={titles[Math.floor(Math.random() * titles.length)]} />

      <PageLayout leftSidebarContent={<CategorySidebarContent type={type} />}>
        <div ref={ref} className={`item-page-container ${STATE_CLASSES[unlocked]}`}>
          <BackgroundImage index={2}>
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
                <div className="item-descriptions-left">
                  {(item.values || item.stats) && <ItemStatistics item={item} />}
                </div>

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
        </div>
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
