import Link from "next/link";

export default function NotFound() {
return ( <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6"> <div className="text-center max-w-xl">


    <h1 className="text-8xl font-extrabold text-orange-500">
      404
    </h1>

    <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
      Recipe Not Found 🍽️
    </h2>

    <p className="mt-4 text-slate-600 dark:text-slate-400">
      Oops! The page you're looking for seems to have vanished from the kitchen.
    </p>

    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/"
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition"
      >
        🏠 Back Home
      </Link>

      <Link
        href="/recipes"
        className="px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        📖 Browse Recipes
      </Link>
    </div>

  </div>
</section>


);
}
