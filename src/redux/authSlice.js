import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
};

export const signup = createAsyncThunk("auth/signup", async (credentials) => {
  const response = await axios.post(
    "https://connections-api.goit.global/users/signup",
    credentials,
  );
  localStorage.setItem("token", response.data.token);
  return response.data;
});

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(
    "https://connections-api.goit.global/users/login",
    credentials,
  );
  localStorage.setItem("token", response.data.token);
  return response.data;
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    await axios.post(
      "https://connections-api.goit.global/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    localStorage.removeItem("token");
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { getState }) => {
    const state = getState();
    if (!state.auth.token) {
      return null;
    }
    const response = await axios.get(
      "https://connections-api.goit.global/users/current",
      {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      },
    );
    return response.data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isLoggedIn = true;
        }
      });
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;