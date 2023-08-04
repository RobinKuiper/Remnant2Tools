import React, { createContext, useEffect, useState } from "react";
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
}

const BuildsContext = createContext<BuildsContextData>({
  builds: DEFAULT_VALUES.builds,
  saveBuild: () => {
    return;
  },
  deleteBuild: () => {
    return;
  },
  copyBuild: () => {
    return;
  },
  changeName: () => {
    return;
  },
});

interface Props {
  children: React.ReactNode;
}

const BuildsProvider: React.FC<Props> = ({ children }: Props) => {
  const [builds, setBuilds] = useState<Builds>(DEFAULT_VALUES.builds);

  useEffect(() => {
    if (localStorage.getItem("builds")) {
      setBuilds(() => ({ ...JSON.parse(localStorage.getItem("builds") ?? "{}") }));
    }
  }, []);

  const saveBuild = (name: string, build: Build) => {
    if (name === "") return;

    const newBuilds = builds;
    newBuilds[name] = build;

    setNewBuilds(newBuilds);
  };

  const deleteBuild = (name: string) => {
    if (!name || name === "") return;

    const newBuilds = builds;
    delete newBuilds[name];

    setNewBuilds(newBuilds);
  };

  const copyBuild = (name: string) => {
    if (!name || name === "") return;

    saveBuild(`${name} Copy`, builds[name]);
  };

  const changeName = (oldName: string, newName: string) => {
    if (builds[oldName]) {
      saveBuild(newName, builds[oldName]);
      deleteBuild(oldName);
    }
  };

  const setNewBuilds = (builds: Builds) => {
    setBuilds(prevState => ({ ...prevState, ...builds }));
    localStorage.setItem("builds", JSON.stringify(builds));
  };

  return (
    <BuildsContext.Provider
      value={{
        builds,
        saveBuild,
        deleteBuild,
        copyBuild,
        changeName,
      }}
    >
      {children}
    </BuildsContext.Provider>
  );
};

export { BuildsContext, BuildsProvider };
