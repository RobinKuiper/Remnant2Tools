import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import "../global.css";
import dataCollection from "../data/dataCollection.json";
import newData from "../../scripts/DataConvert";

const ConvertPage: React.FC<PageProps> = () => {
  return <pre>{JSON.stringify(newData)}</pre>;
};

export default ConvertPage;

export const Head: HeadFC = () => <title>Convert</title>;
