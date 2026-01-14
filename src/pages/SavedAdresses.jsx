import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddresses, deleteAddress } from "../redux/thunks/addressThunk";

const SavedAddresses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addresses = [] } = useSelector((state) => state.address);
  const [selectedAddress, setSelectedAddress] = useState(null);

  /* ================= FETCH ADDRESSES ================= */
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  /* ================= AUTO SELECT DEFAULT ================= */
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr ? defaultAddr._id : addresses[0]._id);
    }
  }, [addresses]);

  const handleDelete = (e, id) => {
    e.stopPropagation(); // prevent radio click
    dispatch(deleteAddress(id));
  };

  return (
    <section className="pt-20 max-w-3xl mx-auto px-4">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Delivery Address
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Select the address where you want your order delivered
          </p>
        </div>

        <button
          onClick={() => navigate("/add-address")}
          className="px-1 py-2 text-sm  text-blue-600 border border-blue-600/30 rounded-lg hover:bg-blue-50 transition"
        >
          + Add New
        </button>
      </div>

      {/* ================= TRUST INFO ================= */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
        <span className="flex items-center gap-1">🔒 Secure Delivery</span>
        <span className="flex items-center gap-1">🧾 GST Invoice</span>
        <span className="flex items-center gap-1">🚚 Fast Shipping</span>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {addresses.length === 0 ? (
        <div className="border rounded-xl bg-gray-50 p-8 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
            className="w-12 mx-auto opacity-80"
            alt="No address"
          />
          <h3 className="text-lg font-semibold mt-4 text-gray-700">
            No saved address
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Add an address to continue with checkout
          </p>

          <button
            onClick={() => navigate("/add-address")}
            className="mt-5 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Add Address
          </button>
        </div>
      ) : (
        <>
          {/* ================= HELPER TEXT ================= */}
          <p className="text-sm text-gray-500 mb-3">
            Orders will be delivered to the selected address.
          </p>

          {/* ================= ADDRESS LIST ================= */}
          <div className="space-y-4">
            {addresses.map((address) => (
              <label
                key={address._id}
                className={`relative flex gap-4 p-4 rounded-xl border cursor-pointer transition shadow-sm
                  ${
                    selectedAddress === address._id
                      ? "border-black bg-gray-100"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
              >
                

                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === address._id}
                  onChange={() => setSelectedAddress(address._id)}
                  className="mt-1"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {address.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.houseNo}, {address.area}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {address.phone}
                  </p>

                  {address.isDefault && (
                    <span className="inline-block mt-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                      Default Address
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => handleDelete(e, address._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </label>
            ))}
          </div>

          {/* ================= FOOTER INFO ================= */}
          <div className="mt-6 text-xs text-gray-500 bg-gray-50 border rounded-lg p-3">
            ℹ You can add or change your delivery address anytime before placing
            the order.
          </div>
        </>
      )}
    </section>
  );
};

export default SavedAddresses;
