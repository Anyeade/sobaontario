"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MembershipType {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in months
  benefits: string[];
  isActive: boolean;
  createdAt: string;
}

const AdminMembershipsPage = () => {
  const [memberships, setMemberships] = useState<MembershipType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMembership, setEditingMembership] = useState<MembershipType | null>(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await fetch("/api/admin/memberships");
      if (response.ok) {
        const data = await response.json();
        setMemberships(data);
      }
    } catch (error) {
      console.error("Error fetching memberships:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMembershipStatus = async (membershipId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/memberships/${membershipId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive }),
      });

      if (response.ok) {
        await fetchMemberships();
      }
    } catch (error) {
      console.error("Error updating membership:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Memberships Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage membership types and pricing
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Add Membership Type
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-500 p-3">
              <span className="text-2xl">💳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Types
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {memberships.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-500 p-3">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {memberships.filter(m => m.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-500 p-3">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Avg. Price
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${memberships.length > 0 ? (memberships.reduce((sum, m) => sum + m.price, 0) / memberships.length).toFixed(0) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Memberships Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {memberships.map((membership, index) => (
          <motion.div
            key={membership.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {membership.name}
              </h3>
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                membership.isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}>
                {membership.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {membership.description}
            </p>

            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ${membership.price}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                per {membership.duration} month{membership.duration > 1 ? 's' : ''}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Benefits:
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {membership.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditingMembership(membership);
                  setShowForm(true);
                }}
                className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
              >
                Edit
              </button>
              <button
                onClick={() => toggleMembershipStatus(membership.id, !membership.isActive)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm ${
                  membership.isActive
                    ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400"
                    : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400"
                }`}
              >
                {membership.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {memberships.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No membership types found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminMembershipsPage; 