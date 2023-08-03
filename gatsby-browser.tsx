import React from "react";
import { BuildsProvider } from "./src/context/BuildContext";
import { DataProvider } from "./src/context/DataContext";
import { SettingProvider } from "./src/context/SettingContext";

export const wrapRootElement = ({ element }) => {
  return (
    <SettingProvider>
      <DataProvider>
        <BuildsProvider>{element}</BuildsProvider>
      </DataProvider>
    </SettingProvider>
  );
};
