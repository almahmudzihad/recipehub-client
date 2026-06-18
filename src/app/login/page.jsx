"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
  Mail,
  Lock,
  ChefHat,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
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
                Welcome Back
              </span>

              <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
                Continue Your
                <span className="text-orange-500">
                  {" "}Cooking Journey
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
                Discover delicious recipes, save your favorites,
                and connect with food lovers around the world.
              </p>

              <img
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop"
                alt="Cooking"
                className="rounded-3xl shadow-2xl h-[420px] w-full object-cover"
              />
            </div>
          </div>

          {/* Right Side */}
          <div>
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Login
                </h2>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Sign in to your RecipeHub account
                </p>
              </div>

              <form className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-orange-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  color="warning"
                  size="lg"
                  className="w-full font-semibold"
                >
                  Login
                </Button>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="border-t border-slate-300 dark:border-slate-700" />

                  <span className="absolute left-1/2 -translate-x-1/2 -top-1 px-3 bg-white dark:bg-slate-900 text-sm text-slate-500">
                    OR
                  </span>
                </div>

                {/* Google Login */}
                <Button
                  variant="bordered"
                  size="lg"
                  className="w-full"
                >
                  <FcGoogle />
                  Continue with Google
                </Button>

                {/* Register Link */}
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-orange-500 font-medium hover:underline"
                  >
                    Register
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