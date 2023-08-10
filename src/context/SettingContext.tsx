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
  defaultView: string;
  defaultShowRedacted: boolean;
  toggleDarkMode: () => void;
  toggleHideUnlocked: () => void;
  toggleShowSettings: () => void;
  changeDefaultView: (view: string) => void;
  toggleDefaultShowRedacted: () => void;
}

const SettingContext = createContext<SettingContextData>({
  darkMode: DEFAULT_VALUES.darkMode,
  hideUnlocked: DEFAULT_VALUES.hideUnlocked,
  showSettings: DEFAULT_VALUES.showSettings,
  defaultView: DEFAULT_VALUES.defaultView,
  defaultShowRedacted: DEFAULT_VALUES.defaultShowRedacted,
  toggleDarkMode: () => {},
  toggleHideUnlocked: () => {},
  toggleShowSettings: () => {},
  changeDefaultView: () => {},
  toggleDefaultShowRedacted: () => {},
});

interface Props {
  children: React.ReactNode;
}

const SettingProvider: React.FC<Props> = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState<boolean>(DEFAULT_VALUES.darkMode);
  const [hideUnlocked, setHideUnlocked] = useState<boolean>(DEFAULT_VALUES.hideUnlocked);
  const [showSettings, setShowSettings] = useState<boolean>(DEFAULT_VALUES.showSettings);
  const [defaultView, setDefaultView] = useState<string>(DEFAULT_VALUES.defaultView);
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

    const storedDefaultView = localStorage.getItem("view");
    if (storedDefaultView) {
      setDefaultView(storedDefaultView);
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

  const changeDefaultView = view => {
    localStorage.setItem("view", view);
    setDefaultView(view);
  };

  const contextValue = useMemo(
    () => ({
      darkMode,
      hideUnlocked,
      showSettings,
      defaultView,
      defaultShowRedacted,
      toggleDarkMode,
      toggleHideUnlocked,
      toggleShowSettings,
      changeDefaultView,
      toggleDefaultShowRedacted,
    }),
    [darkMode, hideUnlocked, showSettings, defaultView, defaultShowRedacted],
  );

  return <SettingContext.Provider value={contextValue}>{children}</SettingContext.Provider>;
};

export { SettingContext, SettingProvider };
