import React, { useState } from "react";
import { styled } from "styled-components";
import ItemSelectModal from "../components/ItemSelectModal";
import BuildsSidebar from "../components/layout/BuildsSidebar";
import Layout from "../components/layout/Layout";
import data from "../data/data.json";

interface Weapon {
  id: number;
  mutator: number;
  mod?: number;
}

interface Build {
  armor: {
    headpiece: number;
    chest: number;
    hands: number;
    feet: number;
  };
  weapons: {
    mainHand: Weapon;
    melee: Weapon;
    offhand: Weapon;
  };
  relic: {
    id: number;
    fragments: [number?, number?, number?];
  };
  amulet: number;
  rings: [number?, number?, number?, number?];
}

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

  const openModal = (category: string) => {
    setModalItems(data[category]);
    setIsOpen(true);
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
                <div id="headpiece" className="item-box"></div>
                <div id="chest" className="item-box"></div>
                <div id="hands" className="item-box"></div>
                <div id="feet" className="item-box"></div>
                <div id="relic" className="item-box"></div>
              </div>

              <div id="accessoires" className="item-category">
                <div id="amulet" className="item-box" onClick={() => openModal("amulets")}></div>
                <div id="ring1" className="item-box" onClick={() => openModal("rings")}></div>
                <div id="ring2" className="item-box"></div>
                <div id="ring3" className="item-box"></div>
                <div id="ring4" className="item-box"></div>
              </div>
            </div>

            <div id="bottom">
              <div id="mainHand" className="item-box"></div>
              <div id="melee" className="item-box"></div>
              <div id="offhand" className="item-box"></div>
            </div>
          </BuildInterface>
        </div>
      </Page>

      <ItemSelectModal isOpen={modalIsOpen} setIsOpen={setIsOpen} items={modalItems} />
    </Layout>
  );
};

export default Builds;
