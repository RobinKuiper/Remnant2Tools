import React from "react";

const CollectableTableRow = ({ unlocks, row, unlock }) => {
  return (
    <tr className={unlocks[row.name] ? "unlocked" : ""}>
      <td />
      <td>
        {/*<input id={row.name} type="checkbox" checked={unlocks[row.name]} onChange={unlock} />*/}
        <div className="checkbox-wrapper-33">
          <label className="checkbox">
            <input
              id={row.name}
              className="checkbox__trigger visuallyhidden"
              type="checkbox"
              checked={unlocks[row.name]}
              onChange={unlock}
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
      </td>
      {Object.entries(row).map(([key, value], index) => {
        return (
          <td key={value + index}>
            {key === "name" || key === "description" || key === "values" || key === "mod" ? (
              <span>{value as string}</span>
            ) : (
              <span
                className={unlocks[row.name] ? "" : "redacted"}
                onClick={e => e.currentTarget.classList.remove("redacted")}
              >
                {value as string}
              </span>
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default CollectableTableRow;
