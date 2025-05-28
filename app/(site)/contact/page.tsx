"use client";
import { useState } from "react";
import toast from "react-hot-toast";

interface ContactFormData {
  fullName: string;
  emailAddress: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    emailAddress: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          consentGiven: true, // Implied consent for contact page
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          fullName: "",
          emailAddress: "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center mb-16">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Contact SOBA Ontario
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-black dark:text-white">
                Get in Touch
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      46 Olde town Road<br />
                      Brampton, ON, L6X 4T8<br />
                      Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      226-606-0197
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">Organization Status</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Registered as a not-for-profit under the Ontario Ministry of Government and Consumer Services
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 font-semibold text-black dark:text-white">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=100077660994849"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  <a
                    href="https://twitter.com/SobaOntario"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 font-semibold text-black dark:text-white">Need Immediate Help?</h3>
                <a
                  href="https://tawk.to/chat/6724fb522480f5b4f5977e86/1ibk7bf9c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.39L2 22l5.61-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10zm0 18c-1.4 0-2.76-.35-3.95-1.01L7 19.5l.51-1.05C6.85 17.26 6.5 15.9 6.5 14.5c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5S15.04 20 12 20z"/>
                  </svg>
                  Start Live Chat
                </a>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Get instant support from our team
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-black dark:text-white">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-blacksection dark:border-strokedark dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="emailAddress" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-blacksection dark:border-strokedark dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-blacksection dark:border-strokedark dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-blacksection dark:border-strokedark dark:text-white"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}