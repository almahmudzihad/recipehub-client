import { updatePremiumStatus } from "@/lib/action/recipe";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MembershipSuccess({ searchParams }) {
  const params = await searchParams;
  const session_id = params?.session_id;

  if (!session_id) {
    throw new Error("Invalid session");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  if (!session || session.status === "open") {
    redirect("/");
  }

  const userEmail = session.customer_details?.email;

      if (userEmail) {
        await updatePremiumStatus(userEmail);

        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail,
              amount: session.amount_total
                ? session.amount_total / 100
                : 0,
              transactionId:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.payment_intent?.id,
              paymentStatus: "paid",
              paymentType: "membership",
              paidAt: new Date(),
            }),
          }
        );
      }
    
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl text-center max-w-xl w-full">

        <h1 className="text-4xl font-bold text-green-600">
          🎉 Membership Activated
        </h1>

        <p className="mt-4 text-slate-600">
          You are now a <b>Premium Member</b>
        </p>

        <p className="mt-2 text-sm text-gray-500 break-all">
          {userEmail}
        </p>

        <Link
          href="/dashboard/user"
          className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-xl"
        >
          Go to Dashboard
        </Link>

      </div>
    </section>
  );
}