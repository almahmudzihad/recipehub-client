"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Spinner } from "@heroui/react";

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchFeatured = async () => {
        try {
          setLoading(true);

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/featured`
          );

          const data = await res.json();

          // ✅ safety check (IMPORTANT)
          if (!res.ok) {
            setRecipes([]);
            return;
          }

          setRecipes(Array.isArray(data) ? data : []);
        } catch (err) {
          console.log("FETCH FEATURED ERROR:", err);
          setRecipes([]); // prevent crash
        } finally {
          setLoading(false);
        }
      };

      fetchFeatured();
    }, []);

  
  if (loading) return <Spinner />;
    if (recipes.length === 0) return <p>No featured recipes</p>;

  return (
    <section className="py-12 px-5">
      <h2 className="text-3xl font-bold mb-6">
        ⭐ Featured Recipes
      </h2>

      {recipes.length === 0 ? (
        <p>No featured recipes found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <div
              key={r._id}
              className="border rounded-2xl overflow-hidden shadow-sm"
            >
              <img
                src={r.image}
                alt={r.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">{r.title}</h3>
                <p className="text-sm text-gray-500">
                  {r.cuisine} • {r.category}
                </p>

                <Link
                  href={`/recipes/${r._id}`}
                  className="inline-block mt-3 text-orange-500 font-medium"
                >
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}