"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import Link from "next/link";

export default function Activities() {
  const [activities, setActivities] = useState<string[]>([]);
  const [specialRequirements, setSpecialRequirements] = useState<string[]>([]);
  const [customActivity, setCustomActivity] = useState("");
  const [customRequirement, setCustomRequirement] = useState("");

  const predefinedActivities = [
    "Hiking", "Swimming", "Business Meetings", "Fine Dining", "Beach", 
    "Sightseeing", "Shopping", "Nightlife", "Photography", "Camping",
    "Skiing/Snowboarding", "Cycling", "Running/Jogging", "Yoga", "Museum visits",
    "Theater/Shows", "Sports Events", "Cooking Classes", "Wildlife Safari", "Fishing"
  ];

  const predefinedRequirements = [
    "Medical needs", "Dietary restrictions", "Accessibility needs", "Allergies",
    "Child care equipment", "Pet supplies", "Religious items", "Work equipment",
    "Sports equipment", "Formal attire required"
  ];

  useEffect(() => {
    // Load previous data
    const tripStyle = localStorage.getItem("tripStyle");
    if (!tripStyle) {
      window.location.href = "/trip-style";
    }
  }, []);

  const handleActivityChange = (activity: string, checked: boolean) => {
    setActivities(prev => 
      checked ? [...prev, activity] : prev.filter(a => a !== activity)
    );
  };

  const handleRequirementChange = (requirement: string, checked: boolean) => {
    setSpecialRequirements(prev => 
      checked ? [...prev, requirement] : prev.filter(r => r !== requirement)
    );
  };

  const addCustomActivity = () => {
    if (customActivity.trim() && !activities.includes(customActivity.trim())) {
      setActivities([...activities, customActivity.trim()]);
      setCustomActivity("");
    }
  };

  const addCustomRequirement = () => {
    if (customRequirement.trim() && !specialRequirements.includes(customRequirement.trim())) {
      setSpecialRequirements([...specialRequirements, customRequirement.trim()]);
      setCustomRequirement("");
    }
  };

  const removeActivity = (activity: string) => {
    setActivities(prev => prev.filter(a => a !== activity));
  };

  const removeRequirement = (requirement: string) => {
    setSpecialRequirements(prev => prev.filter(r => r !== requirement));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage for next step
    localStorage.setItem("activities", JSON.stringify(activities));
    localStorage.setItem("specialRequirements", JSON.stringify(specialRequirements));
    window.location.href = "/review";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="mb-8">
          <Link href="/trip-style" className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
            ← Back to Trip Style
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 4: Activities & Special Requirements</CardTitle>
            <CardDescription>
              Select the activities you plan to do and any special requirements. This helps us include specific items you'll need.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Planned Activities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {predefinedActivities.map((activity) => (
                    <div key={activity} className="flex items-center space-x-2">
                      <Checkbox
                        id={activity.toLowerCase().replace(/\s+/g, "-")}
                        checked={activities.includes(activity)}
                        onCheckedChange={(checked) => handleActivityChange(activity, checked as boolean)}
                      />
                      <Label htmlFor={activity.toLowerCase().replace(/\s+/g, "-")} className="text-sm">
                        {activity}
                      </Label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2">
                  <Label>Add Custom Activity</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter custom activity"
                      value={customActivity}
                      onChange={(e) => setCustomActivity(e.target.value)}
                    />
                    <Button type="button" onClick={addCustomActivity} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {activities.length > 0 && (
                  <div className="mt-4">
                    <Label>Selected Activities:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {activities.map((activity) => (
                        <div key={activity} className="bg-teal-100 dark:bg-teal-900 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          {activity}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeActivity(activity)}
                            className="h-4 w-4 p-0 hover:bg-transparent"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Special Requirements</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {predefinedRequirements.map((requirement) => (
                    <div key={requirement} className="flex items-center space-x-2">
                      <Checkbox
                        id={requirement.toLowerCase().replace(/\s+/g, "-")}
                        checked={specialRequirements.includes(requirement)}
                        onCheckedChange={(checked) => handleRequirementChange(requirement, checked as boolean)}
                      />
                      <Label htmlFor={requirement.toLowerCase().replace(/\s+/g, "-")} className="text-sm">
                        {requirement}
                      </Label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2">
                  <Label>Add Custom Requirement</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter custom requirement"
                      value={customRequirement}
                      onChange={(e) => setCustomRequirement(e.target.value)}
                    />
                    <Button type="button" onClick={addCustomRequirement} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {specialRequirements.length > 0 && (
                  <div className="mt-4">
                    <Label>Selected Requirements:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {specialRequirements.map((requirement) => (
                        <div key={requirement} className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          {requirement}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRequirement(requirement)}
                            className="h-4 w-4 p-0 hover:bg-transparent"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Link href="/trip-style">
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