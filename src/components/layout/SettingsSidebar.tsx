import "./SettingsSidebar.scss";
import React, { useEffect, useRef, useState } from "react";
import Toggle from "react-toggle";
import { CiImport } from "react-icons/ci";
import { AiOutlineCopy } from "react-icons/ai";
import { LAST_UPDATED, TIME_BETWEEN_GOOGLE_SAVES } from "../../constants";
import "react-toggle/style.css";
import { Tooltip } from "react-tooltip";
import { FaGoogleDrive } from "react-icons/fa";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { refreshTokens } from "../../helpers";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import { userLogin } from "../../features/auth/authActions";
import { logout } from "../../features/auth/authSlice";
import { toggleShowRedacted } from "../../features/settings/settingsSlice";
import { updateBuilds, updateUnlocks } from "../../features/data/dataSlice";

const SettingsSidebar = () => {
  const unlockDataRef = useRef<HTMLTextAreaElement>();
  const buildsDataRef = useRef<HTMLTextAreaElement>();
  const [retrievingFromGoogle, setRetrievingFromGoogle] = useState(false);
  const { isLoggedIn, loading: loggingIn } = useAppSelector((state: RootState) => state.auth);
  const { showSidebar, showRedacted } = useAppSelector((state: RootState) => state.settings);
  const { unlocks, builds } = useAppSelector((state: RootState) => state.data);
  const dispatch = useAppDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: ({ code }) => {
      dispatch(userLogin(code));
    },
    onError: () => {
      toast.error("Something went wrong with the authentication.");
    },
    onNonOAuthError: () => {
      toast.error("Something went wrong with the authentication.");
    },
    scope: "https://www.googleapis.com/auth/drive.file",
    flow: "auth-code",
  });

  useEffect(() => {
    if (!unlockDataRef.current) {
      return;
    }

    unlockDataRef.current.value = JSON.stringify(unlocks);
  }, [unlocks]);

  useEffect(() => {
    if (!buildsDataRef.current) {
      return;
    }

    buildsDataRef.current.value = JSON.stringify({ ...builds, version: 2 });
  }, [builds]);

  const copyToClipboard = (e, ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      if (!navigator.clipboard) {
        ref.current.select();
        document.execCommand("copy"); // eslint-disable-line
      } else {
        const text = ref.current.value;
        navigator.clipboard.writeText(text);
      }
      e.target.classList.add("success");
    }
  };

  const saveUnlocks = e => {
    e.target.classList.add("success");
    localStorage.setItem("data", unlockDataRef.current.value);
    dispatch(updateUnlocks());
  };

  const saveBuilds = e => {
    e.target.classList.add("success");
    localStorage.setItem("builds", buildsDataRef.current.value);
    dispatch(updateBuilds());
  };

  const handleGoogleLink = () => {
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      googleLogin();
    }
  };

  const retrieveFromGoogleDrive = async () => {
    if (!isLoggedIn || retrievingFromGoogle) {
      return;
    }

    setRetrievingFromGoogle(true);

    const tokens = JSON.parse(localStorage.getItem("google_oauth"));

    const result = await fetch("/api/data/google/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokens,
      }),
    });

    if (result.ok) {
      setRetrievingFromGoogle(false);
      const { unlocks, credentials } = await result.json();
      localStorage.setItem("data", unlocks);
      dispatch(updateUnlocks());
      toast.success("Successfully retrieved data from ");
      refreshTokens(credentials);
    } else {
      if (result.status === 404) {
        toast.error("No data found.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const GoogleIcon = (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="18px"
      height="18px"
      viewBox="0 0 48 48"
      className="abcRioButtonSvg"
    >
      <g>
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 
              14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        ></path>
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26
               5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        ></path>
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 
              16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        ></path>
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 
              0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        ></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
      </g>
    </svg>
  );

  const buttonText = (() => {
    if (loggingIn) {
      return "Linking...";
    } else if (isLoggedIn) {
      return "Unlink from Google";
    } else {
      return "Link with Google";
    }
  })();

  return (
    <div className={`settings-sidebar-container ${showSidebar && "active"}`}>
      <h2>Settings</h2>

      <div className="google-login-setting-item" data-tooltip-id="google-login-tooltip" data-tooltip-place="bottom">
        <div className="gdrive-button" onClick={handleGoogleLink} disabled={loggingIn}>
          <div className={`icon ${loggingIn && "active"}`}>{GoogleIcon}</div>
          <span className="text">{buttonText}</span>
        </div>
        <Tooltip id="google-login-tooltip" className="google-tooltip">
          <p>
            Linking to Google will save your data to your Google Drive. Saving happens once each{" "}
            <strong>{TIME_BETWEEN_GOOGLE_SAVES} seconds</strong> if their are changes.
          </p>
          <p>At the moment this only works for unlockable data.</p>
          <p>
            This will run as a test for some time to see how much resources this requires. If the resources are
            manageable I will also implement this for builds.
          </p>
        </Tooltip>
      </div>

      <div className="data-settings">
        <h3>Data</h3>

        <div className="data-settings-item">
          <label
            htmlFor="defaultShowRedacted"
            className="title"
            data-tooltip-id="tooltip"
            data-tooltip-content={"Show redacted information by default"}
            data-tooltip-place="bottom"
          >
            Reveal All Redacted
          </label>
          <div
            data-tooltip-id="tooltip"
            data-tooltip-content={"Show redacted information by default"}
            data-tooltip-place="bottom"
          >
            <Toggle
              id="defaultShowRedacted"
              className="toggle"
              defaultChecked={showRedacted}
              onChange={() => dispatch(toggleShowRedacted())}
            />
          </div>
        </div>
      </div>

      <div className="export-settings">
        <h3>Export/Import</h3>

        <div className="export-settings-item">
          <div className="title">Unlock data</div>
          <div className="data">
            <textarea ref={unlockDataRef}></textarea>
          </div>
          <div className="buttons">
            <button
              onClick={retrieveFromGoogleDrive}
              data-tooltip-id="tooltip"
              data-tooltip-content={"Import data from Google Drive"}
              data-tooltip-place="bottom"
              disabled={!isLoggedIn || retrievingFromGoogle}
            >
              {retrievingFromGoogle ? <Loader size="25px" color="#fff" /> : <FaGoogleDrive size="25px" />}
            </button>

            <button
              onClick={saveUnlocks}
              data-tooltip-id="tooltip"
              data-tooltip-content={"Import unlock data"}
              data-tooltip-place="bottom"
            >
              <CiImport size="25px" />
            </button>

            <button
              onClick={e => copyToClipboard(e, unlockDataRef)}
              data-tooltip-id="tooltip"
              data-tooltip-content={"Copy unlock data to clipboard"}
              data-tooltip-place="bottom"
            >
              <AiOutlineCopy size="25px" />
            </button>
          </div>
        </div>

        <div className="export-settings-item">
          <div className="title">Builds data</div>
          <div className="data">
            <textarea ref={buildsDataRef}></textarea>
          </div>
          <div className="buttons">
            <button
              onClick={saveBuilds}
              data-tooltip-id="tooltip"
              data-tooltip-content={"Import builds data"}
              data-tooltip-place="bottom"
            >
              <CiImport size="25px" />
            </button>

            <button
              onClick={e => copyToClipboard(e, buildsDataRef)}
              data-tooltip-id="tooltip"
              data-tooltip-content={"Copy builds data to clipboard"}
              data-tooltip-place="bottom"
            >
              <AiOutlineCopy size="25px" />
            </button>
          </div>
        </div>
      </div>

      <div className="version">
        {/*<span>Version: {VERSION}</span>*/}
        <span>Last updated: {LAST_UPDATED}</span>
      </div>
    </div>
  );
};

export default SettingsSidebar;
