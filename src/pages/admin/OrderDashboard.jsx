import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyOrdersThunk } from "../../redux/thunks/orderThunk";

export default function OrderDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myOrders = [], loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrdersThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Orders
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Track, review, and manage all your recent orders
          </p>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          {/* LOADING */}
          {loading && (
            <div className="p-10 text-center text-gray-500">
              Loading orders, please wait…
            </div>
          )}

          {/* EMPTY */}
          {!loading && myOrders.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg font-medium">
                No orders found
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Orders placed by users will appear here
              </p>
            </div>
          )}

          {/* TABLE */}
          {!loading && myOrders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <Th>Order ID</Th>
                    <Th>Date</Th>
                    <Th>Amount</Th>
                    <Th>Payment</Th>
                    <Th>Status</Th>
                    <Th align="right">Action</Th>
                  </tr>
                </thead>

                <tbody>
                  {myOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <Td className="font-medium text-gray-900">
                        #{order._id.slice(-6)}
                      </Td>

                      <Td>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Td>

                      <Td className="font-semibold text-gray-900">
                        ₹{order.totalAmount.toFixed(2)}
                      </Td>

                      <Td>
                        <PaymentBadge method={order.paymentMethod} />
                      </Td>

                      <Td>
                        <StatusBadge status={order.orderStatus} />
                      </Td>

                      <Td align="right">
                        <button
                          onClick={() => navigate(`/order/${order._id}`)}
                          className="
                            text-sm font-medium text-blue-600
                            hover:text-blue-800 hover:underline
                          "
                        >
                          View Details
                        </button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* =========================
   TABLE HELPERS
========================= */
const Th = ({ children, align = "left" }) => (
  <th
    className={`px-5 py-3 text-${align} font-semibold text-gray-600`}
  >
    {children}
  </th>
);

const Td = ({ children, align = "left", className = "" }) => (
  <td
    className={`px-5 py-4 text-${align} text-gray-700 ${className}`}
  >
    {children}
  </td>
);

/* =========================
   STATUS BADGE
========================= */
function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

/* =========================
   PAYMENT BADGE
========================= */
function PaymentBadge({ method }) {
  const styles = {
    COD: "bg-gray-100 text-gray-700",
    Online: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[method] || "bg-gray-100 text-gray-700"
      }`}
    >
      {method}
    </span>
  );
}
