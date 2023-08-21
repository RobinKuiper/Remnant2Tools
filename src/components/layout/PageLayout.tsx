import type { ReactNode } from "react";
import React from "react";
import { styled } from "styled-components";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
  leftSidebarContent?: ReactNode;
  rightSidebarContent?: ReactNode;
}

const PageLayout = ({ children, leftSidebarContent, rightSidebarContent }: Props) => {
  return (
    <Container hasleftsidebar={leftSidebarContent !== undefined} hasrightsidebar={rightSidebarContent !== undefined}>
      {leftSidebarContent && <Sidebar position={"left"}>{leftSidebarContent}</Sidebar>}

      <div className="page-content">{children}</div>

      {rightSidebarContent && <Sidebar position={"right"}>{rightSidebarContent}</Sidebar>}
    </Container>
  );
};

export default PageLayout;

const Container = styled.div`
  height: 100%;
  box-sizing: border-box;

  .page-content {
    position: relative;
    height: 100%;
    margin-left: ${({ hasleftsidebar }) => (hasleftsidebar ? "235px" : "0")};
    margin-right: ${({ hasrightsidebar }) => (hasrightsidebar ? "235px" : "0")};
    z-index: 65; // TODO: check? 50 works
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);

    @media (max-width: 1200px) {
      margin: 0;
      z-index: auto;
    }
  }
`;
