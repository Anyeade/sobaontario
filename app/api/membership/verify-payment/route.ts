import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { members } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid" && session.metadata?.type === "membership") {
      // Update member payment status in database
      await db
        .update(members)
        .set({
          isPaid: true,
          stripeCustomerId: session.customer as string,
          updatedAt: new Date(),
        })
        .where(eq(members.id, session.metadata.memberId));

      return NextResponse.json({ 
        success: true, 
        status: "completed",
        memberId: session.metadata.memberId 
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