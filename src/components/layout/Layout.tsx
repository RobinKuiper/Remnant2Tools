import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import TopBar from "./TopBar";
import SettingsSidebar from "./SettingsSidebar";
import type { ToastOptions, UpdateOptions } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import Footer from "./Footer";
import { toggleSidebar } from "../../features/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import { FaGoogleDrive } from "react-icons/fa";
import { setSaveCompleted } from "../../features/data/dataSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";

const TIME_BETWEEN_SAVES = process.env.GATSBY_TIME_BETWEEN_SAVES;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const showSettingsSidebar = useAppSelector((state: RootState) => state.settings.showSidebar);
  const { saving, pending, saved, lastSave } = useAppSelector((state: RootState) => state.data);
  const pendingRef = useRef();
  const savingRef = useRef();
  const savedRef = useRef();
  const intervalRef = useRef<NodeJS.Timer | null>();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (showSettingsSidebar) {
      dispatch(toggleSidebar());
    }
  };

  const getToastContent = (text, className) => (
    <div className={`google-saving-toast ${className}`}>
      <FaGoogleDrive size="25px" color={className === "success" ? "green" : "white"} />
      {text}
    </div>
  );

  useEffect(() => {
    if (pending && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const lastSaveTime = lastSave.getTime();
        const timeSinceLastSave = (currentTime - lastSaveTime) / 1000; // Convert to seconds

        const config: UpdateOptions = {
          toastId: "google-toast",
          render: getToastContent(
            <div className="pending">
              Pending changes...<span>{parseInt(String(TIME_BETWEEN_SAVES - timeSinceLastSave))}s.</span>
            </div>,
            "",
          ),
        };

        if (!savingRef.current && !savedRef.current) {
          toast.update("google-toast", config);
        }
      }, 1000);
    } else if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [pending]);

  const updateToast = (prioritizePending: boolean = false) => {
    if (!saving && !saved && !pendingRef.current) return;

    const config: ToastOptions = {
      // type: type === "saved" ? toast.TYPE.SUCCESS : toast.TYPE.INFO,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: !prioritizePending && saved ? 5000 : false,
      hideProgressBar: !(!prioritizePending && saved),
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressStyle: { background: "green" },
      toastId: "google-toast",
      onClose: () => {
        dispatch(setSaveCompleted());
        if (pendingRef.current) {
          updateToast(true);
        }
      },
    };

    let text,
      className = "";

    if (pendingRef.current) {
      text = "Pending changes...";
    }

    if (!prioritizePending && saving) {
      text = "Saving...";
    }

    if (!prioritizePending && saved) {
      text = "Saved to Google Drive!";
      className = "success";
    }

    const isToast = document.getElementById("google-toast");
    if (isToast) {
      const updateConfig: UpdateOptions = config;
      updateConfig.render = getToastContent(text, className);
      delete updateConfig.toastId;
      toast.update("google-toast", config);
    } else {
      toast(getToastContent(text, className), config);
    }
  };

  useEffect(() => {
    pendingRef.current = pending;
    savingRef.current = saving;
    savedRef.current = saved;
    updateToast();
  }, [saving, pending, saved]);

  return (
    <Container>
      <TopBar />

      <div className="layout-content" onClick={handleClick}>
        {children}
      </div>

      <Footer />

      <GoogleOAuthProvider clientId="sdfsdfsd">
        <SettingsSidebar />
      </GoogleOAuthProvider>

      <ToastContainer theme="dark" />
      <Tooltip id="tooltip" />
    </Container>
  );
};

export default Layout;

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

  #google-toast {
    .google-saving-toast {
      .pending {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
    }
  }
`;
