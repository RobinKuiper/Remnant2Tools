import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { styled } from "styled-components";

const Container = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: ${({ width }) => `${width || 185}px`};

  input {
    width: ${({ width }) => `${width || 185}px`};
    padding: 6.5px;
  }

  .icon {
    position: absolute;
    right: 0;
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
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Search = ({ placeholder = "", width, onChange, disabled = false }: Props) => {
  return (
    <Container width={width}>
      <input type="text" placeholder={placeholder} onChange={onChange} disabled={disabled} />
      <span className="icon">
        <AiOutlineSearch size="25px" />
      </span>
    </Container>
  );
};

export default Search;
