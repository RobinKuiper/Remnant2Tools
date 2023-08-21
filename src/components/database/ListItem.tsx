import "./ListItem.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ItemLevel from "./ItemLevel";
import { Flex } from "../../style/global";
import { Link } from "gatsby";
import ItemFields from "./ItemFields";
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

const ListItem = (props: Props) => {
  const { item, category, type = "tracker", image, unlocked, handleChange, level, setLevel } = props;
  const gatsbyImage = getImage(image);

  return (
    <div className="list-item-container">
      <Flex direction="row" justifycontent="space-between" alignitems="center">
        <Flex alignitems="center">
          <Flex justifycontent="center">
            {type === "tracker" && <Checkbox id={item.externalId} checked={unlocked} handleChange={handleChange} />}

            {type === "tracker" && category.hasLevels && <ItemLevel level={level} setLevel={setLevel} />}
          </Flex>

          {gatsbyImage && (
            <div className="image">
              <Link to={`/database/${category.fragment}/${item.fragment}`} title={item.name} state={{ type }}>
                <GatsbyImage image={gatsbyImage} alt={item.name} title={item.name} placeholder="none" />
              </Link>
            </div>
          )}

          <div className="title">
            <Link to={`/database/${category.fragment}/${item.fragment}`} title={item.name} state={{ type }}>
              <h3>
                <span data-tooltip-id={`${item.fragment}_tooltip`}>{item.name}</span>
              </h3>
            </Link>

            {item.description && <p>{item.description}</p>}
          </div>
        </Flex>

        <Flex alignitems="center" justifycontent="right" gap="40px">
          <ItemFields category={category} item={item} type={type} unlocked={unlocked} />
        </Flex>

        {type === "tracker" && item.unlock && <ItemUnlockInformation item={item} />}
      </Flex>
    </div>
  );
};

export default ListItem;
