import { useEffect, useState } from "react";
import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import styled from "styled-components";
import "../global.css";
import archetypes from "../data/archetypes.json";
import traits from "../data/traits.json";
import weapons from "../data/weapons.json";
import mods from "../data/mods.json";
import mutators from "../data/mutators.json";
import relics from "../data/relics.json";
import amulets from "../data/amulets.json";
import rings from "../data/rings.json";

const Container = styled.main`
  display: flex;
  flex-direction: row;
`;

const Navigation = styled.div`
  position: relative;
  min-height: 100vh;
  min-width: 200px;
  box-sizing: border-box;
  border-right: 1px solid #000;
  background: #eeeded;
  //background: #fff;
  //border: 1px solid red;

  nav {
    position: fixed;
    display: flex;
    flex-direction: column;
    min-width: 200px;

    a {
      padding: 15px 10px;
      border-bottom: 1px solid #000;
    }
  }
`;

const Content = styled.div`
  background: #fff;
  //padding-left: 20px;
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.8);
  z-index: 1;

  table {
    table-layout: fixed;
    width: 100%;
    //padding-left: 20px;

    thead {
      th {
        text-align: left;
      }
    }

    thead {
      tr {
        th {
          padding: 10px 2px;
          border-bottom: 2px solid #292929;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 15px 2px;

          .redacted {
            background-color: #000;
            cursor: pointer;
          }
        }
      }

      tr td:first-child {
      }

      tr:nth-child(even) {
        background: #eaeaea;
      }

      tr:nth-child(odd) {
        background: #fff;
      }
    }
  }
`;

const categories = [
  {
    label: "Archetypes",
    data: archetypes,
  },
  {
    label: "Traits",
    data: traits,
  },
  {
    label: "Weapons",
    data: weapons,
  },
  {
    label: "Mods",
    data: mods,
  },
  {
    label: "Mutators",
    data: mutators,
  },
  // "Armor",
  {
    label: "Relics",
    data: relics,
  },
  {
    label: "Amulets",
    data: amulets,
  },
  {
    label: "Rings",
    data: rings,
  },
];

const IndexPage: React.FC<PageProps> = () => {
  const [category, setCategory] = useState(0);
  const [unlocks, setUnlocks] = useState<{ key: string; value: boolean } | object>({});

  useEffect(() => {
    // Check if we have an unlocks object in localStorage
    if (localStorage.getItem("unlocks")) {
      setUnlocks(JSON.parse(localStorage.getItem("unlocks") as string) ?? {});
    }
  }, []);

  const unlock = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    setUnlocks(prevUnlocks => {
      const updatedUnlocks: { key: string; value: boolean } | object = { ...prevUnlocks };
      updatedUnlocks[id] = !updatedUnlocks[id] ?? true;
      localStorage.setItem("unlocks", JSON.stringify(updatedUnlocks));
      return updatedUnlocks;
    });
  };

  return (
    <Container>
      <Navigation>
        <nav>
          {categories.map((category, index) => (
            <a
              href="#"
              key={category.label}
              onClick={() => {
                setCategory(index);
              }}
            >
              {category.label}
            </a>
          ))}
        </nav>
      </Navigation>

      <Content>
        <table cellSpacing="0" cellPadding="0">
          <col style={{ width: "40px" }} />
          <col style={{ width: "200px" }} />
          <col style={{ width: "50%" }} />
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              {Object.keys(categories[category].data[0]).map(key => (
                <th key={key}>{(key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, "/")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories[category].data.map((row, index) => (
              <tr key={index}>
                <td>
                  {/*<input id={row.name} type="checkbox" checked={unlocks[row.name]} onChange={unlock} />*/}
                  <div className="checkbox-wrapper-33">
                    <label className="checkbox">
                      <input
                        id={row.name}
                        className="checkbox__trigger visuallyhidden"
                        type="checkbox"
                        checked={unlocks[row.name]}
                        onChange={unlock}
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
                </td>
                {Object.entries(row).map(([key, value], index) => {
                  return (
                    <td key={value + index}>
                      {key === "name" || key === "description" || key === "values" || key === "mod" ? (
                        <span>{value as string}</span>
                      ) : (
                        <span
                          className={unlocks[row.name] ? "" : "redacted"}
                          onClick={e => e.currentTarget.classList.remove("redacted")}
                        >
                          {value as string}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
