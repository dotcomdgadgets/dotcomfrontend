import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No token");
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.get(
        "https://dotcombackend-xu8o.onrender.com/api/useroutes/me"
      );

      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Session expired"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    },

    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logoutUser(state) {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      delete axios.defaults.headers.common["Authorization"];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        } else {
          state.user = null;
        }
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        delete axios.defaults.headers.common["Authorization"];
      });
  },
});

export const { loginUser, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;




