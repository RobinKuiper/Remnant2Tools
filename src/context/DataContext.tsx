import React, { createContext, useEffect, useState } from "react";
import { CATEGORIES } from "../constants";
import data from "../data/data.json";

const DEFAULT_VALUES = {
  unlocks: {},
  statistics: {},
};

interface Unlocks {
  [key: string]: {
    [id: number]: {
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
  statistics: Statistics;
}

const DataContext = createContext<DataContextData>({
  unlocks: DEFAULT_VALUES.unlocks,
  toggleUnlock: () => {
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
      setUnlocks(JSON.parse(localStorage.getItem("data") ?? "{}"));
    }
  }, []);

  useEffect(() => {
    updateStatistics();
  }, [unlocks]);

  const updateStatistics = () => {
    const newStatistics: Statistics = {};
    CATEGORIES.forEach(mainCategory => {
      mainCategory.categories.forEach(subCategory => {
        const category = subCategory.label.replace(" ", "").toLowerCase();

        let total = 0;
        if (subCategory.categorized) {
          data[category].forEach(cat => {
            cat.items.forEach(() => {
              total++;
            });
          });
        } else {
          total = data[category].length;
        }

        newStatistics[category] = {
          total: total,
          unlocked: unlocks[category] ? Object.values(unlocks[category]).filter(item => item.unlocked).length : 0,
        };
      });
    });
    setStatistics(newStatistics);
  };

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
    updateStatistics();
  };

  return (
    <DataContext.Provider
      value={{
        unlocks,
        toggleUnlock,
        statistics,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
