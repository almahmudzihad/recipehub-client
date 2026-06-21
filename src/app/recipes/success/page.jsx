import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RecipeSuccess({ searchParams }) {
  //const { session_id } = searchParams;
  const params = await searchParams;
  const session_id = params?.session_id;

  if (!session_id) {
    throw new Error("Invalid session");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  if (session.status === "open") {
    redirect("/");
  }

  const {
    customer_details,
    amount_total,
    payment_intent,
    metadata,
  } = session;

  // 🔥 save payment to DB
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: customer_details?.email,
      userId: metadata?.userId,
      recipeId: metadata?.recipeId,
      amount: amount_total || 0,
      transactionId:
        typeof payment_intent === "string"
          ? payment_intent
          : payment_intent?.id,
      paymentStatus: "paid",
      paymentType: "recipe",
    }),
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl text-center max-w-xl w-full">

        <h1 className="text-4xl font-bold text-green-600">
          🎉 Payment Successful
        </h1>

        <p className="mt-4 text-slate-600">
          Your recipe purchase is completed
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {customer_details?.email}
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href="/dashboard/user/purchased-recipes"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl"
          >
            My Purchases
          </Link>

          <Link
            href="/"
            className="border px-6 py-3 rounded-xl"
          >
            Home
          </Link>
        </div>

      </div>
    </section>
  );
}