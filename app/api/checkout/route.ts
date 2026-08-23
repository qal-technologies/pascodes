import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId, courseTitle, price, userId } = body;

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const origin = req.headers.get("origin") || process.env.SITE_URL || "http://localhost:3000";

    if (!stripeSecretKey) {
      // Mock mode for local testing without active Stripe API keys
      return NextResponse.json({
        success: true,
        url: `${origin}/courses/${courseId}?success=true&mock=true&userId=${userId || ""}`,
      });
    }

    const params = new URLSearchParams();
    params.append("payment_method_types[]", "card");
    params.append("line_items[0][price_data][currency]", "usd");
    params.append("line_items[0][price_data][product_data][name]", courseTitle || "PoshCodes Course");
    params.append("line_items[0][price_data][unit_amount]", Math.round((price || 49) * 100).toString());
    params.append("line_items[0][quantity]", "1");
    params.append("mode", "payment");
    params.append("success_url", `${origin}/courses/${courseId}?success=true&session_id={CHECKOUT_SESSION_ID}&userId=${userId || ""}`);
    params.append("cancel_url", `${origin}/courses/${courseId}?canceled=true`);

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await res.json();
    if (data.error) {
      return NextResponse.json({ success: false, error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, url: data.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
