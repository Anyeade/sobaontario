import { NextRequest, NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
// import { db } from "@/lib/db";
// import { members, donations } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";

// NOTE: This webhook endpoint is no longer needed when using the direct payment verification approach.
// The new implementation uses /api/donations/verify-payment and /api/membership/verify-payment
// to check payment status directly from the success pages.

export async function POST(request: NextRequest) {
  // Webhook functionality disabled - using direct verification instead
  return NextResponse.json({ 
    message: "Webhook endpoint disabled. Using direct payment verification instead." 
  }, { status: 200 });
}

/* 
// Original webhook implementation (commented out)
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const metadata = session.metadata;

        if (metadata?.type === "membership") {
          // Update member payment status
          await db
            .update(members)
            .set({
              isPaid: true,
              stripeCustomerId: session.customer as string,
              updatedAt: new Date(),
            })
            .where(eq(members.id, metadata.memberId));

          console.log(`Membership payment completed for member: ${metadata.memberId}`);
        } else if (metadata?.type === "donation") {
          // Update donation status
          await db
            .update(donations)
            .set({
              status: "completed",
              stripePaymentIntentId: session.payment_intent as string,
            })
            .where(eq(donations.id, metadata.donationId));

          console.log(`Donation payment completed for donation: ${metadata.donationId}`);
        }
        break;

      case "checkout.session.expired":
        const expiredSession = event.data.object;
        const expiredMetadata = expiredSession.metadata;

        if (expiredMetadata?.type === "donation") {
          // Mark donation as failed
          await db
            .update(donations)
            .set({ status: "failed" })
            .where(eq(donations.id, expiredMetadata.donationId));
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
*/ 