import { graphql } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { styled } from "styled-components";
import CategorySidebar from "../components/database/CategorySidebar";
import Layout from "../components/layout/Layout";
import Search from "../components/Search";
import { DataContext } from "../context/DataContext";
import { SettingContext } from "../context/SettingContext";
import { isUnlocked, sorter } from "../dataHelpers";
import { Flex } from "../style/global";
import Item from "../components/database/Item";
import ItemCategory from "../components/database/ItemCategory";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import { getPageType } from "../helpers";
import Head from "../components/layout/Head";
import { Tooltip } from "react-tooltip";

const Page = styled.div`
  display: flex;
  flex-direction: row;

  #database-content {
    z-index: 65;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    width: 90%;
    padding: 20px;
    margin-left: 235px;
    min-height: 83vh;

    @media (max-width: 1200px) {
      margin-left: 0;
      width: 100%;
    }

    #content-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      margin: 10px 0;
      padding: 0 10px 20px 10px;
      border-bottom: 1px solid #888;

      .left {
        display: flex;
        align-items: center;
        gap: 10px;

        select {
          padding: 6.5px;

          &:focus {
            outline: none;
          }
        }

        .view-switcher {
          @media (max-width: 550px) {
            display: none;
          }
        }

        div {
        }
      }

      .right {
        font-size: 1.2em;
      }

      @media (max-width: 670px) {
        flex-direction: column;
        gap: 20px;
      }
    }

    .no-data {
      width: 100%;
      text-align: center;
    }

    @media (max-width: 1500px) {
      width: 100%;
    }
  }
`;

