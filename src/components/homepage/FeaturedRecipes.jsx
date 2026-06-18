"use client";

import { Button } from "@heroui/react";
import { Clock3, Heart, ChefHat } from "lucide-react";

export default function FeaturedRecipes() {
  const recipes = [
    {
      id: 1,
      title: "Creamy Pasta",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop",
      time: "25 min",
      likes: "1.2K",
    },
    {
      id: 2,
      title: "Chicken Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
      time: "20 min",
      likes: "980",
    },
    {
      id: 3,
      title: "Fresh Salad",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
      time: "15 min",
      likes: "850",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium">
            <ChefHat size={16} />
            Popular Recipes
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Featured Recipes
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            Explore our most loved recipes shared by food lovers
            around the world.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {recipe.title}
                </h3>

                <div className="flex items-center gap-5 mt-4 text-slate-500 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock3 size={18} />
                    {recipe.time}
                  </div>

                  <div className="flex items-center gap-2">
                    <Heart size={18} />
                    {recipe.likes}
                  </div>
                </div>

                <Button
                  color="warning"
                  className="w-full mt-6"
                >
                  View Recipe
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-14">
          <Button
            color="warning"
            size="lg"
            variant="shadow"
          >
            Browse All Recipes
          </Button>
        </div>
      </div>
    </section>
  );
}