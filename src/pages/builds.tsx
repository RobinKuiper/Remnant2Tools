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

const Builds = props => {
  const { saveBuild, builds } = useContext(BuildsContext);
  const { startSaving, stopSaving } = useContext(SettingContext);
  const { images, bgImage } = props.data;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalFilters, setModalFilters] = useState<Filter[]>([]);
  const [buildPath, setBuildPath] = useState<string>("");
  const [tab, setTab] = useState<string>("equipment");
  const [name, setName] = useState<string>("");
  const [oldName, setOldName] = useState<string>("");
  const [build, setBuild] = useState<Build>(NEW_BUILD);
  const [onlyUnlocked, setOnlyUnlocked] = useState(false);

  useEffect(() => {
    const build = Object.entries(builds).find(() => true);
    if (build) {
      setBuild(build[1]);
      setName(build[0]);
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
  const save = (build: Build) => {
    startSaving();
    let usedName = name;
    if (!usedName || usedName === "") {
      usedName = "New Build";
      setName(usedName);
      setOldName(usedName);
    }

    saveBuild(usedName, build);
    stopSaving();
  };
  const handleLevelChange = (level: number, buildPath: string) => {
    updateBuildValue(buildPath, level);
  };
  const updateBuildValue = (buildPath: string, value: any) => {
    const nBuild = { ...build };
    setFieldValue(nBuild, buildPath, value);
    preProcessBuild(value, nBuild, buildPath);
    setBuild(nBuild);
    save(nBuild);
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

      <PageLayout
        leftSidebarContent={
          <BuildsSidebarContent
            currentBuildName={name}
            setBuild={setBuild}
            setOldName={setOldName}
            setName={setName}
            resetBuild={resetBuild}
          />
        }
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
