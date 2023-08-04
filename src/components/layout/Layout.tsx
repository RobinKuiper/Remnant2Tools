import React from "react";
import { styled } from "styled-components";
import TopBar from "./TopBar";
import { BsDiscord, BsLink45Deg, BsLinkedin } from "react-icons/bs";
import { AiFillGitlab } from "react-icons/ai";
import { graphql, useStaticQuery } from "gatsby";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  #content {
    margin-top: 70px;
    margin-bottom: 45px;
  }

  footer {
    position: fixed;
    width: 100%;
    height: 35px;
    bottom: 0;
    background: #292929;
    z-index: 30;
    color: #fff;
    padding: 5px 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    a {
      color: #fff;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        color: #d95c5c;
      }
    }

    #copyright {
      a {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }

    #socials {
      display: flex;
      flex-direction: row;
      gap: 10px;

      margin-right: 20px;
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          gitlab
          discord
          website
          linkedIn
        }
      }
    }
  `);

  return (
    <Container>
      <TopBar />

      <div id="content">{children}</div>

      <footer>
        <div id="copyright">
          <a
            href={data.site.siteMetadata.website}
            title="Personal website of Robin Kuiper"
            target="_blank"
            rel="noopener"
          >
            <BsLink45Deg />
            <span>Robin Kuiper</span>
          </a>
        </div>

        <div id="socials">
          <a
            href={data.site.siteMetadata.discord}
            title="Discord profile for Robin Kuiper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsDiscord />
          </a>
          <a
            href={data.site.siteMetadata.linkedIn}
            title="LinkedIn profile for Robin Kuiper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin />
          </a>
          <a
            href={data.site.siteMetadata.gitlab}
            title="Gitlab profile for Robin Kuiper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGitlab />
          </a>
        </div>
      </footer>
    </Container>
  );
};

export default Layout;