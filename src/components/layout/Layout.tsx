import React from "react";
import { styled } from "styled-components";
import { BsDiscord, BsLinkedin } from "react-icons/bs";
import { AiFillGitlab } from "react-icons/ai";
import { Slice, graphql, useStaticQuery } from "gatsby";
import { BiLogoPatreon, BiLogoPaypal } from "react-icons/bi";
import { StaticImage } from "gatsby-plugin-image";
import { ToastContainer } from "react-toastify";
// import CookieConsent from "react-cookie-consent";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  .toast {
    background: #292929;
    top: 100px;
  }

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
    z-index: 100;
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
          patreon
          paypal
        }
      }
    }
  `);

  return (
    <Container>
      <Slice alias="TopBar" />

      <div id="content">{children}</div>

      <footer>
        <div id="copyright">
          <a
            href={data.site.siteMetadata.website}
            title="Personal website of Robin Kuiper"
            target="_blank"
            rel="noopener"
          >
            {/*<BsLink45Deg />*/}
            <StaticImage src="../../images/rklogo.png" alt="Robin Kuiper Logo" height={40} />
          </a>
        </div>

        <div id="socials">
          <a
            href={data.site.siteMetadata.patreon}
            title="Patreon link for Robin Kuiper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BiLogoPatreon />
          </a>
          <a
            href={data.site.siteMetadata.paypal}
            title="Paypal.me for Robin Kuiper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BiLogoPaypal />
          </a>
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

      {/*<CookieConsent*/}
      {/*  debug={true}*/}
      {/*  enableDeclineButton*/}
      {/*  location="bottom"*/}
      {/*  buttonText="Accept"*/}
      {/*  declineButtonText="Decline"*/}
      {/*  cookieName="remnantdb-gdpr-google-analytics"*/}
      {/*  containerClasses={"test"}*/}
      {/*>*/}
      {/*  This website uses cookies to enhance the user experience.*/}
      {/*</CookieConsent>*/}
      <Slice alias="SettingsSidebar" />

      <ToastContainer theme="dark" />
    </Container>
  );
};

export default Layout;
