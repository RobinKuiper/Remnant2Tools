import { configureStore } from "@reduxjs/toolkit";
import authReducer, { initialState as authState } from "./features/auth/authSlice";
import dataReducer, { initialState as dataState } from "./features/data/dataSlice";
import settingsReducer, { initialState as SettingsState } from "./features/settings/settingsSlice";

export const initialStates = {
  auth: authState,
  data: dataState,
  settings: SettingsState,
};

// const createStore = () => configureStore({
//   reducer: {
//     auth: authReducer,
//     data: dataReducer,
//     settings: settingsReducer,
//   },
// });

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    settings: settingsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

// type ConfiguredStore = ReturnType<typeof createStore>
// type StoreGetState = ConfiguredStore["getState"]
// export type RootState = ReturnType<StoreGetState>
// export type AppDispatch = ConfiguredStore["dispatch"]
//
// export default createStore
