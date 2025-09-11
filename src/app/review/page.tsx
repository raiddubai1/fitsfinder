"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Calendar, MapPin, Users, Package, Activity, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface TripDetails {
  destination: string;
  arrivalDate: string;
  departureDate: string;
  accommodation: string;
  transportation: string[];
}

interface TravelerProfile {
  id: string;
  ageRange: string;
  gender: string;
}

interface TripStyle {
  tripType: string;
  climate: string;
  luggage: string;
  packingStyle: number[];
}

export default function Review() {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfile[]>([]);
  const [tripStyle, setTripStyle] = useState<TripStyle | null>(null);
  const [activities, setActivities] = useState<string[]>([]);
  const [specialRequirements, setSpecialRequirements] = useState<string[]>([]);

  useEffect(() => {
    // Load all data from localStorage
    const savedTripDetails = localStorage.getItem("tripDetails");
    const savedTravelerProfile = localStorage.getItem("travelerProfile");
    const savedTripStyle = localStorage.getItem("tripStyle");
    const savedActivities = localStorage.getItem("activities");
    const savedSpecialRequirements = localStorage.getItem("specialRequirements");

    if (savedTripDetails) setTripDetails(JSON.parse(savedTripDetails));
    if (savedTravelerProfile) setTravelerProfile(JSON.parse(savedTravelerProfile));
    if (savedTripStyle) setTripStyle(JSON.parse(savedTripStyle));
    if (savedActivities) setActivities(JSON.parse(savedActivities));
    if (savedSpecialRequirements) setSpecialRequirements(JSON.parse(savedSpecialRequirements));
  }, []);

  const handleGenerate = () => {
    window.location.href = "/loading";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getPackingStyleLabel = (value: number) => {
    if (value <= 20) return "Minimalist";
    if (value <= 40) return "Light Packer";
    if (value <= 60) return "Moderate";
    if (value <= 80) return "Heavy Packer";
    return "Everything-but-the-kitchen-sink";
  };

  if (!tripDetails || !tripStyle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="mb-8">
          <Link href="/activities" className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
            ← Back to Activities
          </Link>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Step 5: Review & Generate</CardTitle>
              <CardDescription>
                Review all your information before generating your personalized packing list.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Trip Details Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Trip Details
                  </h3>
                  <Link href="/trip-details">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Destination</p>
                    <p className="font-medium">{tripDetails.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Accommodation</p>
                    <p className="font-medium">{tripDetails.accommodation || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Arrival Date</p>
                    <p className="font-medium">{formatDate(tripDetails.arrivalDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Departure Date</p>
                    <p className="font-medium">{formatDate(tripDetails.departureDate)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transportation</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tripDetails.transportation.length > 0 ? (
                        tripDetails.transportation.map((transport) => (
                          <Badge key={transport} variant="secondary">{transport}</Badge>
                        ))
                      ) : (
                        <p className="font-medium">Not specified</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Traveler Profile Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Traveler Profile
                  </h3>
                  <Link href="/traveler-profile">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {travelerProfile.map((traveler, index) => (
                    <div key={traveler.id} className="mb-2 last:mb-0">
                      <p className="font-medium">Traveler {index + 1}</p>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Age: {traveler.ageRange}</span>
                        <span>Gender: {traveler.gender}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trip Style Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Trip Style & Preferences
                  </h3>
                  <Link href="/trip-style">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Trip Type</p>
                    <p className="font-medium capitalize">{tripStyle.tripType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Climate</p>
                    <p className="font-medium capitalize">{tripStyle.climate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Luggage</p>
                    <p className="font-medium">{tripStyle.luggage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Packing Style</p>
                    <p className="font-medium">{getPackingStyleLabel(tripStyle.packingStyle[0])}</p>
                  </div>
                </div>
              </div>

              {/* Activities Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activities
                  </h3>
                  <Link href="/activities">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {activities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {activities.map((activity) => (
                        <Badge key={activity} variant="outline">{activity}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No activities selected</p>
                  )}
                </div>
              </div>

              {/* Special Requirements Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Special Requirements
                  </h3>
                  <Link href="/activities">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {specialRequirements.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {specialRequirements.map((requirement) => (
                        <Badge key={requirement} variant="destructive">{requirement}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No special requirements</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button 
                  onClick={handleGenerate} 
                  size="lg" 
                  className="bg-teal-600 hover:bg-teal-700 px-8 py-3 text-lg"
                >
                  Generate My Packing List
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}