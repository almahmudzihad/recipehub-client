"use client";

import Link from "next/link";
import { useState } from "react";

export default function MyRecipesPage() {
const [recipes, setRecipes] = useState([
{
_id: "1",
recipeName: "Chicken Biryani",
category: "Dinner",
cuisineType: "Bangladeshi",
likesCount: 25,
},
{
_id: "2",
recipeName: "Beef Curry",
category: "Lunch",
cuisineType: "Indian",
likesCount: 18,
},
]);

const handleDelete = (id) => {
const confirmDelete = confirm(
"Are you sure you want to delete this recipe?"
);


if (!confirmDelete) return;

setRecipes(
  recipes.filter((recipe) => recipe._id !== id)
);


};

return ( <div className="p-6">


  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold">
        My Recipes
      </h1>

      <p className="text-gray-500 mt-2">
        Manage all your recipes here.
      </p>
    </div>

    <Link
      href="/dashboard/user/add-recipe"
      className="px-5 py-3 rounded-xl bg-orange-500 text-white font-medium"
    >
      Add Recipe
    </Link>
  </div>

  {recipes.length === 0 ? (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border p-10 text-center">
      <h2 className="text-2xl font-semibold">
        No Recipes Found
      </h2>

      <p className="text-gray-500 mt-3">
        You haven't added any recipe yet.
      </p>
    </div>
  ) : (
    <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border">

      <table className="table w-full">

        <thead>
          <tr>
            <th>#</th>
            <th>Recipe Name</th>
            <th>Category</th>
            <th>Cuisine</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {recipes.map((recipe, index) => (
            <tr key={recipe._id}>
              <td>{index + 1}</td>

              <td>{recipe.recipeName}</td>

              <td>{recipe.category}</td>

              <td>{recipe.cuisineType}</td>

              <td>{recipe.likesCount}</td>

              <td>
                <div className="flex gap-2">

                  <Link
                    href={`/dashboard/user/update-recipe/${recipe._id}`}
                    className="px-3 py-2 rounded-lg bg-blue-500 text-white text-sm"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(recipe._id)
                    }
                    className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )}
</div>


);
}
