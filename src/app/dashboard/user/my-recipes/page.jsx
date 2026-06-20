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

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
  const confirmDelete = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${selectedId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setRecipes((prev) =>
          prev.filter((r) => r._id !== selectedId)
        );

        toast.success("Deleted successfully");
      }

      setOpenModal(false);
      setSelectedId(null);
    } catch (err) {
      toast.error("Delete failed");
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

        <table className="w-full border-collapse">

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
              <tr
                key={r._id}
                className="border-t hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >

                <td className="p-4">{i + 1}</td>

                <td className="p-4 font-medium">{r.title}</td>

                <td className="p-4">{r.category}</td>

                <td className="p-4">{r.cuisine}</td>

                <td className="p-4">❤️ {r.likes || 0}</td>

                <td className="p-4 flex gap-2">

                  <Link
                    href={`/recipes/${r._id}`}
                    className="px-3 py-1 rounded bg-blue-500 text-white text-sm"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => confirmDelete(r._id)}
                    className="px-3 py-1 rounded bg-red-500 text-white text-sm"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* DELETE MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-[350px]">

            <h2 className="text-xl font-bold mb-3">
              Delete Recipe?
            </h2>

            <p className="text-gray-500 mb-5">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}