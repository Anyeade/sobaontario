import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { storeOrders, members } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateSchema = z.object({
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]).optional(),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
  trackingNumber: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const order = await db
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
      .leftJoin(members, eq(storeOrders.memberId, members.id))
      .where(eq(storeOrders.id, id))
      .limit(1);

    if (!order[0]) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order[0]);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (validatedData.status) {
      updateData.status = validatedData.status;
    }

    if (validatedData.paymentStatus) {
      updateData.paymentStatus = validatedData.paymentStatus;
    }

    if (validatedData.trackingNumber !== undefined) {
      updateData.trackingNumber = validatedData.trackingNumber;
    }

    const updatedOrder = await db
      .update(storeOrders)
      .set(updateData)
      .where(eq(storeOrders.id, id))
      .returning();

    if (updatedOrder.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder[0]);
  } catch (error) {
    console.error("Error updating order:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 