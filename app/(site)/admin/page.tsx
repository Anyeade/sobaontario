"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface DashboardStats {
  totalMembers: number;
  paidMembers: number;
  pendingMembers: number;
  totalDonations: number;
  totalOrders: number;
  pendingOrders: number;
  totalEvents: number;
  totalVolunteers: number;
  pendingVolunteers: number;
  totalNews: number;
  publishedNews: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Members",
      value: stats?.totalMembers || 0,
      subtitle: `${stats?.paidMembers || 0} paid, ${stats?.pendingMembers || 0} pending`,
      icon: "👥",
      color: "bg-blue-500",
      link: "/admin/members"
    },
    {
      title: "Store Orders",
      value: stats?.totalOrders || 0,
      subtitle: `${stats?.pendingOrders || 0} pending`,
      icon: "📦",
      color: "bg-green-500",
      link: "/admin/orders"
    },
    {
      title: "Volunteers",
      value: stats?.totalVolunteers || 0,
      subtitle: `${stats?.pendingVolunteers || 0} pending approval`,
      icon: "🤝",
      color: "bg-purple-500",
      link: "/admin/volunteers"
    },
    {
      title: "Event Registrations",
      value: stats?.totalEvents || 0,
      subtitle: "Manage registrations",
      icon: "📅",
      color: "bg-orange-500",
      link: "/admin/events"
    },
    {
      title: "News Articles",
      value: stats?.totalNews || 0,
      subtitle: `${stats?.publishedNews || 0} published`,
      icon: "📰",
      color: "bg-red-500",
      link: "/admin/news"
    },
    {
      title: "Total Donations",
      value: `$${stats?.totalDonations || 0}`,
      subtitle: "All time donations",
      icon: "💰",
      color: "bg-yellow-500",
      link: "/admin/donations"
    },
  ];

  const quickActions = [
    { title: "Add New Member", href: "/admin/members/new", icon: "➕" },
    { title: "Manage Event Registrations", href: "/admin/events", icon: "📅" },
    { title: "Add Store Item", href: "/admin/store/new", icon: "🛍️" },
    { title: "Write News Article", href: "/admin/news/new", icon: "✍️" },
    { title: "View Pending Orders", href: "/admin/orders?status=pending", icon: "📋" },
    { title: "Review Volunteers", href: "/admin/volunteers?status=pending", icon: "👀" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to the SOBA Ontario admin dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={card.link}>
              <div className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
                <div className="flex items-center">
                  <div className={`rounded-lg p-3 ${card.color}`}>
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {card.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={action.href}
                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <span className="mr-3 text-xl">{action.icon}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {action.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                New member registration
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                John Doe joined as a new member
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              2 hours ago
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                New store order
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order #1234 for SOBA Tie
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              4 hours ago
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Volunteer application
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Jane Smith applied for event coordination
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              1 day ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;