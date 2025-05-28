"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  volunteerAreas: string[];
  availability: string;
  experience: string;
  motivation: string;
  skills: string;
  isMember: boolean;
}

const VolunteerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    volunteerAreas: [],
    availability: "",
    experience: "",
    motivation: "",
    skills: "",
    isMember: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const volunteerOptions = [
    "Educational Support",
    "Community Development", 
    "Member Support",
    "Event Organization",
    "Fundraising",
    "Communications"
  ];

  const availabilityOptions = [
    "Full-time",
    "Part-time", 
    "Weekends only",
    "Evenings only",
    "Flexible/As needed"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "isMember") {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        // Handle volunteer areas checkboxes
        setFormData(prev => ({
          ...prev,
          volunteerAreas: checked 
            ? [...prev.volunteerAreas, value]
            : prev.volunteerAreas.filter(area => area !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          address: "",
          volunteerAreas: [],
          availability: "",
          experience: "",
          motivation: "",
          skills: "",
          isMember: false
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.1 }}
      viewport={{ once: true }}
      className="animate_top rounded-lg bg-white p-8 shadow-solid-8 dark:border dark:border-strokedark dark:bg-blacksection"
    >
      <h2 className="mb-8 text-2xl font-semibold text-black dark:text-white">
        Volunteer Application Form
      </h2>

      {submitStatus === "success" && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          Thank you for your volunteer application! We'll be in touch soon.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          There was an error submitting your application. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-medium text-black dark:text-white">
            Personal Information
          </h3>
          
          <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:gap-8">
            <div className="w-full lg:w-1/2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                placeholder="Enter your full name"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Email Address *
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:gap-8">
            <div className="w-full lg:w-1/2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                placeholder="Enter your address"
              />
            </div>
          </div>
        </div>

        {/* Volunteer Preferences */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-medium text-black dark:text-white">
            Volunteer Preferences
          </h3>

          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Areas of Interest * (Select all that apply)
            </label>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {volunteerOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    name="volunteerAreas"
                    value={option}
                    checked={formData.volunteerAreas.includes(option)}
                    onChange={handleInputChange}
                    className="mr-3 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-black dark:text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee"
            >
              <option value="">Select your availability</option>
              {availabilityOptions.map((option) => (
                <option key={option} value={option} className="text-black">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Experience and Motivation */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-medium text-black dark:text-white">
            Experience & Motivation
          </h3>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Previous Volunteer Experience
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              rows={4}
              className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
              placeholder="Describe any previous volunteer experience you have..."
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Why do you want to volunteer with SOBA Ontario?
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              rows={4}
              className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
              placeholder="Tell us about your motivation to volunteer..."
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Special Skills or Talents
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              rows={3}
              className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
              placeholder="List any special skills, talents, or expertise you can offer..."
            />
          </div>
        </div>

        {/* Membership Status */}
        <div className="mb-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isMember"
              checked={formData.isMember}
              onChange={handleInputChange}
              className="mr-3 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-black dark:text-white">
              I am currently a SOBA Ontario member
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || formData.volunteerAreas.length === 0}
            className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
            {!isSubmitting && (
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
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default VolunteerForm; 