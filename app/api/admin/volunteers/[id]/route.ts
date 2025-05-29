import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { volunteers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]).optional(),
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

    const volunteer = await db
      .select()
      .from(volunteers)
      .where(eq(volunteers.id, id))
      .limit(1);

    if (!volunteer[0]) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    return NextResponse.json(volunteer[0]);
  } catch (error) {
    console.error("Error fetching volunteer:", error);
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
      updatedAt: new Date(),
    };

    if (validatedData.status) {
      updateData.status = validatedData.status;
    }

    const updatedVolunteer = await db
      .update(volunteers)
      .set(updateData)
      .where(eq(volunteers.id, id))
      .returning();

    if (updatedVolunteer.length === 0) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    return NextResponse.json(updatedVolunteer[0]);
  } catch (error) {
    console.error("Error updating volunteer:", error);
    
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

    const deletedVolunteer = await db
      .delete(volunteers)
      .where(eq(volunteers.id, id))
      .returning();

    if (deletedVolunteer.length === 0) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 