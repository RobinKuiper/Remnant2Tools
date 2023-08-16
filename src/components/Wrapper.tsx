import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SettingProvider } from "../context/SettingContext";
import { DataProvider } from "../context/DataContext";
import { BuildsProvider } from "../context/BuildContext";
import { AuthProvider } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return (
    // TODO: change to env variable
    <GoogleOAuthProvider clientId="712088662534-av71tvgru83it5ll3tra1snpgfund263.apps.googleusercontent.com">
      <AuthProvider>
        <SettingProvider>
          <DataProvider>
            <BuildsProvider>{children}</BuildsProvider>
          </DataProvider>
        </SettingProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default Wrapper;
