"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface ContactSubmission {
  id: string;
  fullName: string;
  emailAddress: string;
  subject: string;
  phoneNumber?: string;
  message: string;
  consentGiven: boolean;
  status: string;
  adminNotes?: string;
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminContactPage() {
  const { data: session, status } = useSession();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "admin") {
      redirect("/auth/signin");
    }
  }, [session, status]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/contact");
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: string, adminNotes?: string) => {
    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminNotes }),
      });

      if (response.ok) {
        fetchSubmissions(); // Refresh the list
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error("Error updating submission:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "read":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "responded":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-hero">
            Contact Submissions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage contact form submissions from website visitors
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection">
          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No contact submissions found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-stroke dark:border-strokedark">
                    <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-4 py-3 text-black dark:text-white">
                        {submission.fullName}
                      </td>
                      <td className="px-4 py-3 text-black dark:text-white">
                        {submission.emailAddress}
                      </td>
                      <td className="px-4 py-3 text-black dark:text-white">
                        {submission.subject}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                            submission.status
                          )}`}
                        >
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-black dark:text-white">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="rounded bg-primary px-3 py-1 text-sm text-white hover:bg-primary/90"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for viewing submission details */}
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 max-w-2xl w-full rounded-lg bg-white p-6 dark:bg-blacksection">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-black dark:text-white">
                  Contact Submission Details
                </h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedSubmission.fullName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedSubmission.emailAddress}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Subject
                  </label>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedSubmission.subject}
                  </p>
                </div>

                {selectedSubmission.phoneNumber && (
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white">
                      Phone
                    </label>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedSubmission.phoneNumber}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Message
                  </label>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Submitted
                  </label>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(selectedSubmission.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() =>
                      updateSubmissionStatus(selectedSubmission.id, "read")
                    }
                    className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                  >
                    Mark as Read
                  </button>
                  <button
                    onClick={() =>
                      updateSubmissionStatus(selectedSubmission.id, "responded")
                    }
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  >
                    Mark as Responded
                  </button>
                  <button
                    onClick={() =>
                      updateSubmissionStatus(selectedSubmission.id, "closed")
                    }
                    className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 