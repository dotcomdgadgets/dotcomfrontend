import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCartThunk,
  removeFromCartThunk,
  updateCartQtyThunk,
} from "../redux/thunks/cartThunk";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddToCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [], loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartThunk());
  }, [dispatch]);

  /* ================= TOTAL ================= */
  const total = items.reduce((acc, item) => {
    if (!item?.product?.price) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);

  if (loading) {
    return <p className="pt-32 text-center text-gray-500">Loading cart…</p>;
  }

  /* ================= EMPTY CART ================= */
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          className="w-36 opacity-80"
          alt="Empty Cart"
        />
        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          Looks like you haven’t added anything yet. Explore products and find
          something you love.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-20 px-4 pb-10 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* ================= CART ITEMS ================= */}
      <div className="md:col-span-2 space-y-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Shopping Cart ({items.length} items)
        </h2>

        {items.map((item) => {
          if (!item?.product) return null;

          return (
            <div
              key={item._id}
              className="bg-white border rounded-xl p-4 flex gap-4 items-center"
            >
              {/* IMAGE */}
              <img
                src={item.product.image?.[0]}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  ₹{item.product.price}
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQtyThunk({
                          cartItemId: item._id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="px-3 text-sm font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQtyThunk({
                          cartItemId: item._id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* PRICE + REMOVE */}
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  ₹{item.product.price * item.quantity}
                </p>

                <button
                  onClick={() =>
                    dispatch(removeFromCartThunk(item.product._id))
                  }
                  className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="bg-white border rounded-xl p-5 h-fit text-gray-700">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm mb-2 text-gray-500">
          <span>Delivery</span>
          <span>Calculated at checkout</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate("/check-out")}
          className="w-full mt-5 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Proceed to Checkout
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          🔒 Secure checkout • GST invoice available
        </p>
      </div>
    </div>
  );
}
