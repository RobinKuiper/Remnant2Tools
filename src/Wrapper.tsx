import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BuildsProvider } from "./context/BuildContext";
import {Provider} from "react-redux";
import store from "./store";

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return (
    // TODO: change to env variable
    <GoogleOAuthProvider clientId="712088662534-av71tvgru83it5ll3tra1snpgfund263.apps.googleusercontent.com">
      <Provider store={store}>
        <BuildsProvider>{children}</BuildsProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default Wrapper;
 