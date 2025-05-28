import { Metadata } from "next";
import DonationForm from "@/components/Donations/DonationForm";

export const metadata: Metadata = {
  title: "Donations - SOBA Ontario",
  description: "Support SOBA Ontario's community initiatives and programs through your generous donations.",
};

const donationCategories = [
  {
    name: "Sports & Recreation",
    description: "Support sports activities and recreational programs for our community",
    icon: "🏆",
  },
  {
    name: "Volunteer Programs",
    description: "Fund volunteer initiatives and community service projects",
    icon: "🤝",
  },
  {
    name: "Arts & Culture",
    description: "Promote cultural events and artistic expressions within our community",
    icon: "🎨",
  },
  {
    name: "Community Outreach",
    description: "Support outreach programs that help integrate new members",
    icon: "🌍",
  },
  {
    name: "Trade & Technical Skills",
    description: "Fund training programs and skill development initiatives",
    icon: "🔧",
  },
  {
    name: "Computers and Equipment",
    description: "Help provide technology and equipment for community programs",
    icon: "💻",
  },
];

export default function DonationsPage() {
  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Support Our Community
            </h1>
            <p className="mb-10 text-lg">
              Your donations help us support meaningful projects and strengthen our community bonds
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Donation Categories */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Donation Categories
              </h2>
              <div className="space-y-4">
                {donationCategories.map((category, index) => (
                  <div key={index} className="rounded-lg border border-stroke p-4 dark:border-strokedark">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 rounded-lg bg-primary/10 p-4">
                <h3 className="font-bold text-primary">Thank You</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Every donation, no matter the size, makes a meaningful impact on our community.
                  Your generosity helps us continue our mission of supporting Sobans across Ontario.
                </p>
              </div>
            </div>

            {/* Donation Form */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Make a Donation
              </h2>
              <DonationForm categories={donationCategories} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 