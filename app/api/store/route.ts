import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { storeItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Get all store items that are in stock
    const items = await db.select().from(storeItems).where(eq(storeItems.inStock, true)).orderBy(storeItems.createdAt);
    
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching store items:", error);
    return NextResponse.json(
      { error: "Failed to fetch store items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      inStock = true
    } = body;

    // Validate required fields
    if (!name || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, and category are required" },
        { status: 400 }
      );
    }

    // Insert new store item into database
    const newItem = await db.insert(storeItems).values({
      name,
      description,
      price: price.toString(),
      imageUrl,
      category,
      inStock
    }).returning();

    return NextResponse.json(
      { 
        message: "Store item created successfully!",
        item: newItem[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating store item:", error);
    return NextResponse.json(
      { error: "Failed to create store item" },
      { status: 500 }
    );
  }
} 