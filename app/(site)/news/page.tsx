import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News & Updates - SOBA Ontario",
  description: "Stay updated with the latest news, events, and announcements from SOBA Ontario community.",
};

const newsArticles = [
  {
    id: 1,
    title: "SOBA Ontario Community Day 2025",
    excerpt: "Join us for our annual Community Day on Saturday, May 31st, 2025. A day of celebration, networking, and community building.",
    date: "May 15, 2025",
    image: "/images/gallery/DSCF8816.jpg",
    category: "Events",
    featured: true,
  },
  {
    id: 3,
    title: "Successful Fundraising Initiative",
    excerpt: "Thanks to our generous community, we've raised significant funds for our community outreach programs.",
    date: "March 10, 2025",
    image: "/images/gallery/IMG_20141211_173823.jpg",
    category: "Community",
    featured: false,
  },
  {
    id: 4,
    title: "Welcome New Members",
    excerpt: "We're pleased to welcome new members to SOBA Ontario this quarter, bringing our total membership to 31 active members.",
    date: "May 24, 2025",
    image: "/images/gallery/IMG_0305.jpg",
    category: "Membership",
    featured: false,
  },
];

export default function NewsPage() {
  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center mb-16">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              News & Updates
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Stay connected with the latest happenings in the SOBA Ontario community
            </p>
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-16">
              <div className="rounded-lg bg-white shadow-solid-8 overflow-hidden dark:bg-blacksection">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[16/10] lg:aspect-auto">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="text-primary font-medium text-sm">
                        {featuredArticle.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-4">
                        {featuredArticle.date}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-black dark:text-white mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <Link
                      href={`/news/${featuredArticle.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-lg shadow-solid-8 overflow-hidden transition-all duration-300 hover:shadow-solid-10 dark:bg-blacksection"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-primary font-medium text-sm">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm ml-4">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/news/${article.id}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 text-center">
            <div className="rounded-lg bg-primary/10 p-8">
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Stay Updated
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Subscribe to our newsletter to receive the latest news and updates from SOBA Ontario
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 