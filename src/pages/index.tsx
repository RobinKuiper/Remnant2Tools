import { useContext, useEffect, useState } from "react";
import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import "../global.css";
import CollectablesTable from "../Components/CollectablesTable";
import CollectablesTopBar from "../Components/CollectablesTopBar";
import Layout from "../Components/Layout/Layout";
import { DataContext } from "../contexts/DataContext";
import dataCollection from "../data/dataCollection.json";

const IndexPage: React.FC<PageProps> = () => {
  const { category } = useContext(DataContext);
  const [data, setData] = useState(dataCollection[category].items);
  const [query, setQuery] = useState("");
  const [sortDir, setSortDir] = useState(1);

  useEffect(() => {
    if (!category) {
      setData({});
      return;
    }

    let data = dataCollection[category].items;
    if (query && query.length > 0) {
      data = data.filter(item => {
        // Loop through each value in the item object
        // and check if query matches the content
        for (const value of Object.values(item)) {
          if (typeof value === "string" && value.toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }

    // data = data.sort((a, b) => (sortDir === 0 ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));

    setData(data);
  }, [category, query, sortDir]);

  const sort = () => {
    setSortDir(sortDir === 1 ? 0 : 1);
  };

  return (
    <Layout>
      <CollectablesTopBar query={query} setQuery={setQuery} />

      <CollectablesTable keys={Object.keys(Object.values(data)[0])} data={Object.values(data)} sort={sort} />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
