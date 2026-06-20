"use client";

import { createRecipe } from "@/lib/action/recipe";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import {  toast } from 'react-toastify';

export default function AddRecipePost () {
  const { data: session } = useSession();
    const user = session?.user;
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    prepTime: "",
    category: "",
    difficulty: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    // Upload image to ImgBB
    const imageData = new FormData();
    imageData.append("image", image);

    const uploadRes = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: imageData,
      }
    );

    const uploadResult = await uploadRes.json();

    const imageUrl = uploadResult.data.url;

    const recipeData = {
      title: formData.title,
      image: imageUrl,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      cuisine: formData.cuisine,
      prepTime: Number(formData.prepTime),
      category: formData.category,
      difficulty: formData.difficulty,
      likes: 0,
      userName: session?.user?.name,
      userEmail: session?.user?.email,
      createdAt: new Date(),
      isFeatured: false,
      status: "pending", 

    };
    const res = await createRecipe(recipeData);
    if (res.insertedId) {
        toast.success("Recipe posted successfully!");
        e.target.reset();
        router.push("/dashboard/user");
    }


  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
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
                Recipe Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700"
                required
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
            <div>
              <label className="block mb-2 font-medium">
                Difficulty Level
              </label>

              <select
                name="difficulty"
                required
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <option value="">
                  Select Difficulty
                </option>
                <option value="Easy">
                  Easy
                </option>
                <option value="Medium">
                  Medium
                </option>
                <option value="Hard">
                  Hard
                </option>
              </select>
            </div>


            <Button
              type="submit"
              color="warning"
              size="lg"
              className="w-full"
              isLoading={loading}
            >
              {loading ? "Uploading..." : "Add Recipe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}