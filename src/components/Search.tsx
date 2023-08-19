import type { MutableRefObject } from "react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { styled } from "styled-components";
import { ImCross } from "react-icons/im";
import { isMobile } from "../helpers";

interface Props {
  placeholder?: string;
  width?: string | number;
  setQuery: (value: ((prevState: string) => string) | string) => void;
  query: string;
  tooltip?: string;
  disabled?: boolean;
  ref?: MutableRefObject<HTMLInputElement | undefined>;
}

const Search = ({ placeholder = "", width, setQuery, query, disabled = false, ref, tooltip = "" }: Props) => {
  return (
    <Container width={width} data-tooltip-id="tooltip" data-tooltip-content={tooltip}>
      <input
        ref={ref}
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
    </Container>
  );
};

export default Search;

const Container = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: ${({ width }) => `${width || "185px"}`};

  input {
    width: ${({ width }) => `${width || "185px"}`};
    padding: 6.5px;
  }

  .icon {
    position: absolute;
    right: 3px;
    color: #000;

    transition: all 0.3s ease-in-out;
  }

  &:hover {
    .icon {
      color: #565656;
    }
  }

  &:has(input:focus) {
    .icon {
      color: #565656;
      //display: none;
    }
  }

  input:focus {
    //background: black;
    outline: none;
  }
`;
