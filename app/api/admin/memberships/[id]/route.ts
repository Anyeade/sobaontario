import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { membershipTypes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  duration: z.number().min(1).optional(),
  benefits: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const membership = await db
      .select()
      .from(membershipTypes)
      .where(eq(membershipTypes.id, id))
      .limit(1);

    if (!membership[0]) {
      return NextResponse.json({ error: "Membership type not found" }, { status: 404 });
    }

    return NextResponse.json(membership[0]);
  } catch (error) {
    console.error("Error fetching membership type:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    const updateData: any = {
      ...validatedData,
      updatedAt: new Date(),
    };

    const updatedMembership = await db
      .update(membershipTypes)
      .set(updateData)
      .where(eq(membershipTypes.id, id))
      .returning();

    if (updatedMembership.length === 0) {
      return NextResponse.json({ error: "Membership type not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMembership[0]);
  } catch (error) {
    console.error("Error updating membership type:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const deletedMembership = await db
      .delete(membershipTypes)
      .where(eq(membershipTypes.id, id))
      .returning();

    if (deletedMembership.length === 0) {
      return NextResponse.json({ error: "Membership type not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Membership type deleted successfully" });
  } catch (error) {
    console.error("Error deleting membership type:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 