import React from "react";
import CollectableTableRow from "./CollectableTableRow";

const CollectablesTable = ({ keys, data, unlocks, unlock }) => {
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
          {keys.map(key => (
            <th key={key}>{(key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, "/")}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <CollectableTableRow key={index} index={index} unlock={unlock} unlocks={unlocks} row={row} />
        ))}
      </tbody>
    </table>
  );
};

export default CollectablesTable;
