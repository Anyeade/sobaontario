import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Outreach - SOBA Ontario",
  description: "Learn about SOBA Ontario's community outreach programs and how we support both local and international communities.",
};

const outreachPrograms = [
  {
    id: 1,
    title: "Educational Support Program",
    description: "Providing scholarships and educational resources to deserving students in Nigeria and Canada.",
    icon: "🎓",
    impact: "50+ students supported annually",
    activities: [
      "Scholarship awards for secondary school students",
      "University bursaries for higher education",
      "Educational material donations",
      "Mentorship programs"
    ]
  },
  {
    id: 2,
    title: "Healthcare Initiatives",
    description: "Supporting healthcare facilities and medical outreach programs in underserved communities.",
    icon: "🏥",
    impact: "3 healthcare facilities supported",
    activities: [
      "Medical equipment donations",
      "Healthcare professional training",
      "Community health awareness programs",
      "Emergency medical support"
    ]
  },
  {
    id: 3,
    title: "Community Development",
    description: "Infrastructure and community development projects that improve quality of life.",
    icon: "🏗️",
    impact: "Multiple communities reached",
    activities: [
      "Water and sanitation projects",
      "Community center construction",
      "Road and bridge repairs",
      "Solar power installations"
    ]
  },
  {
    id: 4,
    title: "Youth Empowerment",
    description: "Programs focused on empowering young people through skills development and mentorship.",
    icon: "👥",
    impact: "200+ youth engaged",
    activities: [
      "Vocational training programs",
      "Leadership development workshops",
      "Sports and recreation activities",
      "Career guidance and counseling"
    ]
  }
];

const partnerships = [
  {
    name: "Local Schools",
    description: "Partnering with schools in Ontario to support Nigerian-Canadian students",
    logo: "🏫"
  },
  {
    name: "Healthcare Organizations",
    description: "Collaborating with medical professionals for health outreach",
    logo: "🩺"
  },
  {
    name: "Community Centers",
    description: "Working with local centers to host community events",
    logo: "🏢"
  },
  {
    name: "International NGOs",
    description: "Partnering with organizations for projects in Nigeria",
    logo: "🌍"
  }
];

export default function OutreachPage() {
  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Community Outreach
            </h1>
            <p className="mb-10 text-lg">
              Making a positive impact in communities across Ontario and Nigeria through 
              collaborative programs and sustainable initiatives
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mb-16 rounded-lg bg-primary/10 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Our Outreach Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              To create lasting positive change by leveraging our collective resources, 
              expertise, and networks to support education, healthcare, and community 
              development initiatives that uplift and empower communities.
            </p>
          </div>

          {/* Outreach Programs */}
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-black dark:text-white">
              Our Programs
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {outreachPrograms.map((program) => (
                <div
                  key={program.id}
                  className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection"
                >
                  <div className="mb-4 flex items-center space-x-3">
                    <span className="text-3xl">{program.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-black dark:text-white">
                        {program.title}
                      </h3>
                      <p className="text-sm text-primary">{program.impact}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    {program.description}
                  </p>
                  
                  <div>
                    <h4 className="mb-2 font-semibold text-black dark:text-white">
                      Key Activities:
                    </h4>
                    <ul className="space-y-1">
                      {program.activities.map((activity, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <span className="text-primary">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="mb-16 rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
            <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Students Supported</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">$100K+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Funds Raised</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">10+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">5</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Communities Reached</p>
              </div>
            </div>
          </div>

          {/* Partnerships */}
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-black dark:text-white">
              Our Partners
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {partnerships.map((partner, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 text-center shadow-solid-8 dark:bg-blacksection"
                >
                  <div className="mb-3 text-4xl">{partner.logo}</div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Get Involved */}
          <div className="rounded-lg bg-primary/10 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Get Involved
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Join us in making a difference! Whether through volunteering, donations, 
              or partnerships, there are many ways to contribute to our outreach efforts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/donations"
                className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
              >
                Make a Donation
              </Link>
              <Link
                href="/membership"
                className="rounded-lg border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Become a Member
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-stroke px-6 py-3 text-black transition-colors hover:border-primary hover:text-primary dark:border-strokedark dark:text-white dark:hover:border-primary dark:hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 