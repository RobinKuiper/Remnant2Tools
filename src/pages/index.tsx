import { useEffect, useState } from "react";
import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import styled from "styled-components";
import "../global.css";
import archetypes from "../data/archetypes.json";
import traits from "../data/traits.json";

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
  table {
    table-layout: fixed;
    width: 100%;

    thead {
      th {
        text-align: left;
      }
    }

    tbody {
      tr:nth-child(even) {
        background: #ccc;
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
  // "Weapons",
  // "Mods",
  // "Mutators",
  // "Armor",
  // "Relics",
  // "Amulets",
  // "Rings"
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

  const showValue = (key: string, value: any) => {
    if (key === "name" || key === "description") {
      return value;
    } else {
      return <span onClick={e => (e.currentTarget.innerHTML = value)}>SHOW</span>;
    }
  };

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
        <table>
          <thead>
            <tr>
              <th></th>
              {Object.keys(categories[category].data[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories[category].data.map((row, index) => (
              <tr key={index}>
                <td>
                  <input id={row.name} type="checkbox" checked={unlocks[row.name]} onChange={unlock} />
                </td>
                {Object.entries(row).map(([key, value], index) => {
                  return <td key={value + index}>{showValue(key, value)}</td>;
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
