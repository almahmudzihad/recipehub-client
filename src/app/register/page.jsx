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
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { reddit } from "better-auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// import your auth client
// import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image,
        role: "user", 
        isBlocked: false,
        isPremium: false,
        redirectTo: "/",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Account created successfully!");

      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handelGoogleSignIn = async () => {
   await authClient.signIn.social({
    provider: "google",
  });
  };

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

              <form
                onSubmit={handleRegister}
                className="space-y-5"
              >
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
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
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
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Image */}
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
                      name="image"
                      type="text"
                      value={formData.image}
                      onChange={handleChange}
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
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Register Button */}
                <Button
                  type="submit"
                  color="warning"
                  size="lg"
                  isDisabled={loading}
                  className="w-full font-semibold"
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>

                {/* Google Login */}
                <Button
                  onClick={handelGoogleSignIn}
                  type="button"
                  variant="bordered"
                  size="lg"
                  className="w-full"
                  
                >
                  <FcGoogle size={22} />
                  Continue with Google
                </Button>

                {/* Login Link */}
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