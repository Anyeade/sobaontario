import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { storeOrders, members } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await db
      .select({
        id: storeOrders.id,
        memberName: members.fullName,
        memberEmail: members.emailAddress,
        items: storeOrders.items,
        totalAmount: storeOrders.totalAmount,
        status: storeOrders.status,
        paymentStatus: storeOrders.paymentStatus,
        createdAt: storeOrders.createdAt,
        shippingAddress: storeOrders.shippingAddress,
        trackingNumber: storeOrders.trackingNumber,
      })
      .from(storeOrders)
      .leftJoin(members, eq(storeOrders.memberId, members.id));

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 