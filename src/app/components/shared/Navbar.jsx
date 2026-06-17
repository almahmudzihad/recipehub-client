"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
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
            <Link href="/">Home</Link>
            <Link href="/recipes">Browse Recipes</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
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
          <div className="md:hidden py-4 flex flex-col gap-4">
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
          </div>
        )}
      </div>
    </nav>
  );
}