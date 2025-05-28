import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { members } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allMembers = await db
      .select({
        id: members.id,
        fullName: members.fullName,
        emailAddress: members.emailAddress,
        telephoneNumber: members.telephoneNumber,
        yearOfEntry: members.yearOfEntry,
        isPaid: members.isPaid,
        isActive: members.isActive,
        role: members.role,
        createdAt: members.createdAt,
        lastLogin: members.lastLogin,
      })
      .from(members)
      .orderBy(members.createdAt);

    return NextResponse.json(allMembers);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 