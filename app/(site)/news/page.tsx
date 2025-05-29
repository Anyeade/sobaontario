"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const newsArticles = [
  {
    id: 1,
    title: "SOBA Ontario Community Day 2025",
    excerpt: "Join us for our annual Community Day on Saturday, May 31st, 2025. A day of celebration, networking, and community building.",
    date: "May 27, 2025",
    image: "/images/gallery/DSCF8816.jpg",
    category: "Events",
    featured: true,
    tags: ["Events", "Community", "Networking", "Annual"]
  },
  {
    id: 3,
    title: "SOBA Ontario Initial Launch",
    excerpt: "SOBA Ontario officially launched its website on May 27, 2025, with a special event at the Sasse community center",
    date: "May 27, 2025",
    image: "/images/gallery/initial-launch.jpg",
    category: "Community",
    featured: false,
    tags: ["Website", "Launch", "Technology", "Community"]
  },
  {
    id: 4,
    title: "Welcome New Members",
    excerpt: "We're pleased to welcome new members to SOBA Ontario this quarter, bringing our total membership to 31 active members.",
    date: "May 24, 2025",
    image: "/images/gallery/IMG_0305.jpg",
    category: "Membership",
    featured: false,
    tags: ["Membership", "Welcome", "Growth", "Community"]
  },
];

function NewsContent() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const searchParams = useSearchParams();
  
  // Set initial tag from URL parameter
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
    }
  }, [searchParams]);
  
  // Get all unique tags
  const allTags = ["All", ...Array.from(new Set(newsArticles.flatMap(article => article.tags)))];
  
  // Filter articles by selected tag
  const filteredArticles = selectedTag === "All" 
    ? newsArticles 
    : newsArticles.filter(article => article.tags.includes(selectedTag));
    
  const featuredArticle = filteredArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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

          {/* Tag Filter */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">Filter by Tag</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    selectedTag === tag
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
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
                  
                  {/* Article Tags */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag, tagIndex) => (
                        <button
                          key={tagIndex}
                          onClick={() => setSelectedTag(tag)}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading news...</p>
      </div>
    </div>}>
      <NewsContent />
    </Suspense>
  );
} 