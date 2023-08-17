import { graphql } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import BuildsSidebarContent from "../components/builder/BuildsSidebarContent";
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
import BuildStatisticsSidebarContent from "../components/builder/BuildStatisticsSidebarContent";
import { SettingContext } from "../context/SettingContext";
import BackgroundImage from "../components/BackgroundImage";
import Layout from "../components/layout/Layout";
import PageLayout from "../components/layout/PageLayout";

const NEW_BUILD: Build = {
  name: "New Build",
  id: -1,
  headpiece: null,
  chest: null,
  hands: null,
  feet: null,
  mainHand: {
    externalId: null,
    mod: null,
    mutator: null,
  },
  melee: {
    externalId: null,
    mod: null,
    mutator: null,
  },
  offhand: {
    externalId: null,
    mod: null,
    mutator: null,
  },
  relic: {
    externalId: null,
    fragment1: null,
    fragment2: null,
    fragment3: null,
  },
  amulet: null,
  ring1: null,
  ring2: null,
  ring3: null,
  ring4: null,
  archetype1: {
    externalId: null,
    trait: null,
    level: 1,
  },
  archetype2: {
    externalId: null,
    trait: null,
    level: 1,
  },
  usedTraitPoints: 0,
  traitLevels: {},
};

const Builds = props => {
  const { saveBuild, builds } = useContext(BuildsContext);
  const { startSaving, stopSaving } = useContext(SettingContext);
  const { images, bgImage } = props.data;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalFilters, setModalFilters] = useState<Filter[]>([]);
  const [buildPath, setBuildPath] = useState<string>("");
  const [tab, setTab] = useState<string>("equipment");
  const newBuildCopy = JSON.parse(JSON.stringify(NEW_BUILD));
  const [build, setBuild] = useState<Build>(newBuildCopy);
  const [onlyUnlocked, setOnlyUnlocked] = useState(false);

  useEffect(() => {
    const storedActiveBuildId = localStorage.getItem("activeBuildId");
    const build = Object.values(builds).find(build =>
      storedActiveBuildId ? build.id === parseInt(storedActiveBuildId) : true,
    );
    if (build) {
      setBuild(build);
    }
  }, []);

  const openModal = (filters: Filter[], buildPath: string) => {
    setBuildPath(buildPath);
    setModalFilters(filters);
    setIsOpen(true);
  };
  const toggleOnlyUnlocked = () => {
    setOnlyUnlocked(!onlyUnlocked);
  };
  const resetBuild = () => {
    let newId = 1;
    while (builds[newId]) {
      newId++;
    }
    const copy = JSON.parse(JSON.stringify(NEW_BUILD));
    copy.id = newId;
    setBuild(copy);
    saveBuild(copy);
  };
  const selectItem = (item: Item) => {
    updateBuildValue(buildPath, item.externalId, item);
  };
  const checkMod = (item: Item) => {
    if (item.links?.mod) {
      const part1 = buildPath.split(".")[0];
      updateBuildValue(`${part1}.mod`, item.links.mod.externalId);
    }
  };
  const addMod = (item: Item) => {
    if (item.links?.trait) {
      const part1 = buildPath.split(".")[0];
      updateBuildValue(`${part1}.trait`, item.links.trait.externalId);
    }
  };
  const save = (build: Build) => {
    startSaving();
    saveBuild(build);
    stopSaving();
  };
  const handleLevelChange = (level: number, buildPath: string) => {
    updateBuildValue(buildPath, level);
  };
  const updateBuildValue = (buildPath: string, value: any, item?: Item) => {
    const nBuild = { ...build };
    setFieldValue(nBuild, buildPath, value);
    preProcessBuild(value, nBuild, buildPath, item);
    setBuild(nBuild);
    save(nBuild);
  };
  const preProcessBuild = (value: any, nBuild: Build, buildPath: string, item?: Item) => {
    if (buildPath === "archetype1.level" || buildPath === "archetype2.level") {
      const part1 = buildPath.split(".")[0];
      const traitId = getFieldValue(nBuild, `${part1}.trait`);
      checkTrait(traitId, value);
    }

    console.log(buildPath)
    if (buildPath === "archetype1.externalId" || buildPath === "archetype2.externalId") {
      const part1 = buildPath.split(".")[0];
      const traitId = item?.links?.trait?.externalId;
      checkTrait(traitId, getFieldValue(nBuild, `${part1}.level`));
    }

    if (buildPath === "archetype1.externalId" || buildPath === "archetype2.externalId") {
      const part1 = buildPath.split(".")[0];
      nBuild[part1].level = 1;
    }

    if (item && item.category === "weapons") {
      checkMod(item);
    }

    if (item && item.category === "archetypes") {
      addMod(item);
    }
  };
  const checkTrait = (id?: number, points?: number) => {
    if (id && build.traitLevels[id]) {
      points = points ?? 0;
      const traitLevel = build.traitLevels[id];
      console.log(traitLevel, points)
      if (traitLevel + points > 10) {
        const difference = traitLevel + points - 10;
        console.log(difference, difference < 0 ? 0 : build.traitLevels[id] - difference)
        updateBuildValue(`traitLevels.${id}`, difference < 0 ? 0 : build.traitLevels[id] - difference);
      }
    }
  };

  return (
    <Layout>
      <Head title="Builder" description="Save your favorite builds in this Remnant II builder." />

      <PageLayout
        leftSidebarContent={<BuildsSidebarContent build={build} setBuild={setBuild} resetBuild={resetBuild} />}
        rightSidebarContent={<BuildStatisticsSidebarContent build={build} />}
        // config={{
        //   rightSidebar: {
        //     alwaysShowOpener: true
        //   }
        // }}
      >
        <Container>
          <BackgroundImage image={bgImage}>
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
                build={build}
                setBuild={setBuild}
                onlyUnlocked={onlyUnlocked}
                toggleOnlyUnlocked={toggleOnlyUnlocked}
              />

              <div className="tabs-content">
                <div className="tabs-content-item">
                  {tab === "equipment" && <BuildInterface build={build} images={images.nodes} openModal={openModal} />}

                  {tab === "traits" && (
                    <TraitsInterface
                      build={build}
                      showOnlyUnlocked={onlyUnlocked}
                      updateBuildValue={updateBuildValue}
                    />
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
          </BackgroundImage>
        </Container>
      </PageLayout>

      <ItemSelectModal
        setIsOpen={setIsOpen}
        isOpen={modalIsOpen}
        filters={modalFilters}
        callback={selectItem}
        onlyShowUnlocked={onlyUnlocked}
      />
    </Layout>
  );
};

export default Builds;

export const query = graphql`
  {
    bgImage: file(name: { eq: "bg1" }) {
      ...imageFragment
    }
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

const Container = styled.div`
  height: auto;

  .tabs {
    padding-top: 40px;

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
`;
