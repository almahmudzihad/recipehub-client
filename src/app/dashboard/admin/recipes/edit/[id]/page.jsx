"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditRecipePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    cuisine: "",
    prepTime: "",
    difficulty: "",
    ingredients: "",
    instructions: "",
  });

  // ---------------- FETCH SINGLE RECIPE ----------------
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/recipes/${id}`
        );

        const data = await res.json();

        setForm({
          title: data.title || "",
          image: data.image || "",
          category: data.category || "",
          cuisine: data.cuisine || "",
          prepTime: data.prepTime || "",
          difficulty: data.difficulty || "",
          ingredients: data.ingredients || "",
          instructions: data.instructions || "",
        });
      } catch (err) {
        toast.error("Failed to load recipe");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- SUBMIT UPDATE ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        toast.success("Recipe updated successfully");
        router.push("/dashboard/admin/recipes");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="p-6">Loading recipe...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        Edit Recipe
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-xl border"
      >

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          className="w-full p-3 border rounded"
        />

        {/* IMAGE */}
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border rounded"
        />

        {/* CATEGORY */}
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 border rounded"
        />

        {/* CUISINE */}
        <input
          name="cuisine"
          value={form.cuisine}
          onChange={handleChange}
          placeholder="Cuisine"
          className="w-full p-3 border rounded"
        />

        {/* PREP TIME */}
        <input
          name="prepTime"
          value={form.prepTime}
          onChange={handleChange}
          placeholder="Prep Time"
          className="w-full p-3 border rounded"
        />

        {/* DIFFICULTY */}
        <input
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          placeholder="Difficulty"
          className="w-full p-3 border rounded"
        />

        {/* INGREDIENTS */}
        <textarea
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          placeholder="Ingredients"
          className="w-full p-3 border rounded"
          rows={4}
        />

        {/* INSTRUCTIONS */}
        <textarea
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          placeholder="Instructions"
          className="w-full p-3 border rounded"
          rows={5}
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white p-3 rounded"
        >
          {loading ? "Updating..." : "Update Recipe"}
        </button>

      </form>
    </div>
  );
}