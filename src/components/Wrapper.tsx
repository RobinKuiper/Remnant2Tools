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
    <GoogleOAuthProvider clientId="851510059194-6e0lir2109658livib14ockc0snumh7h.apps.googleusercontent.com">
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
