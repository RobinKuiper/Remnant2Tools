import React from "react";
import { styled } from "styled-components";
import TopBar from "./TopBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  #content {
    margin-top: 70px;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <TopBar />

      <div id="content">{children}</div>
    </Container>
  );
};

export default Layout;
