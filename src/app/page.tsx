import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 gap-8 p-4 bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            The Perfect Pack, Every Time
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Never forget essential items again. Create personalized packing lists based on your destination, trip duration, activities, and preferences.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-4 bg-teal-600 hover:bg-teal-700">
            <Link href="/trip-details">
              Generate Your List
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Smart Suggestions</h3>
            <p className="text-gray-600 dark:text-gray-400">Get personalized recommendations based on your destination and activities</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Weather Aware</h3>
            <p className="text-gray-600 dark:text-gray-400">Automatically adjusts for weather conditions at your destination</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Customizable</h3>
            <p className="text-gray-600 dark:text-gray-400">Add or remove items to match your personal packing style</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Travel Tips & Packing Guides
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover expert advice, packing hacks, and travel inspiration to make your journeys unforgettable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-teal-100 to-emerald-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">🎒</span>
                </div>
                <CardTitle className="text-xl">Essential Packing Tips for Every Traveler</CardTitle>
                <CardDescription>Learn the fundamental rules of smart packing that work for any destination.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover the art of efficient packing with our comprehensive guide covering everything from luggage selection to organization techniques.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/essential-packing-tips">Read More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">✈️</span>
                </div>
                <CardTitle className="text-xl">Seasonal Travel: What to Pack and When</CardTitle>
                <CardDescription>Master seasonal packing with our month-by-month guide for different climates.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  From summer beach vacations to winter ski trips, learn exactly what you need to pack for every season and destination type.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/seasonal-travel-guide">Read More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">🌍</span>
                </div>
                <CardTitle className="text-xl">Business Travel: Pack Like a Pro</CardTitle>
                <CardDescription>Streamline your business travel packing with professional tips and tricks.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to pack efficiently for business trips, including wardrobe planning, tech essentials, and staying organized on the go.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/business-travel-tips">Read More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}