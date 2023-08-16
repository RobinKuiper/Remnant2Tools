import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Statistics from "../../pages/tracker/statistics";
import {Build} from "../../interface/Build";
import data from "../../data/data.json";

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

const getUnlocksFromLocalStorage = (): number[] => {
  let unlocks = [];
  const storedData = localStorage.getItem("data");
  if (storedData) {
    unlocks = JSON.parse(storedData);
    if (!Array.isArray(unlocks)) {
      // Data isn't converted to the new array structure yet
      unlocks = convertDataToNewArrayStructure(unlocks);
    }
  }
  return unlocks;
}

const getBuildsFromLocalStorage = (): Builds => {
  let builds = {};
  const storedBuilds = localStorage.getItem("builds");
  if (storedBuilds) {
    builds = JSON.parse(storedBuilds);
  }
  return builds;
}

const calculateStatistics = (categories, unlocks) => {
  const statistics: Statistics = {
    overall: {
      total: 0,
      unlocked: 0,
    },
  };

  Object.values(categories).forEach((category) => {
    const fragment = category.settings.fragment;
    const items = category.items.filter(item => !item.onlyDB || item.onlyDB === false);

    if (!statistics[fragment]) {
      statistics[fragment] = {
        total: items.length,
        unlocked: 0,
      };
    }

    category.items
      .filter(item => !item.onlyDB || item.onlyDB === false)
      .forEach(item => {
        if (unlocks.includes(item.id)) {
          statistics[fragment].unlocked++;
          statistics.overall.unlocked++;
        }

        statistics.overall.total++;
      });
  });

  return statistics
};

interface Builds {
  [name: string]: Build;
}

interface DataState {
  unlocks: number[];
  statistics: Statistics;
  builds: Builds;
}

const unlocks = getUnlocksFromLocalStorage();
const initialState: DataState = {
  unlocks,
  statistics: calculateStatistics(data, unlocks),
  builds: getBuildsFromLocalStorage()
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    toggleUnlock: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.unlocks.includes(id)) {
        state.unlocks = state.unlocks.filter(value => value !== id);
      } else {
        state.unlocks.push(id);
      }
      localStorage.setItem("data", JSON.stringify(state.unlocks));
      state.statistics = calculateStatistics(data, state.unlocks);
    },
    isUnlocked: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      return state.unlocks.includes(id)
    },
    saveBuild: (state, action: PayloadAction<{ name: string, build: Build }>) => {
      let { name, build } = action.payload;
      if (name === "") {
        name = "New build";
        let index = 1;
        while (state.builds[name]) {
          name = `New build ${index}`;
          index++;
        }
      }

      state.builds[name] = build
      localStorage.setItem("builds", JSON.stringify(state.builds))
    },
    deleteBuild: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      if (state.builds[name]) {
        delete state.builds[name];
        localStorage.setItem("builds", JSON.stringify(state.builds))
      }
    },
    copyBuild: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      let newName = `${name} (copy)`;
      let index = 1;
      while (state.builds[newName]) {
        newName = `${newName} (copy ${index})`;
        index++;
      }

      state.builds[newName] = state.builds[name]
      localStorage.setItem("builds", JSON.stringify(state.builds))
    },
    changeName: (state, action: PayloadAction<{ oldName: string, newName: string }>) => {
      const { oldName, newName } = action.payload;
      if (state.builds[oldName]) {
        state.builds[newName] = state.builds[oldName]
        delete state.builds[oldName]
        localStorage.setItem("builds", JSON.stringify(state.builds))
      }
    },
    updateUnlocks: state => {
      state.unlocks = getUnlocksFromLocalStorage();
    },
    updateBuilds: state => {
      state.builds = getBuildsFromLocalStorage();
    },
  }
});

export const { toggleUnlock, isUnlocked, saveBuild, deleteBuild, copyBuild, changeName, updateUnlocks, updateBuilds } = dataSlice.actions;

export default dataSlice.reducer;