import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BuildsProvider } from "./context/BuildContext";
import { Provider } from "react-redux";
import store from "./store";

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return (
    <GoogleOAuthProvider clientId={process.env.GATSBY_CLIENT_ID}>
      <Provider store={store}>
        <BuildsProvider>{children}</BuildsProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default Wrapper;
