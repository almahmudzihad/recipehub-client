"use client";

import Link from "next/link";
import { useState } from "react";

export default function MyPurchasedRecipesPage() {
    const [purchased, setPurchased] = useState([
        {
            _id: "1",
            recipeName: "Premium Sushi",
            category: "Dinner",
            cuisineType: "Japanese",
            price: 12,
            image:
                "https://images.unsplash.com/photo-1553621042-f6e147245754",
            purchasedAt: "2026-06-20",
            authorName: "Chef Ayan",
        },
        {
            _id: "2",
            recipeName: "Italian Pasta",
            category: "Lunch",
            cuisineType: "Italian",
            price: 8,
            image:
                "https://images.unsplash.com/photo-1525755662778-989d0524087e",
            purchasedAt: "2026-06-18",
            authorName: "Chef Maria",
        },
    ]);

    return (<div className="p-6">


        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold">
                My Purchased Recipes
            </h1>

            <p className="text-gray-500 mt-2">
                All recipes you have purchased.
            </p>
        </div>

        {/* Empty State */}
        {purchased.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border rounded-2xl p-10 text-center">
                <h2 className="text-2xl font-semibold">
                    No Purchases Yet
                </h2>

                <p className="text-gray-500 mt-3">
                    Buy premium recipes to see them here.
                </p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {purchased.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm"
                    >

                        <img
                            src={item.image}
                            alt={item.recipeName}
                            className="w-full h-52 object-cover"
                        />

                        <div className="p-5">

                            <h2 className="text-xl font-bold">
                                {item.recipeName}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                {item.category} •{" "}
                                {item.cuisineType}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                👨‍🍳 {item.authorName}
                            </p>

                            <p className="mt-2 text-green-600 font-semibold">
                                💳 Paid: ${item.price}
                            </p>

                            <p className="text-sm text-gray-500">
                                Purchased on: {item.purchasedAt}
                            </p>

                            {/* Actions */}
                            <div className="mt-5">

                                <Link
                                    href={`/recipes/${item._id}`}
                                    className="block text-center px-4 py-2 rounded-xl bg-orange-500 text-white"
                                >
                                    View Details
                                </Link>

                            </div>

                        </div>

                    </div>
                ))}

            </div>
        )}
    </div>


    );
}
