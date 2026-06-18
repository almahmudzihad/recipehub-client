"use client";

import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";


export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      <h1 className="text-4xl font-bold mb-10">
        All Recipes
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
          />
        ))}
      </div>
    </section>
  );
}