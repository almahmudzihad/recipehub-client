export default function WhyChoose() {
  const features = [
    {
      title: "⚡ Fast & Modern",
      desc: "Built with latest web technologies for speed.",
    },
    {
      title: "🔒 Secure Payments",
      desc: "Stripe integration ensures safe transactions.",
    },
    {
      title: "🌍 Global Community",
      desc: "Connect with food lovers worldwide.",
    },
    {
      title: "📱 Mobile Friendly",
      desc: "Works perfectly on all devices.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white dark:bg-slate-950">
      <h2 className="text-3xl font-bold text-center mb-10">
        ⭐ Why Choose RecipeHub?
      </h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="p-6 border rounded-2xl bg-slate-50 dark:bg-slate-900 hover:scale-105 transition"
          >
            <h3 className="font-semibold text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}