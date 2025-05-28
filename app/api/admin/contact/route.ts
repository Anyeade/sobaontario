import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all contact submissions, ordered by newest first
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));

    return NextResponse.json(submissions);

  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
} 