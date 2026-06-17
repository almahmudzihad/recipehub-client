"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="
      sticky top-0 z-50
      border-b
      bg-white/80
      dark:bg-slate-950/80
      backdrop-blur-md
      transition-all
    ">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="
              text-2xl
              font-bold
              text-orange-500
            "
          >
            🍽️ RecipeHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="hover:text-orange-500 transition"
            >
              Home
            </Link>

            <Link
              href="/recipes"
              className="hover:text-orange-500 transition"
            >
              Browse Recipes
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">

            {/* Theme Toggle */}
            {mounted && (
              <Button
                isIconOnly
                variant="light"
                onPress={() =>
                  setTheme(
                    theme === "dark"
                      ? "light"
                      : "dark"
                  )
                }
              >
                {theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </Button>
            )}

            <Button variant="light">
              Login
            </Button>

            <Button color="warning">
              Register
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="
            md:hidden
            py-4
            flex
            flex-col
            gap-4
          ">
            <Link href="/">Home</Link>

            <Link href="/recipes">
              Browse Recipes
            </Link>

            <Link href="/login">
              Login
            </Link>

            <Link href="/register">
              Register
            </Link>

            {mounted && (
              <Button
                variant="flat"
                onPress={() =>
                  setTheme(
                    theme === "dark"
                      ? "light"
                      : "dark"
                  )
                }
              >
                {theme === "dark"
                  ? "☀️ Light Mode"
                  : "🌙 Dark Mode"}
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}