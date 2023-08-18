import React from "react";
import {Helmet} from "react-helmet";
import {SITE_TITLE} from "../../constants";

interface Props {
  title: string;
  description: string;
}

const Head = ({title, description}: Props) => {
  return (
    <Helmet defaultTitle={SITE_TITLE} title={title} titleTemplate={`%s | ${SITE_TITLE}`}>
      <meta name="description" content={description} />
      
      <meta itemProp="name" content={`${title} | ${SITE_TITLE}`} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content="https://remnant.rkuiper.nl/logo.webp"/>
      
      <meta property="og:url" content="https://remnant.rkuiper.nl"/>
      <meta property="og:type" content="website"/>
      <meta property="og:title" content={`${title} | ${SITE_TITLE}`}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content="https://remnant.rkuiper.nl/logo.webp"/>
      
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={`${title} | ${SITE_TITLE}`}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content="https://remnant.rkuiper.nl/logo.webp"/>
    </Helmet>
  );
};

export default Head;
