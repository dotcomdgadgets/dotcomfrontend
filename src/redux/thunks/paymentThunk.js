import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://dotcombackend-xu8o.onrender.com/api/payment";

// 🟢 Create Razorpay Order
export const createPaymentOrderThunk = createAsyncThunk(
  "payment/createOrder",
  async ({ amount }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/create-order`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 15000, // ⏱️ 15 seconds MAX
        }
      );
      return res.data;
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        return rejectWithValue(
          "Payment service is slow. Please try again in a few seconds."
        );
      }
      return rejectWithValue("Failed to create payment order");
    }
  }
);


// 🟢 Verify Payment & Place Order
export const verifyPaymentThunk = createAsyncThunk(
  "payment/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/verify`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Payment verification failed");
    }
  }
);
