import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Coins,
  Gift,
  ShoppingCart,
  PlusCircle,
  Users
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-blue-100 via-sky-200 to-amber-100 flex flex-col items-center justify-center px-6 py-12 font-[Poppins] relative overflow-hidden">

      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-20 animate-pulse delay-150"></div>

      <div className="z-10 w-full max-w-5xl text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
          📊 Admin Control Center
        </h2>
        <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
          Manage users, products, orders, rewards, and payments from one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Location Dashboard */}
          <Link to="/location-dashboard" className="group dashboard-card hover:border-blue-500">
            <DashboardIcon color="blue">
              <MapPin size={28} />
            </DashboardIcon>
            <h3 className="dashboard-title">User Location Dashboard</h3>
            <p className="dashboard-desc">
              Track and monitor real-time user locations on the map.
            </p>
          </Link>

          {/* Pay with Reward */}
          <Link to="/pay-with-reward" className="group dashboard-card hover:border-amber-500">
            <DashboardIcon color="amber">
              <Coins size={28} />
            </DashboardIcon>
            <h3 className="dashboard-title">Pay with Coins</h3>
            <p className="dashboard-desc">
              Accept payments using reward coins and manage transactions.
            </p>
          </Link>

          {/* Reward Dashboard */}
          <Link to="/reward-dashboard" className="group dashboard-card hover:border-amber-500">
            <DashboardIcon color="amber">
              <Gift size={28} />
            </DashboardIcon>
            <h3 className="dashboard-title">Reward Dashboard</h3>
            <p className="dashboard-desc">
              View, assign, and manage user reward balances.
            </p>
          </Link>

          {/* Order Dashboard */}
          <Link to="/order-dashboard" className="group dashboard-card hover:border-amber-500">
            <DashboardIcon color="amber">
              <ShoppingCart size={28} />
            </DashboardIcon>
            <h3 className="dashboard-title">Order Dashboard</h3>
            <p className="dashboard-desc">
              Track orders, order status, and sales performance.
            </p>
          </Link>

          {/* Add Product */}
          <Link to="/addproduct" className="group dashboard-card hover:border-amber-500">
            <DashboardIcon color="amber">
              <PlusCircle size={28} />
            </DashboardIcon>
            <h3 className="dashboard-title">Add Product</h3>
            <p className="dashboard-desc">
              Add new products and manage your inventory.
            </p>
          </Link>

          {/* User Management */}
          <Link to="/user-management" className="group dashboard-card hover:border-amber-500">
            <DashboardIcon color="amber">
              <Users size={28} />
            </DashboardIcon>
            <h3 className="dashboard-title">User Management</h3>
            <p className="dashboard-desc">
              Manage user accounts, roles, and permissions.
            </p>
          </Link>

        </div>
      </div>

      {/* Reusable Styles */}
      <style>
        {`
          .dashboard-card {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            border: 1px solid transparent;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          .dashboard-card:hover {
            box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          }
          .dashboard-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
            margin-top: 1rem;
          }
          .dashboard-desc {
            font-size: 0.875rem;
            color: #6b7280;
            margin-top: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

const DashboardIcon = ({ children, color }) => {
  const colors = {
    blue: "from-blue-500 to-sky-500",
    amber: "from-amber-400 to-orange-500",
  };

  return (
    <div
      className={`mx-auto w-fit p-4 rounded-full text-white shadow-md bg-gradient-to-br ${colors[color]}`}
    >
      {children}
    </div>
  );
};

export default Dashboard;
