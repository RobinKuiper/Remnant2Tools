import { graphql } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { styled } from "styled-components";
import CategorySidebar from "../../components/layout/CategorySidebar";
import Layout from "../../components/layout/Layout";
import Search from "../../components/Search";
import { DataContext } from "../../context/DataContext";
import { SettingContext } from "../../context/SettingContext";
import { getAllItems, getAllLockedItems, getCategorySettings } from "../../dataHelpers";
import { Flex } from "../../style/global";
import Item from "../../components/Item";
import ItemCategory from "../../components/ItemCategory";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";

const Page = styled.div`
  display: flex;
  flex-direction: row;

  #database-content {
    z-index: 10;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    width: 90%;
    padding: 20px;

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
  const { hideUnlocked, toggleHideUnlocked } = useContext(SettingContext);
  const { unlocks, statistics } = useContext(DataContext);
  const categoryFragment = props.params.category;
  const type = props.params.type;
  const images = props.data.images;
  const isTracker = type === "tracker";
  const category = getCategorySettings(categoryFragment);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [groupBy, setGroupBy] = useState();
  const [viewAsList, setViewAsList] = useState(false);
  const sortDir = 1;

  const sorter = (a, b) => (sortDir === 0 ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));

  const group = (data: any) => {
    if (!groupBy) {
      return data;
    }

    const grouped = {};
    data.forEach(item => {
      const group = typeof item[groupBy] === "boolean" ? (item[groupBy] ? "Yes" : "No") : item[groupBy];
      grouped[group] = grouped[group] || { label: group, items: [] };
      grouped[group].items.push(item);
    });
    return Object.values(grouped).map(group => {
      group.items.sort(sorter);
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
  }, [category]);

  useEffect(() => {
    if (category.fragment !== categoryFragment) return;

    const allItems = hideUnlocked && isTracker ? getAllLockedItems(unlocks) : getAllItems(),
      items = allItems.filter(item => item.category === category.fragment).sort(sorter);

    setData(group(search(items)));
  }, [query, category, type, categoryFragment, hideUnlocked, groupBy]);

  const handleGroupSelectChange = e => {
    const group = e.target.value === "none" ? null : e.target.value;
    setGroupBy(group);
  };

  const toggleViewType = () => setViewAsList(!viewAsList);

  return (
    <Layout>
      <Page>
        <CategorySidebar type={type} />

        <div id="database-content">
          <div id="content-heading">
            <div className="left">
              <div>Group by</div>
              <select onChange={handleGroupSelectChange}>
                <option value="none">None</option>
                {category &&
                  category.groups.map(group => (
                    <option key={group} value={group} selected={groupBy === group}>
                      {group}
                    </option>
                  ))}
              </select>

              {isTracker && (
                <button onClick={toggleHideUnlocked}>
                  {hideUnlocked ? <BiShow size={"30px"} /> : <BiHide size={"30px"} />}
                </button>
              )}

              <button className="view-switcher" onClick={toggleViewType}>
                {viewAsList ? <BsFillGrid3X3GapFill size={"30px"} /> : <BsList size={"30px"} />}
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

          <Flex wrap="wrap" direction={viewAsList ? "column" : "row"} justifyContent="center">
            {data.length > 0 ? (
              data.map(item => {
                if (groupBy) {
                  return (
                    <>
                      <ItemCategory item={item} category={category} type={type} />
                      {item.items &&
                        item.items.map(i => (
                          <Item
                            key={i.id}
                            viewAsList={viewAsList}
                            item={i}
                            type={type}
                            category={category}
                            images={images.nodes}
                          />
                        ))}
                    </>
                  );
                } else if (item.name) {
                  return (
                    <Item
                      key={item.id}
                      viewAsList={viewAsList}
                      item={item}
                      type={type}
                      category={category}
                      images={images.nodes}
                    />
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
    </Layout>
  );
};

export default Category;

export const query = graphql`
  {
    images: allFile(filter: { relativePath: { regex: "/items/" } }) {
      totalCount
      nodes {
        name
        relativePath
        childImageSharp {
          gatsbyImageData(quality: 80, layout: CONSTRAINED)
        }
      }
    }
  }
`;
