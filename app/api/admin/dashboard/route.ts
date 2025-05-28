import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { members, donations, eventRegistrations, news, storeOrders, volunteers } from "@/lib/db/schema";
import { eq, count, sum } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get member statistics
    const totalMembersResult = await db.select({ count: count() }).from(members);
    const paidMembersResult = await db.select({ count: count() }).from(members).where(eq(members.isPaid, true));
    const pendingMembersResult = await db.select({ count: count() }).from(members).where(eq(members.isPaid, false));

    // Get donation statistics
    const donationsResult = await db.select({ total: sum(donations.amount) }).from(donations);

    // Get order statistics
    const totalOrdersResult = await db.select({ count: count() }).from(storeOrders);
    const pendingOrdersResult = await db.select({ count: count() }).from(storeOrders).where(eq(storeOrders.status, "pending"));

    // Get event registration statistics
    const totalEventRegistrationsResult = await db.select({ count: count() }).from(eventRegistrations);

    // Get volunteer statistics
    const totalVolunteersResult = await db.select({ count: count() }).from(volunteers);
    const pendingVolunteersResult = await db.select({ count: count() }).from(volunteers).where(eq(volunteers.status, "pending"));

    // Get news statistics
    const totalNewsResult = await db.select({ count: count() }).from(news);
    const publishedNewsResult = await db.select({ count: count() }).from(news).where(eq(news.isPublished, true));

    const stats = {
      totalMembers: totalMembersResult[0]?.count || 0,
      paidMembers: paidMembersResult[0]?.count || 0,
      pendingMembers: pendingMembersResult[0]?.count || 0,
      totalDonations: parseFloat(donationsResult[0]?.total || "0"),
      totalOrders: totalOrdersResult[0]?.count || 0,
      pendingOrders: pendingOrdersResult[0]?.count || 0,
      totalEvents: totalEventRegistrationsResult[0]?.count || 0,
      totalVolunteers: totalVolunteersResult[0]?.count || 0,
      pendingVolunteers: pendingVolunteersResult[0]?.count || 0,
      totalNews: totalNewsResult[0]?.count || 0,
      publishedNews: publishedNewsResult[0]?.count || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 