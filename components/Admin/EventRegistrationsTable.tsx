'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  memberEmail: string;
  memberName: string;
  registrationDate: string;
  status: 'interested' | 'confirmed' | 'cancelled';
  notes?: string;
}

interface EventRegistrationsStats {
  totalRegistrations: number;
  thisMonthRegistrations: number;
  pendingReview: number;
}

const EventRegistrationsTable: React.FC = () => {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [stats, setStats] = useState<EventRegistrationsStats>({
    totalRegistrations: 0,
    thisMonthRegistrations: 0,
    pendingReview: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    eventId: '',
    status: '',
  });

  useEffect(() => {
    fetchRegistrations();
    fetchStats();
  }, [filters]);

  const fetchRegistrations = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.eventId) queryParams.append('eventId', filters.eventId);
      if (filters.status) queryParams.append('status', filters.status);

      const response = await fetch(`/api/admin/event-registrations?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      } else {
        toast.error('Failed to fetch registrations');
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Error loading registrations');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/event-registrations/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateRegistrationStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/event-registrations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success('Registration status updated');
        fetchRegistrations();
        fetchStats();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/event-registrations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Registration deleted');
        fetchRegistrations();
        fetchStats();
      } else {
        toast.error('Failed to delete registration');
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
      toast.error('Error deleting registration');
    }
  };

  const exportToCSV = () => {
    const headers = ['Member Name', 'Email', 'Event', 'Registration Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...registrations.map(reg => [
        reg.memberName,
        reg.memberEmail,
        reg.eventTitle,
        new Date(reg.registrationDate).toLocaleDateString(),
        reg.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      interested: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return (
      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Registrations
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                {stats.totalRegistrations}
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4v4h4V4h-4zm-2-2h8v8h-8V2zM4 4v4h4V4H4zM2 2h8v8H2V2zm2 12v4h4v-4H4zm-2-2h8v8H2v-8zm12 2v4h4v-4h-4zm-2-2h8v8h-8v-8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Upcoming Events
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                3
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                This Month
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                {stats.thisMonthRegistrations}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Pending Review
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                {stats.pendingReview}
              </p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900">
              <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Event Registrations Table */}
      <div className="rounded-lg bg-white shadow-solid-8 dark:bg-blacksection">
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-black dark:text-white">
              Event Registrations
            </h2>
            <div className="flex gap-3">
              <select 
                value={filters.eventId}
                onChange={(e) => setFilters(prev => ({ ...prev, eventId: e.target.value }))}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-blacksection"
              >
                <option value="">All Events</option>
                <option value="1">SOBA Ontario Community Day 2025</option>
                <option value="2">Annual General Meeting 2025</option>
                <option value="3">SOBA Ontario Family Picnic</option>
              </select>
              <select 
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-blacksection"
              >
                <option value="">All Status</option>
                <option value="interested">Interested</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button 
                onClick={exportToCSV}
                className="rounded-lg bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Member
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Event
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Registration Date
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <svg className="h-8 w-8 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p>Loading event registrations...</p>
                      </div>
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <svg className="h-12 w-12 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        <p>No event registrations found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  registrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-black dark:text-white">
                            {registration.memberName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {registration.memberEmail}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-black dark:text-white">
                          {registration.eventTitle}
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-black dark:text-white">
                          {new Date(registration.registrationDate).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-4">
                        {getStatusBadge(registration.status)}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <select
                            value={registration.status}
                            onChange={(e) => updateRegistrationStatus(registration.id, e.target.value)}
                            className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-blacksection"
                          >
                            <option value="interested">Interested</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => deleteRegistration(registration.id)}
                            className="rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationsTable; 