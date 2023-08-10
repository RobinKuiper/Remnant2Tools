import { graphql } from "gatsby";
import React from "react";
import { styled } from "styled-components";
import CategorySidebar from "../components/database/CategorySidebar";
import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

const Page = styled.div`
  display: flex;
  flex-direction: row;

  .item-content {
    z-index: 65;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    width: 90%;
    padding: 50px;
    box-sizing: border-box;
    margin-left: 235px;
    min-height: 87.5vh;

    @media (max-width: 1200px) {
      margin-left: 0;
      width: 100%;
    }

    @media (max-width: 1500px) {
      width: 100%;
    }

    .item {
      //display: flex;

      .top {
        display: flex;
        gap: 50px;

        .image {
          border: 1px solid #000;
          background: #fff;
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, 1);
        }

        .title {

        }
      }
    }
  }
`;

const Category = ({ data, pageContext }) => {
  const { item } = pageContext;
  const { image } = data;
  
  return (
    <Layout>
      <Head title={item.name} description="Track your progress in Remnant II." />

      <Page>
        <CategorySidebar type="database" />
        
        <div className="item-content">
          <div className="item">
            <div className="top">
              <div className="image">
                {image && (
                  <GatsbyImage
                    image={getImage(image)}
                    alt={item.name}
                    title={item.name}
                    placeholder="none"
                  />
                )}
              </div>

              <div className="title">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
              </div>
            </div>
            
            <div className="information">
              
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  );
};

export default Category;

export const query = graphql`
  query ($imgRegex: String!) {
    image: file(relativePath: { regex: $imgRegex }) {
      name
      relativePath
      childImageSharp {
        gatsbyImageData(quality: 80, layout: CONSTRAINED)
      }
    }
  }
`;
