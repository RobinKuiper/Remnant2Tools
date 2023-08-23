import React from "react";
import { getFieldValue } from "../../dataHelpers";
import Redacted from "./Redacted";

const ItemFields = ({ category, type, item, unlocked }) => {
  if (category && category[type] && category[type].fields) {
    return category[type].fields.map(field => {
      const value = getFieldValue(item, field.fragment);

      if (!value) {
        return "";
      }

      return (
        <div className="item-fields-container" key={field.fragment}>
          <div className="row">
            <div className="column">
              <div className="field-title">{field.label}</div>
              <div>
                {field.redacted && !unlocked ? <Redacted value={value} defaultShow={unlocked} bgColor={"c7"} /> : value}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
};

export default ItemFields;
