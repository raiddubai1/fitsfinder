"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TripStyle() {
  const [formData, setFormData] = useState({
    tripType: "",
    climate: "",
    luggage: "",
    packingStyle: [50] as [number]
  });

  useEffect(() => {
    // Load previous data
    const travelerProfile = localStorage.getItem("travelerProfile");
    if (!travelerProfile) {
      window.location.href = "/traveler-profile";
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePackingStyleChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, packingStyle: [value[0]] as [number] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage for next step
    localStorage.setItem("tripStyle", JSON.stringify(formData));
    window.location.href = "/activities";
  };

  const getPackingStyleLabel = (value: number) => {
    if (value <= 20) return "Minimalist";
    if (value <= 40) return "Light Packer";
    if (value <= 60) return "Moderate";
    if (value <= 80) return "Heavy Packer";
    return "Everything-but-the-kitchen-sink";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-8">
          <Link href="/traveler-profile" className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
            ← Back to Traveler Profile
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 3: Trip Style & Preferences</CardTitle>
            <CardDescription>
              Tell us about your travel style and preferences. This helps us tailor your packing list to match your needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label>Trip Type</Label>
                <RadioGroup 
                  value={formData.tripType} 
                  onValueChange={(value) => handleInputChange("tripType", value)}
                  className="grid grid-cols-2 gap-3"
                >
                  {["Business", "Leisure", "Backpacking", "Luxury", "Adventure", "Cultural"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.toLowerCase()} id={type.toLowerCase()} />
                      <Label htmlFor={type.toLowerCase()}>{type}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Climate Expectation</Label>
                <RadioGroup 
                  value={formData.climate} 
                  onValueChange={(value) => handleInputChange("climate", value)}
                  className="grid grid-cols-2 gap-3"
                >
                  {["Hot", "Warm", "Cool", "Cold", "Variable"].map((climate) => (
                    <div key={climate} className="flex items-center space-x-2">
                      <RadioGroupItem value={climate.toLowerCase()} id={climate.toLowerCase()} />
                      <Label htmlFor={climate.toLowerCase()}>{climate}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="luggage">Luggage Preference</Label>
                <Select value={formData.luggage} onValueChange={(value) => handleInputChange("luggage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select luggage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backpack">Backpack</SelectItem>
                    <SelectItem value="suitcase">Suitcase</SelectItem>
                    <SelectItem value="carry-on">Carry-on only</SelectItem>
                    <SelectItem value="duffel">Duffel bag</SelectItem>
                    <SelectItem value="mixed">Mixed luggage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Packing Style</Label>
                <div className="space-y-2">
                  <Slider
                    value={formData.packingStyle}
                    onValueChange={handlePackingStyleChange}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Minimalist</span>
                    <span className="font-medium">{getPackingStyleLabel(formData.packingStyle[0])}</span>
                    <span>Everything-but-the-kitchen-sink</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Link href="/traveler-profile">
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