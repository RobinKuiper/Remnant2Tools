import React from "react";
import { Helmet } from "react-helmet";
import { SITE_TITLE } from "../../constants";

interface Props {
  title: string;
  description: string;
}

const Head = ({ title, description }: Props) => {
  return (
    <Helmet defaultTitle={SITE_TITLE} title={title} titleTemplate={`%s | ${SITE_TITLE}`}>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Head;
