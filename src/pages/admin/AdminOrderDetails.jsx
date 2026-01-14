import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetailsThunk } from "../../redux/thunks/orderThunk";
import axiosInstance from "../../api/axiosInstance";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const { orderDetails, fetchingOrderDetails } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrderDetailsThunk(id));
  }, [dispatch, id]);

  if (fetchingOrderDetails || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading order details…
      </div>
    );
  }

  const order = orderDetails;

  /* ================= PRICE ================= */
  const taxableValue = Number(order.taxableValue || 0);
  const gstAmount = Number(order.gstAmount || 0);
  const deliveryCharge = Number(order.deliveryCharge || 0);
  const promiseFee = Number(order.promiseFee || 0);
  const grandTotal = Number(order.grandTotal || 0);

  const cgst = +(gstAmount / 2).toFixed(2);
  const sgst = +(gstAmount / 2).toFixed(2);

  /* ================= DOWNLOADS ================= */
  const downloadFile = async (url, name) => {
    try {
      const res = await axiosInstance.get(url, { responseType: "blob" });
      const fileURL = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(fileURL);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch {
      alert("Download failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4 pb-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow border">

        {/* ================= HEADER ================= */}
        <div className="px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b bg-gray-50">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Orders
            </button>

            <h2 className="mt-2 text-xl font-semibold text-gray-900">
              Order #{order._id.slice(-6)}
            </h2>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                downloadFile(
                  `/orders/invoice/${order._id}`,
                  `invoice-${order._id}.pdf`
                )
              }
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              🧾 Invoice
            </button>

            <button
              onClick={() =>
                downloadFile(
                  `/orders/packing-slip/${order._id}`,
                  `packing-slip-${order._id}.pdf`
                )
              }
              className="px-4 py-2 text-sm rounded-lg border text-gray-700 hover:bg-gray-50"
            >
              📦 Packing Slip
            </button>
          </div>
        </div>

        {/* ================= BODY ================= */}
        <div className="p-6 space-y-8 text-gray-600">

          {/* STATUS */}
          <Section title="Order Status">
            <OrderTimeline
              status={order.orderStatus}
              createdAt={order.createdAt}
            />
          </Section>

          {/* INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">

            <Section title="Customer Details">
              <Info label="Name" value={order.address.fullName} />
              <Info label="Phone" value={order.address.phone} />
            </Section>

            <Section title="Payment Details">
              <Info label="Method" value={order.paymentMethod} />
              <Info label="Status" value={order.paymentStatus} />
              <Info
                label="Grand Total"
                value={`₹${grandTotal.toFixed(2)}`}
                strong
              />
            </Section>

            <Section title="Delivery Address" full>
              <p className="font-medium text-gray-900">
                {order.address.fullName}
              </p>
              <p className="text-gray-700">
                {order.address.houseNo}, {order.address.area}
              </p>
              <p className="text-gray-700">
                {order.address.city}, {order.address.state}
              </p>
              <p className="text-sm text-gray-500">
                Pincode: {order.address.pincode}
              </p>
            </Section>

          </div>

          {/* ITEMS */}
          <Section title="Ordered Items">
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <Th>Product</Th>
                    <Th center>Qty</Th>
                    <Th center>Price</Th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i} className="border-t">
                      <Td>{item.product?.name || "Removed Product"}</Td>
                      <Td center>{item.quantity}</Td>
                      <Td center>₹{item.priceAtThatTime}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* PRICE */}
          <Section title="Price Breakdown">
            <Row label="Taxable Value" value={taxableValue} />
            <Row label="Delivery Charges" value={deliveryCharge} />
            <Row label="CGST (9%)" value={cgst} />
            <Row label="SGST (9%)" value={sgst} />
            {promiseFee > 0 && <Row label="Promise Fee" value={promiseFee} />}
            <hr className="my-3" />
            <Row label="Grand Total" value={grandTotal} bold />
          </Section>

        </div>
      </div>

      {/* TOAST */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg">
          ✅ Download successful
        </div>
      )}
    </div>
  );
}

/* ================= UI HELPERS ================= */

const Section = ({ title, children, full }) => (
  <div className={`border rounded-xl p-5 ${full ? "md:col-span-2" : ""}`}>
    <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
    {children}
  </div>
);

const Info = ({ label, value, strong }) => (
  <p className="text-sm">
    <span className="text-gray-500">{label}: </span>
    <span className={strong ? "font-semibold text-gray-900" : ""}>
      {value}
    </span>
  </p>
);

const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between text-sm ${bold ? "font-bold" : ""}`}>
    <span>{label}</span>
    <span>₹{Number(value).toFixed(2)}</span>
  </div>
);

const Th = ({ children, center }) => (
  <th className={`p-3 text-gray-600 ${center ? "text-center" : "text-left"}`}>
    {children}
  </th>
);

const Td = ({ children, center }) => (
  <td className={`p-3 ${center ? "text-center" : "text-left"}`}>
    {children}
  </td>
);

/* ================= TIMELINE ================= */

function OrderTimeline({ status, createdAt }) {
  const steps = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
  const activeIndex = steps.indexOf(status);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const active = index <= activeIndex && status !== "Cancelled";
        const cancelled = step === "Cancelled" && status === "Cancelled";

        return (
          <div key={step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  cancelled
                    ? "bg-red-500"
                    : active
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
              {index !== steps.length - 1 && (
                <div className="w-[2px] h-8 bg-gray-200" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{step}</p>
              {step === status && (
                <p className="text-xs text-gray-500">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
