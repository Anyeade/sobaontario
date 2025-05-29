import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { volunteers } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const volunteerApplications = await db.select().from(volunteers);

    return NextResponse.json(volunteerApplications);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 