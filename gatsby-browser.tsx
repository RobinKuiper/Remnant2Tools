import React from "react";
import Wrapper from "./src/components/Wrapper";
import { Analytics } from "@vercel/analytics/react";

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Wrapper>{element}</Wrapper>
      <Analytics />
    </>
  );
};
