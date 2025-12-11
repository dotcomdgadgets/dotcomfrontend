import { createSlice } from "@reduxjs/toolkit";
import {
  placeOrderThunk,
  getMyOrdersThunk,
  getOrderDetailsThunk,
} from "../thunks/orderThunk";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    successOrder: null,
    myOrders: [],
    orderDetails: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // PLACE ORDER
    builder
      .addCase(placeOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successOrder = action.payload.order;
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // GET MY ORDERS
    builder
      .addCase(getMyOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // GET ORDER DETAILS  
    builder
      .addCase(getOrderDetailsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;


