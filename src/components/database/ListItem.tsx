import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Redacted from "./Redacted";
import ItemLevel from "./ItemLevel";
import { Flex } from "../../style/global";
import { BsInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { styled } from "styled-components";
import { getFieldValue } from "../../dataHelpers";
import {Link} from "gatsby";
import {slugify} from "../../helpers";

const Container = styled.div`
  .title {
    text-align: left;
  }

  .field {
    text-align: right;
  }

  .image {
    flex-basis: 100px;
    flex-grow: 0;
    flex-shrink: 0;
  }
`;

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

const ListItem = (props: Props) => {
  const { item, category, type = "tracker", image, unlocked, handleChange, level, setLevel } = props;

  return (
    <Container>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
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

          {image && (
              <div className="image">
                <Link to={`/database/${category.fragment}/${slugify(item.name)}`} title={item.name}>
                <GatsbyImage image={getImage(image)} alt={item.name} title={item.name} placeholder="none" />
                </Link>
              </div>
          )}

          <div className="title">
            <Link to={`/database/${category.fragment}/${slugify(item.name)}`} title={item.name}>
              <h3>{item.name}</h3>
            </Link>

            {item.description && <p>{item.description}</p>}
          </div>
        </Flex>

        <Flex alignItems="center" justifyContent="right" gap="40px">
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
        </Flex>

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
    </Container>
  );
};

export default ListItem;
