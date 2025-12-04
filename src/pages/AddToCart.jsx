import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCartThunk,
  removeFromCartThunk,
  updateCartQtyThunk,
} from "../redux/thunks/cartThunk";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function AddToCart() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartThunk());
  }, [dispatch]);

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (loading) return <p className="pt-32 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto pt-20 p-6 bg-white text-black min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">Cart is empty</p>
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

          <button className="w-full mt-6 py-3 bg-black text-white rounded">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
