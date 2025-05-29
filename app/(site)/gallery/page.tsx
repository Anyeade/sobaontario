import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery - SOBA Ontario",
  description: "Explore photos from SOBA Ontario events, gatherings, and community activities.",
};

const galleryImages = [
  {
    src: "/images/gallery/Fraternity Weekend.jpg",
    alt: "SOBA Ontario members during offertory procession on their Fraternity Weekend celebrations",
    title: "Fraternity Weekend - August 2024",
  },
  {
    src: "/images/gallery/st-joseph-feast-day.jpg",
    alt: "SOBA Ontario members during singing during Mass as they Celebrate St Joseph Feast Day",
    title: "St Joseph Feast Day - March 2025",
  },
  {
    src: "/images/gallery/DSCF8816.jpg",
    alt: "SOBA Ontario Campus Surfing",
    title: "Campus Surfing",
  },
  {
    src: "/images/gallery/DSCF7024.jpg",
    alt: "SOBA Ontario Members",
    title: "Sasse Student Studying",
  },
  {
    src: "/images/gallery/IMG_20141211_173823.jpg",
    alt: "SOBA Ontario Campus open visit",
    title: "Campus open visit",
  },
  {
    src: "/images/gallery/IMG_0305.jpg",
    alt: "SOBA Ontario School Campus",
    title: "Our School Campus",
  },
];

export default function GalleryPage() {
  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              SOBA Ontario Gallery
            </h1>
            <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">
              Capturing moments from our community events, celebrations, and gatherings
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-white shadow-solid-8 transition-all duration-300 hover:shadow-solid-10 dark:bg-blacksection"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {image.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="rounded-lg bg-primary/10 p-8">
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Share Your Moments
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Have photos from SOBA Ontario events? We'd love to feature them in our gallery!
              </p>
              <a
                href="/contact"
                className="inline-flex rounded-full bg-primary px-7.5 py-2.5 text-white transition-colors hover:bg-primary/90"
              >
                Contact Us to Share Photos
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 