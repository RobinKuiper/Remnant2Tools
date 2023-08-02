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
      setUnlocks(() => ({ ...JSON.parse(localStorage.getItem("data") ?? "{}") }));
    }
  }, []);

  useEffect(() => {
    updateStatistics();

    // TODO: Remove later
    if (Object.keys(unlocks).length > 0 && !localStorage.getItem("migrated_armor")) {
      if (unlocks.armor) {
        const newUnlocks = unlocks;
        newUnlocks.armorsets = {};
        newUnlocks.armor = {};
        delete newUnlocks.armor;
        setUnlocks(() => ({ ...newUnlocks }));
        localStorage.setItem("data", JSON.stringify(newUnlocks));
      }

      localStorage.setItem("migrated_armor", "yes");
    }
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

  const toggleUnlock = (category: string, id: number, forceUnlock: boolean = false) => {
    const newUnlocks = unlocks;
    if (!newUnlocks[category]) {
      newUnlocks[category] = {};
    }

    if (newUnlocks[category][id]) {
      newUnlocks[category][id] = {
        unlocked: forceUnlock ? true : !newUnlocks[category][id].unlocked,
      };
    } else {
      newUnlocks[category][id] = {
        unlocked: true,
      };
    }

    if (newUnlocks[category][id].unlocked) {
      const item = data[category].filter(i => i.id === parseInt(id as string))[0];
      if (item && item.items) {
        item.items.forEach(i => toggleUnlock(category, i.id, true));
      }
    }

    setUnlocks(prevState => ({ ...prevState, ...newUnlocks }));
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
