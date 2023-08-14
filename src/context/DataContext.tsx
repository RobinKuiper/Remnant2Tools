import React, { createContext, useEffect, useMemo, useState } from "react";
import { isUnlocked } from "../dataHelpers";
import { graphql, useStaticQuery } from "gatsby";

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
  const { categories } = useStaticQuery(graphql`
    {
      categories: allCategory(filter: { settings: { showIn: { eq: "tracker" } } }) {
        nodes {
          settings {
            fragment
          }
          items {
            category
            onlyDB
            externalId
          }
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

    categories.nodes.forEach(category => {
      const fragment = category.settings.fragment;
      const items = category.items.filter(item => !item.onlyDB || item.onlyDB === false);

      if (!newStatistics[fragment]) {
        newStatistics[fragment] = {
          total: items.length,
          unlocked: 0,
        };
      }

      category.items
        .filter(item => !item.onlyDB || item.onlyDB === false)
        .forEach(item => {
          if (isUnlocked(fragment, item.externalId)) {
            newStatistics[fragment].unlocked++;
            newStatistics.overall.unlocked++;
          }

          newStatistics.overall.total++;
        });
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
      const item = categories.nodes
        .find(cat => cat.settings.fragment === categoryFragment)
        .items.find(i => i.externalId === id);
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
      const data = JSON.parse(storedData);
      if (data.weapons && data.weapons[445]) {
        data.weapons[708] = data.weapons[445];
        delete data.weapons[445];
        localStorage.setItem("data", JSON.stringify(data));
      }

      if (data.rings && data.rings[377]) {
        data.rings[710] = data.rings[377];
        delete data.rings[377];
        localStorage.setItem("data", JSON.stringify(data));
      }
      setUnlocks(prevUnlocks => ({ ...prevUnlocks, ...data }));
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
