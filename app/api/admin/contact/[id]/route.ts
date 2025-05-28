import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateSchema = z.object({
  status: z.enum(["new", "read", "responded", "closed"]).optional(),
  adminNotes: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (validatedData.status) {
      updateData.status = validatedData.status;
      if (validatedData.status === "responded") {
        updateData.respondedAt = new Date();
      }
    }

    if (validatedData.adminNotes !== undefined) {
      updateData.adminNotes = validatedData.adminNotes;
    }

    // Update the contact submission
    const updatedSubmission = await db
      .update(contactSubmissions)
      .set(updateData)
      .where(eq(contactSubmissions.id, params.id))
      .returning();

    if (updatedSubmission.length === 0) {
      return NextResponse.json(
        { error: "Contact submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSubmission[0]);

  } catch (error) {
    console.error("Error updating contact submission:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update contact submission" },
      { status: 500 }
    );
  }
} 