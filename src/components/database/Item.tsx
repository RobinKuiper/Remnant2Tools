import "./Item.scss";
import React, { useEffect, useState } from "react";
import { findImageById } from "../../helpers";
import ListItem from "./ListItem";
import GridItem from "./GridItem";
import ItemTooltip from "./ItemTooltip";
import { useAppDispatch, useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import { toggleUnlock } from "../../features/data/dataSlice";
import { googleSaveWithDelay } from "../../features/data/dataActions";

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
  const dispatch = useAppDispatch();
  const { view } = useAppSelector((state: RootState) => state.settings);
  const { unlocks, pending } = useAppSelector((state: RootState) => state.data);
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth);
  const [unlocked, setUnlocked] = useState(unlocks.includes(item.externalId));
  const [level, setLevel] = useState<number>();
  const image = findImageById(item.externalId, images);

  useEffect(() => {
    setUnlocked(unlocks.includes(item.externalId));
  }, [unlocks]);

  const handleChange = e => {
    const id = parseInt(e.target.id);
    dispatch(toggleUnlock(id));
    if (isLoggedIn && !pending) {
      dispatch(googleSaveWithDelay());
    }
  };

  return (
    <div className={`item-container ${view} ${type === "tracker" ? STATE_CLASSES[unlocked] : ""}`}>
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
    </div>
  );
};

export default Item;
