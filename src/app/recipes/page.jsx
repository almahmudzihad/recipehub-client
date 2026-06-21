"use client";

import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);

  // 🔍 filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");

  // 📄 pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const fetchRecipes = async () => {
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (cuisine) params.append("cuisine", cuisine);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes?${params.toString()}`
    );

    const data = await res.json();

    setRecipes(data.recipes);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchRecipes();
  }, [page, search, category, cuisine]);

  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-8">
        🍲 All Recipes
      </h1>

      {/* 🔍 SEARCH + FILTER */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page
          }}
          className="border p-3 rounded-xl"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border p-3 rounded-xl"
        >
          <option value="">All Categories</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Dessert</option>
        </select>

        <select
          value={cuisine}
          onChange={(e) => {
            setCuisine(e.target.value);
            setPage(1);
          }}
          className="border p-3 rounded-xl"
        >
          <option value="">All Cuisine</option>
          <option>Italian</option>
          <option>Indian</option>
          <option>Chinese</option>
          <option>Bangladeshi</option>
        </select>
      </div>

      {/* 🍲 RECIPES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>

      {/* 📄 PAGINATION */}
      <div className="flex justify-center items-center gap-3 mt-10">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </section>
  );
}