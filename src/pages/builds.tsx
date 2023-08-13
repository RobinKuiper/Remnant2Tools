import { graphql } from "gatsby";
import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import BuildsSidebar from "../components/builder/BuildsSidebar";
import Layout from "../components/layout/Layout";
import { BuildsContext } from "../context/BuildContext";
import type { Build, Item } from "../interface/Build";
import "react-tooltip/dist/react-tooltip.css";
import BuildInterface from "../components/builder/BuildInterface";
import Head from "../components/layout/Head";
import { getFieldValue, setFieldValue } from "../dataHelpers";
import ItemSelectModal from "../components/modals/ItemSelectModal";
import type { Filter } from "../interface/IData";
import ArchetypesInterface from "../components/builder/ArchetypesInterface";
import TraitsInterface from "../components/builder/TraitsInterface";
import Settings from "../components/builder/Settings";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import BuildStatisticsSidebar from "../components/builder/BuildStatisticsSidebar";

const NEW_BUILD: Build = {
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
  archetype1: null,
  archetype2: null,
};

const MOD_INDEXES = {
  mainHand: 0,
  melee: 1,
  offhand: 2,
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
    background: url("/images/bg1.webp");
    background-size: cover;
    padding-top: 40px;
    margin-left: 235px;
    min-height: 87.5vh;
    box-sizing: border-box;

    @media (max-width: 1200px) {
      margin-left: 0;
      width: 100%;
    }

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

    @media (max-width: 1500px) {
      width: 100%;
    }
  }
`;

const Builds = props => {
  const { saveBuild } = useContext(BuildsContext);
  const { images } = props.data;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalFilters, setModalFilters] = useState<Filter[]>([]);
  const [buildPath, setBuildPath] = useState<string>("");
  const [tab, setTab] = useState<string>("equipment");
  const [name, setName] = useState<string>("");
  const [oldName, setOldName] = useState<string>("");
  const [build, setBuild] = useState<Build>(NEW_BUILD);
  const [onlyUnlocked, setOnlyUnlocked] = useState(false);

  const openModal = (filters: Filter[], buildPath: string) => {
    setBuildPath(buildPath);
    setModalFilters(filters);
    setIsOpen(true);
  };
  const toggleOnlyUnlocked = () => {
    setOnlyUnlocked(!onlyUnlocked);
  };
  const resetBuild = () => {
    setName("");
    setBuild(NEW_BUILD);
  };
  const selectItem = (item: Item) => {
    updateBuildValue(buildPath, item);
  };
  const checkMod = (item: Item, build: Build) => {
    const index = MOD_INDEXES[buildPath] ?? null;

    if (index !== null) {
      build.mods[index] = item.links?.mod ? item.links.mod : null;
    }
  };
  const save = () => {
    let usedName = name;
    if (!usedName || usedName === "") {
      usedName = "New Build";
      setName(usedName);
      setOldName(usedName);
    }

    saveBuild(usedName, build);
    toast.success(`Build "${name}" saved.`, { className: "toast" });
  };
  const handleLevelChange = (level: number, buildPath: string) => {
    updateBuildValue(buildPath, level);
  };
  const updateBuildValue = (buildPath: string, value: any) => {
    const nBuild = { ...build };
    setFieldValue(nBuild, buildPath, value);
    preProcessBuild(value, nBuild, buildPath);
    setBuild(nBuild);
    save();
  };
  const preProcessBuild = (value: any, nBuild: Build, buildPath: string) => {
    if (buildPath === "archetype1.level") {
      const traitFragment = getFieldValue(nBuild, "archetype1.links.trait.fragment");
      checkTrait(traitFragment, value);
    } else if (buildPath === "archetype2.level") {
      const traitFragment = getFieldValue(nBuild, "archetype2.links.trait.fragment");
      checkTrait(traitFragment, value);
    }

    if (buildPath === "archetype1") {
      const traitFragment = getFieldValue(nBuild, "archetype1.links.trait.fragment");
      checkTrait(traitFragment, getFieldValue(nBuild, "archetype1.level"));
    } else if (buildPath === "archetype2") {
      const traitFragment = getFieldValue(nBuild, "archetype2.links.trait.fragment");
      checkTrait(traitFragment, getFieldValue(nBuild, "archetype2.level"));
    }

    if (typeof value === "object") {
      if (value.category === "weapons") {
        checkMod(value, nBuild);
      }

      if (value.category === "archetypes") {
        nBuild[buildPath].level = 1;
      }
    }
  };
  const checkTrait = (fragment?: string, points?: number) => {
    if (fragment && build.traits[fragment]) {
      points = points ?? 0;
      const traitLevel = build.traits[fragment];
      if (traitLevel + points > 10) {
        const difference = traitLevel + points - 10;
        updateBuildValue(`traits.${fragment}`, difference < 0 ? 0 : build.traits[fragment] - difference);
      }
    }
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
                className={`${tab === "archetypes" ? "active" : ""} tabs-menu-item`}
                onClick={() => setTab("archetypes")}
              >
                Archetypes
              </div>
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

            <Settings
              name={name}
              setName={setName}
              oldName={oldName}
              onlyUnlocked={onlyUnlocked}
              toggleOnlyUnlocked={toggleOnlyUnlocked}
            />

            <div className="tabs-content">
              <div className="tabs-content-item">
                {tab === "equipment" && <BuildInterface build={build} images={images.nodes} openModal={openModal} />}

                {tab === "traits" && (
                  <TraitsInterface build={build} showOnlyUnlocked={onlyUnlocked} updateBuildValue={updateBuildValue} />
                )}

                {tab === "archetypes" && (
                  <ArchetypesInterface
                    build={build}
                    openModal={openModal}
                    images={images.nodes}
                    handleLevelChange={handleLevelChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Page>

      <ItemSelectModal
        setIsOpen={setIsOpen}
        isOpen={modalIsOpen}
        filters={modalFilters}
        callback={selectItem}
        onlyShowUnlocked={onlyUnlocked}
      />
      <BuildStatisticsSidebar build={build} />
    </Layout>
  );
};

export default Builds;

export const query = graphql`
  {
    images: allFile(filter: { relativePath: { regex: "/items/" } }) {
      nodes {
        fields {
          itemId
        }
        ...imageFragment
      }
    }
  }
`;
