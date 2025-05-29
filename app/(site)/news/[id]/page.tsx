import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// News data with full content
const allNewsArticles = [
  {
    id: 1,
    title: "SOBA Ontario Community Day 2025",
    excerpt: "Join us for our annual Community Day on Saturday, May 31st, 2025. A day of celebration, networking, and community building.",
    date: "May 27, 2025",
    dateISO: "2025-05-27",
    image: "/images/gallery/DSCF8816.jpg",
    category: "Events",
    featured: true,
    author: "SOBA Ontario Events Team",
    fullContent: `
      <p>We are excited to announce SOBA Ontario Community Day 2025, our flagship annual event that brings together Sasse College alumni from across Ontario for a day of celebration, networking, and community building.</p>
      
      <p>Scheduled for Saturday, May 31st, 2025, this special day will feature cultural activities, professional networking sessions, traditional cuisine, and opportunities to strengthen the bonds that unite us as Sobans.</p>
      
      <h3>What to Expect</h3>
      <p>Whether you're a recent graduate or a long-time member, this event offers something for everyone:</p>
      <ul>
        <li>Career development workshops and networking opportunities</li>
        <li>Cultural performances celebrating our shared heritage</li>
        <li>Family-friendly activities for all ages</li>
        <li>Traditional cuisine and fellowship</li>
        <li>Community awards and recognition ceremony</li>
      </ul>
      
      <h3>Registration Information</h3>
      <p>Registration is now open! This event is free for current SOBA Ontario members and $25 for guests. Space is limited, so please register early to secure your spot.</p>
      
      <p>Join us as we celebrate our shared heritage, discuss community initiatives, and plan for a brighter future together. Mark your calendars and we look forward to seeing you there!</p>
    `,
    tags: ["Events", "Community", "Networking", "Annual"]
  },
  {
    id: 3,
    title: "SOBA Ontario Initial Launch",
    excerpt: "SOBA Ontario officially launched its website on May 27, 2025, with a special event at the Sasse community center",
    date: "May 27, 2025",
    dateISO: "2025-05-27",
    image: "/images/gallery/initial-launch.jpg",
    category: "Community",
    featured: false,
    author: "SOBA Ontario Communications",
    fullContent: `
      <p>Today marks a historic milestone for SOBA Ontario as we officially launched our new website with a special celebration at the Sasse community center.</p>
      
      <p>This launch represents years of planning and development to create a digital home for all Sasse College alumni in Ontario. Our new website will serve as the central hub for community news, events, membership information, and resources.</p>
      
      <h3>Website Features</h3>
      <p>The new SOBA Ontario website includes:</p>
      <ul>
        <li>Comprehensive membership portal and registration</li>
        <li>Event calendar and registration system</li>
        <li>News and updates from our community</li>
        <li>Photo gallery showcasing our events and activities</li>
        <li>Online store for SOBA Ontario merchandise</li>
        <li>Contact forms and member directory</li>
      </ul>
      
      <h3>Community Celebration</h3>
      <p>The launch event was attended by founding members, current leadership, and community supporters. We shared our vision for the future and demonstrated the website's capabilities.</p>
      
      <p>This digital platform will help us better serve our growing membership and strengthen connections within the SOBA Ontario community. We invite all members to explore the new features and provide feedback as we continue to improve.</p>
    `,
    tags: ["Website", "Launch", "Technology", "Community"]
  },
  {
    id: 4,
    title: "Welcome New Members",
    excerpt: "We're pleased to welcome new members to SOBA Ontario this quarter, bringing our total membership to 31 active members.",
    date: "May 24, 2025",
    dateISO: "2025-05-24",
    image: "/images/gallery/IMG_0305.jpg",
    category: "Membership",
    featured: false,
    author: "SOBA Ontario Membership Committee",
    fullContent: `
      <p>We are delighted to welcome our newest members to the SOBA Ontario family! This quarter has seen tremendous growth in our community, bringing our total active membership to 31 dedicated individuals.</p>
      
      <h3>Growing Community</h3>
      <p>Our expanding membership reflects the strong appeal of SOBA Ontario's mission to support Sasse College alumni in their Canadian journey. Each new member brings unique experiences, skills, and perspectives that enrich our community.</p>
      
      <h3>New Member Orientation</h3>
      <p>All new members are invited to attend our quarterly orientation session where they will:</p>
      <ul>
        <li>Learn about SOBA Ontario's history and mission</li>
        <li>Meet current members and leadership team</li>
        <li>Discover available programs and services</li>
        <li>Connect with mentors in their field of interest</li>
        <li>Understand how to get involved in community activities</li>
      </ul>
      
      <h3>Membership Benefits</h3>
      <p>Our members enjoy access to networking events, professional development opportunities, community outreach programs, and social activities that celebrate our shared heritage.</p>
      
      <p>We look forward to supporting our new members as they integrate into the Canadian community and contribute to SOBA Ontario's continued growth and success.</p>
    `,
    tags: ["Membership", "Welcome", "Growth", "Community"]
  }
];

interface NewsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = allNewsArticles.find(a => a.id === parseInt(id));
  
  if (!article) {
    return {
      title: "Article Not Found - SOBA Ontario",
      description: "The requested news article could not be found.",
    };
  }

  return {
    title: `${article.title} - SOBA Ontario News`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { id } = await params;
  const article = allNewsArticles.find(a => a.id === parseInt(id));

  if (!article) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="pb-10 pt-35 md:pt-40 xl:pb-15 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/news" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
              </svg>
              Back to News
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                  article.featured 
                    ? "bg-primary text-white" 
                    : "bg-primary/10 text-primary"
                }`}>
                  {article.featured ? "Featured" : article.category}
                </span>
              </div>
              
              <h1 className="mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                {article.title}
              </h1>
              
              <div className="mb-6 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                  <span>{article.author}</span>
                </div>
              </div>

              {/* Article Image */}
              <div className="mb-8 aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="lead text-xl text-gray-700 dark:text-gray-300 mb-6">
                  {article.excerpt}
                </p>
                <div 
                  className="blog-details-docs"
                  dangerouslySetInnerHTML={{ __html: article.fullContent }} 
                />
              </div>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-stroke dark:border-strokedark">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection">
                <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {allNewsArticles
                    .filter(a => a.id !== article.id)
                    .slice(0, 3)
                    .map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        href={`/news/${relatedArticle.id}`}
                        className="group block"
                      >
                        <div className="flex gap-3">
                          <div className="aspect-square w-16 overflow-hidden rounded">
                            <Image
                              src={relatedArticle.image}
                              alt={relatedArticle.title}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-black group-hover:text-primary dark:text-white line-clamp-2">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {relatedArticle.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6 rounded-lg bg-primary/10 p-6">
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  Stay Updated
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Subscribe to receive the latest news from SOBA Ontario
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 