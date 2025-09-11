"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import Link from "next/link";

interface Traveler {
  id: string;
  ageRange: string;
  gender: string;
}

export default function TravelerProfile() {
  const [travelers, setTravelers] = useState<Traveler[]>([{ id: "1", ageRange: "", gender: "" }]);
  const [tripDetails, setTripDetails] = useState<any>(null);

  useEffect(() => {
    // Load trip details from localStorage
    const savedTripDetails = localStorage.getItem("tripDetails");
    if (savedTripDetails) {
      setTripDetails(JSON.parse(savedTripDetails));
    }
  }, []);

  const addTraveler = () => {
    setTravelers([...travelers, { id: Date.now().toString(), ageRange: "", gender: "" }]);
  };

  const removeTraveler = (id: string) => {
    if (travelers.length > 1) {
      setTravelers(travelers.filter(traveler => traveler.id !== id));
    }
  };

  const updateTraveler = (id: string, field: string, value: string) => {
    setTravelers(travelers.map(traveler => 
      traveler.id === id ? { ...traveler, [field]: value } : traveler
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store traveler data in localStorage for next step
    localStorage.setItem("travelerProfile", JSON.stringify(travelers));
    window.location.href = "/trip-style";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-8">
          <Link href="/trip-details" className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
            ← Back to Trip Details
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 2: Traveler Profile</CardTitle>
            <CardDescription>
              Tell us about the travelers. This helps us customize the packing list for each person's needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {travelers.map((traveler, index) => (
                <div key={traveler.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Traveler {index + 1}</h3>
                    {travelers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTraveler(traveler.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`age-${traveler.id}`}>Age Range</Label>
                      <Select 
                        value={traveler.ageRange} 
                        onValueChange={(value) => updateTraveler(traveler.id, "ageRange", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="child">Child (0-12)</SelectItem>
                          <SelectItem value="teen">Teen (13-17)</SelectItem>
                          <SelectItem value="adult">Adult (18-64)</SelectItem>
                          <SelectItem value="senior">Senior (65+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`gender-${traveler.id}`}>Gender</Label>
                      <Select 
                        value={traveler.gender} 
                        onValueChange={(value) => updateTraveler(traveler.id, "gender", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={addTraveler}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Traveler
                </Button>
              </div>

              <div className="flex justify-between pt-4">
                <Link href="/trip-details">
                  <Button variant="outline">Back</Button>
                </Link>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  Next
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}