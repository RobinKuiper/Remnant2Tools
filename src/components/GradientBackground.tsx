import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 1) 11%,
    rgba(231, 231, 231, 1) 53%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: -1;
`;

const GradientBackground = () => {
  return <Container />;
};

export default GradientBackground;
