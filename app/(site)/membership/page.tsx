import { Metadata } from "next";
import Link from "next/link";
import MembershipForm from "@/components/Membership/MembershipForm";

export const metadata: Metadata = {
  title: "Membership - SOBA Ontario",
  description: "Join SOBA Ontario and become part of our thriving community of Sasse College alumni in Ontario, Canada.",
};

export default function MembershipPage() {
  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Join SOBA Ontario
            </h1>
            <p className="mb-6 text-lg">
              Become part of our thriving community of over 30 active Sasse College alumni across Ontario
            </p>
            
            <div className="mb-10 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already a member?{" "}
                <Link 
                  href="/auth/signin" 
                  className="font-medium text-primary hover:text-primary/80 underline"
                >
                  Sign in to your account
                </Link>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Membership Benefits */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Membership Benefits
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-3 text-primary">✓</span>
                  <span>$5,000 member death benefit</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">✓</span>
                  <span>Financial Emergency Assistance Program up to $1,000</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">✓</span>
                  <span>$500 childbirth benefit</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">✓</span>
                  <span>$500 immediate family member death benefit</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">✓</span>
                  <span>Educational Achievement Benefits ($150-$250)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">✓</span>
                  <span>Wedding milestone celebrations ($150)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">✓</span>
                  <span>Hospitalization support ($200)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-primary">✓</span>
                  <span>DHR (Diaspora Home Return) enrollment</span>
                </li>
              </ul>
              
              <div className="mt-8 rounded-lg bg-primary/10 p-4">
                <h3 className="font-bold text-primary">Membership Fee</h3>
                <p className="text-2xl font-bold text-black dark:text-white">$100</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">One-time registration fee</p>
              </div>
            </div>

            {/* Registration Form */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Registration Form
              </h2>
              <MembershipForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 