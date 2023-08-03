import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { findImage } from "../helpers";
import type { Build } from "../interface/Build";
import { Tooltip } from "react-tooltip";

interface Props {
  openModal: any;
  build: Build;
  images: any;
  type: string;
  category: string;
  subCategory?: string | null;
  index?: number | null;
}

const BuildItemBox = ({ openModal, build, images, type, category, subCategory = null, index = null }: Props) => {
  const item = index !== null ? build[type][index] : build[type],
    name = item?.name;

  return (
    <div
      className="item-box"
      onClick={() => openModal(category, type, index, subCategory)}
      data-tooltip-id={name}
      data-tooltip-content={name}
    >
      {findImage(name ?? "", images) ? (
        <GatsbyImage alt={name ?? ""} image={getImage(findImage(name ?? "", images))} />
      ) : (
        <span>{name}</span>
      )}
      <Tooltip id={name} />
    </div>
  );
};

export default BuildItemBox;
