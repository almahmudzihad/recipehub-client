"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
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
              className="hover:text-orange-500 transition"
            >
              Home
            </Link>

            <Link
              href="/recipes"
              className="hover:text-orange-500 transition"
            >
              All Recipes
            </Link>

            {user && (
              <Link
                href={`${user.role === "user" ? "/dashboard/user" : "/dashboard/admin"}`}
                className="hover:text-orange-500 transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">

            {/* Theme */}
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

            {user ? (
              <>
                {/* User Image */}
                <img
                  src={
                    user.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt={user.name}
                  className="w-10 h-10 rounded-full border object-cover"
                />

                {/* User Name */}
                <span className="font-medium">
                  {user.name}
                </span>

                

                {/* Logout */}
                <Button
                  color="danger"
                  variant="flat"
                  onPress={handleSignOut}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-4 flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800">

            <Link href="/">
              Home
            </Link>

            <Link href="/recipes">
              All Recipes
            </Link>

            {user ? (
              <>
              <Link
                href={`${user.role === "user" ? "/dashboard/user" : "/dashboard/admin"}`}
                className="hover:text-orange-500 transition"
              >
                Dashboard
              </Link>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.image ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full border"
                  />

                  <span>
                    {user.name}
                  </span>
                </div>

                

                <Button
                  color="danger"
                  onPress={handleSignOut}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  Login
                </Link>

                <Link href="/register">
                  Register
                </Link>
              </>
            )}

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
          </div>
        )}
      </div>
    </nav>
  );
}