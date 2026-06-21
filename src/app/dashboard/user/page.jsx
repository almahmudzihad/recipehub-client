"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import {
  BookOpen,
  Heart,
  ThumbsUp,
  Crown,
  ShoppingBag,
} from "lucide-react";

export default function DashboardOverview() {
  const { data: session } = useSession();
  const user = session?.user;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard-stats/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-3xl font-bold">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <div className="flex justify-between">
            <div>
              <p>Total Recipes</p>
              <h2 className="text-4xl font-bold">
                {stats.totalRecipes}
              </h2>
            </div>

            <BookOpen className="text-orange-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <div className="flex justify-between">
            <div>
              <p>Favorites</p>
              <h2 className="text-4xl font-bold">
                {stats.totalFavorites}
              </h2>
            </div>

            <Heart className="text-pink-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <div className="flex justify-between">
            <div>
              <p>Total Likes</p>
              <h2 className="text-4xl font-bold">
                {stats.totalLikes}
              </h2>
            </div>

            <ThumbsUp className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <div className="flex justify-between">
            <div>
              <p>Purchased</p>
              <h2 className="text-4xl font-bold">
                {stats?.totalPurchased}
              </h2>
            </div>

            <ShoppingBag className="text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <div className="flex justify-between">
            <div>
              <p>Membership</p>

              <h2 className="text-xl font-bold mt-2">
                {stats.isPremium
                  ? "Premium"
                  : "Free"}
              </h2>
            </div>

            <Crown className="text-yellow-500" />
          </div>
        </div>

      </div>

      {!stats.isPremium && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-3xl">
          <h2 className="text-3xl font-bold">
            Upgrade to Premium 🚀
          </h2>

          <p className="mt-3">
            Unlock unlimited recipe posting and
            premium badge.
          </p>
          {/* <form action="/api/checkout_sessions" method="POST">
              <section>
                <button type="submit" role="link" className="inline-block mt-5 bg-white text-orange-600 px-5 py-3 rounded-xl font-semibold">
                  Upgrade Now
                </button>
              </section>
            </form> */}
            <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="type" value="membership" />
              <input type="hidden" name="amount" value="10" />

              <button color="warning" type="submit" className="inline-block mt-5 bg-white text-orange-600 px-5 py-3 rounded-xl font-semibold">
                Upgrade Now
              </button>
            </form>
          
        </div>
      )}
    </div>
  );
}