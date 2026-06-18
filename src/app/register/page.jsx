"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
  User,
  Mail,
  ImageIcon,
  Lock,
  Eye,
  EyeOff,
  ChefHat,
} from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side */}
          <div>
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium">
                <ChefHat size={18} />
                Join RecipeHub
              </span>

              <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
                Start Sharing Your
                <span className="text-orange-500">
                  {" "}Favorite Recipes
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
                Create an account and become part of a growing
                community of food lovers and home chefs.
              </p>

              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop"
                alt="Food"
                className="rounded-3xl shadow-2xl h-[420px] w-full object-cover"
              />
            </div>
          </div>

          {/* Form Side */}
          <div>
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Create Account
                </h2>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Join RecipeHub today
                </p>
              </div>

              <form className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Image URL
                  </label>

                  <div className="relative">
                    <ImageIcon
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Profile image URL"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    Password must contain at least 6 characters,
                    one uppercase letter and one lowercase letter.
                  </p>
                </div>

                {/* Register */}
                <Button
                  color="warning"
                  size="lg"
                  className="w-full font-semibold"
                >
                  Create Account
                </Button>

                {/* Google */}
                <Button
                  variant="bordered"
                  size="lg"
                  className="w-full"
                >
                  <FcGoogle />
                  Continue with Google
                </Button>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-orange-500 font-medium hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}