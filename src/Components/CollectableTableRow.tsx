import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DataContext } from "../contexts/DataContext";

const CollectableTableRow = ({ row, index }) => {
  const { category, userData, setUserData } = useContext(DataContext);
  const [unlocked, setUnlocked] = useState(false);

  const unlock = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const id = event.currentTarget.id;

    if (!userData[category]) {
      userData[category] = {};
    }

    if (userData[category][id]) {
      userData[category][id] = {
        unlocked: !userData[category][id].unlocked,
      };
    } else {
      userData[category][id] = {
        unlocked: true,
      };
    }

    setUserData(userData);
    setUnlocked(userData[category][id].unlocked);
    localStorage.setItem("data", JSON.stringify(userData));
  };

  useEffect(() => {
    setUnlocked((userData[category] && userData[category][row.id] && userData[category][row.id].unlocked) || false);
  }, [userData]);

  const isEven = index % 2 === 0;
  return (
    <motion.tr
      initial={
        {
          // transform: `translateX(${isEven ? "1500px" : "-1500px"})`,
          // transform: "translateY(1500px)",
        }
      }
      whileInView={{
        transform: "translateX(0px)",
      }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
      }}
      className={unlocked ? "unlocked" : ""}
    >
      <td />
      <td>
        {/*<input id={row.name} type="checkbox" checked={unlocks[row.name]} onChange={unlock} />*/}
        <div className="checkbox-wrapper-33">
          <label className="checkbox">
            <input
              id={row.id}
              className="checkbox__trigger visuallyhidden"
              type="checkbox"
              checked={unlocked}
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
        if (key === "id") {
          return "";
        }

        return (
          <td key={value + index}>
            {key === "name" || key === "description" || key === "values" || key === "mod" ? (
              <span>{value as string}</span>
            ) : (
              <span className={unlocked ? "" : "redacted"} onClick={e => e.currentTarget.classList.remove("redacted")}>
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
