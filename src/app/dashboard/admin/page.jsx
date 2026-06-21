"use client";

import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Crown,
  Flag,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    users: 0,
    recipes: 0,
    premiumUsers: 0,
    reports: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin-stats`
        );

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Platform analytics overview
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* USERS */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.users}
              </h2>
            </div>
            <Users className="text-blue-500" size={40} />
          </div>
        </div>

        {/* RECIPES */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Total Recipes</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.recipes}
              </h2>
            </div>
            <BookOpen className="text-orange-500" size={40} />
          </div>
        </div>

        {/* PREMIUM */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Premium Users</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.premiumUsers}
              </h2>
            </div>
            <Crown className="text-yellow-500" size={40} />
          </div>
        </div>

        {/* REPORTS */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Reports</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.reports}
              </h2>
            </div>
            <Flag className="text-red-500" size={40} />
          </div>
        </div>

      </div>
    </div>
  );
}