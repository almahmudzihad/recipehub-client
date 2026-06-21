import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/api/session";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const type = formData.get("type"); // "recipe" | "membership"
    const recipeId = formData.get("recipeId");
    const amount = formData.get("amount");

    const user = await getUserSession();

    const headersList = headers();
    const origin = (await headersList).get("origin");

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name:
                type === "membership"
                  ? "Premium Membership"
                  : "Recipe Purchase",
            },
            unit_amount: Number(amount) * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        type, // 👈 important
        recipeId: recipeId || "",
        userId: user?.id || "",
        userEmail: user?.email || "",
      },

      success_url:
        type === "membership"
          ? `${origin}/membership/success?session_id={CHECKOUT_SESSION_ID}`
          : `${origin}/recipes/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}