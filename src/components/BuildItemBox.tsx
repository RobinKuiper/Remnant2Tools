import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { findImage } from "../helpers";
import type { Build } from "../interface/Build";
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
  const item = index !== null ? build[type][index] : build[type],
    name = item?.name;

  const handleClick = () => {
    if (disabled) return;

    openModal(category, type, index, subCategory);
  };

  return (
    <Container
      className={disabled ? "item-box disabled" : "item-box"}
      onClick={handleClick}
      data-tooltip-id={name}
      data-tooltip-content={name}
    >
      {findImage(name ?? "", images) ? (
        <GatsbyImage alt={name ?? ""} image={getImage(findImage(name ?? "", images))} />
      ) : (
        <span>{name}</span>
      )}
      <Tooltip id={name} />
    </Container>
  );
};

export default BuildItemBox;
