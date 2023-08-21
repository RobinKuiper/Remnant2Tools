import "./Layout.scss";
import React, { useEffect, useRef } from "react";
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
import { TIME_BETWEEN_GOOGLE_SAVES } from "../../constants";

const TOAST_SETTINGS = {
  pending: {
    text: "Pending changes...",
  },
  saving: {
    text: "Saving...",
  },
  saved: {
    text: "Saved to Google Drive!",
    className: "success",
  },
  error: {
    text: "Something went wrong. Please try again later.",
    className: "error",
  },
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const showSettingsSidebar = useAppSelector((state: RootState) => state.settings.showSidebar);
  const { saving, pending, saved, lastSave, error } = useAppSelector((state: RootState) => state.data);
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

  const getToastContent = toastSettings => {
    let color;
    switch (toastSettings.className) {
      case "success":
        color = "green";
        break;
      case "error":
        color = "red";
        break;
      default:
        color = "white";
        break;
    }

    return (
      <div className={`google-saving-toast ${toastSettings.className ?? ""}`}>
        <FaGoogleDrive size="25px" color={color} />
        {toastSettings.text}
      </div>
    );
  };

  useEffect(() => {
    if (pending && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const lastSaveTime = lastSave.getTime();
        const timeSinceLastSave = (currentTime - lastSaveTime) / 1000; // Convert to seconds

        const config: UpdateOptions = {
          toastId: "google-toast",
          render: getToastContent({
            text: (
              <div className="pending">
                Pending changes...<span>{parseInt(String(TIME_BETWEEN_GOOGLE_SAVES - timeSinceLastSave))}s.</span>
              </div>
            ),
          }),
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

  const getToastContentSettings = prioritizePending => {
    if (error) {
      return TOAST_SETTINGS["error"];
    } else if (!prioritizePending && savedRef.current) {
      return TOAST_SETTINGS["saved"];
    } else if (!prioritizePending && savingRef.current) {
      return TOAST_SETTINGS["saving"];
    } else if (pendingRef.current) {
      return TOAST_SETTINGS["pending"];
    }
  };

  const updateToast = (prioritizePending: boolean = false) => {
    if (!saving && !saved && !pendingRef.current && !error) return;

    const config: ToastOptions = {
      // type: error ? toast.TYPE.ERROR : toast.TYPE.DEFAULT,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: !prioritizePending && (saved || error) ? 5000 : false,
      hideProgressBar: !(!prioritizePending && (saved || error)),
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressStyle: { background: error ? "red" : "green" },
      toastId: "google-toast",
      onClose: onToastClose,
    };

    const contentSettings = getToastContentSettings(prioritizePending);

    const isToast = document.getElementById("google-toast");
    if (isToast) {
      const updateConfig: UpdateOptions = config;
      updateConfig.render = getToastContent(contentSettings);
      delete updateConfig.toastId;
      toast.update("google-toast", config);
    } else {
      toast(getToastContent(contentSettings), config);
    }
  };

  const onToastClose = () => {
    dispatch(setSaveCompleted());
    if (pendingRef.current) {
      updateToast(true);
    }
  };

  useEffect(() => {
    pendingRef.current = pending;
    savingRef.current = saving;
    savedRef.current = saved;
    updateToast();
  }, [saving, pending, saved, error]);

  return (
    <div className="layout-container">
      <TopBar />

      <div className="layout-content" onClick={handleClick}>
        {children}
      </div>

      <Footer />

      <GoogleOAuthProvider clientId={process.env.GATSBY_CLIENT_ID}>
        <SettingsSidebar />
      </GoogleOAuthProvider>

      <ToastContainer theme="dark" />
      <Tooltip id="tooltip" />
    </div>
  );
};

export default Layout;
