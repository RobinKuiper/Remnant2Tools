import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { DataContext } from "../../context/DataContext";
import { findImageById } from "../../helpers";
import ListItem from "./ListItem";
import GridItem from "./GridItem";
import { SettingContext } from "../../context/SettingContext";
import ItemTooltip from "./ItemTooltip";

const Container = styled.div`
  position: relative;
  width: 200px;
  text-align: center;
  background: #fff;
  box-sizing: border-box;
  padding: 5px 10px 25px 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

  transition: background 0.3s ease-in-out;

  .field-title {
    font-weight: bold;
  }

  .unlock-information {
    position: absolute;
    bottom: 2px;
    left: 2px;
    right: auto;

    button {
      color: #292929;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: #963838;
      }
    }
  }

  &.list {
    width: 100%;

    .unlock-information {
      right: 2px;
      left: auto;
    }
  }

  &.unlocked {
    background: #fff;

    .checkbox-wrapper {
      --c-primary: green;
    }
  }

  &.locked {
    background: #e0e0e0;
  }

  @media (max-width: 550px) {
    width: 100%;
  }
`;
const STATE_CLASSES = {
  true: "unlocked",
  false: "locked",
};

interface Props {
  item: any;
  category: any;
  images: any;
  type?: string;
}

const Item = ({ item, category, images, type }: Props) => {
  const { view } = useContext(SettingContext);
  const ref = useRef();
  const { unlocks, toggleUnlock, updateLevel } = useContext(DataContext);
  const [unlocked, setUnlocked] = useState(false);
  const [level, setLevel] = useState<number>();
  const [image, setImage] = useState<any | null>(null);

  useEffect(() => {
    setImage(findImageById(item.externalId, images));
  }, []);

  useEffect(() => {
    if (type !== "tracker") {
      setUnlocked(true);
      return;
    }

    const categoryFragment = category.fragment;
    if (unlocks[categoryFragment] && unlocks[categoryFragment][item.externalId]) {
      setUnlocked(unlocks[categoryFragment][item.externalId].unlocked);
      if (unlocks[categoryFragment][item.externalId].level) {
        setLevel(unlocks[categoryFragment][item.externalId].level);
      }
    }
  }, [item, unlocks, type]);

  const handleChange = e => {
    const id = parseInt(e.target.id);

    if (ref.current) {
      ref.current.classList.toggle("unlocked");
      ref.current.classList.toggle("locked");
    }

    toggleUnlock(category.fragment, id);
  };

  useEffect(() => {
    if (level) {
      updateLevel(category.fragment, item.externalId, level);
    }
  }, [level]);

  return (
    <Container ref={ref} className={`${view} ${STATE_CLASSES[unlocked]}`}>
      {view === "list" ? (
        <ListItem
          item={item}
          category={category}
          unlocked={unlocked}
          handleChange={handleChange}
          level={level ?? 0}
          setLevel={setLevel}
          image={image}
          type={type ?? "tracker"}
        />
      ) : (
        <GridItem
          item={item}
          category={category}
          unlocked={unlocked}
          handleChange={handleChange}
          level={level ?? 0}
          setLevel={setLevel}
          image={image}
          type={type ?? "tracker"}
        />
      )}

      <ItemTooltip id={`${item.name}_tooltip`} item={item} image={image} />
    </Container>
  );
};

export default Item;
