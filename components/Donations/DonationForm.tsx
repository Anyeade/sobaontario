"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import PaymentMethodSelector from "@/components/Common/PaymentMethodSelector";

interface DonationCategory {
  name: string;
  description: string;
  icon: string;
}

interface DonationFormProps {
  categories: DonationCategory[];
}

interface DonationFormData {
  donorName: string;
  donorEmail: string;
  amount: number;
  category: string;
}

const DonationForm = ({ categories }: DonationFormProps) => {
  const [formData, setFormData] = useState<DonationFormData>({
    donorName: "",
    donorEmail: "",
    amount: 25,
    category: categories[0]?.name || "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "interac">("card");
  const [isLoading, setIsLoading] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value
    }));
  };

  const handleAmountSelect = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.amount < 5) {
      toast.error("Minimum donation amount is $5");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/donations/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          paymentMethod,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle API errors
        console.error("API Error:", data);
        toast.error(data.error || "Failed to process donation. Please try again.");
        return;
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="donorName" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Full Name (Optional)
        </label>
        <input
          type="text"
          id="donorName"
          name="donorName"
          value={formData.donorName}
          onChange={handleInputChange}
          placeholder="Enter your name for recognition"
          className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="donorEmail" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Email Address (Optional)
        </label>
        <input
          type="email"
          id="donorEmail"
          name="donorEmail"
          value={formData.donorEmail}
          onChange={handleInputChange}
          placeholder="For donation receipt"
          className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-medium text-black dark:text-white">
          Donation Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        >
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
          Donation Amount (CAD) *
        </label>
        
        {/* Predefined amounts */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          {predefinedAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                formData.amount === amount
                  ? "border-primary bg-primary text-white"
                  : "border-stroke text-black hover:border-primary dark:border-strokedark dark:text-white dark:hover:border-primary"
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div>
          <label htmlFor="amount" className="mb-1 block text-xs text-gray-600 dark:text-gray-400">
            Or enter custom amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            min="5"
            step="0.01"
            required
            className="w-full rounded-lg border border-stroke px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <PaymentMethodSelector 
        onPaymentMethodChange={setPaymentMethod}
        selectedMethod={paymentMethod}
      />

      <button
        type="submit"
        disabled={isLoading || formData.amount < 5}
        className="w-full rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : `Donate $${formData.amount.toFixed(2)} CAD via ${paymentMethod === "interac" ? "Interac e-Transfer" : "Card"}`}
      </button>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Your donation will be processed securely through Stripe. 
        {paymentMethod === "interac" ? 
          " You'll be redirected to your bank's secure login to complete the Interac e-Transfer." :
          " You will receive a receipt via email if you provide your email address."
        }
      </p>
    </form>
  );
};

export default DonationForm; 