"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function PurchasedRecipes() {
  const { data: session } = useSession();
  const user = session?.user;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payments/${user.email}`
      );

      const data = await res.json();
      setRecipes(data);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!recipes.length) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        <div className="text-7xl mb-4">🛒</div>

        <h2 className="text-3xl font-bold mb-3">
          No Purchased Recipes Yet
        </h2>

        <p className="text-slate-500 mb-6">
          You haven't purchased any recipes yet.
          Explore our premium recipes and unlock exclusive content.
        </p>

        <a
          href="/recipes"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Browse Recipes
        </a>

      </div>
    </div>
  );
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        My Purchased Recipes
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {recipes.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl p-4 bg-white dark:bg-slate-900"
          >
            <p className="font-semibold">
              Transaction: {item.transactionId}
            </p>

            <p>Amount: ${item.amount}</p>

            <p>Status: {item.paymentStatus}</p>

            <p className="text-sm text-gray-500">
              Purchased at:{" "}
              {new Date(item.paidAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}