import React from "react";
import { styled } from "styled-components";
import TopBar from "./TopBar";
import SettingsSidebar from "./SettingsSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import Footer from "./Footer";

const Container = styled.div`
  height: 100%;

  .layout-content {
    padding-top: 74px;
    padding-bottom: 45px;
    box-sizing: border-box;
    height: 100%;
  }
  
  #tooltip {
    z-index: 999999;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <TopBar />

      <div className="layout-content">{children}</div>

      <Footer />

      <SettingsSidebar />
      <ToastContainer theme="dark" />
      <Tooltip id="tooltip" />
    </Container>
  );
};

export default Layout;
