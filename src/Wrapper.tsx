import React from "react";
import { Provider } from "react-redux";
import store from "./store";

interface Props {
  element: React.ReactNode;
}

export default ({ element }: Props) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  return <Provider store={store}>{element}</Provider>;
};
