import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function PaymentLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axiosInstance.get("/admin/payment-logs").then((res) => {
      setLogs(res.data);
    });
  }, []);

  return (
    <div className="p-8 pt-24">
      <h2 className="text-2xl font-bold mb-6">Payment Logs</h2>

      <div className="overflow-x-auto bg-white rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t">
                <td className="p-3">
                  {log.user?.email || "User"}
                </td>
                <td>₹{log.amount}</td>
                <td
                  className={
                    log.status === "FAILED"
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {log.status}
                </td>
                <td>{log.reason || "-"}</td>
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
