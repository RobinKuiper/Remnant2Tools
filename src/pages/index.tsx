import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import "../global.css";
import Layout from "../components/layout/Layout";
import { styled } from "styled-components";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import StatisticsPanel from "../components/StatisticsPanel";
import SecretWorldsPanel from "../components/SecretWorldsPanel";

const Updates = [
  {
    date: "09-08-2023",
    messages: [
      "Added a settings sidebar",
      "Added export/import features to the settings sidebar",
      "A lot of codebase improvements",
      "Fixed a bug where tooltips could render below other elements",
    ],
  },
  {
    date: "07-08-2023",
    messages: [
      "Image improvements in the tracker and database lists",
      "Added default weapon mods to the database",
      "Added more data to weapons and armors",
      "Added more armor (sets)",
      "Added more missing images",
      "Added more relic fragments",
      "Added armor statistics to the builder",
      "Added traits to the builder",
    ],
  },
  {
    date: "06-08-2023",
    messages: ["Data improvements", "List and grid view", "Mobile ready", "Group by filter"],
  },
  {
    date: "05-08-2023",
    messages: ["Added homepage"],
  },
  {
    date: "04-08-2023",
    messages: ["A lot of different code improvements", "Optimized images", "Auto deploy with Gitlab CI/CD"],
  },
];

const HeroBanner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 80px;
  background-color: #3b3b3b;
  padding: 40px 20px;
  text-align: center;
  color: #fff;

  h1 {
    font-size: 32px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .image {
    img {
      height: 400px;
    }

    @media (max-width: 950px) {
      display: none;
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;

    .button {
      background: linear-gradient(to right, #ac0919, #c42308);
      color: #fff;
      padding: 10px 20px;
      font-size: 1.1em;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
      }
    }
  }

  @media (max-width: 1030px) {
    gap: 20px;
  }
`;

const Homepage = styled.div`
  .panels {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 40px;
    justify-content: center;

    .panel {
      max-width: 400px;
      min-width: 300px;
      width: 100%;

      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

      border: 1px solid #000;
      box-sizing: border-box;
      background: #3b3b3b;
      color: #fff;

      h3 {
        text-align: center;
        margin-bottom: 20px;
      }

      .list {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .item {
          p {
            padding: 0;
            margin: 0;
          }
        }
      }
    }
  }
`;

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Homepage>
        <HeroBanner>
          <div>
            <h1>Remnant2 Tools</h1>
            <p>Track Your Triumphs and Collectibles: Your Ultimate Remnant 2 Companion!</p>
            <div className="buttons">
              <Link className="button" to="/tracker">
                Tracker
              </Link>
              <Link className="button" to="/builds">
                Builds
              </Link>
            </div>
          </div>

          <div className="image">
            <StaticImage src="../images/builds_ss.png" alt="Builds" />
          </div>
        </HeroBanner>

        <div className="panels">
          <div className="panel">
            <h3>Updates</h3>
            <div className="list">
              {Updates.map(update => (
                <div key={update.date} className="item">
                  <strong>{update.date}</strong>
                  {update.messages.map(message => (
                    <p key={message}>- {message}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <StatisticsPanel />
          <SecretWorldsPanel />
        </div>
      </Homepage>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
