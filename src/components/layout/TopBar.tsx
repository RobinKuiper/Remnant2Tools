import { Link } from "gatsby";
import React from "react";
import { styled } from "styled-components";
import Search from "../Search";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  box-sizing: border-box;
  background: #292929;
  color: #f1f1f1;
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
  z-index: 20;
  position: fixed;
  width: 100%;

  nav {
    display: flex;
    gap: 25px;
    align-items: center;

    a {
      &:hover {
        //background: #000;
      }
    }

    span {
      cursor: not-allowed;
    }
  }

  #right {
    display: flex;
    align-items: center;
  }
`;

const TopBar = () => {
  return (
    <Container>
      <div id="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Remnant" height={50} />
        </Link>
      </div>

      <nav>
        <Link to="/database/archetypes">Database</Link>
        <Link to="/tracker/archetypes">Unlockables Tracker</Link>
        <Link to="/builds">Builds</Link>
      </nav>

      <div id="right">
        {/*<button onClick={toggleDarkMode}>*/}
        {/*    {darkMode ? (*/}
        {/*        <MdLightMode size="25px"  />*/}
        {/*    ) : (*/}
        {/*        <MdDarkMode size="25px" />*/}
        {/*    )}*/}
        {/*</button>*/}

        <Search placeholder="Search" disabled={true} />
      </div>
    </Container>
  );
};

export default TopBar;
