import "./BuildInterface.scss";
import React from "react";
import BuildItemBox from "./BuildItemBox";

const BuildInterface = ({ build, images, openModal }) => {
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
        buildPath: "relic.fragment1",
        filters: [
          {
            key: "category",
            value: "relicfragments",
          },
          {
            key: "externalId",
            value: build.relic?.fragment2,
            not: true,
          },
          {
            key: "externalId",
            value: build.relic?.fragment3,
            not: true,
          },
        ],
      },
      {
        buildPath: "relic.fragment2",
        filters: [
          {
            key: "category",
            value: "relicfragments",
          },
          {
            key: "externalId",
            value: build.relic?.fragment1,
            not: true,
          },
          {
            key: "externalId",
            value: build.relic?.fragment3,
            not: true,
          },
        ],
      },
      {
        buildPath: "relic.fragment3",
        filters: [
          {
            key: "category",
            value: "relicfragments",
          },
          {
            key: "externalId",
            value: build.relic?.fragment1,
            not: true,
          },
          {
            key: "externalId",
            value: build.relic?.fragment2,
            not: true,
          },
        ],
      },
    ],
    topRight: [
      {
        buildPath: "amulet",
        filters: [{ category: "amulets" }],
      },
      {
        buildPath: "ring1",
        filters: [
          {
            key: "category",
            value: "rings",
          },
          {
            key: "externalId",
            value: build.ring2,
            not: true,
          },
          {
            key: "externalId",
            value: build.ring3,
            not: true,
          },
          {
            key: "externalId",
            value: build.ring4,
            not: true,
          },
        ],
      },
      {
        buildPath: "ring2",
        filters: [
          {
            key: "category",
            value: "rings",
          },
          {
            key: "externalId",
            value: build.ring1,
            not: true,
          },
          {
            key: "externalId",
            value: build.ring3,
            not: true,
          },
          {
            key: "externalId",
            value: build.ring4,
            not: true,
          },
        ],
      },
      {
        buildPath: "ring3",
        filters: [
          {
            key: "category",
            value: "rings",
          },
          {
            key: "externalId",
            value: build.ring2,
            not: true,
          },
          {
            key: "externalId",
            value: build.ring1,
            not: true,
          },
          {
            key: "externalId",
            value: build.ring4,
            not: true,
          },
        ],
      },
      {
        buildPath: "ring4",
        filters: [
          {
            key: "category",
            value: "rings",
          },
          {
            key: "externalId",
            value: build.ring2,
            not: true,
          },
          {
            key: "externalId",
            value: build.ring3,
            not: true,
          },
          {
            key: "externalId",
            value: build.ring1,
            not: true,
          },
        ],
      },
    ],
  };

  return (
    <div className="build-interface-container">
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
              buildPath={"relic.externalId"}
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
            buildPath={"mainHand.externalId"}
            filters={[{ category: "weapons" }, { type: "Long Guns" }]}
          />

          <div className="sub-boxes">
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"mainHand.mod"}
              filters={[
                {
                  key: "category",
                  value: "mods",
                },
                {
                  key: "externalId",
                  value: build.melee?.mod,
                  not: true,
                },
                {
                  key: "externalId",
                  value: build.offhand?.mod,
                  not: true,
                },
                {
                  key: "links",
                  value: null,
                },
              ]}
              disabled={!!(build.mainHand && build.mainHand.mod && build.mainHand.mod !== "")}
            />
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"mainHand.mutator"}
              filters={[
                {
                  key: "category",
                  value: "mutators",
                },
                {
                  key: "externalId",
                  value: build.melee?.mutator,
                  not: true,
                },
                {
                  key: "externalId",
                  value: build.offhand?.mutator,
                  not: true,
                },
              ]}
            />
          </div>
        </div>
        <div className="main-box">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images}
            buildPath={"melee.externalId"}
            filters={[{ category: "weapons" }, { type: "Melee Weapons" }]}
          />

          <div className="sub-boxes">
            {build.melee && build.melee.mod && (
              <BuildItemBox
                openModal={openModal}
                build={build}
                images={images}
                buildPath={"melee.mod"}
                filters={[{ category: "mods" }]}
                disabled={true}
              />
            )}
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"melee.mutator"}
              filters={[
                {
                  key: "category",
                  value: "mutators",
                },
                {
                  key: "externalId",
                  value: build.mainHand?.mutator,
                  not: true,
                },
                {
                  key: "externalId",
                  value: build.offhand?.mutator,
                  not: true,
                },
              ]}
            />
          </div>
        </div>
        <div className="main-box">
          <BuildItemBox
            openModal={openModal}
            build={build}
            images={images}
            buildPath={"offhand.externalId"}
            filters={[{ category: "weapons" }, { type: "Hand Guns" }]}
          />

          <div className="sub-boxes">
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"offhand.mod"}
              filters={[
                {
                  key: "category",
                  value: "mods",
                },
                {
                  key: "externalId",
                  value: build.mainHand?.mod,
                  not: true,
                },
                {
                  key: "externalId",
                  value: build.offhand?.mod,
                  not: true,
                },
              ]}
              disabled={!!(build.offhand && build.offhand.mod && build.offhand.mod !== "")}
            />
            <BuildItemBox
              openModal={openModal}
              build={build}
              images={images}
              buildPath={"offhand.mutator"}
              filters={[
                {
                  key: "category",
                  value: "mutators",
                },
                {
                  key: "externalId",
                  value: build.melee?.mutator,
                  not: true,
                },
                {
                  key: "externalId",
                  value: build.mainHand?.mutator,
                  not: true,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildInterface;
