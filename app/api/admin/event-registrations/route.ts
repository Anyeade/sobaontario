import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventRegistrations, members } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { eq, and, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const status = searchParams.get('status');

    let whereConditions = [];
    
    if (eventId) {
      whereConditions.push(eq(eventRegistrations.eventId, eventId));
    }
    
    if (status) {
      whereConditions.push(eq(eventRegistrations.status, status as any));
    }

    const registrations = await db
      .select({
        id: eventRegistrations.id,
        eventId: eventRegistrations.eventId,
        eventTitle: eventRegistrations.eventTitle,
        memberEmail: eventRegistrations.memberEmail,
        memberName: eventRegistrations.memberName,
        memberId: eventRegistrations.memberId,
        registrationDate: eventRegistrations.registrationDate,
        status: eventRegistrations.status,
        notes: eventRegistrations.notes,
      })
      .from(eventRegistrations)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(desc(eventRegistrations.registrationDate));

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 