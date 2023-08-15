import React, { useContext, useEffect, useState } from "react";
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
  const { view, startSaving, stopSaving } = useContext(SettingContext);
  const { toggleUnlock, unlocks } = useContext(DataContext);
  const [unlocked, setUnlocked] = useState(unlocks.includes(item.externalId));
  const [level, setLevel] = useState<number>();
  const image = findImageById(item.externalId, images);

  useEffect(() => {
    setUnlocked(unlocks.includes(item.externalId));
  }, [unlocks]);

  const handleChange = e => {
    startSaving();
    const id = parseInt(e.target.id);
    toggleUnlock(id);
    stopSaving();
  };

  return (
    <Container className={`${view} ${STATE_CLASSES[unlocked]}`}>
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

      <ItemTooltip id={`${item.fragment}_tooltip`} item={item} image={image} />
    </Container>
  );
};

export default Item;
