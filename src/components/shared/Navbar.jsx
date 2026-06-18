"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 border-b bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-orange-500"
          >
            🍽️ RecipeHub
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-slate-200 dark:border-slate-800
        bg-white/80 dark:bg-slate-950/80
        backdrop-blur-md
        transition-all
      "
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-orange-500"
          >
            🍽️ RecipeHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-slate-700 dark:text-slate-300 hover:text-orange-500 transition"
            >
              Home
            </Link>

            <Link
              href="/recipes"
              className="text-slate-700 dark:text-slate-300 hover:text-orange-500 transition"
            >
              Browse Recipes
            </Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              isIconOnly
              variant="light"
              onPress={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </Button>

            <Link href="/login">
              <Button variant="light">
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button color="warning">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-4 flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/"
              className="text-slate-700 dark:text-slate-300"
            >
              Home
            </Link>

            <Link
              href="/recipes"
              className="text-slate-700 dark:text-slate-300"
            >
              Browse Recipes
            </Link>

            <Link
              href="/login"
              className="text-slate-700 dark:text-slate-300"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="text-slate-700 dark:text-slate-300"
            >
              Register
            </Link>

            <Button
              variant="flat"
              onPress={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              {theme === "dark"
                ? "☀️ Light Mode"
                : "🌙 Dark Mode"}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}