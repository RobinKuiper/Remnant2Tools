import { graphql } from "gatsby";
import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import ItemSelectModal from "../components/ItemSelectModal";
import BuildsSidebar from "../components/layout/BuildsSidebar";
import Layout from "../components/layout/Layout";
import { BuildsContext } from "../context/BuildContext";
import type { Build, Item } from "../interface/Build";
import "react-tooltip/dist/react-tooltip.css";
import BuildInterface from "../components/BuildInterface";
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
    background: url("/images/bg1.webp");
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

const Builds = props => {
  const { saveBuild } = useContext(BuildsContext);
  const images = props.data.images;
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [statistics, setStatistics] = useState(newStatistics);
  const [modalItems, setModalItems] = useState([]);
  const [modalCategory, setModalCategory] = useState("");
  const [index, setIndex] = useState<number | null>(null);
  const [type, setType] = useState<string>(null);
  const [name, setName] = useState<string>("");
  const [oldName, setOldName] = useState<string>("");
  const [build, setBuild] = useState<Build>(newBuild);

  // STATISTICS
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

  return (
    <Layout>
      <Page>
        <BuildsSidebar setBuild={setBuild} setOldName={setOldName} setName={setName} resetBuild={resetBuild} />

        <div id="builds-content">
          <div className="background" />

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
          />
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
  }
`;
