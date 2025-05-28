"use client";
import { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    // Initialize Tawk.to API
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.Tawk_API = window.Tawk_API || {};
      // @ts-ignore
      window.Tawk_LoadStart = new Date();

      // Create and load the Tawk.to script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://embed.tawk.to/6724fb522480f5b4f5977e86/1ibk7bf9c';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      
      // Insert the script into the document
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }

      // Cleanup function to remove script when component unmounts
      return () => {
        const existingScript = document.querySelector('script[src*="embed.tawk.to"]');
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }
      };
    }
  }, []);

  return null; // This component doesn't render anything visible
};

export default TawkToWidget; 