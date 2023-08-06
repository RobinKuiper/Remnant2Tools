import { graphql } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { CircleLoader } from "react-spinners";
import { styled } from "styled-components";
import CategoryTableRow from "../../components/CategoryTableRow";
import CategorySidebar from "../../components/layout/CategorySidebar";
import Layout from "../../components/layout/Layout";
import Search from "../../components/Search";
import TableRow from "../../components/TableRow";
import { DataContext } from "../../context/DataContext";
import { SettingContext } from "../../context/SettingContext";
import { getAllItems, getAllLockedItems, getCategorySettings } from "../../dataHelpers";

const Page = styled.div`
  display: flex;
  flex-direction: row;

  #database-content {
    z-index: 10;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    width: 90%;

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
      }

      .right {
        font-size: 1.2em;
      }
    }

    table {
      width: 100%;

      thead {
        tr {
          //position: sticky;
          width: 100%;
          z-index: 20;
          background: #292929;
          color: #fff;

          th {
            text-align: left;
            text-transform: uppercase;
            padding: 5px;
          }
        }
      }

      tbody {
        tr {
          td {
            padding: 10px 5px;

            .title-box {
              //text-align: center;

              .title {
                font-weight: bold;
              }

              p {
                margin: 0;
              }
            }

            span {
              color: #000;
            }

            &.category {
              font-weight: 900;
            }
          }
        }

        tr:nth-child(even) {
          background: #eaeaea;
        }

        tr:nth-child(odd) {
          background: #fff;
        }

        tr.unlocked:nth-child(even) {
          background: #cff8cf;
        }

        tr.unlocked:nth-child(odd) {
          background: #b7e7b7;
        }

        tr.unlocked .checkbox-wrapper {
          --c-primary: green;
        }
      }
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
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [groupBy, setGroupBy] = useState();
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
    setLoading(true);

    if (category.fragment !== categoryFragment) return;

    const allItems = hideUnlocked && isTracker ? getAllLockedItems(unlocks) : getAllItems(),
      items = allItems.filter(item => item.category === category.fragment).sort(sorter);

    setData(group(search(items)));
    setLoading(false);
  }, [query, category, type, categoryFragment, hideUnlocked, groupBy]);

  const handleGroupSelectChange = e => {
    const group = e.target.value === "none" ? null : e.target.value;
    setGroupBy(group);
  };

  return (
    <Layout>
      <Page>
        <CategorySidebar type={type} />

        <div id="database-content">
          <div id="content-heading">
            <div className="left">
              <select onChange={handleGroupSelectChange}>
                <option value="none">None</option>
                {category &&
                  category.groups.map(group => (
                    <option key={group} value={group} selected={groupBy === group}>
                      {group}
                    </option>
                  ))}
              </select>
              <span>
                {isTracker && (
                  <button onClick={toggleHideUnlocked} style={{ marginRight: "10px" }}>
                    {hideUnlocked ? <BiShow size={"30px"} /> : <BiHide size={"30px"} />}
                  </button>
                )}
              </span>
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

          {!loading ? (
            <table cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  {isTracker && <th />}
                  {isTracker && category.hasLevels && <th />}
                  <th />
                  {category &&
                    category &&
                    category[type].fields.map(field => <th key={field.fragment}>{field.label}</th>)}
                </tr>
              </thead>

              <tbody>
                {data.length > 0 ? (
                  data.map(item => {
                    if (groupBy) {
                      return (
                        <>
                          <CategoryTableRow item={item} category={category} type={type} />
                          {item.items &&
                            item.items.map(i => (
                              <TableRow key={i.id} item={i} type={type} category={category} images={images.nodes} />
                            ))}
                        </>
                      );
                    } else if (item.name) {
                      return (
                        <TableRow key={item.id} item={item} type={type} category={category} images={images.nodes} />
                      );
                    }
                  })
                ) : (
                  <tr>
                    <td colSpan={category[type].fields.length + 2} style={{ textAlign: "center" }}>
                      <p>No data found.</p>

                      {hideUnlocked && <p>You have set unlocked to hidden, maybe you have everything? Congrats!</p>}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <CircleLoader />
          )}
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
