import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventRegistrations } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { eq, and } from "drizzle-orm";

const registerInterestSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  eventTitle: z.string().min(1, "Event title is required"),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = registerInterestSchema.parse(body);

    // Check if user has already registered interest for this event
    const existingRegistration = await db
      .select()
      .from(eventRegistrations)
      .where(
        and(
          eq(eventRegistrations.eventId, validatedData.eventId),
          eq(eventRegistrations.memberEmail, session.user.email!)
        )
      )
      .limit(1);

    if (existingRegistration.length > 0) {
      return NextResponse.json({ error: "Already registered" }, { status: 400 });
    }

    // Create new registration
    const newRegistration = await db
      .insert(eventRegistrations)
      .values({
        eventId: validatedData.eventId,
        eventTitle: validatedData.eventTitle,
        memberEmail: session.user.email!,
        memberName: session.user.name || session.user.email!,
        memberId: session.user.id,
        status: "interested",
      })
      .returning();

    return NextResponse.json({ 
      message: "Interest registered successfully",
      registration: newRegistration[0] 
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    
    console.error("Error registering interest:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 