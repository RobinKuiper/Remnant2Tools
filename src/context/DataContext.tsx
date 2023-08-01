import React, { createContext, useEffect, useState } from "react";

const DEFAULT_VALUES = {
  unlocks: {},
};

interface Unlocks {
  [key: string]: {
    [id: number]: {
      unlocked: boolean;
    };
  };
}

interface DataContextData {
  unlocks: Unlocks;
  toggleUnlock: (category: string, id: number) => void;
}

const DataContext = createContext<DataContextData>({
  unlocks: DEFAULT_VALUES.unlocks,
  toggleUnlock: () => {
    return;
  },
});

interface Props {
  children: React.ReactNode;
}

const DataProvider: React.FC<Props> = ({ children }: Props) => {
  const [unlocks, setUnlocks] = useState<Unlocks>(DEFAULT_VALUES.unlocks);

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUnlocks(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

  const toggleUnlock = (category: string, id: number) => {
    const newUnlocks = unlocks;
    if (!newUnlocks[category]) {
      newUnlocks[category] = {};
    }

    if (newUnlocks[category][id]) {
      newUnlocks[category][id] = {
        unlocked: !newUnlocks[category][id].unlocked,
      };
    } else {
      newUnlocks[category][id] = {
        unlocked: true,
      };
    }

    setUnlocks(newUnlocks);
    localStorage.setItem("data", JSON.stringify(newUnlocks));
  };

  return (
    <DataContext.Provider
      value={{
        unlocks,
        toggleUnlock,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
