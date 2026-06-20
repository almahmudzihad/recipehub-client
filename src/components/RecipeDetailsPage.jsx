"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function RecipeDetailsPage({ recipe }) {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [likes, setLikes] = useState(recipe?.likes || 0);
  const [favorites, setFavorites] = useState(recipe?.favorites || 0);

  const [reportText, setReportText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  console.log("recipe details page", recipe);
  
  const handleLike = async () => {
   try {
    if (!recipe?._id) {
      toast.error("Recipe not loaded");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${recipe._id}/like`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    setLikes((prev) => prev + 1);
    toast.success("Liked!");
  } catch (err) {
    toast.error(err.message);
  }
  };

  // -----------------------------
  // FAVORITE (SAFE VERSION)
  // -----------------------------
  const handleFavorite = async () => {
    try {
      if (!user) {
        toast.error("Please login first");
        return;
      }

      setLoadingFav(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
            recipeId: recipe._id,
            addedAt: new Date(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setFavorites((prev) => prev + 1);
      toast.success("Added to favorites!");
    } catch (err) {
      toast.error(err.message || "Favorite failed");
    } finally {
      setLoadingFav(false);
    }
  };

  // -----------------------------
  // REPORT
  // -----------------------------
  const handleReport = async () => {
    try {
    if (!reportText.trim()) {
      toast.error("Please write a reason");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${recipe._id}/report`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reporterEmail: user?.email,
          reason: reportText,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    toast.success("Report submitted");
    setReportText("");
    setIsOpen(false);
  } catch (err) {
    toast.error(err.message);
  }
  };

  // -----------------------------
  // PURCHASE
  // -----------------------------
  const handlePurchase = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: recipe.price,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Redirecting to payment...");
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  // -----------------------------
  // INGREDIENT SAFE RENDER
  // -----------------------------
  const ingredientsList = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : recipe.ingredients?.split(",") || [];

  return (
    <section className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-5">

        {/* TOP */}
        <div className="grid lg:grid-cols-2 gap-10">

          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-[500px] object-cover rounded-3xl"
          />

          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm">
              {recipe.cuisine}
            </span>

            <h1 className="text-5xl font-bold mt-4">
              {recipe.title}
            </h1>

            <p className="mt-4 text-gray-600">
              {recipe.description}
            </p>

            {/* STATS */}
            <div className="flex gap-6 mt-6">
              <span>❤️ {likes}</span>
              <span>⭐ {favorites}</span>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3 mt-6">

              <Button color="danger" onPress={handleLike}>
                Like
              </Button>

              <Button
                color="warning"
                onPress={handleFavorite}
                isLoading={loadingFav}
              >
                Favorite
              </Button>

              <Button color="success" onPress={handlePurchase}>
                Buy
              </Button>

              <Button
                color="danger"
                variant="bordered"
                onPress={() => setIsOpen(true)}
              >
                Report
              </Button>

            </div>

          </div>
        </div>

        {/* INGREDIENTS */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Ingredients
          </h2>

          <ul className="list-disc pl-5">
            {ingredientsList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* INSTRUCTIONS */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Instructions
          </h2>

          <p className="whitespace-pre-line text-gray-700">
            {recipe.instructions}
          </p>
        </div>
      </div>

      {/* REPORT MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-3">
              Report Recipe
            </h2>

            <textarea
              className="w-full border p-3 rounded-lg"
              rows={4}
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Write reason..."
            />

            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleReport}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Submit
              </button>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}