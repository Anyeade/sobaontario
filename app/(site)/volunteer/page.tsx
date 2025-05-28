import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VolunteerForm from "@/components/Volunteer/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer Programs - SOBA Ontario",
  description: "Join SOBA Ontario's volunteer programs and make a difference in our community. Discover opportunities to support education, community development, and member assistance.",
};

export default function VolunteerPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pb-10 pt-35 md:pt-40 xl:pb-15 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Volunteer Programs
            </h1>
            <p className="mb-10 text-lg">
              Make a meaningful impact in our community through SOBA Ontario's volunteer initiatives
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="pt-10 pb-20 lg:pt-15 lg:pb-25 xl:pt-20 xl:pb-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-15 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              Volunteer Opportunities
            </h2>
            <p className="mx-auto max-w-3xl">
              Join our dedicated volunteers in making a positive impact across Ontario. 
              Every contribution matters in building stronger communities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Educational Support */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <div className="mb-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Educational Support
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Help students succeed through tutoring, mentorship, and scholarship programs. 
                  Support the next generation of leaders.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Tutoring and academic mentorship</li>
                  <li>• Scholarship application assistance</li>
                  <li>• Career guidance workshops</li>
                  <li>• University preparation programs</li>
                </ul>
              </div>
            </div>

            {/* Community Development */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <div className="mb-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h6v4H7V6zm8 8v2h1v-2h-1zm-2-2H4v4h9v-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Community Development
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Participate in community building initiatives that strengthen neighborhoods 
                  and support local families.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Community outreach programs</li>
                  <li>• Local event organization</li>
                  <li>• Neighborhood improvement projects</li>
                  <li>• Cultural celebration planning</li>
                </ul>
              </div>
            </div>

            {/* Member Support */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <div className="mb-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Member Support
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Help fellow Sobans integrate into Canadian life and provide support 
                  during challenging times.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• New member orientation</li>
                  <li>• Integration assistance programs</li>
                  <li>• Emergency support coordination</li>
                  <li>• Professional networking facilitation</li>
                </ul>
              </div>
            </div>

            {/* Event Organization */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <div className="mb-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Event Organization
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Help plan and execute SOBA Ontario events, from AGMs to family picnics 
                  and networking sessions.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Annual General Meeting coordination</li>
                  <li>• Family picnic planning</li>
                  <li>• Professional networking events</li>
                  <li>• Cultural celebrations</li>
                </ul>
              </div>
            </div>

            {/* Fundraising */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <div className="mb-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Fundraising
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Support fundraising initiatives that enable our community programs 
                  and member benefits.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Donation campaign coordination</li>
                  <li>• Grant application assistance</li>
                  <li>• Fundraising event planning</li>
                  <li>• Sponsor relationship management</li>
                </ul>
              </div>
            </div>

            {/* Communications */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <div className="mb-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Communications
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Help spread the word about SOBA Ontario's mission and activities 
                  through various communication channels.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Social media management</li>
                  <li>• Newsletter content creation</li>
                  <li>• Website content updates</li>
                  <li>• Photography and videography</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Involved */}
      <section className="py-20 lg:py-25 xl:py-30 bg-gray-50 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-15 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              How to Get Involved
            </h2>
            <p className="mx-auto max-w-3xl">
              Ready to make a difference? Here's how you can join our volunteer community
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-2xl font-bold">1</span>
                </div>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Contact Us
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reach out to us at info@sobaontario.org to express your interest 
                in volunteering and learn about current opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-2xl font-bold">2</span>
                </div>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Choose Your Area
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select the volunteer program that aligns with your interests, 
                skills, and availability. We'll match you with the right opportunity.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-2xl font-bold">3</span>
                </div>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Start Making Impact
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join our team of dedicated volunteers and start making a positive 
                impact in our community and the lives of fellow Sobans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-15 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              Apply to Volunteer
            </h2>
            <p className="mx-auto max-w-3xl">
              Ready to make a difference? Fill out our volunteer application form below and join our community of dedicated volunteers.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <VolunteerForm />
          </div>
        </div>
      </section>
    </main>
  );
} 