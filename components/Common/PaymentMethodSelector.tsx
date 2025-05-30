"use client";

import { useState } from "react";

interface PaymentMethodSelectorProps {
  onPaymentMethodChange: (method: "card" | "interac") => void;
  selectedMethod?: "card" | "interac";
  className?: string;
}

const PaymentMethodSelector = ({ 
  onPaymentMethodChange, 
  selectedMethod = "card",
  className = "" 
}: PaymentMethodSelectorProps) => {
  const [selected, setSelected] = useState<"card" | "interac">(selectedMethod);

  const handleMethodChange = (method: "card" | "interac") => {
    setSelected(method);
    onPaymentMethodChange(method);
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
        Payment Method
      </label>
      <div className="grid grid-cols-2 gap-4">
        {/* Card Payment Option */}
        <div
          className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary ${
            selected === "card"
              ? "border-primary bg-primary/5"
              : "border-gray-200 dark:border-gray-700"
          }`}
          onClick={() => handleMethodChange("card")}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`h-4 w-4 rounded-full border-2 ${
                selected === "card"
                  ? "border-primary bg-primary"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              {selected === "card" && (
                <div className="h-2 w-2 rounded-full bg-white m-auto mt-0.5" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="font-medium text-dark dark:text-white">
                  Credit/Debit Card
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visa, Mastercard, American Express
              </p>
            </div>
          </div>
        </div>

        {/* Interac Payment Option */}
        <div
          className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary relative ${
            selected === "interac"
              ? "border-primary bg-primary/5"
              : "border-gray-200 dark:border-gray-700"
          }`}
          onClick={() => handleMethodChange("interac")}
        >
          {/* Blinking Red Badge */}
          <div className="absolute -top-2 -right-2 z-10">
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full animate-pulse">
              NEW
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div
              className={`h-4 w-4 rounded-full border-2 ${
                selected === "interac"
                  ? "border-primary bg-primary"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              {selected === "interac" && (
                <div className="h-2 w-2 rounded-full bg-white m-auto mt-0.5" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="font-medium text-dark dark:text-white">
                  Interac e-Transfer
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Direct bank transfer (Canada only)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        {selected === "card" ? (
          <div className="flex items-start space-x-2">
            <svg className="mt-0.5 h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Secure Card Payment
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your payment is processed securely through Stripe. We never store your card details.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-2">
            <svg className="mt-0.5 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Interac e-Transfer
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pay directly from your Canadian bank account. Fast, secure, and widely trusted across Canada.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSelector; 