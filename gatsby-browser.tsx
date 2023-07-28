import React from "react";
import { DataProvider } from "./src/contexts/DataContext";

export const wrapRootElement = ({ element }) => {
  return <DataProvider>{element}</DataProvider>;
};
