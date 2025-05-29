import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { membershipTypes } from "@/lib/db/schema";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  duration: z.number().min(1),
  benefits: z.array(z.string()),
  isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const memberships = await db.select().from(membershipTypes);
    return NextResponse.json(memberships);
  } catch (error) {
    console.error("Error fetching memberships:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createSchema.parse(body);

    const newMembership = await db.insert(membershipTypes).values({
      name: validatedData.name,
      description: validatedData.description,
      price: validatedData.price.toString(),
      duration: validatedData.duration,
      benefits: JSON.stringify(validatedData.benefits),
      isActive: validatedData.isActive,
    }).returning();

    return NextResponse.json(newMembership[0], { status: 201 });
  } catch (error) {
    console.error("Error creating membership type:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}