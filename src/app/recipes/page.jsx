"use client";

import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");

  const fetchRecipes = async () => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (cuisine) params.append("cuisine", cuisine);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes?${params.toString()}`
    );

    const data = await res.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, [search, category, cuisine]);

  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      <h1 className="text-4xl font-bold mb-6">
        All Recipes
      </h1>

      {/* 🔍 SEARCH + FILTER BAR */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          className="border p-3 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded-xl"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Dessert</option>
        </select>

        <select
          className="border p-3 rounded-xl"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="">All Cuisine</option>
          <option>Italian</option>
          <option>Indian</option>
          <option>Chinese</option>
          <option>Bangladeshi</option>
        </select>
      </div>

      {/* 🍲 GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}