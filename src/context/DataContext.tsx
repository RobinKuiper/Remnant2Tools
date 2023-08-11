import React, { createContext, useEffect, useMemo, useState } from "react";
import { isUnlocked } from "../dataHelpers";
import { graphql, useStaticQuery } from "gatsby";
import { CATEGORIES } from "../constants";

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
  updateUnlocks: () => void;
}

const DataContext = createContext<DataContextData>({
  unlocks: DEFAULT_VALUES.unlocks,
  toggleUnlock: () => {},
  updateLevel: () => {},
  statistics: DEFAULT_VALUES.statistics,
  updateUnlocks: () => {},
});

interface Props {
  children: React.ReactNode;
}

const DataProvider: React.FC<Props> = ({ children }: Props) => {
  const [unlocks, setUnlocks] = useState<Unlocks>(DEFAULT_VALUES.unlocks);
  const [statistics, setStatistics] = useState<Statistics>(DEFAULT_VALUES.statistics);
  const data = useStaticQuery(graphql`
    {
      items: allItem {
        totalCount
        nodes {
          category
          externalId
          onlyDB
        }
      }
    }
  `);

  useEffect(() => {
    updateUnlocks();
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

    const allItems = data.items.nodes;
    allItems
      .filter(item => {
        if (typeof item.onlyDB !== "undefined" && item.onlyDB) {
          return false;
        }

        const categorySettings = CATEGORIES.find(cat => cat.fragment === item.category);
        return !(!categorySettings || categorySettings.onlyDB);
      })
      .forEach(item => {
        const categoryFragment = item.category;

        if (!newStatistics[categoryFragment]) {
          newStatistics[categoryFragment] = {
            total: 0,
            unlocked: 0,
          };
        }

        if (isUnlocked(categoryFragment, item.externalId, unlocks)) {
          newStatistics[categoryFragment].unlocked++;
          newStatistics.overall.unlocked++;
        }

        newStatistics[categoryFragment].total++;
        newStatistics.overall.total++;
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
      const item = data.items.nodes.find(i => i.category === categoryFragment && i.externalId === id);
      if (item && item.items) {
        item.items.forEach(i => toggleUnlock(categoryFragment, i.externalId, true));
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

  const updateUnlocks = () => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setUnlocks(prevUnlocks => ({ ...prevUnlocks, ...JSON.parse(storedData) }));
    }
  };

  const contextValue = useMemo(
    () => ({
      unlocks,
      toggleUnlock,
      updateLevel,
      statistics,
      updateUnlocks,
    }),
    [unlocks, statistics],
  );

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
