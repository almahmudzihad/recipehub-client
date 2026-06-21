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