import React, { createContext, useEffect, useState } from "react";

const DEFAULT_VALUES = {
  category: "archetypes",
  darkMode: true,
};

interface UserData {
  [category: string]: {
    [id: number]: any;
  };
}

interface DataContextData {
  category: string;
  darkMode: boolean;
  userData: UserData | object;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  toggleDarkMode: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData | object>>;
}

const DataContext = createContext<DataContextData>({
  category: DEFAULT_VALUES.category,
  darkMode: DEFAULT_VALUES.darkMode,
  userData: {},
  setCategory: () => {
    return;
  },
  toggleDarkMode: () => {
    return;
  },
  setUserData: () => {
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

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(localStorage.getItem("darkMode") === "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    localStorage.setItem("mode", !darkMode ? "dark" : "light");
    setDarkMode(!darkMode);
  };

  return (
    <DataContext.Provider value={{ category, darkMode, userData, setCategory, toggleDarkMode, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
