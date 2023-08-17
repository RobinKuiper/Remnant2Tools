import React, {createContext, useEffect, useMemo, useState} from "react";
import type {Build} from "../interface/Build";
import data from "../data/data.json";

const DEFAULT_VALUES = {
  builds: {},
};

interface Builds {
  version?: number;
  [name: number]: Build;
}

interface BuildsContextData {
  builds: Builds;
  saveBuild: (build: Build) => void;
  deleteBuild: (id: number) => void;
  copyBuild: (id: number) => void;
  updateBuilds: () => void;
}

const BuildsContext = createContext<BuildsContextData>({
  builds: DEFAULT_VALUES.builds,
  saveBuild: () => {},
  deleteBuild: () => {},
  copyBuild: () => {},
  updateBuilds: () => {},
});

interface Props {
  children: React.ReactNode;
}

const BuildsProvider: React.FC<Props> = ({ children }: Props) => {
  const [builds, setBuilds] = useState<Builds>(DEFAULT_VALUES.builds);

  useEffect(() => {
    updateBuilds();
  }, []);

  const updateBuilds = () => {
    const storedBuilds = localStorage.getItem("builds");
    if (storedBuilds) {
      const builds: Builds = JSON.parse(storedBuilds);
      let newBuilds = builds;
      if (!newBuilds.version || newBuilds.version !== 2) {
        newBuilds = {};
        let index = 1;
        Object.entries(builds).forEach(([key, build]) => {
          newBuilds[index] = {
            name: key,
            id: index,
            headpiece: build.headpiece?.externalId,
            chest: build.chest?.externalId,
            hands: build.hands?.externalId,
            feet: build.feet?.externalId,
            mainHand: {
              externalId: build.mainHand?.externalId,
              mod: build.mods && build.mods.length > 0 ? build.mods[0]?.externalId : null,
              mutator: build.mutators && build.mutators.length > 0 ? build.mutators[0]?.externalId : null,
            },
            melee: {
              externalId: build.melee?.externalId,
              mod: build.mods && build.mods.length > 1 ? build.mods[1]?.externalId : null,
              mutator: build.mutators && build.mutators.length > 1 ? build.mutators[1]?.externalId : null,
            },
            offhand: {
              externalId: build.offhand?.externalId,
              mod: build.mods && build.mods.length > 2 ? build.mods[2]?.externalId : null,
              mutator: build.mutators && build.mutators.length > 2 ? build.mutators[2]?.externalId : null,
            },
            relic: {
              externalId: build.relic?.externalId,
              fragment1: build.fragments && build.fragments.length > 0 ? build.fragments[0]?.externalId : null,
              fragment2: build.fragments && build.fragments.length > 1 ? build.fragments[1]?.externalId : null,
              fragment3: build.fragments && build.fragments.length > 2 ? build.fragments[2]?.externalId : null,
            },
            amulet: build.amulet?.externalId,
            ring1: build.rings && build.rings.length > 0 ? build.rings[0]?.externalId : null,
            ring2: build.rings && build.rings.length > 1 ? build.rings[1]?.externalId : null,
            ring3: build.rings && build.rings.length > 2 ? build.rings[2]?.externalId : null,
            ring4: build.rings && build.rings.length > 3 ? build.rings[3]?.externalId : null,
            archetype1: {
              externalId: build.archetype1?.externalId,
              trait: build.archetype1?.links?.trait?.externalId,
              level: build.archetype1?.level ?? 0,
            },
            archetype2: {
              externalId: build.archetype2?.externalId,
              trait: build.archetype2?.links?.trait?.externalId,
              level: build.archetype2?.level ?? 0,
            },
            usedTraitPoints: build.usedTraitPoints,
            traitLevels: {},
          };

          if (build.traits) {
            Object.entries(build.traits).forEach(([name, level]) => {
              const trait = data.traits.items.find(item => item.fragment === name);
              if (trait) {
                newBuilds[index].traitLevels[trait.id] = level as number;
              }
            });
          }

          index++;
        });

        localStorage.setItem("builds", JSON.stringify({ ...newBuilds, version: 2 }));
      }

      delete newBuilds.version;
      setBuilds(newBuilds);
    }
  };

  const saveBuild = (build: Build) => {
    const newBuilds = { ...builds };
    newBuilds[build.id] = build;

    setBuilds(newBuilds);
    localStorage.setItem("builds", JSON.stringify({ ...newBuilds, version: 2 }));
  };

  const deleteBuild = (id: number) => {
    if (!id) return;

    const newBuilds = { ...builds };
    delete newBuilds[id];

    setBuilds(newBuilds);
    localStorage.setItem("builds", JSON.stringify({ ...newBuilds, version: 2 }));
  };

  const copyBuild = (id: number) => {
    if (!id) return;

    let newId = 1;
    while (builds[newId]) {
      newId++;
    }

    const copiedBuild = { ...builds[id] };
    copiedBuild.id = newId;
    saveBuild(copiedBuild);
  };

  const contextValue = useMemo(
    () => ({
      builds,
      saveBuild,
      deleteBuild,
      copyBuild,
      updateBuilds,
    }),
    [builds],
  );

  return <BuildsContext.Provider value={contextValue}>{children}</BuildsContext.Provider>;
};

export { BuildsContext, BuildsProvider };
