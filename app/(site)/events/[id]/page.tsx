import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCalendarButton from "@/components/Events/AddToCalendarButton";
import ShareEventButton from "@/components/Events/ShareEventButton";
import RegisterInterestButton from "@/components/Events/RegisterInterestButton";

// Event data (same as in events page)
const allEvents = [
  {
    id: 1,
    title: "SOBA Ontario Community Day 2025",
    date: "May 31, 2025",
    dateISO: "2025-05-31",
    time: "10:00 AM - 6:00 PM",
    startTime: "10:00 AM",
    endTime: "6:00 PM",
    location: "Ontario (Location TBA)",
    description: "Join us for our annual Community Day - a celebration of unity, networking, and community building among Sasse College alumni across Ontario.",
    fullDescription: "SOBA Ontario Community Day 2025 is our flagship annual event that brings together Sasse College alumni from across Ontario for a day of celebration, networking, and community building. This special day features cultural activities, professional networking sessions, traditional Nigerian cuisine, and opportunities to strengthen the bonds that unite us as Sobans. Whether you're a recent graduate or a long-time member, this event offers something for everyone - from career development workshops to family-friendly activities. Join us as we celebrate our shared heritage, discuss community initiatives, and plan for a brighter future together.",
    image: "/images/gallery/DSCF8816.jpg",
    type: "Community",
    featured: true,
    agenda: [
      "10:00 AM - Registration & Welcome Coffee",
      "11:00 AM - Opening Ceremony & Community Address",
      "12:00 PM - Networking Sessions by Industry",
      "1:00 PM - Traditional Nigerian Lunch",
      "2:30 PM - Cultural Performances & Entertainment",
      "4:00 PM - Community Awards & Recognition",
      "5:00 PM - Closing Remarks & Group Photos",
      "6:00 PM - Event Conclusion"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: true,
    cost: "Free for members, $25 for guests"
  },
  {
    id: 2,
    title: "Annual General Meeting 2025",
    date: "March 15, 2025",
    dateISO: "2025-03-15",
    time: "6:00 PM - 9:00 PM",
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    location: "Toronto Community Center",
    description: "Join us for our annual general meeting where we'll discuss community initiatives, elect new executives, and plan for the year ahead.",
    fullDescription: "The Annual General Meeting is a crucial gathering where SOBA Ontario members come together to review the past year's achievements, discuss financial reports, elect new executive members, and set strategic directions for the upcoming year. This is your opportunity to have your voice heard and actively participate in shaping the future of our organization.",
    image: "/images/gallery/DSCF7024.jpg",
    type: "Meeting",
    featured: false,
    agenda: [
      "6:00 PM - Registration & Light Refreshments",
      "6:30 PM - Call to Order & Opening Remarks",
      "7:00 PM - President's Annual Report",
      "7:30 PM - Financial Report & Budget Review",
      "8:00 PM - Election of New Executive Members",
      "8:30 PM - Strategic Planning Discussion",
      "9:00 PM - Closing & Networking"
    ],
    contact: "admin@sobaontario.org",
    registrationRequired: true,
    cost: "Free for members only"
  },
  {
    id: 3,
    title: "SOBA Ontario Family Picnic",
    date: "June 22, 2025",
    dateISO: "2025-06-22",
    time: "11:00 AM - 6:00 PM",
    startTime: "11:00 AM",
    endTime: "6:00 PM",
    location: "Centennial Park, Toronto",
    description: "Bring your family for a day of fun, food, and fellowship. Activities include games, BBQ, and networking opportunities.",
    fullDescription: "Our annual family picnic is a beloved tradition that brings together SOBA Ontario members and their families for a day of outdoor fun and fellowship. Set in the beautiful Centennial Park, this event features games for all ages, delicious BBQ, cultural activities, and plenty of opportunities to connect with fellow Sobans in a relaxed, family-friendly environment.",
    image: "/images/gallery/DSCF7024.jpg",
    type: "Social",
    featured: false,
    agenda: [
      "11:00 AM - Setup & Early Arrivals",
      "12:00 PM - Welcome & Icebreaker Games",
      "1:00 PM - BBQ Lunch Service Begins",
      "2:00 PM - Children's Activities & Face Painting",
      "3:00 PM - Sports Competitions (Football, Volleyball)",
      "4:00 PM - Cultural Performances",
      "5:00 PM - Group Photos & Awards",
      "6:00 PM - Cleanup & Departure"
    ],
    contact: "social@sobaontario.org",
    registrationRequired: true,
    cost: "$15 per adult, $10 per child, Free for children under 5"
  },
  // Past Events
  {
    id: 5,
    title: "Christmas Celebration 2024",
    date: "December 16, 2024",
    dateISO: "2024-12-16",
    time: "6:00 PM - 11:00 PM",
    startTime: "6:00 PM",
    endTime: "11:00 PM",
    location: "Mississauga Convention Centre",
    description: "A wonderful evening of celebration with traditional Nigerian dishes, music, and fellowship.",
    fullDescription: "Our Christmas Celebration 2024 was a memorable evening that brought together the SOBA Ontario community to celebrate the holiday season in true Nigerian style. The event featured traditional dishes, live music, cultural performances, and a special recognition ceremony for outstanding community members.",
    image: "/images/gallery/DSCF7024.jpg",
    type: "Social",
    featured: false,
    agenda: [
      "6:00 PM - Cocktail Reception",
      "7:00 PM - Welcome Address & Prayer",
      "7:30 PM - Traditional Nigerian Dinner",
      "8:30 PM - Live Music & Cultural Performances",
      "9:30 PM - Community Awards & Recognition",
      "10:30 PM - Dancing & Socializing",
      "11:00 PM - Event Conclusion"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: false,
    cost: "Past Event"
  },
  {
    id: 6,
    title: "Independence Day Celebration 2024",
    date: "October 1, 2024",
    dateISO: "2024-10-01",
    time: "2:00 PM - 8:00 PM",
    startTime: "2:00 PM",
    endTime: "8:00 PM",
    location: "Nigerian Cultural Centre, Toronto",
    description: "Celebrating Nigeria's independence with cultural performances and community bonding.",
    fullDescription: "Our Independence Day Celebration honored Nigeria's 64th independence anniversary with a vibrant display of Nigerian culture, including traditional music, dance performances, authentic cuisine, and speeches reflecting on our heritage and the Nigerian diaspora experience in Canada.",
    image: "/images/gallery/DSCF7024.jpg",
    type: "Cultural",
    featured: false,
    agenda: [
      "2:00 PM - Opening Ceremony & National Anthems",
      "2:30 PM - Cultural Performances",
      "3:30 PM - Traditional Nigerian Lunch",
      "4:30 PM - Keynote Address on Nigerian Heritage",
      "5:30 PM - Community Recognition Awards",
      "6:30 PM - Traditional Music & Dancing",
      "7:30 PM - Group Photos & Networking",
      "8:00 PM - Event Conclusion"
    ],
    contact: "cultural@sobaontario.org",
    registrationRequired: false,
    cost: "Past Event"
  },
  {
    id: 7,
    title: "Professional Networking Evening",
    date: "September 14, 2024",
    dateISO: "2024-09-14",
    time: "7:00 PM - 10:00 PM",
    startTime: "7:00 PM",
    endTime: "10:00 PM",
    location: "Downtown Toronto",
    description: "Connect with fellow Sobans in various professional fields. Share experiences and explore collaboration opportunities.",
    fullDescription: "Our Professional Networking Evening provided a platform for SOBA Ontario members to connect across various industries, share career experiences, and explore collaboration opportunities. The event featured industry-specific breakout sessions, mentorship matching, and presentations on professional development in the Canadian market.",
    image: "/images/gallery/DSCF7024.jpg",
    type: "Networking",
    featured: false,
    agenda: [
      "7:00 PM - Registration & Welcome Drinks",
      "7:30 PM - Opening Remarks & Introductions",
      "8:00 PM - Industry Breakout Sessions",
      "8:45 PM - Mentorship Speed Networking",
      "9:15 PM - Professional Development Presentation",
      "9:45 PM - Open Networking & Refreshments",
      "10:00 PM - Event Conclusion"
    ],
    contact: "professional@sobaontario.org",
    registrationRequired: false,
    cost: "Past Event"
  }
];

interface EventPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = allEvents.find(e => e.id === parseInt(params.id));
  
  if (!event) {
    return {
      title: "Event Not Found - SOBA Ontario",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: `${event.title} - SOBA Ontario`,
    description: event.description,
  };
}

export default function EventDetailPage({ params }: EventPageProps) {
  const event = allEvents.find(e => e.id === parseInt(params.id));

  if (!event) {
    notFound();
  }

  const isPastEvent = new Date(event.dateISO) < new Date();
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sobaontario.org'}/events/${params.id}`;

  return (
    <main>
      {/* Hero Section */}
      <section className="pb-10 pt-35 md:pt-40 xl:pb-15 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/events" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
              </svg>
              Back to Events
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                  event.featured 
                    ? "bg-primary text-white" 
                    : "bg-primary/10 text-primary"
                }`}>
                  {event.featured ? "Featured Event" : event.type}
                </span>
                {isPastEvent && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    Past Event
                  </span>
                )}
              </div>
              
              <h1 className="mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                {event.title}
              </h1>
              
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-lg">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
              
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                {event.fullDescription}
              </p>
              
              {!isPastEvent && (
                <div className="flex flex-wrap gap-4">
                  <RegisterInterestButton
                    eventId={params.id}
                    eventTitle={event.title}
                    className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
                  />
                  <Link 
                    href="/contact" 
                    className="rounded-lg border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
            
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
                <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                  Event Agenda
                </h2>
                <div className="space-y-4">
                  {event.agenda?.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-b-0 dark:border-gray-800">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info */}
              <div className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                  Event Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Cost</p>
                    <p className="text-black dark:text-white">{event.cost}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Registration</p>
                    <p className="text-black dark:text-white">
                      {event.registrationRequired ? "Required" : "Not Required"}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Contact</p>
                    <a 
                      href={`mailto:${event.contact}`}
                      className="text-primary hover:text-primary/80"
                    >
                      {event.contact}
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              {!isPastEvent && (
                <div className="rounded-lg bg-primary/5 p-6 dark:bg-primary/10">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <AddToCalendarButton
                      title={event.title}
                      description={event.fullDescription}
                      location={event.location}
                      startDate={event.dateISO}
                      startTime={event.startTime}
                      endTime={event.endTime}
                      className="w-full rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
                    />
                    <ShareEventButton
                      eventTitle={event.title}
                      eventUrl={currentUrl}
                      className="w-full rounded-lg border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-white"
                    />
                    <Link 
                      href="/membership"
                      className="block w-full rounded-lg bg-gray-100 px-4 py-2 text-center text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Become a Member
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Related Events */}
              <div className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                  Other Events
                </h3>
                <div className="space-y-4">
                  {allEvents
                    .filter(e => e.id !== event.id)
                    .slice(0, 3)
                    .map((relatedEvent) => (
                      <Link 
                        key={relatedEvent.id}
                        href={`/events/${relatedEvent.id}`}
                        className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary dark:border-gray-700 dark:hover:border-primary"
                      >
                        <h4 className="mb-1 font-medium text-black dark:text-white">
                          {relatedEvent.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {relatedEvent.date}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 