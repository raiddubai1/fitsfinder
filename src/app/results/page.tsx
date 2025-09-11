"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Package, 
  Shirt, 
  Droplets, 
  FileText, 
  Zap, 
  Heart, 
  Camera,
  Plane,
  Home,
  MapPin,
  Calendar,
  Download,
  Share2,
  RotateCcw,
  Cloud,
  Loader2
} from "lucide-react";
import Link from "next/link";

interface PackingItem {
  id: string;
  name: string;
  category: string;
  essential: boolean;
  checked: boolean;
}

interface PackingCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  items: PackingItem[];
}

export default function Results() {
  const [categories, setCategories] = useState<PackingCategory[]>([]);
  const [tripDetails, setTripDetails] = useState<any>(null);
  const [weather, setWeather] = useState({
    temperature: "22°C",
    condition: "Partly Cloudy",
    icon: <Cloud className="h-8 w-8" />
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTripDataAndGenerateList();
  }, []);

  const loadTripDataAndGenerateList = async () => {
    try {
      // Load all data from localStorage
      const savedTripDetails = localStorage.getItem("tripDetails");
      const savedTravelerProfile = localStorage.getItem("travelerProfile");
      const savedTripStyle = localStorage.getItem("tripStyle");
      const savedActivities = localStorage.getItem("activities");
      const savedSpecialRequirements = localStorage.getItem("specialRequirements");

      if (!savedTripDetails || !savedTravelerProfile || !savedTripStyle) {
        setError("Missing trip information. Please start over.");
        setLoading(false);
        return;
      }

      const tripDetails = JSON.parse(savedTripDetails);
      const travelerProfile = JSON.parse(savedTravelerProfile);
      const tripStyle = JSON.parse(savedTripStyle);
      const activities = savedActivities ? JSON.parse(savedActivities) : [];
      const specialRequirements = savedSpecialRequirements ? JSON.parse(savedSpecialRequirements) : [];

      setTripDetails(tripDetails);

      // Call API to generate packing list
      const response = await fetch('/api/generate-packing-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripDetails,
          travelerProfile,
          tripStyle,
          activities,
          specialRequirements
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate packing list');
      }

      const data = await response.json();
      const packingCategories = data.packingList.map((category: any) => ({
        name: category.name,
        icon: getCategoryIcon(category.name),
        color: getCategoryColor(category.name),
        items: category.items.map((item: any) => ({
          ...item,
          checked: false
        }))
      }));

      setCategories(packingCategories);
      setLoading(false);
    } catch (err) {
      console.error('Error loading packing list:', err);
      setError('Failed to generate packing list. Please try again.');
      setLoading(false);
    }
  };

  const getCategoryIcon = (categoryName: string): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
      "Clothing": <Shirt className="h-5 w-5" />,
      "Toiletries": <Droplets className="h-5 w-5" />,
      "Documents": <FileText className="h-5 w-5" />,
      "Electronics": <Zap className="h-5 w-5" />,
      "Health & Medical": <Heart className="h-5 w-5" />,
      "Miscellaneous": <Package className="h-5 w-5" />
    };
    return iconMap[categoryName] || <Package className="h-5 w-5" />;
  };

  const getCategoryColor = (categoryName: string): string => {
    const colorMap: Record<string, string> = {
      "Clothing": "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
      "Toiletries": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      "Documents": "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
      "Electronics": "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
      "Health & Medical": "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
      "Miscellaneous": "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    };
    return colorMap[categoryName] || "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200";
  };

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setCategories(prev => 
      prev.map(category => ({
        ...category,
        items: category.items.map(item => 
          item.id === itemId ? { ...item, checked } : item
        )
      }))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Travel Packing List',
          text: `Check out my personalized packing list for ${tripDetails?.destination}!`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
        // Fallback: copy to clipboard
        handleCopyToClipboard();
      }
    } else {
      // Fallback: copy to clipboard
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = () => {
    const packingListText = categories
      .map(category => 
        `${category.name}:\n${category.items.map(item => `- ${item.name}${item.essential ? ' (Essential)' : ''}`).join('\n')}`
      )
      .join('\n\n');
    
    navigator.clipboard.writeText(packingListText).then(() => {
      alert('Packing list copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy packing list');
    });
  };

  const handleSaveAsPDF = () => {
    // In a real implementation, you would use a library like jsPDF or html2pdf
    alert('PDF download functionality would be implemented here');
  };

  const handleStartOver = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const getProgress = () => {
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const checkedItems = categories.reduce((sum, cat) => 
      sum + cat.items.filter(item => item.checked).length, 0
    );
    return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Generating your personalized packing list...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{error}</p>
            <Button onClick={handleStartOver}>Start Over</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Your Personalized Packing List
              </h1>
              {tripDetails && (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{tripDetails.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(tripDetails.arrivalDate).toLocaleDateString()} - {new Date(tripDetails.departureDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {weather.icon}
                    <span>{weather.temperature}, {weather.condition}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={handlePrint}>
                <Download className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={handleSaveAsPDF}>
                <Download className="h-4 w-4 mr-2" />
                Save PDF
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" onClick={handleStartOver}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Packing Progress</span>
              <span>{getProgress()}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Packing Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  {category.name}
                </CardTitle>
                <CardDescription>
                  {category.items.filter(item => item.essential).length} essential, {category.items.length} total items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <label htmlFor={item.id} className="text-sm font-medium cursor-pointer">
                          {item.name}
                        </label>
                      </div>
                      {item.essential && (
                        <Badge variant="destructive" className="text-xs">
                          Essential
                        </Badge>
                      )}
                      {item.checked && (
                        <CheckCircle className="h-4 w-4 text-teal-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Happy travels! 🌍✈️</p>
        </div>
      </div>
    </div>
  );
}