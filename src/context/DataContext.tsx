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
    if (localStorage.getItem("data")) {
      setUnlocks(() => ({ ...JSON.parse(localStorage.getItem("data") ?? "{}") }));
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

      let total = 0;
      if (category.settings.categorized) {
        data[categoryFragment].data.forEach(cat => {
          cat.items.forEach(() => {
            total++;
          });
        });
      } else {
        total = data[categoryFragment].data.length;
      }

      newStatistics[categoryFragment] = {
        total: total,
        unlocked: unlocks[categoryFragment]
          ? Object.values(unlocks[categoryFragment]).filter(item => item.unlocked).length
          : 0,
      };
      newStatistics.overall.total += total;
      newStatistics.overall.unlocked += newStatistics[categoryFragment].unlocked;
    });
    setStatistics(newStatistics);
  };

  const toggleUnlock = (categoryFragment: string, id: number, forceUnlock: boolean = false) => {
    const newUnlocks = unlocks;
    if (!newUnlocks[categoryFragment]) {
      newUnlocks[categoryFragment] = {};
    }

    if (newUnlocks[categoryFragment][id]) {
      newUnlocks[categoryFragment][id] = {
        unlocked: forceUnlock ? true : !newUnlocks[categoryFragment][id].unlocked,
      };
    } else {
      newUnlocks[categoryFragment][id] = {
        unlocked: true,
      };
    }

    if (newUnlocks[categoryFragment][id].unlocked) {
      const item = data[categoryFragment].data.filter(i => i.id === parseInt(id as string))[0];
      if (item && item.items) {
        item.items.forEach(i => toggleUnlock(categoryFragment, i.id, true));
      }
    }

    setUnlocks(prevState => ({ ...prevState, ...newUnlocks }));
    localStorage.setItem("data", JSON.stringify(newUnlocks));
    updateStatistics();
  };

  const updateLevel = (categoryFragment: string, id: number, level: number) => {
    const newUnlocks = unlocks;
    if (!newUnlocks[categoryFragment]) {
      newUnlocks[categoryFragment] = {};
    }

    if (newUnlocks[categoryFragment][id]) {
      newUnlocks[categoryFragment][id].level = level;
    } else {
      newUnlocks[categoryFragment][id] = {
        unlocked: false,
        level,
      };
    }

    setUnlocks(prevState => ({ ...prevState, ...newUnlocks }));
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
