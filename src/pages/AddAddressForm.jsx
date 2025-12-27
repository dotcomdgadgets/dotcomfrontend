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
    <div className="min-h-screen bg-[#eafff5] px-4 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h3 className="text-xl font-semibold text-[#0b6b4f]">
          Delivery Address
        </h3>
        <p className="text-sm text-[#0b6b4f]/80 mt-1">
          Please enter your complete shipping details
        </p>

        <hr className="my-5 border-[#7be0b5]" />

        {/* Form */}
        <div className="space-y-4">

          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MintInput
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            <MintInput
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10 digit mobile number"
              inputMode="numeric"
            />
          </div>

          {/* Pincode */}
          <MintInput
            label="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Area pincode"
            inputMode="numeric"
          />

          {/* Address */}
          <MintInput
            label="House / Flat / Building"
            name="houseNo"
            value={form.houseNo}
            onChange={handleChange}
            placeholder="House no, flat, building"
          />

          <MintInput
            label="Area / Locality"
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="Area, street, locality"
          />

          {/* City + State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MintInput
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
            />
            <MintInput
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>

          {/* Landmark */}
          <MintInput
            label="Landmark (Optional)"
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            placeholder="Nearby landmark"
          />

          {/* Submit Button */}
          <button
            onClick={submitAddress}
            className="
              mt-6 w-full py-2.5
              rounded-lg text-sm font-medium
              bg-[#0b6b4f] text-white
              hover:bg-[#095a42]
              transition
            "
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================
   🔹 Compact Professional Input
============================ */
function MintInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  inputMode = "text",
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#0b6b4f] mb-1">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        placeholder={placeholder}
        className="
          w-full px-3 py-2
          rounded-md
          border border-[#b6e7d2]
          bg-[#f5fffb]
          text-sm text-gray-700
          outline-none
          focus:border-[#0b6b4f]
          focus:ring-1 focus:ring-[#0b6b4f]/30
          transition
        "
      />
    </div>
  );
}
