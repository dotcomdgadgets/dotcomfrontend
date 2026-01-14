import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrdersThunk } from "../redux/thunks/orderThunk";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const dispatch = useDispatch();
  const { myOrders = [], loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrdersThunk());
  }, [dispatch]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your orders…
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (!myOrders.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Orders"
          className="w-36 opacity-80"
        />
        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          No orders yet
        </h2>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          You haven’t placed any orders yet. Start shopping and your orders will
          appear here.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-20 px-4 pb-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Orders
      </h2>

      <div className="space-y-6">
        {myOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            {/* ================= HEADER ================= */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium text-gray-700">
                    Status:
                  </span>{" "}
                  <span
                    className={`font-semibold ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : order.orderStatus === "Cancelled"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </p>
              </div>

              <Link
                to={`/order/${order._id}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>

            {/* ================= ITEMS ================= */}
            <div className="space-y-3 border-t pt-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item.product?.image?.[0]}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.priceAtThatTime}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-800">
                    ₹{item.quantity * item.priceAtThatTime}
                  </p>
                </div>
              ))}
            </div>

            {/* ================= FOOTER ================= */}
            <div className="flex justify-between items-center mt-5 pt-4 border-t">
              <p className="text-lg font-bold text-gray-900">
                Total: ₹{order.totalAmount}
              </p>

              <Link
                to={`/order/${order._id}`}
                className="px-4 py-2 text-sm font-semibold border rounded-lg hover:bg-gray-100 transition"
              >
                Track Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


