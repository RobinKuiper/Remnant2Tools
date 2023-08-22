import "./404.scss";
import * as React from "react";
import type { PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import { calculateStringMatchPercentage } from "../helpers";
import PageLayout from "../components/layout/PageLayout";

const NotFoundPage: React.FC<PageProps> = ({ data, location }) => {
  const relevantPages = data.pages.nodes
    .filter(page => calculateStringMatchPercentage(location.pathname, page.path) > 50)
    .slice(0, 3);

  return (
    <Layout>
      <Head title="Not found" description="We couldn't find the page you where looking for." />

      <PageLayout>
        <div className="notfound-container">
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
        </div>
      </PageLayout>
    </Layout>
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
