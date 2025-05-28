"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Note: Since we're using useSearchParams, we need to handle metadata differently
// export const metadata: Metadata = {
//   title: "Membership Success - SOBA Ontario",
//   description: "Welcome to SOBA Ontario! Your membership registration has been completed successfully.",
// };

export default function MembershipSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerificationStatus('error');
        setErrorMessage('No session ID found');
        return;
      }

      try {
        const response = await fetch('/api/membership/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (data.success) {
          setVerificationStatus('success');
        } else {
          setVerificationStatus('error');
          setErrorMessage(data.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setVerificationStatus('error');
        setErrorMessage('Failed to verify payment');
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (verificationStatus === 'loading') {
    return (
      <main>
        <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
          <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
            <div className="text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              </div>
              <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Verifying Your Payment...
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Please wait while we confirm your membership payment.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <main>
        <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
          <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
            <div className="text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-10 w-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Payment Verification Failed
              </h1>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                {errorMessage}
              </p>
              <Link
                href="/membership"
                className="rounded-full bg-primary px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-primary/90"
              >
                Try Again
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Welcome to SOBA Ontario! 🎉
            </h1>
            
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Your membership registration has been completed successfully. 
              You are now part of our thriving community of Sasse College alumni in Ontario.
            </p>

            <div className="mx-auto mb-10 max-w-2xl rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
              <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
                What's Next?
              </h2>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <span className="text-primary">🔐</span>
                  <p><strong>Your account is ready!</strong> You can now login to access your member profile and benefits.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary">📧</span>
                  <p>You will receive a confirmation email with your membership details and receipt.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary">🤝</span>
                  <p>A SOBA Ontario representative will contact you within 48 hours to welcome you to the community.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary">📅</span>
                  <p>You'll be invited to our next community event and added to our member communications.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-primary">💰</span>
                  <p>Your membership benefits are now active, including access to our support programs.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/auth/signin"
                className="rounded-full bg-primary px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-primary/90"
              >
                Login to Your Account
              </Link>
              
              <Link
                href="/"
                className="rounded-full border border-stroke px-7.5 py-2.5 text-black duration-300 ease-in-out hover:border-primary hover:text-primary dark:border-strokedark dark:text-white dark:hover:border-primary dark:hover:text-primary"
              >
                Return Home
              </Link>
              
              <Link
                href="/contact"
                className="rounded-full border border-stroke px-7.5 py-2.5 text-black duration-300 ease-in-out hover:border-primary hover:text-primary dark:border-strokedark dark:text-white dark:hover:border-primary dark:hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 