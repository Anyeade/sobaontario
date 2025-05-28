import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donation Success - SOBA Ontario",
  description: "Thank you for your generous donation to SOBA Ontario. Your contribution makes a difference in our community.",
};

export default function DonationSuccessPage() {
  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Thank You for Your Generosity! 💝
            </h1>
            
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Your donation has been processed successfully. Your contribution makes a meaningful 
              difference in supporting our community initiatives and programs.
            </p>

            <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
                Your Impact
              </h2>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <span className="text-primary">📧</span>
                  <p>A donation receipt has been sent to your email address for tax purposes.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary">🌟</span>
                  <p>Your donation will directly support the programs and initiatives you selected.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary">📊</span>
                  <p>We'll keep you updated on how your contribution is making a difference in our community.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary">🤝</span>
                  <p>Consider joining our volunteer programs to get more involved in our mission.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="rounded-full bg-primary px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-primary/90"
              >
                Return Home
              </Link>
              
              <Link
                href="/membership"
                className="rounded-full border border-stroke px-7.5 py-2.5 text-black duration-300 ease-in-out hover:border-primary hover:text-primary dark:border-strokedark dark:text-white dark:hover:border-primary dark:hover:text-primary"
              >
                Join SOBA Ontario
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 