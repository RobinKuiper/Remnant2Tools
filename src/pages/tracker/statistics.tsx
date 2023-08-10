import React from "react";
import { styled } from "styled-components";
import CategorySidebar from "../../components/database/CategorySidebar";
import Layout from "../../components/layout/Layout";
import StatisticsPanel from "../../components/statistics/StatisticsPanel";
import SecretWorldsPanel from "../../components/statistics/SecretWorldsPanel";
import Head from "../../components/layout/Head";

const Page = styled.div`
  display: flex;
  flex-direction: row;

  .page-content {
    z-index: 65;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    width: 90%;
    padding: 20px;

    position: relative;
    background: url("/images/bg2.webp");
    background-size: cover;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255, 255, 255, 1) 11%, rgba(231, 231, 231, 1) 23%, rgba(0, 0, 0, 0) 100%);
      z-index: -1;
    }

    .panels {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .panel {
        border: 1px solid #000;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.6);
        background: #292929;
        color: #fff;
        min-width: 300px;
        max-width: 400px;

        h3 {
          text-align: center;
          margin-bottom: 20px;
        }
      }
    }

    .content-heading {
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
  }
`;

const Statistics: React.FC = () => {
  return (
    <Layout>
      <Head title="Statistics" description="All of the statistics of the items you have unlocked in Remnant II." />

      <Page>
        <CategorySidebar type="tracker" />

        <div className="page-content">
          <div className="background" />

          <div className="panels">
            <StatisticsPanel />
            <SecretWorldsPanel />
          </div>
        </div>
      </Page>
    </Layout>
  );
};

export default Statistics;
