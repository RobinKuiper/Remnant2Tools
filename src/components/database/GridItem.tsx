import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import ItemLevel from "./ItemLevel";
import { Flex } from "../../style/global";
import { slugify } from "../../helpers";
import { Link } from "gatsby";
import ItemUnlockInformation from "./ItemUnlockInformation";
import Checkbox from "../Checkbox";

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
  const gatsbyImage = getImage(image);

  return (
    <Flex direction="column" justifycontent="center" alignitems="center">
      {gatsbyImage && (
        <Link to={`/database/${category.fragment}/${slugify(item.name)}`} title={item.name} state={{ type }}>
          <GatsbyImage image={gatsbyImage} alt={item.name} title={item.name} placeholder="none" />
        </Link>
      )}

      <Link to={`/database/${category.fragment}/${slugify(item.name)}`} title={item.name} state={{ type }}>
        <h3>
          <span data-tooltip-id={`${item.fragment}_tooltip`}>{item.name}</span>
        </h3>
      </Link>

      <Flex justifycontent="center">
        {type === "tracker" && <Checkbox id={item.externalId} checked={unlocked} handleChange={handleChange} />}

        {type === "tracker" && category.hasLevels && <ItemLevel level={level} setLevel={setLevel} />}
      </Flex>

      {item.description && <p>{item.description}</p>}

      {type === "tracker" && item.unlock && <ItemUnlockInformation item={item} />}
    </Flex>
  );
};

export default GridItem;
