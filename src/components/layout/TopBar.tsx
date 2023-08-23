import "./TopBar.scss";
import { Link } from "gatsby";
import React, { useState } from "react";
import { RiSettings3Line } from "react-icons/ri";
import { StaticImage } from "gatsby-plugin-image";
import GlobalSearch from "./GlobalSearch";
import { useAppDispatch, useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import { toggleSidebar } from "../../features/settings/settingsSlice";

const TopBar = () => {
  const [isOpen, setOpen] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const showSidebar = useAppSelector((state: RootState) => state.settings.showSidebar);
  const dispatch = useAppDispatch();

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="topbar-container">
      <div className="content">
        <div>
          <div id="logo">
            <Link to="/">
              <StaticImage src="../../images/logo.webp" alt="Remnant 2 Logo" height={50} />
            </Link>
          </div>
        </div>

        <div className="center">
          <nav>
            <Link to="/database/archetypes" className={url.includes("database") ? "active" : ""}>
              Database
            </Link>
            <Link to="/tracker/archetypes" className={url.includes("tracker") ? "active" : ""}>
              Tracker
            </Link>
            <Link to="/builds" className={url.includes("builds") ? "active" : ""}>
              Builds
            </Link>
          </nav>
        </div>

        <div className="right">
          {/*<SavingIndicator />*/}

          <GlobalSearch />

          <button className={`settings ${showSidebar ? "active" : ""}`} onClick={() => dispatch(toggleSidebar())}>
            <RiSettings3Line size="30px" />
          </button>

          <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleOpen}>
            <span className="hamburger__top-bun" />
            <span className="hamburger__bottom-bun" />
          </div>
        </div>
      </div>

      <div className={`mobile ${isOpen ? "active" : ""}`}>
        <nav>
          <Link to="/database/archetypes">Database</Link>
          <Link to="/tracker/archetypes">Tracker</Link>
          <Link to="/builds">Builds</Link>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
