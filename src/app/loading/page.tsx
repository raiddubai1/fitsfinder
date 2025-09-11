"use client";

import { useState, useEffect } from "react";
import { Loader2, Package, MapPin, Calendar, Users } from "lucide-react";

const travelTips = [
  "Roll your clothes instead of folding to save space and prevent wrinkles.",
  "Pack versatile clothing items that can be mixed and matched.",
  "Always pack a portable charger for your electronic devices.",
  "Bring a reusable water bottle to stay hydrated while traveling.",
  "Pack medications in their original containers with the prescription label.",
  "Keep important documents in a waterproof bag or container.",
  "Pack a small first-aid kit with basic medical supplies.",
  "Bring a universal power adapter for international travel.",
  "Pack a photocopy of your passport and important documents.",
  "Use packing cubes to organize your luggage efficiently."
];

export default function Loading() {
  const [currentTip, setCurrentTip] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Rotate through travel tips
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % travelTips.length);
    }, 3000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Redirect to results page when complete
          setTimeout(() => {
            window.location.href = "/results";
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => {
      clearInterval(tipInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-teal-600 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-full h-full bg-teal-600 rounded-full flex items-center justify-center">
              <Package className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Creating Your Packing List
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            We're analyzing your trip details and generating a personalized packing list just for you.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-teal-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-teal-600" />
              <span>Analyzing destination and weather</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-teal-600" />
              <span>Calculating trip duration needs</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="h-4 w-4 text-teal-600" />
              <span>Customizing for traveler profiles</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Package className="h-4 w-4 text-teal-600" />
              <span>Generating categorized packing list</span>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
          <h3 className="font-medium text-teal-900 dark:text-teal-100 mb-2">
            💡 Travel Tip
          </h3>
          <p className="text-sm text-teal-800 dark:text-teal-200">
            {travelTips[currentTip]}
          </p>
        </div>

        <div className="mt-6">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-teal-600" />
        </div>
      </div>
    </div>
  );
}