import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCartThunk,
  removeFromCartThunk,
  updateCartQtyThunk,
} from "../redux/thunks/cartThunk";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  fetchAddresses,
} from "../redux/thunks/addressThunk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddToCart() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  const { addresses } = useSelector((state) => state.address);
  useEffect(() => {
    dispatch(fetchCartThunk());
    dispatch(fetchAddresses());
  }, [dispatch]);

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

  if (loading) return <p className="pt-32 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto pt-20 p-6 bg-white text-black min-h-screen">
      {/* <h2 className="text-2xl font-bold mb-6">Your Cart</h2> */}

      {items.length === 0 ? (
        <div className="text-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            className="w-40 mx-auto opacity-80"
            alt="Empty Cart"
          />

          <h2 className="text-2xl font-bold mt-4">Your cart is empty!</h2>

          <p className="text-gray-600 mt-2">
            Looks like your cart is feeling lonely 😢
            Add something to make it smile 😊
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-5 px-6 py-3 bg-black text-white rounded-lg font-semibold 
                 hover:bg-gray-900 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border-b py-4">
              <img
                src={item.product.image[0]}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-gray-600">₹{item.product.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQtyThunk({
                          cartItemId: item._id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                  >
                    <Minus size={18} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateCartQtyThunk({
                          cartItemId: item._id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCartThunk(item.product._id))}
                className="text-red-600"
              >
                <Trash2 />
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          <button
        onClick={() => navigate("/check-out")}
        className="w-full mt-6 py-3 bg-black text-white rounded"
      >
        Check out Details
      </button>
        </>
      )}
    </div>
  );
}




