import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { members } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Users can only access their own profile unless they're admin
    if (session.user.id !== id && session.user.role !== "admin" && session.user.role !== "super_admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const member = await db
      .select({
        id: members.id,
        fullName: members.fullName,
        emailAddress: members.emailAddress,
        telephoneNumber: members.telephoneNumber,
        residentialAddress: members.residentialAddress,
        yearOfEntry: members.yearOfEntry,
        profileImage: members.profileImage,
        isPaid: members.isPaid,
        registrationFee: members.registrationFee,
        lastLogin: members.lastLogin,
        createdAt: members.createdAt,
        role: members.role,
        isActive: members.isActive,
      })
      .from(members)
      .where(eq(members.id, id))
      .limit(1);

    if (!member[0]) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json(member[0]);
  } catch (error) {
    console.error("Error fetching member:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Users can only update their own profile unless they're admin
    if (session.user.id !== id && session.user.role !== "admin" && session.user.role !== "super_admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { fullName, telephoneNumber, residentialAddress, profileImage } = body;

    const updatedMember = await db
      .update(members)
      .set({
        fullName,
        telephoneNumber,
        residentialAddress,
        profileImage,
        updatedAt: new Date(),
      })
      .where(eq(members.id, id))
      .returning();

    if (!updatedMember[0]) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 