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
        className={`page-layout-content ${leftSidebarContent !== undefined ? "left-sidebar" : ""} ${rightSidebarContent !== undefined ? "right-sidebar" : ""}`}
      >
        {children}
      </div>

      {rightSidebarContent && <Sidebar position={"right"}>{rightSidebarContent}</Sidebar>}
    </div>
  );
};

export default PageLayout;
