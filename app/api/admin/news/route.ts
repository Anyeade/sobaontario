import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
  featuredImage: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const articles = await db.select().from(news);
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createSchema.parse(body);

    const newArticle = await db.insert(news).values({
      title: validatedData.title,
      excerpt: validatedData.excerpt,
      content: validatedData.content,
      author: validatedData.author,
      category: validatedData.category,
      tags: JSON.stringify(validatedData.tags),
      isPublished: validatedData.isPublished,
      featuredImage: validatedData.featuredImage,
      publishedAt: validatedData.isPublished ? new Date() : null,
    }).returning();

    return NextResponse.json(newArticle[0], { status: 201 });
  } catch (error) {
    console.error("Error creating news article:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 