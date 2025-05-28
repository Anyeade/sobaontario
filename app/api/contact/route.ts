import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  emailAddress: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  phoneNumber: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  consentGiven: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Insert contact submission into database
    const newSubmission = await db.insert(contactSubmissions).values({
      fullName: validatedData.fullName,
      emailAddress: validatedData.emailAddress,
      subject: validatedData.subject,
      phoneNumber: validatedData.phoneNumber || null,
      message: validatedData.message,
      consentGiven: validatedData.consentGiven,
      status: "new",
    }).returning();

    return NextResponse.json(
      { 
        message: "Contact form submitted successfully!",
        submission: newSubmission[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error submitting contact form:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Contact API endpoint is working" },
    { status: 200 }
  );
} 