import { Link } from "gatsby";
import React, { useState } from "react";
import { styled } from "styled-components";
import { Flex } from "../../style/global";
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
    <Container>
      <Flex direction="row" justifycontent="space-between">
        <div className="left">
          <div id="logo">
            <Link to="/">
              <StaticImage src="../../images/logo.webp" alt="Remnant 2 Logo" height={50} />
            </Link>
          </div>
        </div>

        <div className="center">
          <nav>
            <Flex gap="25px" alignitems="center">
              <Link to="/tracker/statistics" className={url.includes("tracker") ? "active" : ""}>
                Tracker
              </Link>
              <Link to="/database/archetypes" className={url.includes("database") ? "active" : ""}>
                Database
              </Link>
              <Link to="/builds" className={url.includes("builds") ? "active" : ""}>
                Builds
              </Link>
            </Flex>
          </nav>
        </div>

        <div className="right">
          <Flex alignitems="center" justifycontent="right" gap={0}>
            {/*<SavingIndicator />*/}

            <GlobalSearch />

            <button className={`settings ${showSidebar && "active"}`} onClick={() => dispatch(toggleSidebar())}>
              <RiSettings3Line size="30px" />
            </button>

            <Hamburger id="hamburger" className={isOpen ? "open hamburger" : "hamburger"} onClick={toggleOpen}>
              <span className="hamburger__top-bun" />
              <span className="hamburger__bottom-bun" />
            </Hamburger>
          </Flex>
        </div>
      </Flex>

      <MobileNavigation className={isOpen ? "active" : ""}>
        <nav>
          <Flex direction="column" justifycontent="center" alignitems="center" gap="40px">
            <Link to="/database/archetypes">Database</Link>
            <Link to="/tracker/statistics">Tracker</Link>
            <Link to="/builds">Builds</Link>
          </Flex>
        </nav>
      </MobileNavigation>
    </Container>
  );
};

export default TopBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  padding: 10px 10px;
  box-sizing: border-box;
  background: #292929;
  color: #f1f1f1;
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
  z-index: 100;
  width: 100%;
  height: 74px;

  .center {
    nav {
      height: 100%;
      display: flex;

      a {
        position: relative;
        padding-bottom: 5px;
        box-sizing: border-box;

        &:hover,
        &.active {
          font-weight: bold;
        }
      }

      span {
        cursor: not-allowed;
      }

      @media (max-width: 450px) {
        display: none;
      }
    }
  }

  .right {
    display: flex;
    justify-content: right;
    min-width: 300px;

    @media (max-width: 700px) {
      min-width: 0;
    }

    .settings {
      svg {
        transform: rotate(180deg);
        transform-origin: center;
        transition: all 0.5s ease-in-out;
      }

      &.active svg {
        transform: rotate(0deg);
      }
    }
  }
`;

const MobileNavigation = styled.div`
  display: none;
  height: 100vh;
  margin: 0 -20px;
  padding-top: 20px;
  background: #292929;

  transition: all 0.3s ease-in-out;

  &.active {
    display: block;

    a {
      transform: translateX(0);
    }
  }

  a {
    font-size: 1.3em;
    transform: translateX(300px);

    transition: all 0.3s ease-in-out;
  }
`;

const Hamburger = styled.button`
  display: none;

  cursor: pointer;
  width: 48px;
  height: 48px;
  transition: all 0.25s;
  margin-right: 25px;
  position: relative;
  background: transparent;
  border: none;

  &:hover [class*="-bun"] {
    background: #f1f1f1;
  }

  .hamburger__top-bun,
  .hamburger__bottom-bun {
    content: "";
    position: absolute;
    left: 25%;
    width: 24px;
    height: 2px;
    background: #fff;
    transform: rotate(0);
    transition: all 0.5s;
  }

  .hamburger__top-bun {
    transform: translateY(-5px);
  }

  .hamburger__bottom-bun {
    transform: translateY(3px);
  }

  &.open {
    transform: rotate(90deg) translateY(-1px);
  }

  &.open .hamburger__top-bun {
    transform: rotate(45deg) translateY(0px);
  }

  &.open .hamburger__bottom-bun {
    transform: rotate(-45deg) translateY(0px);
  }

  @media (max-width: 450px) {
    display: block;
  }
`;
