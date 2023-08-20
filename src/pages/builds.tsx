import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import BuildsSidebarContent from "../components/builder/BuildsSidebarContent";
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
import BackgroundImage from "../components/BackgroundImage";
import Layout from "../components/layout/Layout";
import PageLayout from "../components/layout/PageLayout";
import { saveBuilds } from "../features/data/dataSlice";
import { copyObject } from "../helpers";
import { useImmer } from "use-immer";
import { current } from "immer";
import { useAppDispatch } from "../hooks";

const Builds = props => {
  const dispatch = useAppDispatch();
  const storedBuilds = typeof localStorage !== "undefined" && JSON.parse(localStorage.getItem("builds"));
  if (storedBuilds) {
    delete storedBuilds.version;
  }
  const [builds, setBuilds] = useImmer<{ [id: number]: Build }>(storedBuilds ?? {});
  const { images } = props.data;
  const [isItemSelectModalOpen, setIsItemSelectModalOpen] = useState(false);
  const [itemSelectModalFilters, setItemSelectModalFilters] = useState<Filter[]>([]);
  const [activeTab, setActiveTab] = useState<string>("equipment");
  const newBuildCopy = copyObject(NEW_BUILD);
  const [activeBuild, setActiveBuild] = useImmer<Build>(newBuildCopy);
  const [isShowOnlyUnlocked, setIsShowOnlyUnlocked] = useState(false);

  const [buildPath, setBuildPath] = useState<string>("");

  // Set the saved active build as active
  // Or set the top build as active
  useEffect(() => {
    const storedActiveBuildId = localStorage.getItem("activeBuildId");
    const build = Object.values(builds).find(build =>
      storedActiveBuildId ? build.id === parseInt(storedActiveBuildId) : true,
    );
    if (build) {
      setActiveBuild(build);
    }
  }, []);

  // Toggle showing only unlocked items
  const toggleIsHowOnlyUnlocked = () => {
    setIsShowOnlyUnlocked(!isShowOnlyUnlocked);
  };

  // Reset the build to a new build
  const handleResetBuild = () => {
    let newId = 1;
    while (builds[newId]) {
      newId++;
    }
    const copy = { ...copyObject(NEW_BUILD), id: newId };
    setActiveBuild(copy);
  };

  const openModal = (filters: Filter[], buildPath: string) => {
    setBuildPath(buildPath);
    setItemSelectModalFilters(filters);
    setIsItemSelectModalOpen(true);
  };

  // Save active build to builds when changed
  // Save builds to localstorage and update settings
  useEffect(() => {
    setBuilds(draft => {
      draft[activeBuild.id] = activeBuild;
      dispatch(saveBuilds(current(draft)));
    });
  }, [activeBuild]);

  // Update a value from the active build
  const updateBuildValue = (buildPath: string | string[], value: any | any[]) =>
    setActiveBuild(build => {
      if (Array.isArray(buildPath)) {
        buildPath.forEach((bp, index) => {
          setFieldValue(build, bp, value[index]);
        });
      } else {
        setFieldValue(build, buildPath, value);
      }
    });

  const handleSelectItem = (item: Item) => {
    const buildPaths = [buildPath];
    const values = [item.externalId];

    // Item is a weapon and has a mod
    if (item.category === "weapons" && item.links?.mod) {
      const part1 = buildPath.split(".")[0];
      buildPaths.push(`${part1}.mod`);
      values.push(item.links.mod.externalId);
    }

    // Item is a trait
    if (item.category === "traits") {
      const part1 = buildPath.split(".")[0];
      buildPaths.push(`${part1}.trait`);
      values.push(item.links.trait.externalId);
    }

    // Item is a archetype
    if (item.category === "archetypes") {
      const part1 = buildPath.split(".")[0];
      buildPaths.push(`${part1}.level`);
      values.push(1);

      const traitId = item?.links?.trait?.externalId;
      buildPaths.push(`${part1}.trait`);
      values.push(traitId);

      if (activeBuild.traitLevels[traitId]) {
        const points = getFieldValue(activeBuild, `${part1}.level`) ?? 0;
        const traitLevel = activeBuild.traitLevels[traitId];
        if (traitLevel + points > 10) {
          const difference = traitLevel + points - 10;
          buildPaths.push(`traitLevels.${traitId}`);
          values.push(difference < 0 ? 0 : activeBuild.traitLevels[traitId] - difference);
        }
      }
    }

    updateBuildValue(buildPaths, values);
  };

  const handleArchetypeLevelChange = (level: number, buildPath: string) => {
    const buildPaths = [];
    const values = [];

    buildPaths.push(buildPath);
    values.push(level);

    // If we are changing an archetype level, we also need to update the traits
    const part1 = buildPath.split(".")[0];
    const traitId = getFieldValue(activeBuild, `${part1}.trait`);
    if (activeBuild.traitLevels[traitId]) {
      const points = getFieldValue(activeBuild, `${part1}.level`) ?? 0;
      const traitLevel = activeBuild.traitLevels[traitId];
      if (traitLevel + points > 10) {
        const difference = traitLevel + points - 10;
        buildPaths.push(`traitLevels.${traitId}`);
        values.push(difference < 0 ? 0 : activeBuild.traitLevels[traitId] - difference);
      }
    }

    updateBuildValue(buildPaths, values);
  };

  const handleCopyBuild = (id: number) => {
    setBuilds(draft => {
      if (draft[id]) {
        let newId = 1;
        while (draft[newId]) {
          newId++;
        }
        draft[newId] = { ...draft[id], id: newId, name: `${draft[id].name} (copy)` };
        dispatch(saveBuilds(current(draft)));
      }
    });
  };

  const handleDeleteBuild = (id: number) => {
    setBuilds(draft => {
      if (draft[id]) {
        delete draft[id];
        dispatch(saveBuilds(current(draft)));
      }
    });
  };

  return (
    <Layout>
      <Head
        title="Builder"
        description={
          "Get ready to rock your ideal builds with the Remnant 2 builder – " +
          "your go-to for saving all those awesome creations in style!"
        }
      />

      <PageLayout
        leftSidebarContent={
          <BuildsSidebarContent
            builds={builds}
            build={activeBuild}
            setBuild={setActiveBuild}
            resetBuild={handleResetBuild}
            deleteBuild={handleDeleteBuild}
            copyBuild={handleCopyBuild}
          />
        }
        rightSidebarContent={<BuildStatisticsSidebarContent build={activeBuild} />}
      >
        <Container>
          <BackgroundImage index={0}>
            <div className="tabs">
              <div className="tabs-menu">
                <div
                  className={`${activeTab === "archetypes" ? "active" : ""} tabs-menu-item`}
                  onClick={() => setActiveTab("archetypes")}
                >
                  Archetypes
                </div>
                <div
                  className={`${activeTab === "equipment" ? "active" : ""} tabs-menu-item`}
                  onClick={() => setActiveTab("equipment")}
                >
                  Equipment
                </div>
                <div
                  className={`${activeTab === "traits" ? "active" : ""} tabs-menu-item`}
                  onClick={() => setActiveTab("traits")}
                >
                  Traits
                </div>
              </div>

              <Settings
                build={activeBuild}
                setBuild={setActiveBuild}
                onlyUnlocked={isShowOnlyUnlocked}
                toggleOnlyUnlocked={toggleIsHowOnlyUnlocked}
              />

              <div className="tabs-content">
                <div className="tabs-content-item">
                  {activeTab === "equipment" && (
                    <BuildInterface build={activeBuild} images={images.nodes} openModal={openModal} />
                  )}

                  {activeTab === "traits" && (
                    <TraitsInterface
                      build={activeBuild}
                      showOnlyUnlocked={isShowOnlyUnlocked}
                      updateBuildValue={updateBuildValue}
                    />
                  )}

                  {activeTab === "archetypes" && (
                    <ArchetypesInterface
                      build={activeBuild}
                      openModal={openModal}
                      images={images.nodes}
                      handleLevelChange={handleArchetypeLevelChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </BackgroundImage>
        </Container>
      </PageLayout>

      <ItemSelectModal
        setIsOpen={setIsItemSelectModalOpen}
        isOpen={isItemSelectModalOpen}
        filters={itemSelectModalFilters}
        callback={handleSelectItem}
        onlyShowUnlocked={isShowOnlyUnlocked}
      />
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
