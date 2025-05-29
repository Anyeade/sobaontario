import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { donations } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allDonations = await db
      .select({
        id: donations.id,
        donorName: donations.donorName,
        donorEmail: donations.donorEmail,
        amount: donations.amount,
        currency: donations.currency,
        message: donations.message,
        isAnonymous: donations.isAnonymous,
        status: donations.status,
        paymentMethod: donations.paymentMethod,
        createdAt: donations.createdAt,
      })
      .from(donations)
      .orderBy(desc(donations.createdAt));

    // Convert amount from string to number for frontend consumption
    const formattedDonations = allDonations.map(donation => ({
      ...donation,
      amount: parseFloat(donation.amount),
      currency: donation.currency || "CAD",
      isAnonymous: donation.isAnonymous || false,
      paymentMethod: donation.paymentMethod || "card",
    }));

    return NextResponse.json(formattedDonations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 