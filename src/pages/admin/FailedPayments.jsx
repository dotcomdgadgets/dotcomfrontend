import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function FailedPayments() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/admin/payment-logs?status=FAILED")
      .then((res) => setLogs(res.data));
  }, []);

  return (
    <div className="p-8 pt-24">
      <h2 className="text-2xl font-bold text-red-600 mb-6">
        Failed Payments
      </h2>

      <div className="bg-white rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-red-50">
            <tr>
              <th className="p-3">User</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t">
                <td className="p-3">{log.user?.email}</td>
                <td>₹{log.amount}</td>
                <td className="text-red-600">
                  {log.reason}
                </td>
                <td>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
