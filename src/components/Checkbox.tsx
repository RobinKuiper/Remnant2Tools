import React from "react";

interface Props {
  id: string;
  checked: boolean;
  handleChange: () => void;
}

const Checkbox = ({ id, checked, handleChange }: Props) => {
  return (
    <div className="checkbox-wrapper">
      <label className="checkbox">
        <input
          id={id}
          className="checkbox__trigger visuallyhidden"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="checkbox__symbol">
          <svg
            aria-hidden="true"
            className="icon-checkbox"
            width="28px"
            height="28px"
            viewBox="0 0 28 28"
            version="1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 14l8 7L24 7"></path>
          </svg>
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
