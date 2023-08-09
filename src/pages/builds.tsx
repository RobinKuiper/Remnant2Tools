import { graphql } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import ItemSelectModal from "../components/ItemSelectModal";
import BuildsSidebar from "../components/layout/BuildsSidebar";
import Layout from "../components/layout/Layout";
import { BuildsContext } from "../context/BuildContext";
import type { Build, Item } from "../interface/Build";
import "react-tooltip/dist/react-tooltip.css";
import BuildInterface from "../components/BuildInterface";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { findImage } from "../helpers";
import { MAX_TRAIT_POINTS } from "../constants";
import Head from "../components/layout/Head";

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
  usedTraitPoints: 0,
  traits: {},
};
const newStatistics = {
  armor: 0,
  weight: 0,
  resistances: {
    bleed: 0,
    fire: 0,
    shock: 0,
    blight: 0,
    corrosion: 0,
  },
};

const Page = styled.div`
  display: flex;
  flex-direction: row;

  #builds-content {
    justify-content: center;
    z-index: 65;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    width: 90%;
    position: relative;
    background: url("../images/bg1.webp");
    background-size: cover;
    padding-top: 40px;
    box-sizing: border-box;

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

    .tabs {
      .tabs-menu {
        display: flex;
        justify-content: center;
        gap: 10px;

        .tabs-menu-item {
          padding: 10px;
          border: 1px solid #000;
          cursor: pointer;

          transition: all 0.5s ease-in-out;

          &:hover,
          &.active {
            background: darkred;
            color: #fff;
          }
        }
      }
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

    @media (max-width: 1500px) {
      width: 100%;
    }
  }

  .traits {
    margin-top: 20px;

    .totals {
      text-align: center;
      font-size: 1.2em;
      font-weight: 900;
      margin-bottom: 20px;
    }

    .items {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      @media (max-width: 1500px) {
      }

      .trait {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
        cursor: pointer;
        padding: 10px;
        box-sizing: border-box;
        transition: all 0.3s ease-in-out;

        &:hover {
          background: #b0b0b0;
        }

        .image {
          width: 150px;
          height: auto;
          overflow: hidden;

          @media (max-width: 1200px) {
            height: 100px;
          }

          img {
            width: 150px;

            @media (max-width: 1200px) {
              transform: translateY(-80px);
            }
          }
        }

        .nodes {
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 3px;

          .node {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 1px solid #000;
            background: #fff;

            &.active {
              background: #932020;
            }
          }
        }
      }
    }
  }
`;

