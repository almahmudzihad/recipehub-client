"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH REPORTS ----------------
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports`
        );

        const data = await res.json();
        setReports(data);
      } catch (err) {
        toast.error("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // ---------------- DISMISS REPORT ----------------
  const handleDismiss = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setReports((prev) =>
          prev.filter((r) => r._id !== id)
        );

        toast.success("Report dismissed");
      }
    } catch (err) {
      toast.error("Failed to dismiss");
    }
  };

  // ---------------- REMOVE RECIPE ----------------
  const handleRemoveRecipe = async (reportId, recipeId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports/${reportId}/remove-recipe`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setReports((prev) =>
          prev.filter((r) => r._id !== reportId)
        );

        toast.success("Recipe removed & report cleared");
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  if (loading) return <p className="p-6">Loading reports...</p>;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Recipe Reports
        </h1>
        <p className="text-gray-500 mt-2">
          Manage user reports and take action
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border bg-white dark:bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Recipe ID</th>
              <th className="p-4 text-left">Reporter</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {reports.map((r, i) => (
              <tr
                key={r._id}
                className="border-t hover:bg-slate-50 dark:hover:bg-slate-800"
              >

                <td className="p-4">{i + 1}</td>

                <td className="p-4 text-sm">
                  {r.recipeId}
                </td>

                <td className="p-4 text-sm">
                  {r.reporterEmail || "Anonymous"}
                </td>

                <td className="p-4">
                  <span className="text-red-500 font-medium">
                    {r.reason}
                  </span>
                </td>

                <td className="p-4">
                  <span className="px-2 py-1 text-xs bg-yellow-200 text-yellow-700 rounded-full">
                    {r.status || "pending"}
                  </span>
                </td>

                <td className="p-4 flex gap-2">

                  {/* REMOVE RECIPE */}
                  <button
                    onClick={() =>
                      handleRemoveRecipe(r._id, r.recipeId)
                    }
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Remove Recipe
                  </button>

                  {/* DISMISS */}
                  <button
                    onClick={() =>
                      handleDismiss(r._id)
                    }
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                  >
                    Dismiss
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}