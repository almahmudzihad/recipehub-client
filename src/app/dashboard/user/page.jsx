"use client";

import {
  BookOpen,
  Heart,
  ThumbsUp,
  Crown,
} from "lucide-react";

export default function DashboardOverview() {
  const stats = {
    recipes: 12,
    favorites: 28,
    likes: 156,
    isPremium: true,
  };

  return (<div className="p-6 space-y-8">


    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold">
        Dashboard Overview
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome back! Here's a quick summary
        of your RecipeHub activity.
      </p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {/* Total Recipes */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              Total Recipes
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.recipes}
            </h2>
          </div>

          <BookOpen
            size={40}
            className="text-orange-500"
          />
        </div>
      </div>

      {/* Favorites */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              Favorites
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.favorites}
            </h2>
          </div>

          <Heart
            size={40}
            className="text-pink-500"
          />
        </div>
      </div>

      {/* Likes */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              Total Likes
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.likes}
            </h2>
          </div>

          <ThumbsUp
            size={40}
            className="text-blue-500"
          />
        </div>
      </div>

      {/* Membership */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              Membership
            </p>

            <h2 className="text-xl font-bold mt-3 text-green-600">
              {stats.isPremium
                ? "Premium"
                : "Free"}
            </h2>
          </div>

          <Crown
            size={40}
            className="text-yellow-500"
          />
        </div>
      </div>

    </div>

    {/* Quick Actions */}
    <div className="bg-white dark:bg-slate-900 rounded-2xl border p-6">

      <h2 className="text-xl font-bold mb-4">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">

        <button className="px-5 py-3 rounded-xl bg-orange-500 text-white font-medium">
          Add Recipe
        </button>

        <button className="px-5 py-3 rounded-xl bg-pink-500 text-white font-medium">
          View Favorites
        </button>

        <button className="px-5 py-3 rounded-xl bg-blue-500 text-white font-medium">
          My Recipes
        </button>

      </div>

    </div>

    {/* Membership Banner */}
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-8">

      <h2 className="text-2xl font-bold">
        Upgrade to Premium 🚀
      </h2>

      <p className="mt-3 max-w-2xl">
        Premium members can add unlimited
        recipes, get a premium badge and enjoy
        exclusive features.
      </p>

      <button className="mt-5 bg-white text-orange-600 font-semibold px-5 py-3 rounded-xl">
        Upgrade Now
      </button>

    </div>

  </div>


  );
}
