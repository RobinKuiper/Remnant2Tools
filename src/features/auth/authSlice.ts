import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import { toast } from "react-toastify";

interface Credentials {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
}

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: Error | null;
  credentials: Credentials | null;
}

const credentials =
  typeof localStorage !== "undefined" && localStorage.getItem("google_oauth")
    ? JSON.parse(localStorage.getItem("google_oauth"))
    : null;

export const initialState: AuthState = {
  isLoggedIn: credentials !== null,
  loading: false,
  error: null,
  credentials: credentials,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      // Do logout
      state.isLoggedIn = false;
      state.credentials = null;
      localStorage.removeItem("google_oauth");
    },
    refreshCredentials: (state, payload: PayloadAction<Credentials>) => {
      state.credentials = payload;
      localStorage.setItem("google_oauth", JSON.stringify(payload));
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.credentials = payload;
      state.isLoggedIn = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
