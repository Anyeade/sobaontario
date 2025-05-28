import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Join SOBA Ontario - Membership Registration",
  description: "Join SOBA Ontario through our membership registration page"
};

export default function SignupPage() {
  // Redirect to membership page since that's where registration happens
  redirect("/membership");
}
