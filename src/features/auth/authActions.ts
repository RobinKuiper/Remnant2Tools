import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ code }, { rejectWithValue }) => {
    try {
      const result = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });
      const { body: credentials } = await result.json();
      
      // Store credentials in localStorage
      localStorage.setItem("google_oauth", JSON.stringify(credentials));
      return credentials;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)