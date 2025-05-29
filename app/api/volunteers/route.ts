import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { volunteers } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      fullName,
      emailAddress,
      phoneNumber,
      address,
      volunteerAreas,
      availability,
      experience,
      motivation,
      skills,
      isMember
    } = body;

    // Validate required fields
    if (!fullName || !emailAddress || !volunteerAreas || volunteerAreas.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Combine additional info into experience field
    let combinedExperience = experience || "";
    if (motivation) {
      combinedExperience += combinedExperience ? `\n\nMotivation: ${motivation}` : `Motivation: ${motivation}`;
    }
    if (skills) {
      combinedExperience += combinedExperience ? `\n\nSkills: ${skills}` : `Skills: ${skills}`;
    }
    if (address) {
      combinedExperience += combinedExperience ? `\n\nAddress: ${address}` : `Address: ${address}`;
    }

    // Insert volunteer application into database
    const newVolunteer = await db.insert(volunteers).values({
      fullName,
      emailAddress,
      telephoneNumber: phoneNumber || null,
      interests: Array.isArray(volunteerAreas) ? JSON.stringify(volunteerAreas) : volunteerAreas,
      availability: availability || null,
      experience: combinedExperience || null,
      status: "pending"
    }).returning();

    return NextResponse.json(
      { 
        message: "Volunteer application submitted successfully!",
        volunteer: newVolunteer[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error submitting volunteer application:", error);
    return NextResponse.json(
      { error: "Failed to submit volunteer application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all volunteer applications (for admin use)
    const allVolunteers = await db.select().from(volunteers).orderBy(volunteers.createdAt);
    
    return NextResponse.json(allVolunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteers" },
      { status: 500 }
    );
  }
} 