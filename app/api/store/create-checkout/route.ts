import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { storeOrders } from "@/lib/db/schema";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const storeOrderSchema = z.object({
  items: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.string(),
    quantity: z.number().min(1),
    imageUrl: z.string().optional(),
  })).min(1),
  customerInfo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required"),
  }),
  shippingAddress: z.object({
    line1: z.string().min(1, "Address is required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "Province is required"),
    postal_code: z.string().min(1, "Postal code is required"),
    country: z.string().default("CA"),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = storeOrderSchema.parse(body);

    const { items, customerInfo, shippingAddress } = validatedData;

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);

    // Format shipping address
    const formattedShippingAddress = [
      shippingAddress.line1,
      shippingAddress.line2,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.postal_code,
      shippingAddress.country
    ].filter(Boolean).join(", ");

    // Create order record (pending initially)
    const [newOrder] = await db.insert(storeOrders).values({
      customerEmail: customerInfo.email,
      customerName: customerInfo.name,
      items: JSON.stringify(items),
      totalAmount: totalAmount.toString(),
      status: "pending",
      shippingAddress: formattedShippingAddress,
    }).returning();

    // Create line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
          description: item.description || "",
          images: item.imageUrl ? [item.imageUrl] : [],
        },
        unit_amount: Math.round(parseFloat(item.price) * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?canceled=true`,
      metadata: {
        type: "store_purchase",
        orderId: newOrder.id,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        total_amount: totalAmount.toString(),
        items_count: items.length.toString(),
      },
      customer_email: customerInfo.email,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["CA"], // Canada only
      },
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
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
} 