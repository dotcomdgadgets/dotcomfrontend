import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetailsThunk } from "../../redux/thunks/orderThunk";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderDetails, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderDetailsThunk(id));
  }, [dispatch, id]);

  if (loading || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading order details…
      </div>
    );
  }

  const order = orderDetails;

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order #{order._id.slice(-6)}
            </h2>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Orders
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CUSTOMER */}
          <Card title="Customer Details">
            <Info label="Phone" value={order.address.phone} />
          </Card>

          {/* ORDER STATUS */}
          <Card title="Order Status">
            <StatusBadge status={order.orderStatus} />
          </Card>

          {/* ADDRESS */}
          <Card title="Delivery Address">
            <p className="font-medium">{order.address.fullName}</p>
            <p>{order.address.houseNo}, {order.address.area}</p>
            <p>{order.address.city}, {order.address.state}</p>
            <p className="text-sm text-gray-500">
              Pincode: {order.address.pincode}
            </p>
          </Card>

          {/* PAYMENT */}
          <Card title="Payment Info">
            <Info label="Method" value={order.paymentMethod} />
            <Info label="Status" value={order.paymentStatus} />
            <Info label="Total" value={`₹${order.totalAmount}`} strong />
          </Card>
        </div>

        {/* ITEMS */}
        <div className="mt-8">
          <h3 className="font-semibold text-gray-800 mb-3">
            Ordered Items
          </h3>

          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {item.product?.name || "Product deleted"}
                    </td>
                    <td className="p-3 text-center">
                      {item.quantity}
                    </td>
                    <td className="p-3 text-center font-medium">
                      ₹{item.priceAtThatTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ===============================
   REUSABLE COMPONENTS
================================ */

function Card({ title, children }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">
        {title}
      </h4>
      <div className="text-sm text-gray-700 space-y-1">
        {children}
      </div>
    </div>
  );
}

function Info({ label, value, strong }) {
  return (
    <p>
      <span className="text-gray-500">{label}: </span>
      <span className={strong ? "font-semibold" : ""}>
        {value}
      </span>
    </p>
  );
}

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
      className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
