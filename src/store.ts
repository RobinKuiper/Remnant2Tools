import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/authSlice"
import dataReducer from "./features/data/dataSlice"
import settingsReducer from "./features/settings/settingsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    settings: settingsReducer
  },
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch