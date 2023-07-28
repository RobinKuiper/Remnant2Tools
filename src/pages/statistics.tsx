import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import "../global.css";
import Layout from "../Components/Layout/Layout";
import { styled } from "styled-components";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const StatisticsContent = styled.div`
  margin: 20px;
`;

const StatisticsPage: React.FC<PageProps> = () => {
  const { categoryInformation } = useContext(DataContext);

  return (
    <Layout>
      <StatisticsContent>
        <h1>Statistics</h1>

        <div id={"overview"}>
          {categoryInformation.map(category => (
            <div key={category.label.toLowerCase()}>
              <h2>{category.label}</h2>
              {category.completed} / {category.total} ({parseInt((category.completed / category.total) * 100)}%)
            </div>
          ))}
        </div>
      </StatisticsContent>
    </Layout>
  );
};

export default StatisticsPage;

export const Head: HeadFC = () => <title>Statistics</title>;
