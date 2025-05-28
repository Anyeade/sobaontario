import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { donations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid" && session.metadata?.type === "donation") {
      // Update donation status in database
      await db
        .update(donations)
        .set({
          status: "completed",
          stripePaymentIntentId: session.payment_intent as string,
        })
        .where(eq(donations.id, session.metadata.donationId));

      return NextResponse.json({ 
        success: true, 
        status: "completed",
        donationId: session.metadata.donationId 
      });
    } else if (session.payment_status === "unpaid") {
      return NextResponse.json({ 
        success: false, 
        status: "pending",
        message: "Payment not completed" 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        status: "failed",
        message: "Payment failed" 
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
} 