import { Metadata } from "next";
import EventRegistrationsTable from "@/components/Admin/EventRegistrationsTable";

export const metadata: Metadata = {
  title: "Event Registrations - Admin Dashboard",
  description: "Manage event registrations and track member interest.",
};

export default function AdminEventsPage() {
  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Event Registrations Management
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              View and manage all event registrations and member interests.
            </p>
          </div>

          <EventRegistrationsTable />
        </div>
      </section>
    </main>
  );
} 