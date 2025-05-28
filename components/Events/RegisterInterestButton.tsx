'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface RegisterInterestButtonProps {
  eventId: string;
  eventTitle: string;
  className?: string;
}

const RegisterInterestButton: React.FC<RegisterInterestButtonProps> = ({
  eventId,
  eventTitle,
  className = ""
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterInterest = async () => {
    if (!session) {
      toast.error('Please login to register interest');
      router.push('/auth/signin');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/events/register-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          eventTitle,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Interest registered successfully! We\'ll contact you with more details.');
      } else {
        if (data.error === 'Already registered') {
          toast.error('You have already registered interest for this event');
        } else {
          toast.error(data.error || 'Failed to register interest');
        }
      }
    } catch (error) {
      console.error('Error registering interest:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleRegisterInterest}
      disabled={isLoading}
      className={`flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Registering...
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Register Interest
        </>
      )}
    </button>
  );
};

export default RegisterInterestButton; 