const Builds = props => {
  const { saveBuild } = useContext(BuildsContext);
  const images = props.data.images;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [statistics, setStatistics] = useState(newStatistics);
  const [modalItems, setModalItems] = useState([]);
  const [modalCategory, setModalCategory] = useState("");
  const [index, setIndex] = useState<number | null>(null);
  const [type, setType] = useState<string>(null);
  const [tab, setTab] = useState<string>("equipment");
  const [name, setName] = useState<string>("");
  const [oldName, setOldName] = useState<string>("");
  const [build, setBuild] = useState<Build>(newBuild);
  const traits = props.data.items.categories.find(category => category.fragment === "traits").nodes;

  // STATISTICS
  useEffect(() => {
    const newStats = {
      armor: 0,
      weight: 0,
      resistances: {
        bleed: 0,
        fire: 0,
        shock: 0,
        blight: 0,
        corrosion: 0,
      },
    };
    Object.values(build).forEach(item => {
      if (!item) return;

      if (Array.isArray(item)) {
        item.forEach(i => {
          if (!i) return;

          Object.keys(newStats).forEach(key => {
            if (key === "resistances") {
              Object.keys(statistics.resistances).forEach(rKey => {
                if (i.resistances && i.resistances[rKey]) {
                  newStats.resistances[rKey] += parseInt(i.resistances[rKey]);
                }
              });
            } else {
              if (i[key]) {
                newStats[key] += parseInt(i[key]);
              }
            }
          });
        });
      } else {
        Object.keys(newStats).forEach(key => {
          if (key === "resistances") {
            Object.keys(statistics.resistances).forEach(rKey => {
              if (item.resistances && item.resistances[rKey]) {
                newStats.resistances[rKey] += parseInt(item.resistances[rKey]);
              }
            });
          } else {
            if (item[key]) {
              newStats[key] += parseInt(item[key]);
            }
          }
        });
      }
    });

    setStatistics(() => ({ ...newStats }));
  }, [build]);

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

  const handlePickTrait = (id: number) => {
    if (MAX_TRAIT_POINTS === build.usedTraitPoints) return;

    const newBuild = { ...build };
    if (!newBuild.traits[id]) {
      newBuild.traits[id] = 0;
    }

    if (newBuild.traits[id] !== 10) {
      newBuild.traits[id] += 1;
      newBuild.usedTraitPoints += 1;
    }

    setBuild(newBuild);
    saveBuild(name, newBuild);
  };

  const reduceTrait = (id: number) => {
    if (0 === build.usedTraitPoints) return;

    const newBuild = { ...build };
    if (!newBuild.traits[id]) {
      newBuild.traits[id] = 0;
    }

    if (newBuild.traits[id] !== 0) {
      newBuild.traits[id] -= 1;
      newBuild.usedTraitPoints -= 1;
    }

    setBuild(newBuild);
    saveBuild(name, newBuild);
  };

  return (
    <Layout>
      <Head title="Builder" description="Save your favorite builds in this Remnant II builder." />

      <Page>
        <BuildsSidebar setBuild={setBuild} setOldName={setOldName} setName={setName} resetBuild={resetBuild} />

        <div id="builds-content">
          <div className="background" />

          <div className="tabs">
            <div className="tabs-menu">
              <div
                className={`${tab === "equipment" ? "active" : ""} tabs-menu-item`}
                onClick={() => setTab("equipment")}
              >
                Equipment
              </div>
              <div className={`${tab === "traits" ? "active" : ""} tabs-menu-item`} onClick={() => setTab("traits")}>
                Traits
              </div>
            </div>

            <div className="tabs-content">
              <div className="tabs-content-item">
                {tab === "equipment" && (
                  <BuildInterface
                    setName={setName}
                    oldName={oldName}
                    name={name}
                    build={build}
                    images={images}
                    setIndex={setIndex}
                    setModalItems={setModalItems}
                    setModalCategory={setModalCategory}
                    setType={setType}
                    setIsOpen={setIsOpen}
                    statistics={statistics}
                  />
                )}
                {tab === "traits" && (
                  <div className="traits">
                    <div className="totals">
                      {build.usedTraitPoints}/{MAX_TRAIT_POINTS} Trait points
                    </div>
                    <div className="items">
                      {traits.map(trait => (
                        <div
                          key={trait.name}
                          className="trait"
                          onClick={() => handlePickTrait(trait.id)}
                          onContextMenu={e => {
                            e.preventDefault();
                            reduceTrait(trait.id);
                          }}
                        >
                          <div className="image">
                            <GatsbyImage
                              alt={trait.name ?? ""}
                              image={getImage(findImage(trait.name, images.nodes, "traits"))}
                            />
                          </div>
                          <h3>{trait.name}</h3>
                          <div className="nodes">
                            {Array.from({ length: 10 }, (_, k) => (
                              <div
                                key={trait.id}
                                className={`node ${k < build.traits[trait.id] ?? 0 ? "active" : ""}`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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
        relativePath
        childImageSharp {
          gatsbyImageData(quality: 80, layout: CONSTRAINED)
        }
      }
    }
    items: allItem {
      totalCount
      categories: group(field: { category: SELECT }) {
        fragment: fieldValue
        totalCount
        nodes {
          id
          externalId
          name
          armor
        }
      }
    }
  }
`;
