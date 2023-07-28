import React, { createContext, useEffect, useState } from "react";
import { categories } from "../config/constants";
import dataCollection from "../data/dataCollection.json";

const DEFAULT_VALUES = {
  category: "archetypes",
  darkMode: true,
};

interface UserData {
  [category: string]: {
    [id: number]: any;
  };
}

interface CategoryData {
  label: string;
  total: any;
  completed: number;
}

interface DataContextData {
  category: string;
  darkMode: boolean;
  userData: UserData | object;
  categoryInformation: CategoryData[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  toggleDarkMode: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData | object>>;
  setCategoryInformation: React.Dispatch<React.SetStateAction<CategoryData[]>>;
}

const DataContext = createContext<DataContextData>({
  category: DEFAULT_VALUES.category,
  darkMode: DEFAULT_VALUES.darkMode,
  userData: {},
  categoryInformation: [],
  setCategory: () => {
    return;
  },
  toggleDarkMode: () => {
    return;
  },
  setUserData: () => {
    return;
  },
  setCategoryInformation: () => {
    return;
  },
});

interface Props {
  children: React.ReactNode;
}

const DataProvider: React.FC<Props> = ({ children }: Props) => {
  const [category, setCategory] = useState<string>(DEFAULT_VALUES.category);
  const [darkMode, setDarkMode] = useState<boolean>(DEFAULT_VALUES.darkMode);
  const [userData, setUserData] = useState<UserData | object>({});
  const [categoryInformation, setCategoryInformation] = React.useState<CategoryData[]>([]);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(localStorage.getItem("darkMode") === "dark");
    }

    if (localStorage.getItem("data")) {
      setUserData(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

  useEffect(() => {
    setCategoryInformation(
      categories.map(category => {
        const label = category.label,
          id = label.toLowerCase();

        let completed = 0;

        if (userData[id]) {
          Object.values(userData[id]).forEach(item => {
            if (item.unlocked) completed++;
          });
        }

        return {
          label,
          total: dataCollection[id].stats.total,
          completed,
        };
      }),
    );
  }, [userData]);

  const toggleDarkMode = () => {
    localStorage.setItem("mode", !darkMode ? "dark" : "light");
    setDarkMode(!darkMode);
  };

  return (
    <DataContext.Provider
      value={{
        category,
        darkMode,
        userData,
        categoryInformation,
        setCategory,
        toggleDarkMode,
        setUserData,
        setCategoryInformation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
