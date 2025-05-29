import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events - SOBA Ontario",
  description: "Stay updated with SOBA Ontario's upcoming events, community gatherings, and special occasions.",
};

const upcomingEvents = [
  {
    id: 1,
    title: "SOBA Ontario Community Day 2025",
    date: "May 31, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Ontario (Location TBA)",
    description: "Join us for our annual Community Day - a celebration of unity, networking, and community building among Sasse College alumni across Ontario.",
    image: "/images/gallery/DSCF8816.jpg",
    type: "Community",
    featured: true,
  },
  {
    id: 3,
    title: "SOBA Ontario Family Picnic",
    date: "June 22, 2025",
    time: "11:00 AM - 6:00 PM",
    location: "Centennial Park, Toronto",
    description: "Bring your family for a day of fun, food, and fellowship. Activities include games, BBQ, and networking opportunities.",
    image: "/images/gallery/DSCF7024.jpg",
    type: "Social",
  },
];

const pastEvents = [
  {
    id: 5,
    title: "Christmas Celebration 2024",
    date: "December 16, 2024",
    description: "A wonderful evening of celebration with traditional dishes, music, and fellowship.",
    image: "/images/gallery/DSCF7024.jpg",
  },
  {
    id: 7,
    title: "Professional Networking Evening",
    date: "September 14, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Downtown Toronto",
    description: "Connect with fellow Sobans in various professional fields. Share experiences and explore collaboration opportunities.",
    image: "/images/gallery/DSCF7024.jpg",
    type: "Networking",
  },
];

export default function EventsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pb-10 pt-35 md:pt-40 xl:pb-15 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              SOBA Ontario Events
            </h1>
            <p className="mb-10 text-lg">
              Join us for community gatherings, networking events, and special celebrations
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="pb-20 pt-10 lg:pb-25 lg:pt-15 xl:pb-30 xl:pt-20">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-15 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              Upcoming Events
            </h2>
            <p className="mx-auto max-w-3xl">
              Don't miss out on these exciting opportunities to connect with fellow Sobans and strengthen our community bonds.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`rounded-lg bg-white p-6 shadow-solid-8 transition-all hover:shadow-solid-9 dark:bg-blacksection ${
                  event.featured ? "border-2 border-primary" : ""
                }`}
              >
                {event.featured && (
                  <div className="mb-4">
                    <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                      Featured Event
                    </span>
                  </div>
                )}
                
                <Link href={`/events/${event.id}`} className="block">
                  <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {event.type}
                  </span>
                </div>
                
                <Link href={`/events/${event.id}`}>
                  <h3 className="mb-3 text-xl font-semibold text-black dark:text-white hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                </Link>
                
                <div className="mb-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  {event.description}
                </p>
                
                <Link 
                  href={`/events/${event.id}`}
                  className="block w-full rounded-lg bg-primary px-6 py-3 text-center text-white transition-colors hover:bg-primary/90"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="bg-gray-50 py-20 dark:bg-blacksection lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-15 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              Past Events
            </h2>
            <p className="mx-auto max-w-3xl">
              Take a look at some of our recent successful events and celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-lg bg-white p-6 shadow-solid-8 transition-all hover:shadow-solid-9 dark:bg-blacksection"
              >
                <Link href={`/events/${event.id}`} className="block">
                  <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                
                <Link href={`/events/${event.id}`}>
                  <h3 className="mb-3 text-xl font-semibold text-black dark:text-white hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                </Link>
                
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  <span>{event.date}</span>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {event.description}
                </p>
                
                <Link 
                  href={`/events/${event.id}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  View Details
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}