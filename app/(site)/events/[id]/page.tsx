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
    id: 4,
    title: "MECA Toronto Gala 2025",
    date: "May 17, 2025",
    dateISO: "2025-05-17",
    time: "TBA",
    startTime: "TBA",
    endTime: "TBA",
    location: "Toronto",
    description: "May 17th, Soban Emeritus Armsty will represent us at the 2025 MECA Toronto gala & bring our support of $150 with him",
    fullDescription: "SOBA Ontario will be represented at the 2025 MECA Toronto Gala by Soban Emeritus Armsty. This is an important community event where we show our support and solidarity with other organizations. We are contributing $150 to support this event and strengthen our inter-community relationships.",
    image: "/images/gallery/DSCF8816.jpg",
    type: "Community",
    featured: false,
    agenda: [
      "Soban Emeritus Armsty will represent SOBA Ontario",
      "Presentation of $150 support contribution",
      "Networking with other community organizations",
      "Strengthening inter-community relationships"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: false,
    cost: "SOBA Ontario representation only"
  },
  {
    id: 1,
    title: "SOBA Ontario Community Day 2025",
    date: "May 31, 2025",
    dateISO: "2025-05-31",
    time: "9:30 AM - 12:30 PM",
    startTime: "9:30 AM",
    endTime: "12:30 PM",
    location: "FEED Scarborough",
    description: "Saturday May 31st is SOBA Ontario Community Day. This year we will be helping out at FEED Scarborough from 9:30AM - 12:30PM. Stay tuned for more info on this.",
    fullDescription: "SOBA Ontario Community Day 2025 takes on a special meaning this year as we dedicate our time to community service at FEED Scarborough. This volunteer opportunity allows us to give back to the broader community while strengthening our bonds as Sobans. Join us for this meaningful day of service from 9:30AM to 12:30PM.",
    image: "/images/gallery/DSCF8816.jpg",
    type: "Community",
    featured: true,
    agenda: [
      "9:30 AM - Arrival and Team Organization",
      "10:00 AM - Begin Community Service Activities",
      "10:30 AM - Food Preparation and Distribution",
      "11:30 AM - Community Interaction and Support",
      "12:00 PM - Cleanup and Reflection",
      "12:30 PM - Event Conclusion"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: true,
    cost: "Free - Community Service"
  },
  {
    id: 5,
    title: "SOBA Calgary Fraternity Weekend",
    date: "June 6-8, 2025",
    dateISO: "2025-06-06",
    time: "Weekend Event",
    startTime: "9:00 AM",
    endTime: "6:00 PM",
    location: "Calgary",
    description: "June 6th - 8th 2025, SOBA Calgary Fraternity Weekend. As discussed at the last GA, there will be a voluntary drive to supplement the standard $150 we give out to sister groups",
    fullDescription: "SOBA Calgary Fraternity Weekend is a special inter-chapter event that strengthens the bonds between SOBA chapters across Canada. As approved at our last General Assembly, SOBA Ontario will contribute our standard $150 support to sister groups, with an additional voluntary drive to supplement this contribution and show our solidarity with SOBA Calgary.",
    image: "/images/gallery/DSCF7024.jpg",
    type: "Fraternity",
    featured: false,
    agenda: [
      "Friday: Arrival and Welcome Reception",
      "Saturday: Fraternity Activities and Networking", 
      "Saturday: Cultural Events and Presentations",
      "Sunday: Closing Ceremony and Departure",
      "Voluntary contribution drive to supplement standard $150 support"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: false,
    cost: "Standard $150 + voluntary contributions"
  },
  {
    id: 6,
    title: "SOBA ON In-Person Meeting",
    date: "June 28, 2025",
    dateISO: "2025-06-28",
    time: "TBA",
    startTime: "TBA",
    endTime: "TBA",
    location: "TBA",
    description: "Saturday June 28th 2025: upcoming SOBA ON in-person meeting to be hosted by Sobans Armsty, Dr Mambe, Dr Joakem, Martin Akum, Gordon Liverpool & Enongene Mathew. There were suggestions of moving the hosting date forward by about a week or swapping with a different team in order to accommodate some members on the team. Please let the group know the direction you're taking at the earliest opportunity.",
    fullDescription: "Our upcoming in-person meeting will be hosted by a dedicated team of Sobans including Armsty, Dr Mambe, Dr Joakem, Martin Akum, Gordon Liverpool & Enongene Mathew. This meeting is an important opportunity for members to come together, discuss community matters, and strengthen our organizational bonds. Note: There are ongoing discussions about potentially moving the date forward by a week or team swapping to accommodate member schedules.",
    image: "/images/gallery/event-april-26.jpg",
    type: "Meeting",
    featured: false,
    agenda: [
      "Opening and Welcome by Hosting Team",
      "Community Updates and Announcements",
      "Member Discussions and Feedback",
      "Organizational Planning and Updates",
      "Networking and Fellowship",
      "Closing Remarks and Next Steps"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: true,
    cost: "Free for members"
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
  {
    id: 9,
    title: "Fraternity Weekend Celebration",
    date: "August 4, 2025",
    dateISO: "2025-08-04",
    time: "11:30 AM",
    startTime: "11:30 AM",
    endTime: "1:30 PM",
    location: "Maria Goretti Parish, 717 Kennedy Rd, Scarborough, ON M1K 3N8",
    description: "Join us for the Fraternity Weekend Celebration on Sunday August 4th 2025 at Maria Goretti Parish. Special SOBA participation includes choir support, thanksgiving mass offertory procession with song and dance, and post-Mass reception. 5 photos of SOBA Ontario will be featured in the church bulletin.",
    fullDescription: "SOBA Ontario Fraternity Weekend Celebration culminates with a special Thanksgiving Mass at Maria Goretti Parish. This celebration includes coordinated participation with the church choir, a unique SOBA offertory procession with song and dance, and post-Mass fellowship. The fraternity weekend will be highlighted in the church's Sunday bulletin with 5 photos of SOBA Ontario, and copies will be available both printed and online.",
    image: "/images/gallery/fraternity-week.jpg",
    type: "Fraternity",
    featured: true,
    agenda: [
      "11:30 AM - Arrival (Latest) - Sit on right side of altar with church choir",
      "Thanksgiving Mass Service - Support church choir with hymnals and microphones provided",
      "First Offertory - Members gather behind church during collection",
      "Special SOBA Offertory - Thanksgiving procession with song and dance to altar",
      "After Communion - Sing the St Joseph Song (second song after communion)",
      "Church Bulletin - 5 SOBA Ontario photos featured with fraternity weekend highlight",
      "Post-Mass Reception - Finger foods and soft drinks in the vestibule"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: true,
    cost: "Free - Donations welcome for church offertory"
  },
  // Past Events
  {
    id: 10,
    title: "SOBA Ontario Volunteering Activities",
    date: "June 1, 2024",
    dateISO: "2024-06-01",
    time: "Full Day Event",
    startTime: "9:00 AM",
    endTime: "6:00 PM",
    location: "Community Service Locations & 59 Carleton Pl Brampton",
    description: "SOBA Ontario members participated in community volunteering activities followed by fellowship at Jackson's place in Brampton. A day of service and brotherhood.",
    fullDescription: "SOBA Ontario organized a comprehensive day of community service and fellowship on June 1st, 2024. Members participated in various volunteering activities throughout the day, demonstrating our commitment to community service. The day concluded with fellowship and celebration at Jackson's place in Brampton, strengthening the bonds of brotherhood among our members.",
    image: "/images/gallery/june-volunteer.jpg",
    type: "Volunteer",
    featured: false,
    agenda: [
      "Morning: Community volunteering activities at various service locations",
      "Afternoon: Continued community service work",
      "Evening: Fellowship gathering at Jackson's place",
      "Location: 59 Carleton Pl Brampton",
      "Celebration of successful volunteer work and community impact"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: false,
    cost: "Past Event"
  },
  {
    id: 11,
    title: "SOBA Ontario Christmas Party",
    date: "December 14, 2024",
    dateISO: "2024-12-14",
    time: "Evening Event",
    startTime: "6:00 PM",
    endTime: "11:00 PM",
    location: "TBA",
    description: "SOBA Ontario celebrated the holiday season with our annual Christmas Party on December 14th, 2024. The event featured festive activities, quiz competitions with prizes for winners, and holiday fellowship among members.",
    fullDescription: "SOBA Ontario's annual Christmas Party on December 14th, 2024 was a memorable celebration of the holiday season. The event brought together members and their families for an evening of festive activities, holiday traditions, and community fellowship. A highlight of the evening was the quiz competition where winners received special prizes, adding excitement and engagement to the celebration.",
    image: "/images/gallery/christmas-2024.jpg",
    type: "Social",
    featured: false,
    agenda: [
      "Evening: Welcome and holiday greetings",
      "Festive activities and holiday entertainment",
      "Quiz competition with prizes for winners",
      "Holiday fellowship and community celebration",
      "Traditional Christmas activities and games",
      "Prize distribution to quiz winners"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: false,
    cost: "Past Event"
  },
  {
    id: 5,
    title: "Christmas Celebration 2024",
    date: "December 16, 2024",
    dateISO: "2024-12-16",
    time: "6:00 PM - 11:00 PM",
    startTime: "6:00 PM",
    endTime: "11:00 PM",
    location: "Mississauga Convention Centre",
    description: "A wonderful evening of celebration with traditional dishes, music, and fellowship.",
    fullDescription: "Our Christmas Celebration 2024 was a memorable evening that brought together the SOBA Ontario community to celebrate the holiday season. The event featured traditional dishes, live music, cultural performances, and a special recognition ceremony for outstanding community members.",
    image: "/images/gallery/DSCF7024.jpg",
    type: "Social",
    featured: false,
    agenda: [],
    contact: "events@sobaontario.org",
    registrationRequired: false,
    cost: "Past Event"
  },
  {
    id: 7,
    title: "Saint Joseph Feast Day Mass",
    date: "March 23, 2025",
    dateISO: "2025-03-23",
    time: "11:30 AM",
    startTime: "11:30 AM",
    endTime: "1:30 PM",
    location: "Maria Goretti Parish, 717 Kennedy Rd, Scarborough, ON M1K 3N8",
    description: "SOBA Ontario participated in the Saint Joseph Feast Day Mass with special choir support, offertory procession with song and dance, and post-Mass reception.",
    fullDescription: "SOBA Ontario participated in the Saint Joseph Feast Day Mass at Maria Goretti Parish. This special celebration included coordinated participation with the church choir, a unique SOBA offertory procession with song and dance, and post-Mass fellowship. This was an important spiritual gathering that honored our patron saint while strengthening our community bonds.",
    image: "/images/gallery/st-joseph-feast-day.jpg",
    type: "Religious",
    featured: false,
    agenda: [
      "11:30 AM - Arrival (Latest) - Sit on right side of altar with church choir",
      "Mass Service - Support church choir with hymnals and microphones provided",
      "First Offertory - Members gather behind church during collection",
      "Special SOBA Offertory - Procession with song and dance to altar",
      "After Communion - Sing the St Joseph Song (second song after communion)",
      "Post-Mass Reception - Finger foods and soft drinks in the vestibule"
    ],
    contact: "events@sobaontario.org",
    registrationRequired: false,
    cost: "Past Event"
  },
  {
    id: 8,
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
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = allEvents.find(e => e.id === parseInt(id));
  
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

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = allEvents.find(e => e.id === parseInt(id));

  if (!event) {
    notFound();
  }

  const isPastEvent = new Date(event.dateISO) < new Date();
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sobaontario.org'}/events/${id}`;

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
                    eventId={id}
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