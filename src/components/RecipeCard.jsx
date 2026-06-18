import Link from "next/link";
import { Button } from "@heroui/react";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {recipe.title}
        </h2>

        <p className="text-slate-500 mt-2">
          {recipe.cuisine}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-orange-500 font-semibold">
            ❤️ {recipe.likes}
          </span>

          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm">
            {recipe.difficulty}
          </span>
        </div>

        <Link href={`/recipes/${recipe._id}`}>
          <Button
            color="warning"
            className="w-full mt-5"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}