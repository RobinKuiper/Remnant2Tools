import React, { createContext, useEffect, useState } from "react";
import data from "../data/data.json";

const DEFAULT_VALUES = {
  unlocks: {},
  statistics: {},
};

interface Unlocks {
  [key: string]: {
    [id: number]: {
      level?: number;
      unlocked: boolean;
    };
  };
}

interface Statistics {
  [key: string]: {
    total: number;
    unlocked: number;
  };
}

interface DataContextData {
  unlocks: Unlocks;
  toggleUnlock: (category: string, id: number) => void;
  updateLevel: (category: string, id: number, level: number) => void;
  statistics: Statistics;
}

const DataContext = createContext<DataContextData>({
  unlocks: DEFAULT_VALUES.unlocks,
  toggleUnlock: () => {
    return;
  },
  updateLevel: () => {
    return;
  },
  statistics: DEFAULT_VALUES.statistics,
});

interface Props {
  children: React.ReactNode;
}

const DataProvider: React.FC<Props> = ({ children }: Props) => {
  const [unlocks, setUnlocks] = useState<Unlocks>(DEFAULT_VALUES.unlocks);
  const [statistics, setStatistics] = useState<Statistics>(DEFAULT_VALUES.statistics);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setUnlocks(prevUnlocks => ({ ...prevUnlocks, ...JSON.parse(storedData) }));
    }
  }, []);

  useEffect(() => {
    updateStatistics();
  }, [unlocks]);

  const updateStatistics = () => {
    const newStatistics: Statistics = {
      overall: {
        total: 0,
        unlocked: 0,
      },
    };

    Object.values(data).forEach(category => {
      const categoryFragment = category.settings.fragment;
      const categoryData = data[categoryFragment].data;

      const total = category.settings.categorized
        ? categoryData.reduce((acc, cat) => acc + cat.items.length, 0)
        : categoryData.length;

      const categoryUnlocks = unlocks[categoryFragment];
      const unlocked = categoryUnlocks ? Object.values(categoryUnlocks).filter(item => item.unlocked).length : 0;

      newStatistics[categoryFragment] = {
        total,
        unlocked,
      };

      newStatistics.overall.total += total;
      newStatistics.overall.unlocked += unlocked;
    });

    setStatistics(newStatistics);
  };

  const toggleUnlock = (categoryFragment: string, id: number, forceUnlock: boolean = false) => {
    const newUnlocks = { ...unlocks }; // Create a shallow copy of unlocks

    if (!newUnlocks[categoryFragment]) {
      newUnlocks[categoryFragment] = {};
    }

    if (newUnlocks[categoryFragment][id]) {
      newUnlocks[categoryFragment][id].unlocked = forceUnlock ? true : !newUnlocks[categoryFragment][id].unlocked;
    } else {
      newUnlocks[categoryFragment][id] = {
        unlocked: true,
      };
    }

    if (newUnlocks[categoryFragment][id].unlocked) {
      const item = data[categoryFragment].data.find(i => i.id === id);
      if (item && item.items) {
        item.items.forEach(i => toggleUnlock(categoryFragment, i.id, true));
      }
    }

    setUnlocks(newUnlocks); // Update unlocks state with the newUnlocks object
    localStorage.setItem("data", JSON.stringify(newUnlocks));
    updateStatistics();
  };

  const updateLevel = (categoryFragment: string, id: number, level: number) => {
    const newUnlocks = { ...unlocks }; // Create a shallow copy of unlocks

    if (!newUnlocks[categoryFragment]) {
      newUnlocks[categoryFragment] = {};
    }

    const unlocked = newUnlocks[categoryFragment][id] ? newUnlocks[categoryFragment][id].unlocked : false;
    newUnlocks[categoryFragment][id] = {
      unlocked,
      level,
    };

    setUnlocks(newUnlocks); // Update unlocks state with the newUnlocks object
    localStorage.setItem("data", JSON.stringify(newUnlocks));
  };

  return (
    <DataContext.Provider
      value={{
        unlocks,
        toggleUnlock,
        updateLevel,
        statistics,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
