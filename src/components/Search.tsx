import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { styled } from "styled-components";
import {ImCross} from "react-icons/im";

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

interface Props {
  placeholder?: string;
  width?: string | number;
  setQuery: (value: (((prevState: string) => string) | string)) => void;
  query: string;
  disabled?: boolean;
}

const Search = ({ placeholder = "", width, setQuery, query, disabled = false }: Props) => {
  return (
    <Container width={width}>
      <input type="text" placeholder={placeholder} value={query} onChange={e => setQuery(e.target.value)} disabled={disabled} autoFocus />
      <span className="icon">
        {!query ? <AiOutlineSearch size="25px" /> : (
          <button onClick={() => setQuery("")}><ImCross size="15px" /></button>
        )}
      </span>
    </Container>
  );
};

export default Search;
