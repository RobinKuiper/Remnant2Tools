import React, { createContext, useEffect, useMemo, useState } from "react";
import type { Build } from "../interface/Build";

const DEFAULT_VALUES = {
  builds: {},
};

interface Builds {
  [name: string]: Build;
}

interface BuildsContextData {
  builds: Builds;
  saveBuild: (name: string, build: Build) => void;
  deleteBuild: (name: string) => void;
  copyBuild: (name: string) => void;
  changeName: (oldName: string, newName: string) => void;
  updateBuilds: () => void;
}

const BuildsContext = createContext<BuildsContextData>({
  builds: DEFAULT_VALUES.builds,
  saveBuild: () => {},
  deleteBuild: () => {},
  copyBuild: () => {},
  changeName: () => {},
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
      setBuilds(JSON.parse(storedBuilds));
    }
  };

  const saveBuild = (name: string, build: Build) => {
    if (name === "") {
      name = "New build";
    }
    
    const newBuilds = { ...builds };
    newBuilds[name] = build;

    setBuilds(newBuilds);
    localStorage.setItem("builds", JSON.stringify(newBuilds));
  };

  const deleteBuild = (name: string) => {
    if (!name || name === "") return;

    const newBuilds = { ...builds };
    delete newBuilds[name];

    setBuilds(newBuilds);
    localStorage.setItem("builds", JSON.stringify(newBuilds));
  };

  const copyBuild = (name: string) => {
    if (!name || name === "") return;

    const copiedBuild = { ...builds[name] };
    saveBuild(`${name} Copy`, copiedBuild);
  };

  const changeName = (oldName: string, newName: string) => {
    if (builds[oldName]) {
      const renamedBuild = { ...builds[oldName] };
      deleteBuild(oldName);
      saveBuild(newName, renamedBuild);
    }
  };

  const contextValue = useMemo(
    () => ({
      builds,
      saveBuild,
      deleteBuild,
      copyBuild,
      changeName,
      updateBuilds,
    }),
    [builds],
  );

  return <BuildsContext.Provider value={contextValue}>{children}</BuildsContext.Provider>;
};

export { BuildsContext, BuildsProvider };
