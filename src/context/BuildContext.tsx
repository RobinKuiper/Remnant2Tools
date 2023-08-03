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
  changeName: (oldName: string, newName: string) => void;
}

const BuildsContext = createContext<BuildsContextData>({
  builds: DEFAULT_VALUES.builds,
  saveBuild: () => {
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

    setBuilds(prevState => ({ ...prevState, ...newBuilds }));
    localStorage.setItem("builds", JSON.stringify(newBuilds));
  };

  const changeName = (oldName: string, newName: string) => {
    if (builds[oldName]) {
      saveBuild(newName, builds[oldName]);
      setBuilds(prevState => {
        delete prevState[oldName];

        return { ...prevState };
      });
    }
  };

  return (
    <BuildsContext.Provider
      value={{
        builds,
        saveBuild,
        changeName,
      }}
    >
      {children}
    </BuildsContext.Provider>
  );
};

export { BuildsContext, BuildsProvider };
