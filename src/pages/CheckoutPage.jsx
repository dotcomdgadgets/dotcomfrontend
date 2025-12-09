import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartThunk } from "../redux/thunks/cartThunk";
import { fetchAddresses } from "../redux/thunks/addressThunk";
import { useNavigate } from "react-router-dom";
import { placeOrderThunk } from "../redux/thunks/orderThunk";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.address);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    dispatch(fetchCartThunk());
    dispatch(fetchAddresses());
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr ? defaultAddr._id : addresses[0]._id);
    }
  }, [addresses]);

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const placeOrder = () => {
  if (!selectedAddress) {
    alert("Please select a delivery address");
    return;
  }

  dispatch(
    placeOrderThunk({
      addressId: selectedAddress,
      paymentMethod,
    })
  ).then((res) => {
    if (!res.error) {
      navigate("/order-success");  // Redirect after success
    } else {
      alert("Order failed. Try again.");
    }
  });
};


  return (
    <div className="max-w-4xl mx-auto pt-20 p-6 bg-white min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* ============================
          DELIVERY ADDRESS
      ============================ */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Select Delivery Address</h2>

        {addresses.length === 0 ? (
          <p className="text-gray-600">No saved address found.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <label
                key={address._id}
                className={`border p-4 rounded-lg flex items-start gap-4 cursor-pointer transition 
             ${selectedAddress === address._id ? "border-black bg-gray-100" : "border-gray-300"}`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === address._id}
                  onChange={() => setSelectedAddress(address._id)}
                  className="mt-1"
                />

                <div>
                  <p className="font-semibold">{address.fullName}</p>
                  <p>{address.houseNo}, {address.area}</p>
                  <p>{address.city}, {address.state} - {address.pincode}</p>
                  <p className="text-gray-600">Phone: {address.phone}</p>

                  {address.isDefault && (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded mt-2 inline-block">
                      Default
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
      </section>

      <hr className="my-6" />

      {/* ============================
          ORDER SUMMARY
      ============================ */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>

        {items.map((item) => (
          <div key={item._id} className="flex justify-between py-2 border-b">
            <img
                src={item.product.image[0]}
                className="w-20 h-20 object-cover rounded"
              />
            <span>{item.product.name} × {item.quantity}</span>
            <span>₹{item.product.price * item.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between text-xl font-bold mt-4">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </section>

      <hr className="my-6" />

      {/* ============================
          PAYMENT METHOD
      ============================ */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery (COD)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "Online"}
            onChange={() => setPaymentMethod("Online")}
          />
          Online Payment
        </label>
      </section>

      <button
        onClick={placeOrder}
        className="w-full mt-8 py-3 bg-black text-white rounded text-lg font-semibold"
      >
        Place Order
      </button>
    </div>
  );
}
