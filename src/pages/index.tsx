import { useState } from "react";
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

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 200px;
  box-sizing: border-box;
  border-right: 1px solid #000;
  //border: 1px solid red;

  a {
    padding: 15px 10px;
    border-bottom: 1px solid #000;
  }
`;

const Content = styled.div``;

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

  return (
    <Container>
      <Navigation>
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
      </Navigation>

      <Content>
        <table>
          <thead>
            <tr>
              {Object.keys(categories[category].data[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories[category].data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map(value => (
                  <td key={value}>a {value}</td>
                ))}
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
