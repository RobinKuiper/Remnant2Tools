import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DataContext } from "../context/DataContext";
import type { CategoryInformation } from "../interface/CategoryInformation";

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  gap: 20px;
`;

interface Props {
  item: any;
  categoryInformation: CategoryInformation;
}

const TableRow = ({ item, categoryInformation }: Props) => {
  const { unlocks, toggleUnlock } = useContext(DataContext);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const category = categoryInformation.label.replace(" ", "").toLowerCase();
    if (unlocks[category] && unlocks[category][item.id]) {
      setUnlocked(unlocks[category][item.id].unlocked);
    }
  }, [item, unlocks]);

  const handleChange = e => {
    const id = e.target.id,
      category = categoryInformation.label.replace(" ", "").toLowerCase();

    toggleUnlock(category, id);
    setUnlocked(!unlocked);
  };

  const toggleRedacted = e => {
    e.target.classList.toggle("redacted");
  };

  return (
    <tr key={item.id} className={unlocked ? "unlocked" : ""}>
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
      {categoryInformation &&
        categoryInformation.attributes
          .filter(attribute => attribute.tracker)
          .map(attribute => (
            <td key={attribute.label}>
              <span className={attribute.redacted ? "redacted" : ""} onClick={toggleRedacted}>
                <Flex direction="column">
                  <div>
                    <span className={attribute.redacted && !unlocked ? "redacted" : ""}>{item[attribute.label]}</span>
                  </div>
                  {attribute.fields &&
                    attribute.fields.length > 0 &&
                    attribute.fields.map(field => (
                      <div key={field}>
                        <span
                          className={attribute.redacted && !unlocked ? "redacted" : ""}
                          onClick={toggleRedacted}
                          key={field}
                        >
                          {item[field]}
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

export default TableRow;
