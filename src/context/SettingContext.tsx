import React, { createContext, useEffect, useState } from "react";

const DEFAULT_VALUES = {
  darkMode: true,
  hideUnlocked: false,
};

interface SettingContextData {
  darkMode: boolean;
  toggleDarkMode: () => void;
  hideUnlocked: boolean;
  toggleHideUnlocked: () => void;
}

const SettingContext = createContext<SettingContextData>({
  darkMode: DEFAULT_VALUES.darkMode,
  toggleDarkMode: () => {
    return;
  },
  hideUnlocked: DEFAULT_VALUES.hideUnlocked,
  toggleHideUnlocked: () => {
    return;
  },
});

interface Props {
  children: React.ReactNode;
}

const SettingProvider: React.FC<Props> = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState<boolean>(DEFAULT_VALUES.darkMode);
  const [hideUnlocked, setHideUnlocked] = useState<boolean>(DEFAULT_VALUES.hideUnlocked);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(localStorage.getItem("darkMode") === "dark");
    }

    if (localStorage.getItem("hideUnlocked")) {
      setHideUnlocked(localStorage.getItem("hideUnlocked") === "yes");
    }
  }, []);

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode ? "dark" : "light");
    setDarkMode(!darkMode);
  };

  const toggleHideUnlocked = () => {
    localStorage.setItem("hideUnlocked", hideUnlocked ? "no" : "yes");
    setHideUnlocked(!hideUnlocked);
  };

  return (
    <SettingContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        hideUnlocked,
        toggleHideUnlocked,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export { SettingContext, SettingProvider };
