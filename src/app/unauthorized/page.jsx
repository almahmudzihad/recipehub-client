import Link from "next/link";
import { FaLock } from "react-icons/fa";

export default function UnauthorizedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-10 text-center">

        <div className="w-24 h-24 mx-auto rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6">
          <FaLock className="text-4xl text-red-500" />
        </div>

        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          403
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-slate-800 dark:text-slate-200">
          Access Denied
        </h2>

        <p className="mt-4 text-slate-600 dark:text-slate-400">
          You do not have permission to access this page.
          Please contact the administrator if you believe this is a mistake.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition"
          >
            Back Home
          </Link>

          <Link
            href="/dashboard/user"
            className="flex-1 border border-slate-300 dark:border-slate-700 py-3 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Go Dashboard
          </Link>
        </div>

      </div>
    </section>
  );
}