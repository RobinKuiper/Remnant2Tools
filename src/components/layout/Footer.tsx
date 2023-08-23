import "./Footer.scss";
import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { BiLogoPatreon, BiLogoPaypal } from "react-icons/bi";
import { BsDiscord, BsLinkedin } from "react-icons/bs";
import { AiFillGitlab } from "react-icons/ai";
import { graphql, useStaticQuery } from "gatsby";

const Footer = () => {
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
    <div className="footer-container">
      <div className="copyright">
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

      <div className="socials">
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
    </div>
  );
};

export default Footer;
