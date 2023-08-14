import React from "react";
import { styled } from "styled-components";
import CategorySidebar from "../../components/database/CategorySidebar";
import Layout from "../../components/layout/Layout";
import StatisticsPanel from "../../components/statistics/StatisticsPanel";
import SecretWorldsPanel from "../../components/statistics/SecretWorldsPanel";
import Head from "../../components/layout/Head";
import BackgroundImage from "../../components/BackgroundImage";
import { graphql } from "gatsby";

const Page = styled.div`
  display: flex;
  flex-direction: row;

  .page-content {
    z-index: 65;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    margin-left: 235px;

    @media (max-width: 1200px) {
      margin-left: 0;
      width: 100%;
    }

    .panels {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;

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

const Statistics: React.FC = props => {
  const { bgImage } = props.data;

  return (
    <Layout>
      <Head title="Statistics" description="All of the statistics of the items you have unlocked in Remnant II." />

      <Page>
        <CategorySidebar type="tracker" />

        <div className="page-content">
          <BackgroundImage image={bgImage}>
            <div className="panels">
              <StatisticsPanel />
              <SecretWorldsPanel />
            </div>
          </BackgroundImage>
        </div>
      </Page>
    </Layout>
  );
};

export default Statistics;

export const query = graphql`
  {
    bgImage: file(name: { eq: "bg2" }) {
      ...imageFragment
    }
  }
`;
