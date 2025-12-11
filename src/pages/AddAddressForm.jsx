import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/thunks/addressThunk";

export default function AddAddressForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    houseNo: "",
    area: "",
    landmark: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitAddress = () => {
    dispatch(addAddress(form)).then((res) => {
      if (!res.error) {
        alert("Address successfully added!");
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-5 pt-10">

      {/* Heading */}
      {/* <h1 className="text-center text-3xl font-semibold">Checkout</h1> */}
      <p className="text-center text-gray-600 mt-1">Shipping address</p>

      {/* Form Card */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">

        {/* Row 1: Full Name + Phone */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          {/* Full Name */}
          <div className="relative">
            <input
              name="fullName"
              onChange={handleChange}
              className="peer w-full border-b-2 border-gray-300 py-2 outline-none text-gray-900 focus:border-black"
              required
            />
            <label
              className="absolute left-0 top-2 text-gray-500 transition-all
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black
              peer-valid:-top-3 peer-valid:text-xs"
            >
              Full Name *
            </label>
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              name="phone"
              onChange={handleChange}
              className="peer w-full border-b-2 border-gray-300 py-2 outline-none text-gray-900 focus:border-black"
              required
            />
            <label
              className="absolute left-0 top-2 text-gray-500 transition-all
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black
              peer-valid:-top-3 peer-valid:text-xs"
            >
              Phone Number *
            </label>
          </div>
        </div>

        {/* Pincode */}
        <div className="relative mb-6">
          <input
            name="pincode"
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 py-2 outline-none text-gray-900 focus:border-black"
            required
          />
          <label
            className="absolute left-0 top-2 text-gray-500 transition-all
            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black
            peer-valid:-top-3 peer-valid:text-xs"
          >
            Pincode *
          </label>
        </div>

        {/* Address Line */}
        <div className="relative mb-6">
          <input
            name="houseNo"
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 py-2 outline-none text-gray-900 focus:border-black"
            required
          />
          <label
            className="absolute left-0 top-2 text-gray-500 transition-all
            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black
            peer-valid:-top-3 peer-valid:text-xs"
          >
            Address Line *
          </label>
        </div>

        {/* Row 2: City + State */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* City */}
          <div className="relative">
            <input
              name="city"
              onChange={handleChange}
              className="peer w-full border-b-2 border-gray-300 py-2 outline-none text-gray-900 focus:border-black"
              required
            />
            <label
              className="absolute left-0 top-2 text-gray-500 transition-all
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black
              peer-valid:-top-3 peer-valid:text-xs"
            >
              City *
            </label>
          </div>

          {/* State */}
          <div className="relative">
            <input
              name="state"
              onChange={handleChange}
              className="peer w-full border-b-2 border-gray-300 py-2 outline-none text-gray-900 focus:border-black"
              required
            />
            <label
              className="absolute left-0 top-2 text-gray-500 transition-all
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black
              peer-valid:-top-3 peer-valid:text-xs"
            >
              State *
            </label>
          </div>
        </div>

        {/* Landmark */}
        <div className="relative mb-6">
          <input
            name="landmark"
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 py-2 outline-none text-gray-900 focus:border-black"
          />
          <label
            className="absolute left-0 top-2 text-gray-500 transition-all
            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black
            peer-valid:-top-3 peer-valid:text-xs"
          >
            Landmark (Optional)
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={submitAddress}
          className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
        >
          Save Address
        </button>
      </div>
    </div>
  );
}
