import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Coins,
  Gift,
  ShoppingCart,
  PlusCircle,
  Users,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-12 font-[Poppins] relative overflow-hidden">

      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Manage users, products, orders, rewards, and system operations from a
            single control panel.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            to="/location-dashboard"
            title="User Location"
            desc="Monitor and analyze real-time user locations."
            icon={<MapPin size={26} />}
            gradient="from-cyan-600 to-blue-600"
          />

          <DashboardCard
            to="/pay-with-reward"
            title="Pay with Coins"
            desc="Manage payments using reward coin balances."
            icon={<Coins size={26} />}
            gradient="from-emerald-600 to-teal-600"
          />

          <DashboardCard
            to="/reward-dashboard"
            title="Reward Management"
            desc="Assign, track, and control user rewards."
            icon={<Gift size={26} />}
            gradient="from-purple-600 to-pink-600"
          />

          <DashboardCard
            to="/order-dashboard"
            title="Orders"
            desc="Track order status, sales, and fulfillment."
            icon={<ShoppingCart size={26} />}
            gradient="from-orange-600 to-red-600"
          />

          <DashboardCard
            to="/addproduct"
            title="Product Management"
            desc="Add new products and manage inventory."
            icon={<PlusCircle size={26} />}
            gradient="from-indigo-600 to-violet-600"
          />

          <DashboardCard
            to="/user-management"
            title="User Management"
            desc="Control user accounts and access roles."
            icon={<Users size={26} />}
            gradient="from-slate-700 to-gray-900"
          />
          <DashboardCard
            to="/redeem-reward"
            title="Redeem Reward"
            desc="Redeem reward from user accounts."
            icon={<Users size={26} />}
            gradient="from-slate-700 to-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

/* ================= DASHBOARD CARD ================= */
const DashboardCard = ({ to, title, desc, icon, gradient }) => {
  return (
    <Link
      to={to}
      className="
        group bg-white rounded-xl p-6 
        border border-gray-200 
        shadow-sm hover:shadow-lg 
        transition-all duration-300
        hover:border-gray-300
      "
    >
      <div
        className={`
          w-14 h-14 mx-auto flex items-center justify-center
          rounded-xl text-white 
          bg-gradient-to-br ${gradient}
          shadow-md
          group-hover:scale-105 transition
        `}
      >
        {icon}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-600 text-center leading-relaxed">
        {desc}
      </p>
    </Link>
  );
};

export default Dashboard;
