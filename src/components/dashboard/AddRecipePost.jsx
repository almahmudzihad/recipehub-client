"use client";

import { Button } from "@heroui/react";
import { useState } from "react";

export default function AddRecipePost({ user }) {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    prepTime: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    const recipeData = {
      ...formData,
      likes: 0,
      userEmail: user?.name, // session user email
      userName: user?.name, // session user name
    };

    console.log(recipeData);

    // API Call Here
  };

  return (
    <section className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8 md:p-10">
          
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Add New Recipe
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Share your favorite recipe with the community
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Recipe Title */}
            <div>
              <label className="block mb-2 font-medium">
                Recipe Title
              </label>

              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter recipe title"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-2 font-medium">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                placeholder="Recipe image URL"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            {/* Ingredients */}
            <div>
              <label className="block mb-2 font-medium">
                Ingredients
              </label>

              <textarea
                rows={4}
                name="ingredients"
                required
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Rice, Chicken, Salt..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block mb-2 font-medium">
                Instructions
              </label>

              <textarea
                rows={5}
                name="instructions"
                required
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Step by step instructions..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              
              {/* Cuisine */}
              <div>
                <label className="block mb-2 font-medium">
                  Cuisine Type
                </label>

                <select
                  name="cuisine"
                  required
                  value={formData.cuisine}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                >
                  <option value="">
                    Select Cuisine
                  </option>
                  <option>Italian</option>
                  <option>Mexican</option>
                  <option>Indian</option>
                  <option>Chinese</option>
                  <option>Bangladeshi</option>
                </select>
              </div>

              {/* Prep Time */}
              <div>
                <label className="block mb-2 font-medium">
                  Preparation Time
                </label>

                <input
                  type="number"
                  name="prepTime"
                  required
                  value={formData.prepTime}
                  onChange={handleChange}
                  placeholder="Minutes"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>

              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <option value="">
                  Select Category
                </option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
                <option>Vegan</option>
              </select>
            </div>


            <Button
              type="submit"
              color="warning"
              size="lg"
              className="w-full font-semibold"
            >
              Add Recipe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}