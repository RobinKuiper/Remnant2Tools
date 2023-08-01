import React from "react";
import { styled } from "styled-components";
import TopBar from "./TopBar";
import { BsDiscord, BsLinkedin } from "react-icons/bs";
import { AiFillGitlab } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  #content {
    margin-top: 70px;
    margin-bottom: 29px;
  }

  footer {
    position: fixed;
    width: 100%;
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

    #socials {
      display: flex;
      flex-direction: row;
      gap: 10px;

      a {
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        transition: all 0.3s ease;

        &:hover {
          color: #f1f1f1;
        }
      }
      margin-right: 20px;
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <TopBar />

      <div id="content">{children}</div>

      <footer>
        <div id="copyright">
          <a href="https://www.rkuiper.nl" title="Personal website of Robin Kuiper" target="_blank" rel="noopener">
            rkuiper.nl
          </a>
        </div>

        <div id="socials">
          <a
            href="https://discord.com"
            title="Discord profile for Robin Kuiper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsDiscord />
          </a>
          <a
            href="https://discord.com"
            title="LinkedIn profile for Robin Kuiper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://discord.com"
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
