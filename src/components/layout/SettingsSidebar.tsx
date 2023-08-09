import React, { useContext, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { SettingContext } from "../../context/SettingContext";
import { CiImport } from "react-icons/ci";
import { AiOutlineCopy } from "react-icons/ai";
import { DataContext } from "../../context/DataContext";
import { BuildsContext } from "../../context/BuildContext";
import {LAST_UPDATED, VERSION} from "../../constants";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: #292929;
  color: #fff;
  //min-height: 100%;
  padding: 100px 20px;
  box-sizing: border-box;
  width: 0;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 75;
  overflow: auto;

  transition:
    width 0.5s ease-in-out,
    opacity 0.2s ease-in-out 0.3s;

  &.active {
    width: 300px;
    opacity: 1;
  }

  .layout {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .layout-settings-item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      select {
        padding: 6.5px 5px;
      }
    }
  }

  .export {
    display: flex;
    flex-direction: column;
    gap: 20px;

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
  }
`;

const SettingsSidebar = () => {
  const { showSettings, changeDefaultView, defaultView } = useContext(SettingContext);
  const { updateUnlocks } = useContext(DataContext);
  const { updateBuilds } = useContext(BuildsContext);
  const unlockDataRef = useRef<HTMLTextAreaElement>();
  const buildsDataRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (!unlockDataRef.current || !buildsDataRef.current) {
      return;
    }

    const storedBuildData = localStorage.getItem("builds");
    if (storedBuildData) {
      buildsDataRef.current.value = storedBuildData;
    }

    const storedUnlockData = localStorage.getItem("data");
    if (storedUnlockData) {
      unlockDataRef.current.value = storedUnlockData;
    }
  }, [unlockDataRef, buildsDataRef]);

  const copyToClipboard = (e, ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      if (!navigator.clipboard) {
        ref.current.select();
        document.execCommand("copy");
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

  return (
    <Container className={showSettings && "active"}>
      <h2>Settings</h2>

      <div className="layout">
        <h3>Layout</h3>

        <div className="layout-settings-item">
          <span className="title">Default View</span>
          <select onChange={e => changeDefaultView(e.target.value)}>
            <option value="list" selected={defaultView === "list"}>
              List
            </option>
            <option value="grid" selected={defaultView === "grid"}>
              Grid
            </option>
          </select>
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
            <button onClick={saveUnlocks}>
              <CiImport size="25px" />
            </button>

            <button onClick={e => copyToClipboard(e, unlockDataRef)}>
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
            <button onClick={saveBuilds}>
              <CiImport size="25px" />
            </button>

            <button onClick={e => copyToClipboard(e, buildsDataRef)}>
              <AiOutlineCopy size="25px" />
            </button>
          </div>
        </div>
      </div>

      <div className="version">
        <span>Version: {VERSION}</span>
        <span>Last updated: {LAST_UPDATED}</span>
      </div>
    </Container>
  );
};

export default SettingsSidebar;
