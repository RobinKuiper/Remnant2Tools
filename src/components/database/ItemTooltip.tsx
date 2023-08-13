import React from "react";
import { styled } from "styled-components";
import ItemStatistics from "./ItemStatistics";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Tooltip } from "react-tooltip";

const Container = styled.div`
  .head {
    .title {
      text-align: center;

      .general-information {
        display: flex;
        justify-content: center;
        gap: 10px;
        font-size: 0.9em;
      }
    }
  }

  .content {
    display: flex;
  }
`;

const ItemTooltip = ({ id, item, image }) => {
  if (!item) return;

  return (
    <Tooltip className="tooltip" id={id}>
      <Container>
        <div className="head">
          {image && (
            <div className="image">
              <GatsbyImage image={getImage(image)} alt={item.name} title={item.name} placeholder="none" />
            </div>
          )}

          <div className="title">
            <h3>{item.name}</h3>

            <div className="general-information">
              {item.type && <span>{item.type}</span>}
              {item.armorset && <span>{item.armorset}</span>}
              {item.hasMod && <span>{item.mod}</span>}
              {item.weapon && <span>{item.weapon}</span>}
              {item.trait && <span>{typeof item.trait === "string" ? item.trait : item.trait.name}</span>}
              {item.archetype && <span>{item.archetype}</span>}
            </div>
          </div>
        </div>

        <div className="content">
          {item.stats && <ItemStatistics item={item} background="#292929" color="#fff" border="" />}
        </div>
      </Container>
    </Tooltip>
  );
};

export default ItemTooltip;
