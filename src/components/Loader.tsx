import React from "react";
import { styled } from "styled-components";
import { CircleLoader } from "react-spinners";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

interface Props {
  size?: number;
  color?: string;
  loading?: boolean;
}

const Loader = ({ size, color, loading }: Props) => {
  return (
    <Container>
      <CircleLoader color={color ?? "#000"} loading={loading ?? true} size={size ?? 150} aria-label="Loading Spinner" />
    </Container>
  );
};

export default Loader;
