'use client';

import React from 'react';

interface AddToCalendarButtonProps {
  title: string;
  description: string;
  location: string;
  startDate: string; // Format: "2025-05-31"
  startTime: string; // Format: "10:00 AM"
  endTime: string;   // Format: "6:00 PM"
  className?: string;
}

const AddToCalendarButton: React.FC<AddToCalendarButtonProps> = ({
  title,
  description,
  location,
  startDate,
  startTime,
  endTime,
  className = ""
}) => {
  const addToGoogleCalendar = () => {
    // Convert date and time to UTC format for Google Calendar
    const formatDateTime = (date: string, time: string) => {
      // Parse the date (YYYY-MM-DD format)
      const [year, month, day] = date.split('-');
      
      // Parse time (12-hour format)
      const [timePart, period] = time.split(' ');
      const [hours, minutes] = timePart.split(':');
      let hour24 = parseInt(hours);
      
      if (period === 'PM' && hour24 !== 12) {
        hour24 += 12;
      } else if (period === 'AM' && hour24 === 12) {
        hour24 = 0;
      }
      
      // Create date object (assuming local timezone)
      const dateTime = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hour24, parseInt(minutes || '0'));
      
      // Convert to UTC format for Google Calendar (YYYYMMDDTHHMMSSZ)
      return dateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const encodedTitle = encodeURIComponent(title);
    const encodedDetails = encodeURIComponent(description);
    const encodedLocation = encodeURIComponent(location);
    const start = formatDateTime(startDate, startTime);
    const end = formatDateTime(startDate, endTime);

    const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodedTitle}&details=${encodedDetails}&location=${encodedLocation}&dates=${start}/${end}`;

    window.open(url, '_blank');
  };

  return (
    <button 
      onClick={addToGoogleCalendar}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>
      Add to Calendar
    </button>
  );
};

export default AddToCalendarButton; 