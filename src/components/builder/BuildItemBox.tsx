import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { findImageById } from "../../helpers";
import type { Build } from "../../interface/Build";
import { styled } from "styled-components";
import type { Filter } from "../../interface/IData";
import { getFieldValue } from "../../dataHelpers";
import ItemTooltip from "../database/ItemTooltip";

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

  useEffect(() => {
    const newItem = buildPath ? getFieldValue(build, buildPath) : null;
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
          {findImageById(item.externalId, images, false) ? (
            <GatsbyImage alt={item.name} image={getImage(findImageById(item.externalId, images, false))} />
          ) : (
            <span>{item.name}</span>
          )}
        </div>
      )}
      <ItemTooltip id={buildPath} item={item} />
    </Container>
  );
};

export default BuildItemBox;
