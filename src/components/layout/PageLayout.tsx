import "./PageLayout.scss";
import type { ReactNode } from "react";
import React from "react";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
  leftSidebarContent?: ReactNode;
  rightSidebarContent?: ReactNode;
}

const PageLayout = ({ children, leftSidebarContent, rightSidebarContent }: Props) => {
  return (
    <div className="page-layout-container">
      {leftSidebarContent && <Sidebar position={"left"}>{leftSidebarContent}</Sidebar>}

      <div
        className="page-layout-content"
        style={{
          marginLeft: leftSidebarContent !== undefined ? "235px" : 0,
          marginRight: rightSidebarContent !== undefined ? "235px" : 0,
        }}
      >
        {children}
      </div>

      {rightSidebarContent && <Sidebar position={"right"}>{rightSidebarContent}</Sidebar>}
    </div>
  );
};

export default PageLayout;
