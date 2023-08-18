import React from "react";
import { styled } from "styled-components";
import CategorySidebarContent from "../../components/database/CategorySidebarContent";
import StatisticsPanel from "../../components/statistics/StatisticsPanel";
import SecretWorldsPanel from "../../components/statistics/SecretWorldsPanel";
import Head from "../../components/layout/Head";
import BackgroundImage from "../../components/BackgroundImage";
import { graphql } from "gatsby";
import Layout from "../../components/layout/Layout";
import PageLayout from "../../components/layout/PageLayout";

const Container = styled.div`
  .panels {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;

    @media (max-width: 1200px) {
      justify-content: center;
    }

    .panel {
      border: 1px solid #000;
      padding: 10px;
      box-sizing: border-box;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
      background: #292929;
      color: #fff;
      min-width: 300px;
      max-width: 450px;

      h3 {
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }
`;

const Statistics: React.FC = props => {
  const { bgImage } = props.data;

  return (
    <Layout>
      <Head 
        title="Statistics" 
        description="Dive into the numbers! Track all the stats for your unlocked items in Remnant 2 right here." 
      />

      <PageLayout leftSidebarContent={<CategorySidebarContent type="tracker" />}>
        <Container>
          <BackgroundImage image={bgImage}>
            <div className="panels">
              <StatisticsPanel />
              <SecretWorldsPanel />
            </div>
          </BackgroundImage>
        </Container>
      </PageLayout>
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
