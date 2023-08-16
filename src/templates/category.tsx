import { graphql } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { styled } from "styled-components";
import CategorySidebarContent from "../components/database/CategorySidebarContent";
import Search from "../components/Search";
import { DataContext } from "../context/DataContext";
import { SettingContext } from "../context/SettingContext";
import { sorter } from "../dataHelpers";
import { Flex } from "../style/global";
import Item from "../components/database/Item";
import ItemCategory from "../components/database/ItemCategory";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import { getPageType } from "../helpers";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import PageLayout from "../components/layout/PageLayout";

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;

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
`;

const Category = ({ path, data }) => {
  const { hideUnlocked, toggleHideUnlocked, view, toggleView } = useContext(SettingContext);
  const { statistics, unlocks } = useContext(DataContext);
  const { images, category } = data;
  const { items } = category;
  const type = getPageType(path);
  const isTracker = type === "tracker";
  const [filteredItems, setFilteredItems] = useState(items);
  const [query, setQuery] = useState<string>("");
  const [groupBy, setGroupBy] = useState(category.settings.defaultGroup);
  const [sortBy, setSortBy] = useState("name");
  const sortDir = 1;

  const group = (items: any) => {
    return items.reduce((result, item) => {
      const group = item[groupBy];
      const existingGroup = result.find(g => g.name === group);

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        result.push({ name: group, items: [item] });
      }

      return result;
    }, []);
  };

  const filter = item => {
    if (isTracker) {
      if (hideUnlocked && unlocks.includes(item.externalId)) {
        return false;
      }

      if (item.onlyDB) {
        return false;
      }
    }

    if (query && query.length > 0) {
      const itemValues = Object.values(item);
      return itemValues.some(value => {
        return typeof value === "string" && value.toLowerCase().includes(query.toLowerCase());
      });
    }

    return true;
  };

  useEffect(() => {
    const newItems = items.filter(filter).sort((a, b) => sorter(a, b, sortBy, sortDir));
    setFilteredItems(groupBy ? group(newItems) : newItems);
  }, [query, hideUnlocked, sortBy, groupBy]);

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

      <PageLayout leftSidebarContent={<CategorySidebarContent type={type} />}>
        <Container>
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
                placeholder={`Search ${category.settings.fragment}`}
                query={query}
                setQuery={setQuery}
                width={"250px"}
              />
            )}

            <div className="right">
              {isTracker && statistics[category.settings.fragment] && (
                <span>
                  {statistics[category.settings.fragment].unlocked}/{statistics[category.settings.fragment].total}{" "}
                  unlocked
                </span>
              )}

              {!isTracker && (
                <Search
                  placeholder={`Search ${category.settings.fragment}`}
                  setQuery={setQuery}
                  query={query}
                  width={"250px"}
                />
              )}
            </div>
          </div>

          <Flex wrap="wrap" direction={view === "list" ? "column" : "row"} justifycontent="center">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => {
                if (groupBy) {
                  return (
                    <>
                      <ItemCategory key={item.name} item={item} category={category} type={type} />
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
        </Container>
      </PageLayout>
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
