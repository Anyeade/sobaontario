"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Note: Since we're using useSearchParams, we need to handle metadata differently
// export const metadata: Metadata = {
//   title: "Order Successful - SOBA Ontario Store",
//   description: "Your order has been successfully placed. Thank you for supporting SOBA Ontario!",
// };

function ShopSuccessContent() {
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
    );
  }

  if (verificationStatus === 'error') {
    return (
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
    );
  }

  return (
    <>
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
                  <p>Your order will be delivered to your address</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-primary px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-primary/90"
              >
                Continue Shopping
              </Link>
              
              <Link
                href="/"
                className="rounded-full border border-stroke px-7.5 py-2.5 text-black duration-300 ease-in-out hover:border-primary hover:text-primary dark:border-strokedark dark:text-white dark:hover:border-primary dark:hover:text-primary"
              >
                Return Home
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
                Your purchase directly supports our community programs and initiatives. 
                Every item you buy helps us continue our mission of connecting and supporting 
                Sasse College alumni across Ontario.
              </p>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">Community Programs</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Supporting educational and cultural initiatives
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">Alumni Network</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Building connections across Ontario
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">Community Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Helping members in times of need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LoadingFallback() {
  return (
    <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
          <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
            Loading...
          </h1>
        </div>
      </div>
    </section>
  );
}

export default function ShopSuccessPage() {
  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <ShopSuccessContent />
      </Suspense>
    </main>
  );
} 