import "./ItemStat.scss";
import React from "react";
import { camelCaseToText } from "../../helpers";

interface Props {
  valueKey: string;
  value: string | object;
}

const ItemStat = ({ valueKey: key, value }: Props) => {
  if (typeof value !== "object") {
    return (
      <div className="item-stat-container">
        <span className="key">{camelCaseToText(key)}</span>
        <span className="value">{value}</span>
      </div>
    );
  }

  return (
    <div className="item-stat-container">
      <span className="key">
        <div className="main-key">{camelCaseToText(key)}</div>

        <div className="sub keys">
          {Object.keys(value).map(key => (
            <div key={key} className="key">
              {camelCaseToText(key)}
            </div>
          ))}
        </div>
      </span>

      <span className="value">
        <div className="main-value">&nbsp;</div>

        <div className="sub values">
          {Object.values(value).map(value => (
            <div key={value} className="key">
              {value}
            </div>
          ))}
        </div>
      </span>
    </div>
  );
};

export default ItemStat;
