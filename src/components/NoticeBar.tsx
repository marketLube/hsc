"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { NOTICE_MESSAGES } from "@/lib/data";

export function NoticeBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Check if notice was dismissed
    const dismissed = localStorage.getItem("notice-dismissed");
    if (dismissed) {
      setIsVisible(false);
      return;
    }

    // Rotate messages every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOTICE_MESSAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("notice-dismissed", "true");
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("notice-dismissed"));
  };

  if (!isVisible) return null;

  return (
    <div className="bg-brand text-white py-2 px-4 relative overflow-hidden">
      <div className="flex items-center justify-center text-center">
        <p className="text-sm font-medium animate-fade-in">
          {NOTICE_MESSAGES[currentIndex]}
        </p>
        <button
          onClick={handleDismiss}
          className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
