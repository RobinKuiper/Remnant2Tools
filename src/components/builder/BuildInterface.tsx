import React from "react";
import BuildItemBox from "./BuildItemBox";
import { styled } from "styled-components";

const ITEM_BOXES = {
  topLeft: [
    {
      buildPath: "headpiece",
      filters: [{ category: "armor" }, { type: "headpiece" }],
    },
    {
      buildPath: "chest",
      filters: [{ category: "armor" }, { type: "chest" }],
    },
    {
      buildPath: "feet",
      filters: [{ category: "armor" }, { type: "feet" }],
    },
    {
      buildPath: "hands",
      filters: [{ category: "armor" }, { type: "hands" }],
    },
  ],
  fragments: [
    {
      buildPath: "fragments.0",
      filters: [{ category: "relicfragments" }],
    },
    {
      buildPath: "fragments.1",
      filters: [{ category: "relicfragments" }],
    },
    {
      buildPath: "fragments.2",
      filters: [{ category: "relicfragments" }],
    },
  ],
  topRight: [
    {
      buildPath: "amulet",
      filters: [{ category: "amulets" }],
    },
    {
      buildPath: "rings.0",
      filters: [{ category: "rings" }],
    },
    {
      buildPath: "rings.1",
      filters: [{ category: "rings" }],
    },
    {
      buildPath: "rings.2",
      filters: [{ category: "rings" }],
    },
    {
      buildPath: "rings.3",
      filters: [{ category: "rings" }],
    },
  ],
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 400px;
  margin: 10px auto;

  #top {
    display: flex;
    justify-content: space-between;

    #stats {
      display: flex;
      flex-direction: column;
      width: 160px;
      margin-left: -20.66px;

      .subtitle {
        margin: 10px 0;
        font-weight: 900;
        font-size: 1.1em;
      }

      span {
        display: flex;
        justify-content: space-between;

        .key {
          font-weight: bold;
        }

        .value {
        }
      }
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

        @media (max-width: 425px) {
          width: 100%;
        }
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

  @media (max-width: 430px) {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    min-height: 100vh;
  }

  //@media screen and (min-width: 551px) and (max-width: 1000px) {
  //  width: 75%;
  //}
`;

const BuildInterface = ({ build, images, openModal }) => {
  return (
    <Container>
      <div id="top">
        <div id="armor" className="item-category">
          {ITEM_BOXES.topLeft.map(box => (
            <BuildItemBox
              key={box.buildPath}
              openModal={openModal}
              build={build}
              images={images}
              buildPath={box.buildPath}
              filters={box.filters}
            />
          ))}

          <div className="main-box">
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"relic"}
              filters={[{ category: "relics" }]}
            />

            <div className="sub-boxes">
              {ITEM_BOXES.fragments.map(box => (
                <BuildItemBox
                  key={box.buildPath}
                  openModal={openModal}
                  build={build}
                  images={images}
                  buildPath={box.buildPath}
                  filters={box.filters}
                />
              ))}
            </div>
          </div>
        </div>

        <div id="stats"></div>

        <div id="accessoires" className="item-category">
          {ITEM_BOXES.topRight.map(box => (
            <BuildItemBox
              key={box.buildPath}
              openModal={openModal}
              build={build}
              images={images}
              buildPath={box.buildPath}
              filters={box.filters}
            />
          ))}
        </div>
      </div>

      <div id="bottom">
        <div className="main-box">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images}
            buildPath={"mainHand"}
            filters={[{ category: "weapons" }, { type: "Long Guns" }]}
          />

          <div className="sub-boxes">
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"mods.0"}
              filters={[{ category: "mods" }]}
              disabled={!!(build.mainHand && build.mainHand.mod && build.mainHand.mod !== "")}
            />
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"mutators.0"}
              filters={[{ category: "mutators" }]}
            />
          </div>
        </div>
        <div className="main-box">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images}
            buildPath={"melee"}
            filters={[{ category: "weapons" }, { type: "Melee Weapons" }]}
          />

          <div className="sub-boxes">
            {build.melee && build.melee.mod && build.melee.mod !== "" && (
              <BuildItemBox
                openModal={openModal}
                build={build}
                images={images}
                buildPath={"mods.1"}
                filters={[{ category: "mods" }]}
                disabled={true}
              />
            )}
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"mutators.1"}
              filters={[{ category: "mutators" }]}
            />
          </div>
        </div>
        <div className="main-box">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images}
            buildPath={"offhand"}
            filters={[{ category: "weapons" }, { type: "Hand Guns" }]}
          />

          <div className="sub-boxes">
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"mods.2"}
              filters={[{ category: "mods" }]}
              disabled={!!(build.offhand && build.offhand.mod && build.offhand.mod !== "")}
            />
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"mutators.2"}
              filters={[{ category: "mutators" }]}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BuildInterface;
