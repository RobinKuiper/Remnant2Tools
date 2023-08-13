import * as React from "react";
import type { PageProps } from "gatsby";
import { Link, Slice, graphql } from "gatsby";
import { styled } from "styled-components";
import { calculateStringMatchPercentage } from "../helpers";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #383838;
  color: #fff;
  height: 87.5vh;
  box-sizing: border-box;

  main {
    text-align: center;
    margin-top: -12vh;

    h1 {
      font-family: "Fontdiner Swanky", cursive;
      font-size: 4rem;
      color: #dc5050;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 2.5rem;

      em {
        font-style: italic;
        color: #dc5050;
      }
    }

    .relevant {
      div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 20px;

        a {
          font-family: "Fontdiner Swanky", cursive;
          font-size: 1rem;
          color: #383838;
          border: none;
          background: #f36a6f;
          padding: 1rem 2.5rem;
          transform: skew(-5deg);
          transition: all 0.1s ease;

          &:hover {
            background: #a6262a;
            color: #fff;
            transform: scale(1.15);
          }
        }
      }
    }
  }
`;

const NotFoundPage: React.FC<PageProps> = ({ data, location }) => {
  const relevantPages = data.pages.nodes
    .filter(page => calculateStringMatchPercentage(location.pathname, page.path) > 50)
    .slice(0, 3);

  return (
    <Slice alias="Layout">
      <Slice alias="Head" title="Not found" description="We couldn't find the page you where looking for." />

      <Container>
        <main>
          <h1>Sorry!</h1>
          <p>
            Either you aren't cool enough to visit this page or it doesn't exist <em>. . .</em>
          </p>
          {relevantPages.length > 0 && (
            <div className="relevant">
              <strong>Did you mean?</strong>
              <div>
                {relevantPages.map(page => (
                  <Link key={page.path} to={page.path}>
                    {page.path
                      .split("/")
                      .filter(word => word !== "")
                      .join(" - ")}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </Container>
    </Slice>
  );
};

export default NotFoundPage;

export const query = graphql`
  query {
    pages: allSitePage {
      nodes {
        path
      }
    }
  }
`;
