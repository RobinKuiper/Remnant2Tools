import React from "react";
import { BiSolidSortAlt } from "react-icons/bi";
import CollectableTableRow from "./CollectableTableRow";

const CollectablesTable = ({ keys, data, sort }) => {
  return (
    <table cellSpacing="0" cellPadding="0">
      <col style={{ width: "10px" }} />
      <col style={{ width: "40px" }} />
      <col style={{ width: "200px" }} />
      <col style={{ width: "50%" }} />
      <thead>
        <tr>
          <th />
          <th>{/*<input type="checkbox" />*/}</th>
          {keys.map(key => {
            if (key === "id") {
              return "";
            }

            return (
              <th key={key}>
                {(key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, "/")}
                {key === "name" && (
                  <a href={"#"} onClick={sort}>
                    <BiSolidSortAlt />
                  </a>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <CollectableTableRow key={index} index={index} row={row} />
        ))}
      </tbody>
    </table>
  );
};

export default CollectablesTable;
