"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TripDetails() {
  const [formData, setFormData] = useState({
    destination: "",
    arrivalDate: "",
    departureDate: "",
    accommodation: "",
    transportation: [] as string[]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTransportationChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      transportation: checked
        ? [...prev.transportation, value]
        : prev.transportation.filter(t => t !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage for next step
    localStorage.setItem("tripDetails", JSON.stringify(formData));
    window.location.href = "/traveler-profile";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-8">
          <Link href="/" className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
            ← Back to Home
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 1: Trip Details</CardTitle>
            <CardDescription>
              Tell us about your upcoming trip. This information will help us create a personalized packing list for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Paris, France"
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="arrivalDate">Arrival Date *</Label>
                  <Input
                    id="arrivalDate"
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) => handleInputChange("arrivalDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departureDate">Departure Date *</Label>
                  <Input
                    id="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => handleInputChange("departureDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodation">Accommodation Type</Label>
                <Select value={formData.accommodation} onValueChange={(value) => handleInputChange("accommodation", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="airbnb">Airbnb</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="camping">Camping</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Transportation Method</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Flight", "Car", "Train", "Bus"].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox
                        id={method.toLowerCase()}
                        checked={formData.transportation.includes(method)}
                        onCheckedChange={(checked) => handleTransportationChange(method, checked as boolean)}
                      />
                      <Label htmlFor={method.toLowerCase()}>{method}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
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