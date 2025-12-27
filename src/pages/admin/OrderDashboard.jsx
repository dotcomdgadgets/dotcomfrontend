import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getMyOrdersThunk } from "../../redux/thunks/orderThunk";

export default function OrderDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myOrders, loading } = useSelector((state) => state.order);


  useEffect(() => {
    dispatch(getMyOrdersThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            My Orders
          </h1>
          <p className="text-sm text-gray-500">
            View and track your recent orders
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading orders...
            </div>
          ) : myOrders.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No orders found
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {myOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-800">
                      #{order._id.slice(-6)}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-gray-800 font-medium">
                      ₹{order.totalAmount}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {order.paymentMethod}
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={order.orderStatus} />
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          navigate(`/order/${order._id}`)
                        }
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}

/* ==========================
   🔹 Status Badge Component
========================== */
function StatusBadge({ status }) {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
