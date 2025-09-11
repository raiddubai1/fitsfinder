import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About PackSmart</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                At PackSmart, we believe that packing should be stress-free and efficient. 
                Our mission is to help travelers never forget essential items again by providing 
                smart, personalized packing lists tailored to each unique journey.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simply tell us about your trip - destination, duration, activities, and preferences. 
                Our intelligent system generates a comprehensive packing list that considers weather, 
                cultural norms, and your personal travel style.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}