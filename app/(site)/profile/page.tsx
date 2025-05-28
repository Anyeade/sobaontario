"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface MemberProfile {
  id: string;
  fullName: string;
  emailAddress: string;
  telephoneNumber: string;
  residentialAddress: string;
  yearOfEntry: number;
  profileImage?: string;
  isPaid: boolean;
  registrationFee: string;
  lastLogin?: string;
  createdAt: string;
}

const ProfilePage = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    telephoneNumber: "",
    residentialAddress: "",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/members/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          fullName: data.fullName,
          telephoneNumber: data.telephoneNumber,
          residentialAddress: data.residentialAddress,
        });
      }
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/members/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        fetchProfile();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="mx-auto max-w-c-1016 px-7.5 lg:px-15 xl:px-20">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
        >
          <div className="mb-10 text-center">
            <h1 className="mb-5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Member Profile
            </h1>
            {profile?.profileImage && (
              <div className="mx-auto mb-5 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={profile.profileImage}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {profile && (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Profile Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Personal Information
                </h2>
                
                {isEditing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.telephoneNumber}
                        onChange={(e) => setFormData({ ...formData, telephoneNumber: e.target.value })}
                        className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Address
                      </label>
                      <textarea
                        value={formData.residentialAddress}
                        onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border border-stroke bg-white px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:text-white"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-lg border border-stroke px-6 py-3 text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Full Name:</span>
                      <p className="font-medium text-black dark:text-white">{profile.fullName}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                      <p className="font-medium text-black dark:text-white">{profile.emailAddress}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                      <p className="font-medium text-black dark:text-white">{profile.telephoneNumber}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Address:</span>
                      <p className="font-medium text-black dark:text-white">{profile.residentialAddress}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Year of Entry:</span>
                      <p className="font-medium text-black dark:text-white">{profile.yearOfEntry}</p>
                    </div>
                    
                    <button
                      onClick={() => setIsEditing(true)}
                      className="rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Membership Status */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Membership Status
                </h2>
                
                <div className="space-y-4">
                  <div className="rounded-lg border border-stroke p-4 dark:border-strokedark">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Payment Status:</span>
                      <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                        profile.isPaid 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {profile.isPaid ? "Paid" : "Pending"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-stroke p-4 dark:border-strokedark">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Registration Fee:</span>
                      <span className="font-medium text-black dark:text-white">
                        ${profile.registrationFee}
                      </span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-stroke p-4 dark:border-strokedark">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Member Since:</span>
                      <span className="font-medium text-black dark:text-white">
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {profile.lastLogin && (
                    <div className="rounded-lg border border-stroke p-4 dark:border-strokedark">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Last Login:</span>
                        <span className="font-medium text-black dark:text-white">
                          {new Date(profile.lastLogin).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {!profile.isPaid && (
                    <button
                      onClick={() => router.push("/membership")}
                      className="w-full rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
                    >
                      Complete Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProfilePage; 