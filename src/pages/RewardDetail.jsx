import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const RewardDetail = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔴 Redeem form state
  const [mobile, setMobile] = useState("");
  const [coins, setCoins] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await axiosInstance.get("/paywithreward");
        setRecords(res?.data?.data || []);
      } catch (err) {
        setError("Failed to load reward payments");
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  /* ================= SUMMARY ================= */
  const summary = useMemo(() => {
    const totalAmount = records.reduce((s, r) => s + Number(r.amount || 0), 0);
    const totalCoins = records.reduce((s, r) => s + Number(r.rewardCoins || 0), 0);
    return { totalAmount, totalCoins };
  }, [records]);

  /* ================= REDEEM HANDLER ================= */
  const handleRedeem = async () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("❌ Invalid mobile number");
      return;
    }

    if (Number(coins) <= 0) {
      alert("❌ Invalid coin amount");
      return;
    }

    try {
      await axiosInstance.post("/paywithreward/redeem", {
        mobile,
        coins: Number(coins),
        note: "Manual admin redemption",
      });

      alert("✅ Reward redeemed successfully");
      setMobile("");
      setCoins("");

    } catch (err) {
      console.error(err);
      alert("❌ Redemption failed");
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-100 px-6 pb-6 text-gray-600">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold mb-6">Reward Management</h2>

        {/* ================= REDEEM PANEL ================= */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Redeem User Rewards</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="User Mobile Number"
              className="border px-4 py-2 rounded"
            />

            <input
              type="number"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              placeholder="Coins to Redeem"
              className="border px-4 py-2 rounded"
            />

            <button
              onClick={handleRedeem}
              className="bg-red-600 text-white rounded px-6 py-2 font-semibold"
            >
              Redeem Coins
            </button>
          </div>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card title="Total Amount" value={currency.format(summary.totalAmount)} />
          <Card title="Total Coins Issued" value={summary.totalCoins} />
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <Th label="Name" />
                <Th label="Mobile" />
                <Th label="Amount" />
                <Th label="Coins" />
                <Th label="Status" />
                <Th label="Date" />
              </tr>
            </thead>

            <tbody>
              {records.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.mobile}</td>
                  <td className="px-4 py-3">{currency.format(item.amount)}</td>
                  <td className="px-4 py-3 font-semibold">{item.rewardCoins}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */
const Th = ({ label }) => (
  <th className="px-4 py-3 text-left">{label}</th>
);

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default RewardDetail;
