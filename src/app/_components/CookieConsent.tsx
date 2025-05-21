"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const declineCookies = () => {
    // Set minimal consent
    localStorage.setItem("cookieConsent", "minimal");
    setShowConsent(false);
    
    // Here you would disable non-essential cookies
    // This is a placeholder for actual cookie handling logic
    window.localStorage.setItem("disableAnalytics", "true");
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300">
          <p className="mb-1">
            This website uses cookies to enhance your experience and analyze site traffic. 
            By clicking &quot;Accept&quot;, you consent to our use of cookies as described in our{" "}
            <Link href="/legal/privacy-policy" className="text-red-400 underline hover:text-red-300">
              Privacy Policy
            </Link>.
          </p>
          <p className="text-xs text-gray-400">
            We comply with GDPR, CCPA, and other applicable privacy laws.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={declineCookies}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={acceptCookies}
            className="px-5 py-1.5 bg-red-700 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 