"use client";

import {
  FaPizzaSlice,
  FaHamburger,
  FaIceCream,
  FaCookieBite,
  FaCheese,
  FaFish,
} from "react-icons/fa";

export default function FunFoodFacts() {
  const facts = [
    {
      icon: <FaPizzaSlice size={28} />,
      title: "The World's Most Expensive Pizza",
      fact: "Some luxury pizzas cost over $10,000 and are topped with rare caviar and premium ingredients.",
    },
    {
      icon: <FaHamburger size={28} />,
      title: "Potato Chips Were an Accident",
      fact: "A chef sliced potatoes extra thin to annoy a customer, accidentally inventing potato chips.",
    },
    {
      icon: <FaIceCream size={28} />,
      title: "Chocolate Was Once Money",
      fact: "Ancient civilizations used cocoa beans as a form of currency.",
    },
    {
      icon: <FaCookieBite size={28} />,
      title: "Honey Never Expires",
      fact: "Archaeologists found edible honey in Egyptian tombs over 3,000 years old.",
    },
    {
      icon: <FaCheese size={28} />,
      title: "Strawberries Aren't Berries",
      fact: "Botanically, bananas are berries, but strawberries are not.",
    },
    {
      icon: <FaFish size={28} />,
      title: "Onions Make You Cry",
      fact: "Onions release sulfur compounds that react with your eyes and cause tears.",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            🤯 Fun Food Facts
          </h2>

          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Discover some surprising, funny, and fascinating
            food facts that will make your next meal even
            more interesting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-orange-500 mb-4">
                {fact.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {fact.title}
              </h3>

              <p className="text-slate-500">
                {fact.fact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}