import { graphql } from "gatsby";
import React, { useContext, useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { styled } from "styled-components";
import BuildItemBox from "../components/BuildItemBox";
import ItemSelectModal from "../components/ItemSelectModal";
import BuildsSidebar from "../components/layout/BuildsSidebar";
import Layout from "../components/layout/Layout";
import { BuildsContext } from "../context/BuildContext";
import { DataContext } from "../context/DataContext";
import data from "../data/data.json";
import type { Build, Item } from "../interface/Build";
import "react-tooltip/dist/react-tooltip.css";
// import {calculateWeightType} from "../dataHelpers";

const newBuild: Build = {
  headpiece: null,
  chest: null,
  hands: null,
  feet: null,
  mainHand: null,
  melee: null,
  offhand: null,
  mutators: [],
  mods: [],
  relic: null,
  fragments: [],
  amulet: null,
  rings: [],
};
// const newStatistics = {
//   armor: 0,
//   weight: 0,
//   resistances: {
//     bleed: 0,
//     fire: 0,
//     shock: 0,
//     blight: 0,
//     corrosion: 0
//   }
// };

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

    #settings {
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        background: transparent;
        border: none;
        border-bottom: 1px solid #000;

        &:focus {
          outline: none;
        }
      }

      div {
      }
    }
  }
`;

const BuildInterface = styled.div`
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

const Builds = props => {
  const { saveBuild, changeName } = useContext(BuildsContext);
  const { unlocks } = useContext(DataContext);
  const images = props.data.images;
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [statistics, setStatistics] = useState(newStatistics);
  const [onlyUnlocked, setOnlyUnlocked] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  const [modalCategory, setModalCategory] = useState("");
  const [index, setIndex] = useState<number | null>(null);
  const [type, setType] = useState<string>(null);
  const [name, setName] = useState<string>("");
  const [oldName, setOldName] = useState<string>("");
  const [build, setBuild] = useState<Build>(newBuild);

  // useEffect(() => {
  //   const newStats = {
  //     armor: 0,
  //     weight: 0,
  //     resistances: {
  //       bleed: 0,
  //       fire: 0,
  //       shock: 0,
  //       blight: 0,
  //       corrosion: 0
  //     }
  //   };
  //   Object.values(build).forEach(item => {
  //     if (!item) return;
  //
  //     if (Array.isArray(item)) {
  //       item.forEach(i => {
  //         Object.keys(newStats).forEach(key => {
  //           if (key === "resistances") {
  //             Object.keys(statistics.resistances).forEach(rKey => {
  //               if (i.resistances && i.resistances[rKey]) {
  //                 newStats.resistances[rKey] += i.resistances[rKey];
  //               }
  //             })
  //           } else {
  //             if (i[key]) {
  //               newStats[key] += i[key];
  //             }
  //           }
  //         })
  //       })
  //     } else {
  //       Object.keys(newStats).forEach(key => {
  //         if (key === "resistances") {
  //           Object.keys(statistics.resistances).forEach(rKey => {
  //             if (item.resistances && item.resistances[rKey]) {
  //               newStats.resistances[rKey] += item.resistances[rKey];
  //             }
  //           })
  //         } else {
  //           if (item[key]) {
  //             newStats[key] += item[key];
  //           }
  //         }
  //       })
  //     }
  //   })
  //
  //   setStatistics(() => ({ ...newStats }));
  // }, [build])

  const openModal = (
    category: string,
    type: string,
    index: number | null = null,
    subCategory: string | null = null,
  ) => {
    let items;
    if (subCategory && data[category]) {
      const filtered = data[category].data.filter(cat => cat.label.toLowerCase() === subCategory.toLowerCase());
      if (filtered) {
        items = filtered[0].items;
      }
    } else if (category === "armor" || category === "relicfragments") {
      items = [];
      data[category].data.forEach(cat =>
        cat.items.forEach(item => {
          if (item.type === type || category === "relicfragments") {
            items.push(item);
          }
        }),
      );
    } else {
      items = data[category].data;
    }

    if (onlyUnlocked) {
      items = items.filter(
        item => unlocks[category] && unlocks[category][item.id] && unlocks[category][item.id].unlocked,
      );
    }

    setIndex(index);
    setType(type);
    setModalCategory(category);
    setModalItems(items);
    setIsOpen(true);
  };

  const resetBuild = () => {
    setName("");
    setBuild(newBuild);
  };

  const selectItem = (item: Item) => {
    let nBuild = build;
    if (index !== null) {
      nBuild[type][index] = item;
    } else {
      nBuild[type] = item;
    }

    nBuild = checkMod(item, nBuild);

    setBuild(prevState => ({ ...prevState, ...nBuild }));
    saveBuild(name, nBuild);
  };

  const checkMod = (item: Item, build: Build) => {
    let index = null;
    if (type === "mainHand") {
      index = 0;
    } else if (type === "melee") {
      index = 1;
    } else if (type === "offhand") {
      index = 2;
    }

    if (index !== null) {
      build.mods[index] =
        item.mod && item.mod !== ""
          ? {
              name: item.mod,
              description: item.modDescription,
            }
          : null;
    }
    return build;
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
    <Layout>
      <Page>
        <BuildsSidebar setBuild={setBuild} setOldName={setOldName} setName={setName} resetBuild={resetBuild} />

        <div id="builds-content">
          <div className="background" />

          <BuildInterface>
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
                <BuildItemBox
                  openModal={openModal}
                  build={build}
                  images={images.nodes}
                  type={"chest"}
                  category={"armor"}
                />
                <BuildItemBox
                  openModal={openModal}
                  build={build}
                  images={images.nodes}
                  type={"hands"}
                  category={"armor"}
                />
                <BuildItemBox
                  openModal={openModal}
                  build={build}
                  images={images.nodes}
                  type={"feet"}
                  category={"armor"}
                />
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
          </BuildInterface>
        </div>
      </Page>

      <ItemSelectModal
        isOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        items={modalItems}
        category={modalCategory}
        callback={selectItem}
        images={images.nodes}
      />
    </Layout>
  );
};

export default Builds;

export const query = graphql`
  {
    images: allFile(filter: { relativePath: { regex: "/items/" } }) {
      totalCount
      nodes {
        name
        childImageSharp {
          gatsbyImageData(quality: 80, layout: CONSTRAINED)
        }
      }
    }
  }
`;