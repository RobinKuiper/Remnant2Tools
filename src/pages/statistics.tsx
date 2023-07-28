import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import "../global.css";
import Layout from "../Components/Layout/Layout";

const StatisticsPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1>Blaat</h1>
    </Layout>
  );
};

export default StatisticsPage;

export const Head: HeadFC = () => <title>Statistics</title>;
