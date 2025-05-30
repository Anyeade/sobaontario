"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import PaymentMethodSelector from "@/components/Common/PaymentMethodSelector";

interface MembershipFormData {
  fullName: string;
  yearOfEntry: number;
  residentialAddress: string;
  telephoneNumber: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  potentialMembers: string;
}

const MembershipForm = () => {
  const [formData, setFormData] = useState<MembershipFormData>({
    fullName: "",
    yearOfEntry: new Date().getFullYear(),
    residentialAddress: "",
    telephoneNumber: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    potentialMembers: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "interac">("card");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "yearOfEntry" ? parseInt(value) || 0 : value
    }));
  };

  const validateForm = () => {
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create membership record and Stripe checkout session
      const response = await fetch("/api/membership/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          yearOfEntry: formData.yearOfEntry,
          residentialAddress: formData.residentialAddress,
          telephoneNumber: formData.telephoneNumber,
          emailAddress: formData.emailAddress,
          password: formData.password,
          potentialMembers: formData.potentialMembers,
          paymentMethod,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle API errors
        console.error("API Error:", data);
        toast.error(data.error || "Failed to process membership registration. Please try again.");
        return;
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process membership registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="yearOfEntry" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Year of Entry into Sasse *
        </label>
        <input
          type="number"
          id="yearOfEntry"
          name="yearOfEntry"
          value={formData.yearOfEntry}
          onChange={handleInputChange}
          required
          min="1950"
          max={new Date().getFullYear()}
          className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="residentialAddress" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Residential Address *
        </label>
        <textarea
          id="residentialAddress"
          name="residentialAddress"
          value={formData.residentialAddress}
          onChange={handleInputChange}
          required
          rows={3}
          className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="telephoneNumber" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Telephone Number *
        </label>
        <input
          type="tel"
          id="telephoneNumber"
          name="telephoneNumber"
          value={formData.telephoneNumber}
          onChange={handleInputChange}
          required
          className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="emailAddress" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Email Address *
        </label>
        <input
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleInputChange}
          required
          className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={8}
            className="w-full rounded-lg border border-stroke px-4 py-3 pr-12 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            placeholder="Enter a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          Password must be at least 8 characters with uppercase, lowercase, and number
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full rounded-lg border border-stroke px-4 py-3 pr-12 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {showConfirmPassword ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            Passwords do not match
          </p>
        )}
      </div>

      <div>
        <label htmlFor="potentialMembers" className="mb-2 block text-sm font-medium text-black dark:text-white">
          List of potential members you may know in Canada
        </label>
        <textarea
          id="potentialMembers"
          name="potentialMembers"
          value={formData.potentialMembers}
          onChange={handleInputChange}
          rows={3}
          placeholder="Optional: List names of other Sasse alumni you know in Canada"
          className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
      </div>

      {/* Payment Method Selection */}
      <PaymentMethodSelector 
        onPaymentMethodChange={setPaymentMethod}
        selectedMethod={paymentMethod}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : `Pay $100 via ${paymentMethod === "interac" ? "Interac e-Transfer" : "Card"} & Join SOBA Ontario`}
      </button>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        By submitting this form, you agree to pay the $100 membership fee and join SOBA Ontario.
        {paymentMethod === "interac" ? 
          " You'll be redirected to your bank's secure login to complete the Interac e-Transfer." :
          " You will be redirected to Stripe for secure payment processing."
        }
      </p>
    </form>
  );
};

export default MembershipForm; 