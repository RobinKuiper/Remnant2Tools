import React, { useContext, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { CircleLoader } from "react-spinners";
import { styled } from "styled-components";
import CategoryTableRow from "../../components/CategoryTableRow";
import CategorySidebar from "../../components/layout/CategorySidebar";
import Layout from "../../components/layout/Layout";
import Search from "../../components/Search";
import TableRow from "../../components/TableRow";
import { CATEGORIES } from "../../constants";
import { findCategory } from "../../helpers";
import { DataContext } from "../../context/DataContext";
import { SettingContext } from "../../context/SettingContext";
import type { CategoryInformation } from "../../interface/CategoryInformation";
import dataCollection from "../../data/data.json";

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

            span.redacted {
              background: #c7c7c7;
              color: #c7c7c7;
              cursor: pointer;
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

        tr.unlocked {
          background: #a0efa0;
        }
      }
    }
  }
`;

const Category = props => {
  const { hideUnlocked, toggleHideUnlocked } = useContext(SettingContext);
  const { unlocks, statistics } = useContext(DataContext);
  const [categoryInformation, setCategoryInformation] = useState<CategoryInformation>(CATEGORIES[0].categories[0]);
  const category = props.params.category;
  const rawData = dataCollection[category];
  const [data, setData] = useState(rawData);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const sortDir = 1;

  const sort = (data: any) => {
    if (categoryInformation.categorized) {
      return data.map(category => ({
        ...category,
        items: category.items.sort((a, b) =>
          sortDir === 0 ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
        ),
      }));
    } else {
      return data.sort((a, b) => (sortDir === 0 ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));
    }
  };

  const search = () => {
    if (query && query.length > 0) {
      return rawData.filter(item => {
        for (const value of Object.values(item)) {
          if (typeof value === "string" && value.toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
        }
      });
    }

    return rawData;
  };

  useEffect(() => {
    setCategoryInformation(findCategory(category));
    setData(dataCollection[category]);
  }, [category]);

  useEffect(() => {
    setLoading(true);

    if (categoryInformation.label.replace(" ", "").toLowerCase() !== category) return;

    setData(sort(search()));
    setLoading(false);
  }, [query, category, categoryInformation, hideUnlocked]);

  return (
    <Layout>
      <Page>
        <CategorySidebar type="database" />

        <div id="database-content">
          <div id="content-heading">
            <div className="left">
              <span></span>
            </div>

            <Search placeholder={`Search ${category}`} onChange={e => setQuery(e.target.value)} width={250} />

            <div className="right"></div>
          </div>

          {!loading ? (
            <table cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  {categoryInformation &&
                    categoryInformation.attributes
                      .filter(attribute => attribute.database)
                      .map(attribute => <th key={attribute.label}>{attribute.label}</th>)}
                </tr>
              </thead>

              <tbody>
                {data.length > 0 ? (
                  data.map(item => {
                    if (categoryInformation?.categorized) {
                      return (
                        <>
                          <CategoryTableRow item={item} categoryInformation={categoryInformation} type="database" />
                          {item.items.map(i => (
                            <TableRow key={i.id} item={i} categoryInformation={categoryInformation} type="database" />
                          ))}
                        </>
                      );
                    } else {
                      return (
                        <TableRow key={item.id} item={item} categoryInformation={categoryInformation} type="database" />
                      );
                    }
                  })
                ) : (
                  <tr>
                    <td colSpan={categoryInformation.attributes.filter(field => field.tracker).length + 1}>
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
