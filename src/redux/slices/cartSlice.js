import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCartThunk,
  addToCartThunk,
  removeFromCartThunk,
  updateCartQtyThunk,
} from "../thunks/cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(updateCartQtyThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
