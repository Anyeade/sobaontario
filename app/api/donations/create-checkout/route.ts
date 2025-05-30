import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { donations } from "@/lib/db/schema";
import { z } from "zod";

const donationSchema = z.object({
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional().or(z.literal("")),
  amount: z.number().min(5, "Minimum donation is $5"),
  category: z.string().min(1, "Category is required"),
  paymentMethod: z.enum(["card", "interac"]).default("card"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = donationSchema.parse(body);

    // Create donation record (pending initially)
    const [newDonation] = await db.insert(donations).values({
      donorName: validatedData.donorName || null,
      donorEmail: validatedData.donorEmail || null,
      amount: validatedData.amount.toString(),
      category: validatedData.category,
      status: "pending",
    }).returning();

    // Configure payment method types based on selection
    const paymentMethodTypes: ("card" | "acss_debit")[] = validatedData.paymentMethod === "interac" 
      ? ["acss_debit"] 
      : ["card"];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `Donation - ${validatedData.category}`,
              description: `SOBA Ontario donation for ${validatedData.category}`,
            },
            unit_amount: Math.round(validatedData.amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/donations/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/donations?canceled=true`,
      metadata: {
        donationId: newDonation.id,
        type: "donation",
        category: validatedData.category,
        paymentMethod: validatedData.paymentMethod,
      },
      customer_email: validatedData.donorEmail || undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating donation checkout session:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 