import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventRegistrations } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { eq, gte, count } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current date and first day of current month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total registrations
    const totalResult = await db
      .select({ count: count() })
      .from(eventRegistrations);
    
    const totalRegistrations = totalResult[0]?.count || 0;

    // This month registrations
    const thisMonthResult = await db
      .select({ count: count() })
      .from(eventRegistrations)
      .where(gte(eventRegistrations.registrationDate, firstDayOfMonth));
    
    const thisMonthRegistrations = thisMonthResult[0]?.count || 0;

    // Pending review (interested status)
    const pendingResult = await db
      .select({ count: count() })
      .from(eventRegistrations)
      .where(eq(eventRegistrations.status, 'interested'));
    
    const pendingReview = pendingResult[0]?.count || 0;

    return NextResponse.json({
      totalRegistrations,
      thisMonthRegistrations,
      pendingReview,
    });
  } catch (error) {
    console.error("Error fetching event registration stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 