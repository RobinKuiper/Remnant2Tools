import "./BuildItemBox.scss";
import type { IGatsbyImageData } from "gatsby-plugin-image";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { findImageById } from "../../helpers";
import type { Build } from "../../interface/Build";
import type { Filter } from "../../interface/IData";
import { getFieldValue } from "../../dataHelpers";
import ItemTooltip from "../database/ItemTooltip";
import { graphql, useStaticQuery } from "gatsby";

interface Props {
  openModal: (filters: Filter[], buildPath: string) => void;
  build: Build;
  images: any[];
  buildPath: string;
  filters: Filter[];
  disabled?: boolean;
}

const BuildItemBox = ({ openModal, build, images, buildPath, filters, disabled = false }: Props) => {
  const [item, setItem] = useState<object | null>(null);
  const [gatsbyImage, setGatsbyImage] = useState<IGatsbyImageData | undefined>();
  const { items } = useStaticQuery(graphql`
    {
      items: allItem(
        filter: {
          category: {
            in: [
              "mutators"
              "armor"
              "rings"
              "amulets"
              "relics"
              "relicfragments"
              "mods"
              "traits"
              "weapons"
              "archetypes"
            ]
          }
        }
      ) {
        nodes {
          externalId
          name
          fragment
          category
          type
          race
          armorset
          stats {
            ...itemStatsFragment
          }
          links {
            ...itemLinksFragment
          }
        }
      }
    }
  `);

  useEffect(() => {
    const itemId = buildPath ? getFieldValue(build, buildPath) : null;

    let newItem = null;
    if (itemId) {
      newItem = items.nodes.find(i => i.externalId === itemId);
      setGatsbyImage(getImage(findImageById(itemId, images, false)));
    }

    setItem(newItem);
  }, [build]);

  const handleClick = () => {
    if (disabled) return;

    openModal(filters, buildPath);
  };

  return (
    <div className={disabled ? "item-box disabled" : "item-box"} onClick={handleClick}>
      {item && (
        <div data-tooltip-id={buildPath}>
          {gatsbyImage ? <GatsbyImage alt={item.name} image={gatsbyImage} /> : <span>{item.name}</span>}
        </div>
      )}
      <ItemTooltip id={buildPath} item={item} />
    </div>
  );
};

export default BuildItemBox;
