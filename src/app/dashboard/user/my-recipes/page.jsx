"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function MyRecipesPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // DELETE modal
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // EDIT modal
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  // ---------------- FETCH ----------------
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (!user?.email) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/recipes?email=${user.email}`
        );

        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        toast.error("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user]);

  // ---------------- DELETE ----------------
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${deleteId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setRecipes((prev) =>
          prev.filter((r) => r._id !== deleteId)
        );
        toast.success("Deleted successfully");
      }

      setOpenDelete(false);
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  // ---------------- EDIT ----------------
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${editData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (res.ok) {
        setRecipes((prev) =>
          prev.map((r) =>
            r._id === editData._id ? editData : r
          )
        );

        toast.success("Updated successfully");
        setOpenEdit(false);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">My Recipes</h1>

        <Link
          href="/dashboard/user/add-recipe"
          className="px-4 py-2 bg-orange-500 text-white rounded-xl"
        >
          Add Recipe
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border bg-white dark:bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Cuisine</th>
              <th className="p-4 text-left">Likes</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {recipes.map((r, i) => (
              <tr key={r._id} className="border-t">

                <td className="p-4">{i + 1}</td>
                <td className="p-4">{r.title}</td>
                <td className="p-4">{r.category}</td>
                <td className="p-4">{r.cuisine}</td>
                <td className="p-4">❤️ {r.likes}</td>

                <td className="p-4 flex gap-2">

                  {/* VIEW */}
                  <Link
                    href={`/recipes/${r._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </Link>

                  {/* EDIT */}
                  <button
                    onClick={() => {
                      setEditData(r);
                      setOpenEdit(true);
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => {
                      setDeleteId(r._id);
                      setOpenDelete(true);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ---------------- DELETE MODAL ---------------- */}
      {openDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px]">

            <h2 className="text-xl font-bold mb-3">
              Delete Recipe?
            </h2>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenDelete(false)}
                className="px-4 py-2 border"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {openEdit && editData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">

            <h2 className="text-xl font-bold">
              Edit Recipe
            </h2>

            <input
              className="w-full border p-2 rounded"
              value={editData.title}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  title: e.target.value,
                })
              }
            />

            <input
              className="w-full border p-2 rounded"
              value={editData.category}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  category: e.target.value,
                })
              }
            />

            <input
              className="w-full border p-2 rounded"
              value={editData.cuisine}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  cuisine: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-2 border"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}