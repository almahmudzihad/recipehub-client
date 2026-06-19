"use client";

import { useState } from "react";


import { Button } from "@heroui/react";

export default function RecipeDetailsPage({ recipe }) {
  const [likes, setLikes] = useState(recipe?.likes || 0);
  const [favorites, setFavorites] = useState(
    recipe?.favorites || 0
  );

  const [reportText, setReportText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  

  const handleLike = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${recipe._id}/like`,
        {
          method: "PATCH",
        }
      );

      if (res.ok) {
        setLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${recipe._id}/favorite`,
        {
          method: "PATCH",
        }
      );

      if (res.ok) {
        setFavorites((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReport = async () => {
    
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${recipe._id}/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: reportText,
          }),
        }
      );

      setReportText("");
      setIsOpen(false);
      alert("Report submitted");
    } catch (error) {
      console.log(error);
    }
  };

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

      console.log(data);

      alert(
        "Stripe integration page will be opened next."
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Recipe Image */}
          <div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-[500px] object-cover rounded-3xl"
            />
          </div>

          {/* Recipe Content */}
          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
              {recipe.cuisine}
            </span>

            <h1 className="text-5xl font-bold mt-4 text-slate-900 dark:text-white">
              {recipe.title}
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-300">
              {recipe.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Category
                </p>

                <h3 className="font-semibold">
                  {recipe.category}
                </h3>
              </div>

              <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Difficulty
                </p>

                <h3 className="font-semibold">
                  {recipe.difficulty}
                </h3>
              </div>

              <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Cooking Time
                </p>

                <h3 className="font-semibold">
                  {recipe.prepTime}
                </h3>
              </div>

              

            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-8">

              <div className="bg-pink-100 text-pink-600 px-5 py-3 rounded-xl font-semibold">
                ❤️ {likes} Likes
              </div>

              <div className="bg-yellow-100 text-yellow-600 px-5 py-3 rounded-xl font-semibold">
                ⭐ {favorites} Favorites
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">

              <Button
                color="danger"
                onPress={handleLike}
              >
                ❤️ Like
              </Button>

              <Button
                color="warning"
                onPress={handleFavorite}
              >
                ⭐ Favorite
              </Button>

              <Button
                color="success"
                onPress={handlePurchase}
              >
                💳 Buy Recipe 
              </Button>

              <Button
                color="danger"
                variant="bordered"
                onPress={() => setIsOpen(true)}
              >
                🚩 Report
              </Button>

            </div>

          </div>

        </div>

        {/* Ingredients */}
        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Ingredients
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {recipe.ingredients}
            

          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Instructions
          </h2>

          <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl leading-8">
            {recipe.instructions}
          </div>

        </div>
      </div>

      {/* Report Modal */}
      {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                Report Recipe
              </h2>

              <textarea
                className="w-full border rounded-lg p-3"
                rows={4}
                placeholder="Why are you reporting this recipe?"
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleReport}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}