import React, { useContext } from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import styled from "styled-components";
import { DataContext } from "../contexts/DataContext";

const Search = styled.div`
  text-align: center;
  margin: 10px 0;
  width: 25%;

  input {
    padding: 10px;
    width: 100%;
  }
`;

const CollectablesTopBar = ({ query, setQuery }) => {
  const { darkMode, toggleDarkMode } = useContext(DataContext);

  return (
    <div id="top">
      <div />

      {/*  Search bar */}
      <Search>
        <input type="text" placeholder="Search" value={query} onChange={e => setQuery(e.currentTarget.value)} />
      </Search>

      <span>
        <a href={"#"} onClick={toggleDarkMode}>
          {!darkMode ? <BsFillMoonStarsFill size={"30px"} /> : <BsSunFill size={"30px"} />}
        </a>
      </span>
    </div>
  );
};

export default CollectablesTopBar;