const Category = props => {
  const { hideUnlocked, toggleHideUnlocked, view, toggleView } = useContext(SettingContext);
  const { statistics } = useContext(DataContext);
  const type = getPageType(props.path);
  const { images, category } = props.data;
  const categoryFragment = category.settings.fragment;
  const { items: categoryItems } = category;
  const isTracker = type === "tracker";
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [groupBy, setGroupBy] = useState();
  const [sortBy, setSortBy] = useState("name");
  const sortDir = 1;

  const groupText = (value: any) => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    return value;
  };

  const group = (data: any) => {
    if (!groupBy) {
      return data;
    }

    const grouped = {};
    data.forEach(item => {
      const group = groupText(item[groupBy]);
      grouped[group] = grouped[group] || { label: group, items: [] };
      grouped[group].items.push(item);
    });
    return Object.values(grouped).map(group => {
      group.items.sort((a, b) => sorter(a, b, sortBy, sortDir));
      return group;
    });
  };

  const search = (data: any) => {
    if (query && query.length > 0) {
      return data.filter(item => {
        for (const value of Object.values(item)) {
          if (typeof value === "string" && value.toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
        }
      });
    }

    return data;
  };

  useEffect(() => {
    setGroupBy(category.settings.defaultGroup);
    setSortBy("name");
  }, [category]);

  useEffect(() => {
    if (category.settings.fragment !== categoryFragment) {
      return;
    }

    // const allItems = hideUnlocked && isTracker ? getAllLockedItems() : getAllItems(isTracker),
    const items = categoryItems
      .filter(item => (hideUnlocked && isTracker ? !isUnlocked(categoryFragment, item.externalId) : true))
      .filter(item => !(isTracker && typeof item.onlyDB !== "undefined" && item.onlyDB))
      .sort((a, b) => sorter(a, b, sortBy, sortDir));

    setData(group(search(items)));
  }, [query, category, type, categoryFragment, hideUnlocked, groupBy, sortBy]);

  const handleGroupSelectChange = e => {
    const group = e.target.value === "none" ? null : e.target.value;
    setGroupBy(group);
  };

  const handleSortSelectChange = e => {
    const key = e.target.value === "none" ? "name" : e.target.value;
    setSortBy(key);
  };

  return (
    <Layout>
      <Head title={category.settings.label} description="Track your progress in Remnant II." />

      <Page>
        <CategorySidebar type={type} />

        <div id="database-content">
          <div id="content-heading">
            <div className="left">
              {category && category.settings.groups && category.settings.groups.length > 0 && (
                <>
                  <div>Group by</div>
                  <select onChange={handleGroupSelectChange} value={groupBy ?? "none"}>
                    <option value="none">None</option>
                    {category.settings.groups.map(group => (
                      <option key={group.fragment} value={group.fragment}>
                        {group.label}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {category && category.settings.sortKeys && category.settings.sortKeys.length > 0 && (
                <>
                  <div>Sort by</div>
                  <select onChange={handleSortSelectChange} value={sortBy ?? "none"}>
                    <option value="none">None</option>
                    {category.settings.sortKeys.map(key => (
                      <option key={key.fragment} value={key.fragment}>
                        {key.label}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {isTracker && (
                <button onClick={toggleHideUnlocked}>
                  {hideUnlocked ? (
                    <BiShow
                      size={"30px"}
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Show unlocked items"
                      data-tooltip-place="bottom"
                    />
                  ) : (
                    <BiHide
                      size={"30px"}
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Hide unlocked items"
                      data-tooltip-place="bottom"
                    />
                  )}
                </button>
              )}

              <button className="view-switcher" onClick={toggleView}>
                {view === "list" ? (
                  <BsFillGrid3X3GapFill
                    size={"30px"}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Grid view"
                    data-tooltip-place="bottom"
                  />
                ) : (
                  <BsList
                    size={"30px"}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="List view"
                    data-tooltip-place="bottom"
                  />
                )}
              </button>
            </div>

            {isTracker && (
              <Search
                placeholder={`Search ${categoryFragment}`}
                onChange={e => setQuery(e.target.value)}
                width={"250px"}
              />
            )}

            <div className="right">
              {isTracker && statistics[categoryFragment] && (
                <span>
                  {statistics[categoryFragment].unlocked}/{statistics[categoryFragment].total} unlocked
                </span>
              )}

              {!isTracker && (
                <Search
                  placeholder={`Search ${categoryFragment}`}
                  onChange={e => setQuery(e.target.value)}
                  width={"250px"}
                />
              )}
            </div>
          </div>

          <Flex wrap="wrap" direction={view === "list" ? "column" : "row"} justifycontent="center">
            {data.length > 0 ? (
              data.map(item => {
                if (groupBy) {
                  return (
                    <>
                      <ItemCategory key={item.fragment} item={item} category={category} type={type} />
                      {item.items &&
                        item.items.map(i => (
                          <Item key={i.id} item={i} type={type} category={category.settings} images={images.nodes} />
                        ))}
                    </>
                  );
                } else if (item.name) {
                  return (
                    <Item key={item.id} item={item} type={type} category={category.settings} images={images.nodes} />
                  );
                }
              })
            ) : (
              <div className="no-data">
                <p>No data found.</p>

                {hideUnlocked && <p>You have set unlocked to hidden, maybe you have everything? Congrats!</p>}
              </div>
            )}
          </Flex>
        </div>
      </Page>

      <Tooltip id="tooltip" style={{ zIndex: 9999 }} />
    </Layout>
  );
};

export default Category;

export const query = graphql`
  query ($imgRegex: String!, $type: String!, $categoryFragment: String!) {
    images: allFile(filter: { relativePath: { regex: $imgRegex } }) {
      nodes {
        fields {
          itemId
        }
        ...imageFragment
      }
    }
    category: category(settings: { showIn: { eq: $type }, fragment: { eq: $categoryFragment } }) {
      settings {
        label
        fragment
        defaultGroup
        categoryIsCheckable
        groups {
          fragment
          label
        }
        sortKeys {
          fragment
          label
        }
        tracker {
          fields {
            label
            fragment
            redacted
          }
        }
        database {
          fields {
            label
            fragment
          }
        }
      }
      items {
        name
        fragment
        description
        id
        unlock
        externalId
        onlyDB
        type
        world
        location
        armorset
        race
        stats {
          damage
          rps
          armor
          weight
        }
      }
    }
  }
`;
