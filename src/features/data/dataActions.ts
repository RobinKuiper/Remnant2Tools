import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshTokens } from "../../helpers";
import { TIME_BETWEEN_GOOGLE_SAVES } from "../../constants";

const TIME_BETWEEN_SAVES = TIME_BETWEEN_GOOGLE_SAVES; // Time between saves in seconds

export const googleSaveWithDelay = createAsyncThunk("data/google/trigger", async (_, { dispatch, getState }) => {
  const state = getState().data; // Access the data slice state
  const unlocks = state.unlocks; // Replace with your actual data
  const currentTime = new Date().getTime();
  const lastSaveTime = state.lastSave.getTime();
  const timeSinceLastSave = (currentTime - lastSaveTime) / 1000; // Convert to seconds

  if (timeSinceLastSave >= TIME_BETWEEN_SAVES && !state.saving) {
    // We can already save
    return dispatch(googleSave(unlocks));
  } else {
    // Wait for the remaining time before initiating the save
    const delay = (TIME_BETWEEN_SAVES - timeSinceLastSave) * 1000; // Convert to milliseconds
    // Simulate a delay using setTimeout
    await new Promise(resolve => setTimeout(resolve, delay)); // 2-second delay
    // Perform the Google service save operation here
    // Replace the following line with your actual Google service API call
    return dispatch(googleSave(unlocks));
  }
});

export const googleSave = createAsyncThunk("data/google/save", async (unlocks, { rejectWithValue }) => {
  try {
    const tokens = JSON.parse(localStorage.getItem("google_oauth"));
    const result = await fetch("/api/data/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokens,
        unlocks: JSON.stringify(unlocks),
      }),
    });

    const { credentials } = await result.json();
    refreshTokens(credentials);

    return {};
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
