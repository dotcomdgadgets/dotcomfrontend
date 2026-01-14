import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";

const MAX_AMOUNT = 150000;

const PayWithReward = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: "",
    rewardCoins: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 💰 Amount logic
    if (name === "amount") {
      let numericValue = Number(value);

      if (numericValue > MAX_AMOUNT) {
        numericValue = MAX_AMOUNT;
      }

      const coins = numericValue > 0 ? Math.ceil(numericValue / 100) : 0;

      setFormData((prev) => ({
        ...prev,
        amount: numericValue === 0 ? "" : numericValue,
        rewardCoins: coins,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 📱 Mobile validation
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      alert("❌ Please enter a valid 10-digit mobile number.");
      return;
    }

    // 💰 Amount validation
    if (
      Number(formData.amount) <= 0 ||
      Number(formData.amount) > MAX_AMOUNT
    ) {
      alert(
        `❌ Amount must be between ₹1 and ₹${MAX_AMOUNT.toLocaleString()}`
      );
      return;
    }

    try {
      const res = await axiosInstance.post("/paywithreward", formData);

      if (res.status === 200 || res.status === 201) {
        alert("✅ Payment submitted successfully!");

        setFormData({
          name: "",
          mobile: "",
          amount: "",
          rewardCoins: 0,
        });
      }
    } catch (error) {
      console.error("PayWithReward error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-blue-100 p-8"
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Pay with Rewards
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Pay securely and earn reward coins instantly
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Mobile Number"
            name="mobile"
            type="tel"
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            value={formData.mobile}
            onChange={handleChange}
            required
            helper="We’ll use this number for verification"
          />

          {/* AMOUNT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount to Pay (₹)
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min={1}
              max={MAX_AMOUNT}
              placeholder={`Max ₹${MAX_AMOUNT.toLocaleString()}`}
              onWheel={(e) => e.target.blur()} // 🚫 disable scroll
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Minimum ₹1</span>
              <span>Maximum ₹{MAX_AMOUNT.toLocaleString()}</span>
            </div>

            {formData.amount && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-green-700 font-medium"
              >
                🎉 You will earn{" "}
                <span className="font-semibold">
                  {formData.rewardCoins}
                </span>{" "}
                reward coin{formData.rewardCoins > 1 ? "s" : ""}
              </motion.p>
            )}
          </div>

          <Input
            label="Reward Coins"
            value={formData.rewardCoins}
            readOnly
            helper="1 coin for every ₹100 spent"
          />

          {/* SUBMIT */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white
              bg-gradient-to-r from-blue-500 to-sky-500
              hover:from-blue-600 hover:to-sky-600
              transition shadow-md"
          >
            Submit Payment
          </motion.button>

          {/* TRUST */}
          <p className="text-xs text-center text-gray-500 mt-4">
            🔒 Secure submission • No card details required
          </p>
        </form>
      </motion.div>
    </div>
  );
};

/* ================= REUSABLE INPUT ================= */
const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
  required = false,
  maxLength,
  helper,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      maxLength={maxLength}
      className={`w-full rounded-lg px-4 py-3 outline-none border
        ${
          readOnly
            ? "bg-gray-50 border-gray-300 text-gray-600"
            : "border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400"
        }`}
    />

    {helper && (
      <p className="text-xs text-gray-500 mt-1">{helper}</p>
    )}
  </div>
);

export default PayWithReward;
