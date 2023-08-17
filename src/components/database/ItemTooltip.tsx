import React from "react";
import { styled } from "styled-components";
import ItemStatistics from "./ItemStatistics";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Tooltip } from "react-tooltip";

const Container = styled.div`
  .head {
    .general-information {
      .title {
        display: flex;
        justify-content: center;
      }

      .tags {
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

          <div className="general-information">
            <div className="title">
              <h3>{item.name}</h3>
            </div>

            <div className="tags">
              {item.type && <span>{item.type}</span>}
              {item.armorset && <span>{item.armorset}</span>}
              {item.links?.mod && <span>{item.links.mod.name}</span>}
              {item.links?.weapon && <span>{item.links.weapon.name}</span>}
              {/*{item.links?.trait && (*/}
              {/*  <span>{typeof item.links.trait === "object" ? item.trait.name : item.trait.name}</span>*/}
              {/*)}*/}
              {item.links?.archetype && <span>{item.links.archetype.name}</span>}
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
