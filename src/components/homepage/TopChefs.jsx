"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PopularRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/popular`
        );

        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  if (loading) return <p className="p-6">Loading popular recipes...</p>;

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-6">
        🔥 Popular Recipes
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="border rounded-xl p-4 bg-white dark:bg-slate-900"
          >
            <h3 className="text-xl font-semibold">
              {recipe.title}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              ❤️ Likes: {recipe.likes || 0}
            </p>

            <p className="text-sm mt-1">
              👨‍🍳 {recipe.userName}
            </p>

            <Link
              href={`/recipes/${recipe._id}`}
              className="inline-block mt-4 text-orange-500"
            >
              View Recipe →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}