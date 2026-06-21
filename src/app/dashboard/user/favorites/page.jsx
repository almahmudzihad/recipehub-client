"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function MyFavoritesPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        if (!user?.email) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/favorites/${user.email}`
        );

        const data = await res.json();

        setFavorites(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const handleRemove = async (recipeId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorites/${recipeId}/${user.email}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setFavorites((prev) =>
          prev.filter((item) => item._id !== recipeId)
        );

        toast.success("Removed from favorites");
      }
    } catch (error) {
      toast.error("Remove failed");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Favorites
        </h1>

        <p className="text-gray-500 mt-2">
          Your saved favorite recipes.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-10 text-center">

          <h2 className="text-2xl font-semibold">
            No Favorites Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Add recipes to favorites to see them here.
          </p>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {favorites.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm"
            >

              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-bold">
                  {recipe.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {recipe.category}
                </p>

                <p className="text-gray-500">
                  {recipe.cuisine}
                </p>

                <div className="flex gap-2 mt-5">

                  <Link
                    href={`/recipes/${recipe._id}`}
                    className="flex-1 text-center px-4 py-2 rounded-xl bg-orange-500 text-white"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() =>
                      handleRemove(recipe._id)
                    }
                    className="px-4 py-2 rounded-xl bg-red-500 text-white"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}