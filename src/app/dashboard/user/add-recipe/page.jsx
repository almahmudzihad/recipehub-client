"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { createRecipe } from "@/lib/action/recipe";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import {  useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [recipeCount, setRecipeCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const router = useRouter();
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 4 * 1024 * 1024; // 4MB
  useEffect(() => {
      const fetchUserInfo = async () => {
        if (!user?.email) return;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard-stats/${user.email}`
          );

          const data = await res.json();

          setRecipeCount(data.totalRecipes);
          setIsPremium(data.isPremium);
        } catch (error) {
          console.log(error);
        } finally {
          setPageLoading(false);
        }
      };

      fetchUserInfo();
    }, [user?.email]);
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

        let imageUrl = "";

        // =========================
        // 1. Try ImgBB upload first
        // =========================
        if (image) {
          try {
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
            console.log("ImgBB response:", uploadResult);

            if (uploadResult?.success) {
              imageUrl = uploadResult.data.url;
            } else {
              console.log("ImgBB failed, fallback to manual URL");
            }
          } catch (err) {
            console.log("ImgBB error:", err);
          }
        }

        // =========================
        // 2. Fallback: manual URL input (if ImgBB fails)
        // =========================
        if (!imageUrl) {
          imageUrl = imageUrlInput; // <-- make sure you added this state
        }

        // =========================
        // 3. Final validation
        // =========================
        if (!imageUrl) {
          toast.error("Please upload an image or provide image URL");
          setLoading(false);
          return;
        }

        // =========================
        // 4. Build recipe object
        // =========================
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

        // =========================
        // 5. Send to backend
        // =========================
        const res = await createRecipe(recipeData);

        if (res?.insertedId) {
          toast.success("Recipe posted successfully!");
          setFormData({
            title: "",
            image: "",
            ingredients: "",
            instructions: "",
            cuisine: "",
            prepTime: "",
            category: "",
            difficulty: "",
          });
          setImage(null);
          setImageUrlInput("");
          router.push("/dashboard/user");
        } else {
          toast.error(res?.message || "Free users can only add 2 recipes");
        }

      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
  // Check if the user is a free user and has reached the recipe limit
    if (pageLoading) {
      return <LoadingSpinner />;
    }

    if (!isPremium && recipeCount >= 2) {
      return (
        <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
          <div className="max-w-xl w-full bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl text-center">

            <h1 className="text-4xl font-bold text-orange-500">
              Recipe Limit Reached 🚫
            </h1>

            <p className="mt-5 text-slate-600 dark:text-slate-300">
              You have already added
              <span className="font-bold"> {recipeCount} </span>
              recipes.
            </p>

            <p className="mt-3 text-slate-500">
              Free users can only add 2 recipes.
              Upgrade to Premium Membership to post unlimited recipes.
            </p>

            <form
              action="/api/checkout_sessions"
              method="POST"
              className="mt-8"
            >
              <input
                type="hidden"
                name="type"
                value="membership"
              />

              <input
                type="hidden"
                name="amount"
                value="10"
              />

              <Button color="warning">
                Become Premium 👑
              </Button>
            </form>

          </div>
        </section>
      );
    }
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
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {isPremium
                ? "Premium User - Unlimited Recipes"
                : `Recipes Used: ${recipeCount}/2`}
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

            
            {/* Image Upload */}
             <div>
                <label className="block mb-2 font-medium">
                  Recipe Image (Upload or Paste URL)
                </label>
                <label className="text-sm text-gray-500">
                  Choose image file (JPG, PNG, WEBP - max 4MB)
                </label>

                <div className="flex gap-4 items-center">
                  {/* File Upload */}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (!file) return;

                      // ❌ Format check
                      if (!allowedTypes.includes(file.type)) {
                        toast.error("Only JPG, PNG, WEBP allowed");
                        e.target.value = "";
                        return;
                      }

                      // ❌ Size check
                      if (file.size > maxSize) {
                        toast.error("Image must be less than 4MB");
                        e.target.value = "";
                        return;
                      }

                      setImage(file);
                    }}
                    className="w-1/2 px-3 py-2 border rounded-xl"
                  />

                  {/* OR text */}
                  <span className="text-sm text-gray-500">OR</span>

                  {/* Manual URL */}
                  <input
                    type="text"
                    placeholder="Paste image URL"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="w-1/2 px-3 py-2 border rounded-xl"
                  />
                </div>
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
                  Preparation Time (in minutes)
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