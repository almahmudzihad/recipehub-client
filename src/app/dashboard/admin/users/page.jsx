"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH USERS ----------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`
        );

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ---------------- BLOCK USER ----------------
  const handleBlock = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}/block`,
        { method: "PATCH" }
      );

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, isBlocked: true } : u
          )
        );

        toast.success("User blocked");
      }
    } catch (err) {
      toast.error("Failed to block user");
    }
  };

  // ---------------- UNBLOCK USER ----------------
  const handleUnblock = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}/unblock`,
        { method: "PATCH" }
      );

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, isBlocked: false } : u
          )
        );

        toast.success("User unblocked");
      }
    } catch (err) {
      toast.error("Failed to unblock user");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Manage Users
        </h1>
        <p className="text-gray-500 mt-2">
          View, block or unblock users
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border bg-white dark:bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Membership</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t hover:bg-slate-50 dark:hover:bg-slate-800"
              >

                <td className="p-4">{index + 1}</td>

                <td className="p-4 font-medium">
                  {user.name}
                </td>

                <td className="p-4 text-sm text-gray-500">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role === "admin" ? (
                    <span className="px-2 py-1 text-xs bg-purple-200 text-purple-700 rounded-full">
                      Admin
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded-full">
                      User
                    </span>
                  )}
                </td>
                <td className="p-4">
                    {user.isPremium ? (
                      <span className="px-2 py-1 text-xs bg-yellow-200 text-yellow-700 rounded-full">
                        Premium
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                        Free
                      </span>
                    )}
                  </td>

                <td className="p-4">
                  {user.isBlocked ? (
                    <span className="text-red-500 font-medium">
                      Blocked
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  )}
                </td>

                <td className="p-4 flex gap-2">

                  {user.isBlocked ? (
                    <button
                      onClick={() =>
                        handleUnblock(user._id)
                      }
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleBlock(user._id)
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Block
                    </button>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}