import { Slice, graphql } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { styled } from "styled-components";
import Search from "../components/Search";
import { DataContext } from "../context/DataContext";
import { SettingContext } from "../context/SettingContext";
import { isUnlocked, sorter } from "../dataHelpers";
import { Flex } from "../style/global";
import Item from "../components/database/Item";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import { getPageType } from "../helpers";
import Layout from "../components/layout/Layout";

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
      padding: 0 10px;

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
  const categoryFragment = props.pageContext.settings.fragment;
  const categoryItems = props.pageContext.items;
  const type = getPageType(props.path);
  const images = props.data.images;
  const isTracker = type === "tracker";
  const category = props.pageContext.settings;
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
    setGroupBy(category.defaultGroup);
    setSortBy("name");
  }, [category]);

  useEffect(() => {
    if (category.fragment !== categoryFragment) {
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
      <Slice alias="Head" title={category.label} description="Track your progress in Remnant II." />

      <Page>
        <Slice alias="CategorySidebar" type={type} />

        <div id="database-content">
          <div id="content-heading">
            <div className="left">
              {category && category.groups && category.groups.length > 0 && (
                <>
                  <div>Group by</div>
                  <select onChange={handleGroupSelectChange}>
                    <option value="none">None</option>
                    {category.groups.map(group => (
                      <option key={group.fragment} value={group.fragment} selected={groupBy === group.fragment}>
                        {group.label}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {category && category.sortKeys && category.sortKeys.length > 0 && (
                <>
                  <div>Sort by</div>
                  <select onChange={handleSortSelectChange}>
                    <option value="none">None</option>
                    {category.sortKeys.map(key => (
                      <option key={key.fragment} value={key.fragment} selected={groupBy === key.fragment}>
                        {key.label}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {isTracker && (
                <button onClick={toggleHideUnlocked}>
                  {hideUnlocked ? <BiShow size={"30px"} /> : <BiHide size={"30px"} />}
                </button>
              )}

              <button className="view-switcher" onClick={toggleView}>
                {view === "list" ? <BsFillGrid3X3GapFill size={"30px"} /> : <BsList size={"30px"} />}
              </button>
            </div>

            <Search
              placeholder={`Search ${categoryFragment}`}
              onChange={e => setQuery(e.target.value)}
              width={"250px"}
            />

            <div className="right">
              {isTracker && statistics[categoryFragment] && (
                <span>
                  {statistics[categoryFragment].unlocked}/{statistics[categoryFragment].total} unlocked
                </span>
              )}
            </div>
          </div>

          <Flex wrap="wrap" direction={view === "list" ? "column" : "row"} justifyContent="center">
            {data.length > 0 ? (
              data.map(item => {
                if (groupBy) {
                  return (
                    <>
                      <Slice alias="ItemCategory" item={item} category={category} type={type} />
                      {item.items &&
                        item.items.map(i => (
                          <Item key={i.id} item={i} type={type} category={category} images={images.nodes} />
                        ))}
                    </>
                  );
                } else if (item.name) {
                  return <Item key={item.id} item={item} type={type} category={category} images={images.nodes} />;
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
    </Layout>
  );
};

export default Category;

export const query = graphql`
  query ($imgRegex: String!) {
    images: allFile(filter: { relativePath: { regex: $imgRegex } }) {
      nodes {
        relativePath
        fields {
          itemId
        }
        childImageSharp {
          gatsbyImageData(quality: 80, layout: CONSTRAINED)
        }
      }
    }
  }
`;
