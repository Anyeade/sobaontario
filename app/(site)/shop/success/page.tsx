"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Note: Since we're using useSearchParams, we need to handle metadata differently
// export const metadata: Metadata = {
//   title: "Order Successful - SOBA Ontario Store",
//   description: "Your order has been successfully placed. Thank you for supporting SOBA Ontario!",
// };

export default function ShopSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState<{
    orderId?: string;
    customerName?: string;
    totalAmount?: string;
  }>({});

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerificationStatus('error');
        setErrorMessage('No session ID found');
        return;
      }

      try {
        const response = await fetch('/api/store/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (data.success) {
          setVerificationStatus('success');
          setOrderDetails({
            orderId: data.orderId,
            customerName: data.customerName,
            totalAmount: data.totalAmount,
          });
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
                Processing Your Order...
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Please wait while we confirm your purchase.
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
                Order Verification Failed
              </h1>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                {errorMessage}
              </p>
              <Link
                href="/shop"
                className="rounded-full bg-primary px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-primary/90"
              >
                Return to Shop
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Success Section */}
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <svg
                  className="h-12 w-12 text-green-600 dark:text-green-400"
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
            </div>

            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Order Successful!
            </h1>
            
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Thank you for your purchase{orderDetails.customerName ? `, ${orderDetails.customerName}` : ''}! 
              Your order has been successfully placed and you will receive a confirmation email shortly.
            </p>

            {orderDetails.orderId && (
              <div className="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Order ID: <span className="font-mono font-semibold">{orderDetails.orderId}</span>
                </p>
                {orderDetails.totalAmount && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total: <span className="font-semibold">${orderDetails.totalAmount} CAD</span>
                  </p>
                )}
              </div>
            )}

            <div className="mb-10 rounded-lg bg-green-50 p-6 dark:bg-green-900/10">
              <h2 className="mb-4 text-xl font-semibold text-green-800 dark:text-green-400">
                What happens next?
              </h2>
              <div className="space-y-3 text-left text-green-700 dark:text-green-300">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-200 dark:bg-green-800">
                    <span className="text-xs font-bold text-green-800 dark:text-green-200">1</span>
                  </div>
                  <p>You'll receive an order confirmation email with your receipt</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-200 dark:bg-green-800">
                    <span className="text-xs font-bold text-green-800 dark:text-green-200">2</span>
                  </div>
                  <p>We'll process your order and prepare it for shipping</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-200 dark:bg-green-800">
                    <span className="text-xs font-bold text-green-800 dark:text-green-200">3</span>
                  </div>
                  <p>You'll receive a shipping notification with tracking information</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-200 dark:bg-green-800">
                    <span className="text-xs font-bold text-green-800 dark:text-green-200">4</span>
                  </div>
                  <p>Your SOBA Ontario merchandise will be delivered to your address</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primary/90"
              >
                Continue Shopping
                <svg
                  className="fill-white"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                    fill=""
                  />
                </svg>
              </Link>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-gray-300 px-8 py-3 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 lg:py-25 xl:py-30 bg-gray-50 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              Thank You for Supporting SOBA Ontario
            </h2>
            <div className="mx-auto max-w-3xl">
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Your purchase helps support our community programs, member benefits, and initiatives 
                that strengthen the SOBA Ontario network across the province.
              </p>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">Member Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Supporting member benefits and emergency assistance programs
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">Community Programs</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Funding educational initiatives and community development projects
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">Events & Activities</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Organizing networking events, cultural celebrations, and gatherings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 