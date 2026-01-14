import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Package, MapPin } from "lucide-react";

export default function OrderSuccess() {
  const { successOrder } = useSelector((state) => state.order);
  const location = useLocation();

  const orderId = successOrder?._id || location.state?.orderId;
  const address = successOrder?.address;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8 text-center">

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-5">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-800">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for shopping with us! Your order has been confirmed.
        </p>

        {/* ORDER ID */}
        {orderId && (
          <div className="mt-4 bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-base font-semibold text-gray-800 break-all">
              {orderId}
            </p>
          </div>
        )}

        {/* DELIVERY INFO */}
        {address && (
          <div className="mt-6 text-left border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
              <MapPin size={18} />
              Delivery Address
            </div>

            <p className="text-sm text-gray-700 font-medium">
              {address.fullName}
            </p>
            <p className="text-sm text-gray-600">
              {address.houseNo}, {address.area}
            </p>
            <p className="text-sm text-gray-600">
              {address.city}, {address.state} - {address.pincode}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Phone: {address.phone}
            </p>
          </div>
        )}

        {/* ORDER STATUS INFO */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-left">
          <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1">
            <Package size={18} />
            What happens next?
          </div>
          <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
            <li>Your order is being processed</li>
            <li>You will receive shipping updates</li>
            <li>Invoice will be available in Orders</li>
          </ul>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/my-orders"
            className="w-full py-3 rounded-lg text-center font-semibold bg-black text-white hover:bg-gray-800 transition"
          >
            View My Orders
          </Link>

          <Link
            to="/"
            className="w-full py-3 rounded-lg text-center font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}


