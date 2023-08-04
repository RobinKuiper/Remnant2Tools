import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DataContext } from "../context/DataContext";
import { slugify } from "../helpers";
import Redacted from "./Redacted";
import ItemLevel from "./ItemLevel";

// TODO: refactor with CategoryTableRow

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  gap: 20px;
`;

interface Props {
  item: any;
  category: any;
  type?: string;
  images: any;
}

const TableRow = ({ item, category, type = "tracker", images }: Props) => {
  const { unlocks, toggleUnlock, updateLevel } = useContext(DataContext);
  const [unlocked, setUnlocked] = useState(false);
  const [level, setLevel] = useState<number>();
  const [image, setImage] = useState<any | null>(null);

  useEffect(() => {
    const filtered =
      images &&
      Object.values(images).filter(
        i => i.name === slugify(item.name) && i.relativePath.includes(category.settings.fragment),
      );
    if (filtered && filtered.length > 0) {
      setImage(filtered[0]);
    }
  }, []);

  useEffect(() => {
    if (type !== "tracker") {
      setUnlocked(false);
      return;
    }

    const categoryFragment = category.settings.fragment;
    if (unlocks[categoryFragment] && unlocks[categoryFragment][item.id]) {
      setUnlocked(unlocks[categoryFragment][item.id].unlocked);
      if (unlocks[categoryFragment][item.id].level) {
        setLevel(unlocks[categoryFragment][item.id].level);
      }
    }
  }, [item, unlocks, type]);

  const handleChange = e => {
    const id = parseInt(e.target.id);

    toggleUnlock(category.settings.fragment, id);
  };

  useEffect(() => {
    if (level) {
      updateLevel(category.settings.fragment, item.id, level);
    }
  }, [level]);

  return (
    <tr key={item.id} className={unlocked ? "unlocked" : ""}>
      {type === "tracker" && (
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

      {type === "tracker" && category.settings.hasLevels && (
        <td>
          <ItemLevel level={level} setLevel={setLevel} />
        </td>
      )}
      <td>
        {image && (
          <GatsbyImage
            image={getImage(image)}
            alt={item.name}
            title={item.name}
            placeholder="none"
            style={
              image.childImageSharp.gatsbyImageData.height > image.childImageSharp.gatsbyImageData.width
                ? { height: "100px" }
                : { width: "100px" }
            }
          />
        )}
      </td>
      {category.settings &&
        category.settings[type].fields.map(field => (
          <td key={field.fragment}>
            <span>
              <Flex direction="row">
                <Flex direction="column">
                  <div>
                    {field.redacted && !unlocked ? (
                      <Redacted value={item[field.fragment]} defaultShow={unlocked} bgColor={"#c7c7c7"} />
                    ) : (
                      item[field.fragment]
                    )}
                  </div>
                  {field.extraFields &&
                    field.extraFields.length > 0 &&
                    field.extraFields.map(extraField => (
                      <div key={extraField.fragment}>
                        {extraField.redacted && !unlocked ? (
                          <Redacted value={item[extraField.fragment]} defaultShow={unlocked} bgColor={"#c7c7c7"} />
                        ) : (
                          item[extraField.fragment]
                        )}
                      </div>
                    ))}
                </Flex>
              </Flex>
            </span>
          </td>
        ))}
    </tr>
  );
};

export default TableRow;
