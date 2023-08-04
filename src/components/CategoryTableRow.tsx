import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DataContext } from "../context/DataContext";

// TODO: refactor with TableRow

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  gap: 20px;
`;

interface Props {
  item: any;
  category: any;
  type?: string;
}

const CategoryTableRow = ({ item, category, type = "tracker" }: Props) => {
  const { unlocks, toggleUnlock } = useContext(DataContext);
  const [unlocked, setUnlocked] = useState(false);
  const [colSpan, setColspan] = useState(3);

  useEffect(() => {
    if (type !== "tracker") {
      setUnlocked(false);
      return;
    }

    const categoryFragment = category.settings.fragment;
    if (unlocks[categoryFragment] && unlocks[categoryFragment][item.id]) {
      setUnlocked(unlocks[categoryFragment][item.id].unlocked);
    }
  }, [item, unlocks, type]);

  const handleChange = e => {
    const id = e.target.id;

    toggleUnlock(category.settings.fragment, id);
  };

  const toggleRedacted = e => {
    e.target.classList.toggle("redacted");
  };

  useEffect(() => {
    let newColspan;

    if (category.settings.categoryHasValues) {
      newColspan = 1;
    } else {
      const cells = category.settings[type].fields.length;
      let extras = 2;

      if (category.settings.hasLevels) {
        extras++;
      }

      if (category.settings.categoryIsCheckable) {
        extras--;
      }

      newColspan = cells + extras;
    }
    setColspan(newColspan);

    // category.settings.categoryHasValues
    //   ? 1
    //   : category.settings[type].fields.length + (type === "tracker") ? 2 : 1
  }, [item, category]);

  return (
    <tr key={item.id} className={unlocked ? "unlocked" : ""}>
      {type === "tracker" && category.settings.categoryIsCheckable && (
        <td>
          <div className="checkbox-wrapper">
            <label className="checkbox">
              <input
                id={item.id}
                className="checkbox__trigger visuallyhidden"
                type="checkbox"
                checked={unlocked}
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
        </td>
      )}
      {category.settings.categoryHasValues && <td />}
      <td className="category" colSpan={colSpan}>
        {item.label}
      </td>
      {category.settings.categoryHasValues &&
        category.settings[type].fields
          .filter(field => field.fragment !== "name")
          .map(field => (
            <td key={field.label}>
              <span>
                <Flex direction="column">
                  <div>
                    <span className={field.redacted && !unlocked ? "redacted" : ""} onClick={toggleRedacted}>
                      {item[field.fragment]}
                    </span>
                  </div>
                  {field.extraFields &&
                    field.extraFields.length > 0 &&
                    field.extraFields.map(extraField => (
                      <div key={extraField.fragment}>
                        <span className={extraField.redacted && !unlocked ? "redacted" : ""} onClick={toggleRedacted}>
                          {item[extraField.fragment]}
                        </span>
                      </div>
                    ))}
                </Flex>
              </span>
            </td>
          ))}
    </tr>
  );
};

export default CategoryTableRow;
