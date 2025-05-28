import Link from "next/link";

export default function EventNotFound() {
  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
              <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
                Event Not Found
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                Sorry, the event you're looking for doesn't exist or may have been removed.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/events"
                className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
              >
                View All Events
              </Link>
              <Link 
                href="/"
                className="rounded-lg border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 