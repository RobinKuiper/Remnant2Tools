import type {IGatsbyImageData} from "gatsby-plugin-image";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import React, {useEffect, useState} from "react";
import {findImageById} from "../../helpers";
import type {Build} from "../../interface/Build";
import {styled} from "styled-components";
import type {Filter} from "../../interface/IData";
import {getFieldValue} from "../../dataHelpers";
import ItemTooltip from "../database/ItemTooltip";
import {graphql, useStaticQuery} from "gatsby";

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
    <Container className={disabled ? "item-box disabled" : "item-box"} onClick={handleClick}>
      {item && (
        <div data-tooltip-id={buildPath}>
          {gatsbyImage ? <GatsbyImage alt={item.name} image={gatsbyImage} /> : <span>{item.name}</span>}
        </div>
      )}
      <ItemTooltip id={buildPath} item={item} />
    </Container>
  );
};

export default BuildItemBox;

const Container = styled.div`
  border: 1px solid #000;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  cursor: pointer;

  background: radial-gradient(#e5e5e5, #b9b9b9);

  &.disabled {
    cursor: not-allowed;
  }
`;
