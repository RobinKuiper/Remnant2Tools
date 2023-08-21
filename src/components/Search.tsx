import "./Search.scss";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { isMobile } from "../helpers";

interface Props {
  placeholder?: string;
  width?: string | number;
  setQuery: (value: ((prevState: string) => string) | string) => void;
  query: string;
  tooltip?: string;
  disabled?: boolean;
}

const Search = ({ placeholder = "", width, setQuery, query, disabled = false, tooltip = "" }: Props) => {
  return (
    <div className="search-container" width={width} data-tooltip-id="tooltip" data-tooltip-content={tooltip}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
        disabled={disabled}
        autoFocus={!isMobile()}
      />
      <span className="icon">
        {!query ? (
          <AiOutlineSearch size="25px" />
        ) : (
          <button onClick={() => setQuery("")}>
            <ImCross size="15px" />
          </button>
        )}
      </span>
    </div>
  );
};

export default Search;
