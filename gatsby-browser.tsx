import React from "react";
import { DataProvider } from "./src/context/DataContext";
import { SettingProvider } from "./src/context/SettingContext";

export const wrapRootElement = ({ element }) => {
  return (
    <SettingProvider>
      <DataProvider>{element}</DataProvider>
    </SettingProvider>
  );
};
