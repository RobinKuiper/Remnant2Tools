import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SettingProvider } from "../context/SettingContext";
import { DataProvider } from "../context/DataContext";
import { BuildsProvider } from "../context/BuildContext";
import { AuthProvider } from "../context/AuthContext";
import { FlagProvider } from "@unleash/proxy-client-react";

const unleashConfig = {
  url: `${process.env.GATSBY_UNLEASH_URL}api/frontend`,
  clientKey: process.env.GATSBY_UNLEASH_TOKEN,
  refreshInterval: 60, //60*60,
  appName: "Remnant II Tools",
};

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return (
    <FlagProvider config={unleashConfig}>
      <GoogleOAuthProvider clientId="851510059194-6e0lir2109658livib14ockc0snumh7h.apps.googleusercontent.com">
        <AuthProvider>
          <SettingProvider>
            <DataProvider>
              <BuildsProvider>{children}</BuildsProvider>
            </DataProvider>
          </SettingProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </FlagProvider>
  );
};

export default Wrapper;
