import React, { useContext, useEffect } from "react";
import { styled } from "styled-components";
import TopBar from "./TopBar";
import SettingsSidebar from "./SettingsSidebar";
import type { ToastOptions } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import Footer from "./Footer";
import { SettingContext } from "../../context/SettingContext";
import { useVariant } from "@unleash/proxy-client-react";

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
  const notification = useVariant("notification");
  const { showSettings, toggleShowSettings } = useContext(SettingContext);

  const handleClick = () => {
    if (showSettings) {
      toggleShowSettings();
    }
  };

  useEffect(() => {
    if (
      !notification.enabled ||
      !notification.payload ||
      !notification.payload.value ||
      notification.payload.value === ""
    ) {
      return;
    }

    const storedCloseTimestamp = localStorage.getItem("notificationLastClose");
    if (storedCloseTimestamp) {
      const notificationTimestamp = parseInt(notification.name);
      const lastCloseTimestamp = parseInt(storedCloseTimestamp);

      if (lastCloseTimestamp > notificationTimestamp) {
        return;
      }
    }

    const config: ToastOptions = {
      // type: type === "saved" ? toast.TYPE.SUCCESS : toast.TYPE.INFO,
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: "notification",
      onClose: () => {
        const unixTimestamp = Math.floor(new Date() / 1000);
        localStorage.setItem("notificationLastClose", String(unixTimestamp));
      },
    };

    toast(notification.payload?.value, config);
  }, [notification]);

  return (
    <Container>
      <TopBar />

      <div className="layout-content" onClick={handleClick}>
        {children}
      </div>

      <Footer />

      <SettingsSidebar />
      <ToastContainer theme="dark" />
      <Tooltip id="tooltip" />
    </Container>
  );
};

export default Layout;
