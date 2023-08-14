import React from "react";
import { getFieldValue } from "../../dataHelpers";
import { Flex } from "../../style/global";
import Redacted from "./Redacted";

const ItemFields = ({ category, type, item, unlocked }) => {
  if (category && category[type] && category[type].fields) {
    return category[type].fields.map(field => {
      const value = getFieldValue(item, field.fragment);

      if (!value) {
        return "";
      }

      return (
        <div key={field.fragment}>
          <Flex direction="row">
            <Flex direction="column">
              <div className="field-title">{field.label}</div>
              <div>
                {field.redacted && !unlocked ? (
                  <Redacted value={value} defaultShow={unlocked} bgColor={"#c7c7c7"} />
                ) : (
                  value
                )}
              </div>
            </Flex>
          </Flex>
        </div>
      );
    });
  }
};

export default ItemFields;
