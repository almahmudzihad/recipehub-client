"use client";

import Image from "next/image";
import Link from "next/link";

export default function FoodArticles() {
  const articles = [
    {
      id: 1,
      title: "5 Secrets of Healthy Cooking",
      description:
        "Discover simple techniques to make your meals healthier without sacrificing flavor.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    },
    {
      id: 2,
      title: "Best Foods for Daily Energy",
      description:
        "Learn which foods can help boost your energy levels and keep you active all day.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    },
    {
      id: 3,
      title: "Homemade vs Fast Food",
      description:
        "Explore the nutritional differences between homemade meals and fast food options.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            📖 Food & Cooking Articles
          </h2>

          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Explore useful cooking tips, healthy eating
            guides, and food-related insights to improve
            your kitchen skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  {article.title}
                </h3>

                <p className="text-slate-500 mb-4">
                  {article.description}
                </p>

                <Link
                  href="/recipes"
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}