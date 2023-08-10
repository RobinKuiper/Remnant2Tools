import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Redacted from "./Redacted";
import ItemLevel from "./ItemLevel";
import { Flex } from "../../style/global";
import { BsInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { getFieldValue } from "../../dataHelpers";
import {slugify} from "../../helpers";
import {Link} from "gatsby";

interface Props {
  item: any;
  category: any;
  type?: string;
  image?: any;
  unlocked: boolean;
  handleChange: any;
  level: number;
  setLevel: any;
}

const GridItem = (props: Props) => {
  const { item, category, type = "tracker", image, unlocked, handleChange, level, setLevel } = props;

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
        {image && (
          <Link to={`/database/${category.fragment}/${slugify(item.name)}`} title={item.name}>
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
          </Link>
        )}

      <Link to={`/database/${category.fragment}/${slugify(item.name)}`} title={item.name}>
        <h3>{item.name}</h3>
      </Link>

      <Flex justifyContent="center">
        {type === "tracker" && (
          <div className="checkbox-wrapper">
            <label className="checkbox">
              <input
                id={item.externalId}
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
        )}

        {type === "tracker" && category.hasLevels && <ItemLevel level={level} setLevel={setLevel} />}
      </Flex>

      {item.description && <p>{item.description}</p>}

      {category &&
        category[type].fields.map(field => {
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
        })}

      {type === "tracker" && item.unlock && (
        <>
          <div className="unlock-information">
            <button data-tooltip-id={`${item.name}_tooltip`} data-tooltip-content={item.unlock}>
              <BsInfoCircleFill /> Unlock information
            </button>
          </div>
          <Tooltip
            className="tooltip"
            id={`${item.name}_tooltip`}
            style={{
              maxWidth: "200px",
            }}
          />
        </>
      )}
    </Flex>
  );
};

export default GridItem;
