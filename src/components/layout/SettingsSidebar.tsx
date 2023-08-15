import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Toggle from "react-toggle";
import { SettingContext } from "../../context/SettingContext";
import { CiImport } from "react-icons/ci";
import { AiOutlineCopy } from "react-icons/ai";
import { DataContext } from "../../context/DataContext";
import { BuildsContext } from "../../context/BuildContext";
import { LAST_UPDATED } from "../../constants";
import "react-toggle/style.css";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogleDrive } from "react-icons/fa";
import Loader from "../Loader";
import { toast } from "react-toastify";

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
`;
const GDriveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  .google-drive-text {
    font-weight: bold;
  }
`;

const SettingsSidebar = () => {
  const { showSettings, defaultShowRedacted, toggleDefaultShowRedacted } = useContext(SettingContext);
  const { isLoggedIn, loggingIn, login, logout } = useContext(AuthContext);
  const { updateUnlocks, unlocks } = useContext(DataContext);
  const { updateBuilds, builds } = useContext(BuildsContext);
  const unlockDataRef = useRef<HTMLTextAreaElement>();
  const buildsDataRef = useRef<HTMLTextAreaElement>();
  const [retrievingFromGoogle, setRetrievingFromGoogle] = useState(false);

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

    buildsDataRef.current.value = JSON.stringify(builds);
  }, [builds])

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
    updateUnlocks();
  };

  const saveBuilds = e => {
    e.target.classList.add("success");
    localStorage.setItem("builds", buildsDataRef.current.value);
    updateBuilds();
  };

  const handleGoogleLink = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login();
    }
  };

  const retrieveFromGoogleDrive = async () => {
    if (!isLoggedIn || retrievingFromGoogle) {
      return;
    }

    setRetrievingFromGoogle(true);

    const tokens = JSON.parse(localStorage.getItem("google_oauth"));

    const result = await fetch("http://localhost:3000/api/data/google/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokens,
      }),
    });

    setRetrievingFromGoogle(false);
    const { body } = await result.json();
    localStorage.setItem("data", body.contents);
    updateUnlocks();
    toast.success("Successfully retrieved data from Google.");
  };

  return (
    <Container className={showSettings && "active"}>
      <h2>Settings</h2>

      <div className="layout">
        <h3>Data</h3>

        <div className="layout-settings-item">
          <label
            className="title"
            data-tooltip-id="tooltip"
            data-tooltip-content={"PLACEHOLDER"}
            data-tooltip-place="bottom"
          >
            Link Google Drive
          </label>
          <div data-tooltip-id="tooltip" data-tooltip-content={"PLACEHOLDER"} data-tooltip-place="bottom">
            <GDriveButton className="google-drive-button" onClick={handleGoogleLink} disabled={loggingIn}>
              {loggingIn ? <Loader size="25px" color="#fff" /> : <FaGoogleDrive size="25px" />}
              <span className="google-drive-text">{isLoggedIn ? "Unlink" : "Link"}</span>
            </GDriveButton>
          </div>
        </div>
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
          {/*<input type="checkbox" checked={defaultShowRedacted} onChange={toggleDefaultShowRedacted} />*/}
          <div
            data-tooltip-id="tooltip"
            data-tooltip-content={"Show redacted information by default"}
            data-tooltip-place="bottom"
          >
            <Toggle
              id="defaultShowRedacted"
              className="toggle"
              defaultChecked={defaultShowRedacted}
              onChange={toggleDefaultShowRedacted}
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

      <Tooltip id="tooltip" />
    </Container>
  );
};

export default SettingsSidebar;
