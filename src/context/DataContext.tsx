import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { AuthContext } from "./AuthContext";
import { getTimeElapsedInSeconds, refreshTokens } from "../helpers";
import type { ToastOptions, UpdateOptions } from "react-toastify";
import { toast } from "react-toastify";
import { FaGoogleDrive } from "react-icons/fa";
import { MAX_GOOGLE_SAVE_TIME } from "../constants";

const TOAST_ID = "google-saving-toast";
const DEFAULT_VALUES = {
  unlocks: [],
  statistics: {},
};

interface Statistics {
  [key: string]: {
    total: number;
    unlocked: number;
  };
}

interface DataContextData {
  unlocks: number[];
  toggleUnlock: (id: number) => void;
  updateLevel: (id: number, level: number) => void;
  statistics: Statistics;
  updateUnlocks: () => void;
  waitingForSaveToGoogle: boolean;
}

const DataContext = createContext<DataContextData>({
  unlocks: DEFAULT_VALUES.unlocks,
  toggleUnlock: () => {},
  updateLevel: () => {},
  statistics: DEFAULT_VALUES.statistics,
  updateUnlocks: () => {},
  waitingForSaveToGoogle: false,
});

interface Props {
  children: React.ReactNode;
}

const DataProvider: React.FC<Props> = ({ children }: Props) => {
  const toastId = useRef<string | null>(null);
  const loggedIn = useRef<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [lastGoogleSave, setLastGoogleSave] = useState<Date>(new Date());
  const [waitingForSaveToGoogle, setWaitingForSaveToGoogle] = useState(false);
  const [unlocks, setUnlocks] = useState<number[]>(DEFAULT_VALUES.unlocks);
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

  useEffect(() => {
    loggedIn.current = isLoggedIn;
  }, [isLoggedIn]);

  const updateToast = type => {
    const config: ToastOptions = {
      // type: type === "saved" ? toast.TYPE.SUCCESS : toast.TYPE.INFO,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: type === "saved" ? 5000 : false,
      hideProgressBar: type !== "saved",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressStyle: { background: "green" },
      toastId: TOAST_ID,
      onClose: () => {
        toastId.current = null;
      },
    };

    const contents = (text, className) => (
      <div className={`google-saving-toast ${className}`}>
        <FaGoogleDrive size="25px" color={className === "success" ? "green" : "white"} />
        {text}
      </div>
    );
    let text,
      className = "";
    if (type === "saving") {
      text = "Saving...";
    } else if (type === "pending") {
      text = "Pending changes...";
    } else {
      text = "Saved to Google Drive!";
      className = "success";
    }

    if (toastId.current) {
      const updateConfig: UpdateOptions = config;
      updateConfig.render = contents(text, className);
      delete updateConfig.toastId;
      toast.update(TOAST_ID, config);
    } else {
      toast(contents(text, className), config);
      toastId.current = TOAST_ID;
    }
  };

  const triggerGoogleSave = () => {
    const saveTimeElapsed = getTimeElapsedInSeconds(lastGoogleSave);
    if (saveTimeElapsed < MAX_GOOGLE_SAVE_TIME) {
      if (!waitingForSaveToGoogle) {
        setTimeout(
          () => {
            saveToGoogle();
            setWaitingForSaveToGoogle(false);
            setLastGoogleSave(new Date());
          },
          (MAX_GOOGLE_SAVE_TIME - saveTimeElapsed) * 1000,
        );
        setWaitingForSaveToGoogle(true);
        updateToast("pending");
      }
    } else {
      saveToGoogle();
      setLastGoogleSave(new Date());
    }
  };

  const saveToGoogle = async () => {
    const tokens = JSON.parse(localStorage.getItem("google_oauth"));

    updateToast("saving");

    const result = await fetch("/api/data/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokens,
        unlocks: JSON.stringify(unlocks),
      }),
    });

    const { body } = await result.json();
    refreshTokens(body.credentials);

    updateToast("saved");
  };

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
          if (unlocks.includes(item.externalId)) {
            newStatistics[fragment].unlocked++;
            newStatistics.overall.unlocked++;
          }

          newStatistics.overall.total++;
        });
    });

    setStatistics(newStatistics);
  };

  const toggleUnlock = (id: number) => {
    let newUnlocks = [...unlocks]; // Create a shallow copy of unlocks

    if (newUnlocks.includes(id)) {
      newUnlocks = newUnlocks.filter(value => value !== id);
    } else {
      newUnlocks.push(id);
    }

    setUnlocks(newUnlocks); // Update unlocks state with the newUnlocks object
    localStorage.setItem("data", JSON.stringify(newUnlocks));
    updateStatistics();

    if (loggedIn.current) {
      triggerGoogleSave();
    }
  };

  const updateUnlocks = () => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      let data = JSON.parse(storedData);
      if (!Array.isArray(data)) {
        // Data isn't converted to the new array structure yet
        data = convertDataToNewArrayStructure(data);
      }
      setUnlocks([...data]);
    }
  };

  const convertDataToNewArrayStructure = data => {
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

    const newData = Object.entries(data).flatMap(([category, items]) =>
      Object.entries(items)
        .filter(([id, item]) => item.unlocked)
        .map(([id]) => parseInt(id)),
    );
    localStorage.setItem("data", JSON.stringify(newData));
    return newData;
  };

  const contextValue = useMemo(
    () => ({
      unlocks,
      toggleUnlock,
      statistics,
      updateUnlocks,
      waitingForSaveToGoogle,
    }),
    [unlocks, statistics, waitingForSaveToGoogle],
  );

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };

// IN TOGGLEUNLOCK
// if (newUnlocks[id].unlocked) {
//   const item = categories.nodes
//     .find(cat => cat.settings.fragment === categoryFragment)
//     .items.find(i => i.externalId === id);
//   if (item && item.items) {
//     item.items.forEach(i => toggleUnlock(categoryFragment, i.externalId, true));
//   }
// }

// const updateLevel = (categoryFragment: string, id: number, level: number) => {
//   const newUnlocks = { ...unlocks }; // Create a shallow copy of unlocks
//
//   if (!newUnlocks[categoryFragment]) {
//     newUnlocks[categoryFragment] = {};
//   }
//
//   const unlocked = newUnlocks[categoryFragment][id] ? newUnlocks[categoryFragment][id].unlocked : false;
//   newUnlocks[categoryFragment][id] = {
//     unlocked,
//     level,
//   };
//
//   setUnlocks(newUnlocks); // Update unlocks state with the newUnlocks object
//   localStorage.setItem("data", JSON.stringify(newUnlocks));
// };
