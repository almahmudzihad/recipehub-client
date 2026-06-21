"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH RECIPES ----------------
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/recipes`
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
  }, []);

  // ---------------- DELETE RECIPE ----------------
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this recipe?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/recipes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setRecipes((prev) =>
          prev.filter((r) => r._id !== id)
        );
        toast.success("Recipe deleted");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ---------------- FEATURE RECIPE ----------------
  const handleFeature = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/recipes/${id}/feature`,
        {
          method: "PATCH",
        }
      );

      if (res.ok) {
        setRecipes((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, isFeatured: true } : r
          )
        );

        toast.success("Recipe featured");
      }
    } catch (err) {
      toast.error("Failed to feature recipe");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Manage Recipes
        </h1>
        <p className="text-gray-500 mt-2">
          View, edit, delete and feature recipes
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border bg-white dark:bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Author</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Likes</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {recipes.map((r, i) => (
              <tr
                key={r._id}
                className="border-t hover:bg-slate-50 dark:hover:bg-slate-800"
              >

                <td className="p-4">{i + 1}</td>

                <td className="p-4 font-medium">
                  {r.title}
                </td>

                <td className="p-4 text-sm text-gray-500">
                  {r.userName || "Unknown"}
                </td>

                <td className="p-4">{r.category}</td>

                <td className="p-4">❤️ {r.likes || 0}</td>

                <td className="p-4">
                  {r.isFeatured ? (
                    <span className="px-2 py-1 text-xs bg-yellow-200 text-yellow-700 rounded-full">
                      Featured
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                      Normal
                    </span>
                  )}
                </td>

                <td className="p-4 flex gap-2">

                  {/* VIEW */}
                  <Link
                    href={`/recipes/${r._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    View
                  </Link>

                  {/* EDIT */}
                  <Link
                    href={`/dashboard/admin/recipes/edit/${r._id}`}
                    className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
                  >
                    Edit
                  </Link>

                  {/* FEATURE */}
                  {!r.isFeatured && (
                    <button
                      onClick={() =>
                        handleFeature(r._id)
                      }
                      className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                    >
                      Feature
                    </button>
                  )}

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(r._id)
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Delete
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