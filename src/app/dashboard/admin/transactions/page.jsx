"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const { data: token } = await authClient.token();
      if (!token?.token) {
        
        setTransactions([]);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/transactions`,
        {
          headers: {
            authorization: `Bearer ${token.token}`,
          },
        }
      );

      if (!res.ok) {
        console.log("STATUS:", res.status);
        setTransactions([]);
        return;
      }

      const data = await res.json();

      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  fetchTransactions();
}, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        💰 Transactions
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border bg-white dark:bg-slate-900">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-800">
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                className="border-t hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td className="p-3">{t.userEmail}</td>
                <td className="p-3 capitalize">
                  {t.paymentType}
                </td>
                <td className="p-3">${t.amount}</td>
                <td className="p-3 text-xs">
                  {t.transactionId}
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                    {t.paymentStatus}
                  </span>
                </td>
                <td className="p-3 text-sm">
                  {new Date(t.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}