"use client";

import {
  FaAppleAlt,
  FaTint,
  FaLeaf,
  FaHeartbeat,
} from "react-icons/fa";

export default function HealthyTips() {
  const tips = [
    {
      icon: <FaAppleAlt size={28} />,
      title: "Eat Fresh Ingredients",
      description:
        "Choose fresh fruits, vegetables, and natural ingredients for better nutrition and taste.",
    },
    {
      icon: <FaTint size={28} />,
      title: "Stay Hydrated",
      description:
        "Drink enough water every day to keep your body energized and healthy.",
    },
    {
      icon: <FaLeaf size={28} />,
      title: "Reduce Processed Foods",
      description:
        "Limit packaged and processed foods to maintain a balanced and healthy diet.",
    },
    {
      icon: <FaHeartbeat size={28} />,
      title: "Balanced Nutrition",
      description:
        "Include protein, healthy fats, and carbohydrates in every meal for optimal health.",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            🥗 Healthy Food Tips
          </h2>

          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Simple habits and nutrition tips to help you
            maintain a healthier lifestyle while enjoying
            delicious homemade meals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-orange-500 mb-4">
                {tip.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {tip.title}
              </h3>

              <p className="text-slate-500 text-sm">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}