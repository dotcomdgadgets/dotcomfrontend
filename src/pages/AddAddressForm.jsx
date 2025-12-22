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
        alert("Address added successfully");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md border border-gray-200 p-6">

        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Add Delivery Address
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your shipping details
        </p>

        <div className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-black text-gray-600"
              placeholder="Enter full name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              inputMode="numeric"
              className="w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-black text-gray-600"
              placeholder="10 digit mobile number"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              inputMode="numeric"
              className="w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-black text-gray-600"
              placeholder="Area pincode"
            />
          </div>

          {/* House */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              House / Flat / Building
            </label>
            <input
              name="houseNo"
              value={form.houseNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-black text-gray-600"
              placeholder="House no, flat, building"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area / Locality
            </label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-black text-gray-600"
              placeholder="Area, street, locality text-gray-600"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-black text-gray-600"
              placeholder="City"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-black text-gray-600"
              placeholder="State"
            />
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Landmark (Optional)
            </label>
            <input
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-black text-gray-600"
              placeholder="Nearby landmark"
            />
          </div>

          {/* Button */}
          <button
            onClick={submitAddress}
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold
            hover:bg-gray-900 transition"
          >
            Save Address
          </button>

        </div>
      </div>
    </div>
  );
}
