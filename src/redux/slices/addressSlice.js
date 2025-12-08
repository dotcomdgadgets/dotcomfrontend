import { createSlice } from "@reduxjs/toolkit";
import { fetchAddresses, addAddress, deleteAddress, updateAddress, setDefaultAddress } from "../thunks/addressThunk";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchAddresses.pending, (state) => { state.loading = true })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })

      // add
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      // delete
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      // update
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      // set default
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      });
  }
});

export default addressSlice.reducer;


