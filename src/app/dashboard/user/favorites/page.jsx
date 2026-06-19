"use client";

import Link from "next/link";
import { useState } from "react";

export default function MyFavoritesPage() {
const [favorites, setFavorites] = useState([
{
_id: "1",
recipeName: "Chicken Biryani",
category: "Dinner",
cuisineType: "Bangladeshi",
likesCount: 25,
image:
"https://images.unsplash.com/photo-1563379091339-03246963d29c",
},
{
_id: "2",
recipeName: "Beef Curry",
category: "Lunch",
cuisineType: "Indian",
likesCount: 18,
image:
"https://images.unsplash.com/photo-1544025162-d76694265947",
},
]);

const handleRemove = (id) => {
const confirmRemove = confirm(
"Remove this recipe from favorites?"
);


if (!confirmRemove) return;

setFavorites(
  favorites.filter((item) => item._id !== id)
);


};

return ( <div className="p-6">


  <div className="mb-8">
    <h1 className="text-3xl font-bold">
      My Favorites
    </h1>

    <p className="text-gray-500 mt-2">
      All your favorite recipes in one place.
    </p>
  </div>

  {favorites.length === 0 ? (
    <div className="bg-white dark:bg-slate-900 border rounded-2xl p-10 text-center">
      <h2 className="text-2xl font-semibold">
        No Favorite Recipes
      </h2>

      <p className="text-gray-500 mt-3">
        Start adding recipes to your favorites.
      </p>
    </div>
  ) : (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {favorites.map((recipe) => (
        <div
          key={recipe._id}
          className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm"
        >

          <img
            src={recipe.image}
            alt={recipe.recipeName}
            className="w-full h-52 object-cover"
          />

          <div className="p-5">

            <h2 className="text-xl font-bold">
              {recipe.recipeName}
            </h2>

            <p className="text-gray-500 mt-2">
              {recipe.category} •{" "}
              {recipe.cuisineType}
            </p>

            <p className="mt-3">
              ❤️ {recipe.likesCount} Likes
            </p>

            <div className="flex gap-3 mt-5">

              <Link
                href={`/recipes/${recipe._id}`}
                className="flex-1 text-center px-4 py-2 rounded-xl bg-orange-500 text-white"
              >
                View Details
              </Link>

              <button
                onClick={() =>
                  handleRemove(recipe._id)
                }
                className="px-4 py-2 rounded-xl bg-red-500 text-white"
              >
                Remove
              </button>

            </div>

          </div>

        </div>
      ))}

    </div>
  )}
</div>


);
}
