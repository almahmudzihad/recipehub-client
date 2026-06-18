"use client";

import { ChefHat, Star, Award } from "lucide-react";

export default function TopChefs() {
  const chefs = [
    {
      id: 1,
      name: "Sophia Brown",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
      recipes: 120,
      followers: "15K",
    },
    {
      id: 2,
      name: "Michael Smith",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
      recipes: 95,
      followers: "12K",
    },
    {
      id: 3,
      name: "Emma Wilson",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop",
      recipes: 140,
      followers: "20K",
    },
    {
      id: 4,
      name: "David Lee",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
      recipes: 88,
      followers: "10K",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium">
            <ChefHat size={16} />
            Our Best Creators
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Top Chefs
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            Meet talented chefs who inspire thousands of food lovers
            with their amazing recipes.
          </p>
        </div>

        {/* Chefs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="
                group
                bg-slate-50
                dark:bg-slate-900
                rounded-3xl
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="
                    w-full
                    h-72
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-500
                  "
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {chef.name}
                </h3>

                <div className="flex items-center justify-center gap-1 mt-2 text-orange-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-medium">
                    Featured Chef
                  </span>
                </div>

                <div className="mt-5 flex justify-center gap-6 text-sm">
                  <div>
                    <p className="font-bold text-orange-500">
                      {chef.recipes}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      Recipes
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-orange-500">
                      {chef.followers}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      Followers
                    </p>
                  </div>
                </div>

                <button
                  className="
                    mt-6
                    w-full
                    py-3
                    rounded-xl
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    font-medium
                    transition
                  "
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Badge */}
        <div className="mt-14 flex justify-center">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
            <Award size={18} />
            500+ Verified Chefs Worldwide
          </div>
        </div>
      </div>
    </section>
  );
}