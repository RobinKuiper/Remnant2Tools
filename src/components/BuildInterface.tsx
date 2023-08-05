import React, { useContext, useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import BuildItemBox from "./BuildItemBox";
import { styled } from "styled-components";
import { DataContext } from "../context/DataContext";
import { BuildsContext } from "../context/BuildContext";
import { getAllItems, getUnlockedItems } from "../dataHelpers";
import { slugify } from "../helpers";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 25%;
  margin: 20px auto;

  #settings {
    input {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
    }
  }

  #top {
    display: flex;
    justify-content: space-between;

    #stats {
      display: flex;
      flex-direction: column;
    }

    .item-category {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .item-box {
        width: 64px;
        height: 64px;
      }

      .main-box {
        display: flex;
        gap: 2px;

        .item-box {
          width: 64px;
          height: 64px;
        }

        .sub-boxes {
          display: flex;
          flex-direction: column;
          gap: 1px;

          .item-box {
            width: 20.66px;
            height: 20.66px;
          }
        }
      }
    }
  }

  #bottom {
    display: flex;
    gap: 10px;
    justify-content: space-between;

    .main-box {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .item-box {
        width: 128px;
        height: 64px;
      }

      .sub-boxes {
        display: flex;
        gap: 10px;
        justify-content: center;

        .item-box {
          width: 57px;
          height: 57px;
        }
      }
    }
  }
`;

const BuildInterface = ({
  setName,
  oldName,
  name,
  build,
  images,
  setIndex,
  setModalItems,
  setModalCategory,
  setType,
  setIsOpen,
}) => {
  const { changeName } = useContext(BuildsContext);
  const { unlocks } = useContext(DataContext);
  const [onlyUnlocked, setOnlyUnlocked] = useState(false);

  const openModal = (
    category: string,
    type: string,
    index: number | null = null,
    subCategory: string | null = null,
  ) => {
    const allItems = onlyUnlocked ? getUnlockedItems(unlocks) : getAllItems();
    let items;
    if (subCategory) {
      items = allItems.filter(item => item.category === category && item.subCategories.includes(slugify(subCategory)));
    } else if (category === "armor") {
      items = allItems.filter(item => item.category === category && item.type === type);
    } else {
      items = allItems.filter(item => item.category === category);
    }

    setIndex(index);
    setType(type);
    setModalCategory(category);
    setModalItems(items);
    setIsOpen(true);
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNameSave = () => {
    changeName(oldName, name);
  };

  const toggleOnlyUnlocked = () => {
    setOnlyUnlocked(!onlyUnlocked);
  };

  return (
    <Container>
      <div id="settings">
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} onBlur={handleNameSave} />
        <div>
          <button
            onClick={toggleOnlyUnlocked}
            data-tooltip-id="unlocked"
            data-tooltip-content={onlyUnlocked ? "Showing only unlocked items" : "Showing all items"}
            data-tooltip-place="bottom"
          >
            {onlyUnlocked ? <AiFillUnlock size={"30px"} /> : <AiFillLock size={"30px"} />}
          </button>
          <Tooltip id="unlocked" />
        </div>
      </div>

      <div id="top">
        <div id="armor" className="item-category">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images.nodes}
            type={"headpiece"}
            category={"armor"}
          />
          <BuildItemBox openModal={openModal} build={build} images={images.nodes} type={"chest"} category={"armor"} />
          <BuildItemBox openModal={openModal} build={build} images={images.nodes} type={"hands"} category={"armor"} />
          <BuildItemBox openModal={openModal} build={build} images={images.nodes} type={"feet"} category={"armor"} />
          <div className="main-box">
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images.nodes}
              type={"relic"}
              category={"relics"}
            />

            <div className="sub-boxes">
              <BuildItemBox
                openModal={openModal}
                build={build}
                images={images.nodes}
                type={"fragments"}
                category={"relicfragments"}
                index={0}
              />
              <BuildItemBox
                openModal={openModal}
                build={build}
                images={images.nodes}
                type={"fragments"}
                category={"relicfragments"}
                index={1}
              />
              <BuildItemBox
                openModal={openModal}
                build={build}
                images={images.nodes}
                type={"fragments"}
                category={"relicfragments"}
                index={2}
              />
            </div>
          </div>
        </div>

        {/*<div id="stats">*/}
        {/*  <span>Armor Type: {calculateWeightType(statistics.weight)}</span>*/}
        {/*  {Object.entries(statistics).map(([key, value]) => {*/}
        {/*    */}
        {/*    if (key === "resistances") {*/}
        {/*      return Object.entries(statistics.resistances).map(([key, value]) => (*/}
        {/*        <span key={key}>{key}: {value}</span>*/}
        {/*      ))*/}
        {/*    }*/}
        {/*    */}
        {/*    return (*/}
        {/*      <span key={key}>{key}: {value}</span>*/}
        {/*    )*/}
        {/*  })}*/}
        {/*</div>*/}

        <div id="accessoires" className="item-category">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images.nodes}
            type={"amulet"}
            category={"amulets"}
          />
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images.nodes}
            type={"rings"}
            category={"rings"}
            index={0}
          />
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images.nodes}
            type={"rings"}
            category={"rings"}
            index={1}
          />
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images.nodes}
            type={"rings"}
            category={"rings"}
            index={2}
          />
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images.nodes}
            type={"rings"}
            category={"rings"}
            index={3}
          />
        </div>
      </div>

      <div id="bottom">
        <div className="main-box">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images.nodes}
            type={"mainHand"}
            category={"weapons"}
            subCategory={"Long Guns"}
          />

          <div className="sub-boxes">
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images.nodes}
              type={"mods"}
              category={"mods"}
              index={0}
              disabled={!!(build.mainHand && build.mainHand.mod && build.mainHand.mod !== "")}
            />
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images.nodes}
              type={"mutators"}
              category={"mutators"}
              index={0}
            />
          </div>
        </div>
        <div className="main-box">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images.nodes}
            type={"melee"}
            category={"weapons"}
            subCategory={"Melee Weapons"}
          />

          <div className="sub-boxes">
            {build.melee && build.melee.mod && build.melee.mod !== "" && (
              <BuildItemBox
                openModal={openModal}
                build={build}
                images={images.nodes}
                type={"mods"}
                category={"mods"}
                index={1}
                disabled={true}
              />
            )}
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images.nodes}
              type={"mutators"}
              category={"mutators"}
              index={1}
            />
          </div>
        </div>
        <div className="main-box">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images.nodes}
            type={"offhand"}
            category={"weapons"}
            subCategory={"Hand Guns"}
          />

          <div className="sub-boxes">
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images.nodes}
              type={"mods"}
              category={"mods"}
              index={2}
              disabled={!!(build.offhand && build.offhand.mod && build.offhand.mod !== "")}
            />
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images.nodes}
              type={"mutators"}
              category={"mutators"}
              index={2}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BuildInterface;
