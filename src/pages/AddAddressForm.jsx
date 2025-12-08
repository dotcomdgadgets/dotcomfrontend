import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/thunks/addressThunk"; // adjust path if needed

export default function AddAddressForm({ onSuccess }) {
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
        // onSuccess(); // close modal + refresh list
        alert("address sucessfully added");
      }
    });
  };

  return (
    <div className="p-4 pt-15">
      <div className="grid grid-cols-1 gap-3">

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="state"
          placeholder="State"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="houseNo"
          placeholder="House No / Building"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="area"
          placeholder="Area / Colony / Street"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="landmark"
          placeholder="Landmark (Optional)"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={submitAddress}
        className="w-full mt-5 bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Save Address
      </button>
    </div>
  );
}
