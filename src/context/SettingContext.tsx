import React, { createContext, useEffect, useMemo, useState } from "react";

const DEFAULT_VALUES = {
  darkMode: true,
  hideUnlocked: false,
  showSettings: false,
  defaultView: "list",
  defaultShowRedacted: false,
};

interface SettingContextData {
  darkMode: boolean;
  hideUnlocked: boolean;
  showSettings: boolean;
  view: string;
  defaultShowRedacted: boolean;
  toggleDarkMode: () => void;
  toggleHideUnlocked: () => void;
  toggleShowSettings: () => void;
  toggleView: () => void;
  toggleDefaultShowRedacted: () => void;
}

const SettingContext = createContext<SettingContextData>({
  darkMode: DEFAULT_VALUES.darkMode,
  hideUnlocked: DEFAULT_VALUES.hideUnlocked,
  showSettings: DEFAULT_VALUES.showSettings,
  view: DEFAULT_VALUES.defaultView,
  defaultShowRedacted: DEFAULT_VALUES.defaultShowRedacted,
  toggleDarkMode: () => {},
  toggleHideUnlocked: () => {},
  toggleShowSettings: () => {},
  toggleView: () => {},
  toggleDefaultShowRedacted: () => {},
});

interface Props {
  children: React.ReactNode;
}

const SettingProvider: React.FC<Props> = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState<boolean>(DEFAULT_VALUES.darkMode);
  const [hideUnlocked, setHideUnlocked] = useState<boolean>(DEFAULT_VALUES.hideUnlocked);
  const [showSettings, setShowSettings] = useState<boolean>(DEFAULT_VALUES.showSettings);
  const [view, setView] = useState<string>(DEFAULT_VALUES.defaultView);
  const [defaultShowRedacted, setDefaultShowRedacted] = useState<boolean>(DEFAULT_VALUES.defaultShowRedacted);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === "dark");
    }

    const storedHideUnlocked = localStorage.getItem("hideUnlocked");
    if (storedHideUnlocked) {
      setHideUnlocked(storedHideUnlocked === "yes");
    }

    const storedView = localStorage.getItem("view");
    if (storedView) {
      setView(storedView);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    localStorage.setItem("darkMode", newDarkMode ? "dark" : "light");
    setDarkMode(newDarkMode);
  };

  const toggleHideUnlocked = () => {
    const newHideUnlocked = !hideUnlocked;
    localStorage.setItem("hideUnlocked", newHideUnlocked ? "yes" : "no");
    setHideUnlocked(newHideUnlocked);
  };

  const toggleShowSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleDefaultShowRedacted = () => {
    setDefaultShowRedacted(!defaultShowRedacted);
  };

  const toggleView = () => {
    const newView = view === "list" ? "grid" : "list";
    localStorage.setItem("view", newView);
    setView(newView);
  };

  const contextValue = useMemo(
    () => ({
      darkMode,
      hideUnlocked,
      showSettings,
      view,
      defaultShowRedacted,
      toggleDarkMode,
      toggleHideUnlocked,
      toggleShowSettings,
      toggleView,
      toggleDefaultShowRedacted,
    }),
    [darkMode, hideUnlocked, showSettings, view, defaultShowRedacted],
  );

  return <SettingContext.Provider value={contextValue}>{children}</SettingContext.Provider>;
};

export { SettingContext, SettingProvider };
