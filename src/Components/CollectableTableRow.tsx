import React from "react";
import { motion } from "framer-motion";

const CollectableTableRow = ({ unlocks, row, unlock, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.tr
      initial={{
        transform: `translateX(${isEven ? "1500px" : "-1500px"})`,
      }}
      whileInView={{
        transform: "translateX(0px)",
      }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
      }}
      className={unlocks[row.name] ? "unlocked" : ""}
    >
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
    </motion.tr>
  );
};

export default CollectableTableRow;
