import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { members } from "@/lib/db/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";

const membershipSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  yearOfEntry: z.number().min(1950).max(new Date().getFullYear()),
  residentialAddress: z.string().min(1, "Address is required"),
  telephoneNumber: z.string().min(1, "Phone number is required"),
  emailAddress: z.string().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  ),
  potentialMembers: z.string().optional(),
  paymentMethod: z.enum(["card", "interac"]).default("card"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = membershipSchema.parse(body);

    // Check if member already exists
    const existingMember = await db.query.members.findFirst({
      where: (members, { eq }) => eq(members.emailAddress, validatedData.emailAddress),
    });

    if (existingMember) {
      return NextResponse.json(
        { error: "A member with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create member record (unpaid initially)
    const [newMember] = await db.insert(members).values({
      fullName: validatedData.fullName,
      yearOfEntry: validatedData.yearOfEntry,
      residentialAddress: validatedData.residentialAddress,
      telephoneNumber: validatedData.telephoneNumber,
      emailAddress: validatedData.emailAddress,
      password: hashedPassword,
      potentialMembers: validatedData.potentialMembers,
      isPaid: false,
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
              name: "SOBA Ontario Membership",
              description: "One-time registration fee for SOBA Ontario membership",
            },
            unit_amount: 10000, // $100.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership?canceled=true`,
      metadata: {
        memberId: newMember.id,
        type: "membership",
        paymentMethod: validatedData.paymentMethod,
      },
      customer_email: validatedData.emailAddress,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    
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