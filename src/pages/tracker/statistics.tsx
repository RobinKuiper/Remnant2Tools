import "./statistics.scss";
import React from "react";
import CategorySidebarContent from "../../components/database/CategorySidebarContent";
import StatisticsPanel from "../../components/statistics/StatisticsPanel";
import SecretWorldsPanel from "../../components/statistics/SecretWorldsPanel";
import Head from "../../components/layout/Head";
import BackgroundImage from "../../components/BackgroundImage";
import Layout from "../../components/layout/Layout";
import PageLayout from "../../components/layout/PageLayout";

const Statistics: React.FC = () => {
  return (
    <Layout>
      <Head
        title="Statistics"
        description="Dive into the numbers! Track all the stats for your unlocked items in Remnant 2 right here."
      />

      <PageLayout leftSidebarContent={<CategorySidebarContent type="tracker" />}>
        <div className="statistics-container">
          <BackgroundImage index={1}>
            <div className="panels">
              <StatisticsPanel />
              <SecretWorldsPanel />
            </div>
          </BackgroundImage>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default Statistics;
