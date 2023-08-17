import React, {useEffect, useRef, useState} from "react";
import {styled} from "styled-components";
import Toggle from "react-toggle";
import {CiImport} from "react-icons/ci";
import {AiOutlineCopy} from "react-icons/ai";
import {LAST_UPDATED, MAX_GOOGLE_SAVE_TIME} from "../../constants";
import "react-toggle/style.css";
import {Tooltip} from "react-tooltip";
import {FaGoogleDrive} from "react-icons/fa";
import Loader from "../Loader";
import {toast} from "react-toastify";
import {refreshTokens} from "../../helpers";
import {useGoogleLogin} from "@react-oauth/google";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {RootState} from "../../store";
import {userLogin} from '../../features/auth/authActions';
import {logout} from '../../features/auth/authSlice';
import {toggleShowRedacted} from '../../features/settings/settingsSlice';
import {updateBuilds, updateUnlocks} from '../../features/data/dataSlice';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: #292929;
  color: #fff;
  //min-height: 100%;
  padding: 100px 0;
  box-sizing: border-box;
  width: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 75;
  overflow: auto;

  transition:
    width 0.5s ease-in-out,
    padding 0.5s ease-in-out,
    opacity 0.2s ease-in-out 0.3s;

  &.active {
    padding: 100px 20px;
    width: 300px;
  }

  .google-login-setting-item {
    min-width: 260px;
  }

  .layout {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 260px;

    .layout-settings-item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      select {
        padding: 6.5px 5px;
      }

      .toggle.react-toggle--checked .react-toggle-track {
        background: darkred;
      }
    }
  }

  .export {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 260px;

    .export-item {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .title {
        font-weight: 900;
      }

      .data {
        textarea {
          width: 100%;
          min-width: 150px;
          height: 100px;
        }
      }

      .buttons {
        display: flex;
        flex-direction: row;
        justify-content: right;
        gap: 10px;

        button {
          padding: 5px;
          background: darkred;

          transition: all 0.3s ease-in-out;

          svg {
            pointer-events: none;
          }

          &:hover {
            background: #a80505;
          }

          &.success {
            background: darkgreen;
          }
        }
      }
    }
  }

  .version {
    position: absolute;
    bottom: 60px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 0.8em;
    min-width: 260px;
  }

  #google-login-tooltip {
    max-width: 200px;
    z-index: 999999;
    background-color: #000;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
    opacity: 1;
  }
`;
const GDriveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #4285f4;
  cursor: pointer;
  border: none;
  padding: 2px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);

  .google-icon {
    background: #fff;
    padding: 7px;

    &.active {
      svg {
        animation: rotation 2s infinite linear;
      }
    }
  }

  .google-text {
    color: #fff;
    font-size: 1.1em;
    padding: 5px;
  }
`;

const SettingsSidebar = () => {
  const unlockDataRef = useRef<HTMLTextAreaElement>();
  const buildsDataRef = useRef<HTMLTextAreaElement>();
  const [retrievingFromGoogle, setRetrievingFromGoogle] = useState(false);
  const {isLoggedIn, loggingIn} = useAppSelector((state: RootState) => state.auth)
  const { showSidebar, showRedacted } = useAppSelector((state: RootState) => state.settings)
  const { unlocks, builds } = useAppSelector((state: RootState) => state.data)
  const dispatch = useAppDispatch();
  
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      dispatch(userLogin(code))
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
    dispatch(updateUnlocks())
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
      const { body } = await result.json();
      localStorage.setItem("data", body.contents);
      updateUnlocks();
      toast.success("Successfully retrieved data from Google.");
      refreshTokens(body.credentials);
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

  return (
    <Container className={showSidebar && "active"}>
      <h2>Settings</h2>

      <div className="google-login-setting-item" data-tooltip-id="google-login-tooltip" data-tooltip-place="bottom">
        <GDriveButton className="google-drive-button" onClick={handleGoogleLink} disabled={loggingIn}>
          <div className={`google-icon ${loggingIn && "active"}`}>{GoogleIcon}</div>
          <span className="google-text">
            {loggingIn ? "Linking..." : isLoggedIn ? "Unlink from Google" : "Link with Google"}
          </span>
        </GDriveButton>
        <Tooltip id="google-login-tooltip">
          <p>
            Linking to Google will save your data to your Google Drive. Saving happens once each{" "}
            <strong>{MAX_GOOGLE_SAVE_TIME} seconds</strong> if their are changes.
          </p>
          <p>At the moment this only works for unlockable data.</p>
          <p>
            This will run as a test for some time to see how much resources this requires. If the resources are
            manageable I will also implement this for builds.
          </p>
        </Tooltip>
      </div>

      <div className="layout">
        <h3>Data</h3>

        <div className="layout-settings-item">
          <label
            htmlFor="defaultShowRedacted"
            className="title"
            data-tooltip-id="tooltip"
            data-tooltip-content={"Show redacted information by default"}
            data-tooltip-place="bottom"
          >
            Default Show Redacted
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

      <div className="export">
        <h3>Export/Import</h3>

        <div className="export-item">
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

        <div className="export-item">
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
    </Container>
  );
};

export default SettingsSidebar;
