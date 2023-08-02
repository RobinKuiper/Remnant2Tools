import React, { useState } from "react";
import { styled } from "styled-components";
import ItemSelectModal from "../components/ItemSelectModal";
import BuildsSidebar from "../components/layout/BuildsSidebar";
import Layout from "../components/layout/Layout";
import data from "../data/data.json";

interface Weapon {
  id: number | null;
  mutator?: number;
  mod?: number;
}

interface Build {
  headpiece: number | null;
  chest: number | null;
  hands: number | null;
  feet: number | null;
  mainHand: Weapon;
  melee: Weapon;
  offhand: Weapon;
  relic: number | null;
  fragments: [number?, number?, number?];
  amulet: number | null;
  rings: [number?, number?, number?, number?];
}

const newBuild = {
  headpiece: null,
  chest: null,
  hands: null,
  feet: null,
  mainHand: {
    id: null,
  },
  melee: {
    id: null,
  },
  offhand: {
    id: null,
  },
  relic: null,
  fragments: [],
  amulet: null,
  rings: [],
};

const Page = styled.div`
  display: flex;
  flex-direction: row;

  #builds-content {
    z-index: 10;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    width: 90%;
    position: relative;
    background: url("/images/img.png");
    background-size: cover;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 1) 11%,
        rgba(231, 231, 231, 1) 53%,
        rgba(255, 255, 255, 0) 100%
      );
      z-index: -1;
    }
  }
`;

const BuildInterface = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 25%;
  margin: 20px auto;

  .item-box {
    border: 1px solid #000;
    background: white;
  }

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

    .item-category {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .item-box {
        width: 64px;
        height: 64px;
      }
    }
  }

  #bottom {
    display: flex;
    gap: 10px;
    justify-content: space-between;

    .item-box {
      width: 128px;
      height: 64px;
    }
  }
`;

const Builds = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  const [modalCategory, setModalCategory] = useState("");
  const [index, setIndex] = useState<number | null>(null);
  const [type, setType] = useState<string>(null);
  const [build, setBuild] = useState<Build>(newBuild);

  const openModal = (category: string, type: string, index: number | null = null) => {
    setIndex(index);
    setType(type);
    setModalCategory(category);
    setModalItems(data[category]);
    setIsOpen(true);
  };

  const selectItem = (id: number) => {
    const nBuild = build;
    if (index !== null) {
      nBuild[type][index] = id;
    } else {
      nBuild[type] = id;
    }

    setBuild(nBuild);
  };

  return (
    <Layout>
      <Page>
        <BuildsSidebar />

        <div id="builds-content">
          <div className="background">{/*  <img src={"http://localhost:8000/images/img.png"} />*/}</div>

          <BuildInterface>
            <div id="settings">
              <input type="text" placeholder="Name" />
            </div>

            <div id="top">
              <div id="armor" className="item-category">
                <div id="headpiece" className="item-box">
                  {build.headpiece}
                </div>
                <div id="chest" className="item-box">
                  {build.chest}
                </div>
                <div id="hands" className="item-box">
                  {build.hands}
                </div>
                <div id="feet" className="item-box">
                  {build.feet}
                </div>
                <div id="relic" className="item-box" onClick={() => openModal("relics", "relic")}>
                  {build.relic}
                </div>
              </div>

              <div id="accessoires" className="item-category">
                <div id="amulet" className="item-box" onClick={() => openModal("amulets", "amulet")}>
                  {build.amulet}
                </div>
                <div id="ring1" className="item-box" onClick={() => openModal("rings", "rings", 0)}>
                  {build.rings[0]}
                </div>
                <div id="ring2" className="item-box" onClick={() => openModal("rings", "rings", 1)}>
                  {build.rings[1]}
                </div>
                <div id="ring3" className="item-box" onClick={() => openModal("rings", "rings", 2)}>
                  {build.rings[2]}
                </div>
                <div id="ring4" className="item-box" onClick={() => openModal("rings", "rings", 3)}>
                  {build.rings[3]}
                </div>
              </div>
            </div>

            <div id="bottom">
              <div id="mainHand" className="item-box" onClick={() => openModal("weapons", "mainHand", 0)}></div>
              <div id="melee" className="item-box"></div>
              <div id="offhand" className="item-box"></div>
            </div>
          </BuildInterface>
        </div>
      </Page>

      <ItemSelectModal
        isOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        items={modalItems}
        category={modalCategory}
        callback={selectItem}
      />
    </Layout>
  );
};

export default Builds;
