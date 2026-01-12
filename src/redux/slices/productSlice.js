import { createSlice } from "@reduxjs/toolkit";
import {
  addProductThunk,
  fetchProductsThunk,
  fetchSingleProductThunk,
  deleteProductThunk,
} from "../thunks/productThunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    singleProduct: null,
    loading: false,
    error: null,
    success: false,
    hasFetched: false, // ✅ IMPORTANT FOR UX
  },

  reducers: {
    resetStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= ADD PRODUCT ================= */
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (action.payload) {
          state.products.unshift(action.payload);
        }
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH PRODUCTS ================= */
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.hasFetched = true; // ✅ API finished
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hasFetched = true; // ✅ API finished even on error
      })

      /* ================= FETCH SINGLE PRODUCT ================= */
      .addCase(fetchSingleProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE PRODUCT ================= */
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );
      });
  },
});

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer;
