import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import "../global.css";
import dataCollection from "../data/dataCollection.json";

const ConvertPage: React.FC<PageProps> = () => {
  return <pre>{JSON.stringify(dataCollection)}</pre>;
};

export default ConvertPage;

export const Head: HeadFC = () => <title>Convert</title>;
