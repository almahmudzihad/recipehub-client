export default function HowItWorks() {
  const steps = [
    {
      title: "🍳 Create Recipe",
      desc: "Share your favorite homemade recipes with the world.",
    },
    {
      title: "❤️ Get Likes",
      desc: "Other users can like and save your recipes.",
    },
    {
      title: "💰 Buy & Sell",
      desc: "Premium recipes can be purchased securely.",
    },
    {
      title: "👑 Go Premium",
      desc: "Unlock unlimited recipe posting and features.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900">
      <h2 className="text-3xl font-bold text-center mb-10">
        🚀 How RecipeHub Works
      </h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl border bg-white dark:bg-slate-800 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-500">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}