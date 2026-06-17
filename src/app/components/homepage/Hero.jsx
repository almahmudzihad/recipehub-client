"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-5">
              🍳 Share Your Favorite Recipes
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-slate-900 dark:text-white">
              Discover, Share &
              <span className="text-orange-500">
                {" "}Save Amazing Recipes
              </span>
            </h1>

            <p className="mt-6 text-slate-600 dark:text-slate-300 text-lg max-w-xl">
              Join thousands of food lovers sharing delicious
              recipes, cooking tips and culinary inspiration
              from around the world.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                as={Link}
                href="/recipes"
                color="warning"
                size="lg"
              >
                Explore Recipes
              </Button>

              <Button
                as={Link}
                href="/dashboard/add-recipe"
                variant="bordered"
                size="lg"
              >
                Share Recipe
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10">
              <div>
                <h3 className="text-2xl font-bold text-orange-500">
                  5K+
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Recipes
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-500">
                  2K+
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Chefs
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-500">
                  20K+
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Likes
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Food"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />

            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="
                absolute
                top-8
                -left-4
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                shadow-xl
                rounded-2xl
                p-4
              "
            >
              <p className="font-semibold text-slate-900 dark:text-white">
                🍝 Pasta Recipe
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-300">
                ⭐ 4.9 Rating
              </p>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="
                absolute
                bottom-8
                -right-4
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                shadow-xl
                rounded-2xl
                p-4
              "
            >
              <p className="font-semibold text-slate-900 dark:text-white">
                ❤️ 1.2K Likes
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-300">
                Popular Recipe
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
    </section>
  );
}