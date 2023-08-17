import React, {createContext, useEffect, useMemo, useState} from "react";

const DEFAULT_VALUES = {
  darkMode: true,
  hideUnlocked: false,
  showSettings: false,
  defaultView: "grid",
  defaultShowRedacted: false,
};

interface SettingContextData {
  darkMode: boolean;
  hideUnlocked: boolean;
  showSettings: boolean;
  view: string;
  defaultShowRedacted: boolean;
  saving: boolean;
  isMobile: boolean;
  toggleDarkMode: () => void;
  toggleHideUnlocked: () => void;
  toggleShowSettings: () => void;
  toggleView: () => void;
  toggleDefaultShowRedacted: () => void;
  startSaving: () => void;
  stopSaving: () => void;
}

const SettingContext = createContext<SettingContextData>({
  darkMode: DEFAULT_VALUES.darkMode,
  hideUnlocked: DEFAULT_VALUES.hideUnlocked,
  showSettings: DEFAULT_VALUES.showSettings,
  view: DEFAULT_VALUES.defaultView,
  defaultShowRedacted: DEFAULT_VALUES.defaultShowRedacted,
  saving: false,
  isMobile: false,
  toggleDarkMode: () => {},
  toggleHideUnlocked: () => {},
  toggleShowSettings: () => {},
  toggleView: () => {},
  toggleDefaultShowRedacted: () => {},
  startSaving: () => {},
  stopSaving: () => {},
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
  const [saving, setSaving] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

    checkIfMobile();
  }, []);

  // Force grid view if mobile
  useEffect(() => {
    if (isMobile) {
      setView("grid");
    }
  }, [isMobile]);

  const checkIfMobile = () => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Adjust the breakpoint as per your needs

    const handleResize = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Initial check
    setIsMobile(mediaQuery.matches);

    // Listen for changes in the media query
    mediaQuery.addEventListener("change", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  };

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

  const startSaving = () => {
    setSaving(true);
  };

  const stopSaving = () => {
    setTimeout(() => {
      setSaving(false);
    }, 500);
  };

  const contextValue = useMemo(
    () => ({
      darkMode,
      hideUnlocked,
      showSettings,
      view,
      defaultShowRedacted,
      saving,
      toggleDarkMode,
      toggleHideUnlocked,
      toggleShowSettings,
      toggleView,
      toggleDefaultShowRedacted,
      startSaving,
      stopSaving,
    }),
    [darkMode, hideUnlocked, showSettings, view, defaultShowRedacted, saving],
  );

  return <SettingContext.Provider value={contextValue}>{children}</SettingContext.Provider>;
};

export { SettingContext, SettingProvider };
