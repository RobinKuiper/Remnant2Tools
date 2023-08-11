import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { findImageById } from "../../helpers";
import type { Build } from "../../interface/Build";
import { Tooltip } from "react-tooltip";
import { styled } from "styled-components";

const Container = styled.div`
  border: 1px solid #000;
  background: #fff;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  cursor: pointer;

  background: radial-gradient(#fff, #e1e1e1);

  &.disabled {
    cursor: not-allowed;
  }
`;

interface Props {
  openModal: any;
  build: Build;
  images: any;
  type: string;
  category: string;
  subCategory?: string | null;
  index?: number | null;
  disabled?: boolean;
}

const BuildItemBox = ({
  openModal,
  build,
  images,
  type,
  category,
  subCategory = null,
  index = null,
  disabled = false,
}: Props) => {
  const [item, setItem] = useState();

  useEffect(() => {
    const newItem = index !== null ? build[type][index] : build[type];
    setItem(newItem);
  }, [index, type, build]);

  const handleClick = () => {
    if (disabled) return;

    openModal(category, type, index, subCategory);
  };

  return (
    <Container
      className={disabled ? "item-box disabled" : "item-box"}
      onClick={handleClick}
      data-tooltip-id={item?.name}
      data-tooltip-content={item?.name}
    >
      {item && (
        <div>
          {findImageById(item.externalId, images, false) ? (
            <GatsbyImage alt={item.name} image={getImage(findImageById(item.externalId, images, false))} />
          ) : (
            <span>{item.name}</span>
          )}
          <Tooltip id={item.name} />
        </div>
      )}
    </Container>
  );
};

export default BuildItemBox;
