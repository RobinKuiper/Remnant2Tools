import React from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import styled from "styled-components";

const Search = styled.div`
  text-align: center;
  margin: 10px 0;
  width: 25%;

  input {
    padding: 10px;
    width: 100%;
  }
`;

const CollectablesTopBar = ({ toggleDarkMode, useDark, query, setQuery }) => {
  return (
    <div id="top">
      <div />

      {/*  Search bar */}
      <Search>
        <input type="text" placeholder="Search" value={query} onChange={e => setQuery(e.currentTarget.value)} />
      </Search>

      <span>
        <a href={"#"} onClick={toggleDarkMode}>
          {useDark ? <BsFillMoonStarsFill size={"30px"} /> : <BsSunFill size={"30px"} />}
        </a>
      </span>
    </div>
  );
};

export default CollectablesTopBar;
