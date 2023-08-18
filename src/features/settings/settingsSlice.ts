import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const storedView = localStorage.getItem("view");
const view = storedView === "list" ? "list" : "grid";
const storedShowRedacted = localStorage.getItem("showRedacted");
const showRedacted = storedShowRedacted === "true";
const storedHideUnlocked = localStorage.getItem("hideUnlocked");
const hideUnlocked = storedHideUnlocked === "true";

interface SettingsState {
  showSidebar: boolean;
  view: "list" | "grid";
  showRedacted: boolean;
  hideUnlocked: boolean;
}

const initialState: SettingsState = {
  showSidebar: false,
  view,
  showRedacted,
  hideUnlocked,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.showSidebar = !state.showSidebar;
    },
    setView: (state, action: PayloadAction<"list" | "grid">) => {
      state.view = action.payload;
      localStorage.setItem("view", state.view);
    },
    toggleView: state => {
      state.view = state.view === "grid" ? "list" : "grid";
      localStorage.setItem("view", state.view);
    },
    toggleShowRedacted: state => {
      state.showRedacted = !state.showRedacted;
      localStorage.setItem("showRedacted", state.showRedacted);
    },
    toggleHideUnlocked: state => {
      state.hideUnlocked = !state.hideUnlocked;
      localStorage.setItem("hideUnlocked", state.hideUnlocked);
    },
  },
});

export const { toggleSidebar, setView, toggleView, toggleShowRedacted, toggleHideUnlocked } = settingsSlice.actions;

export default settingsSlice.reducer;
