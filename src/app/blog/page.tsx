import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">PackSmart Blog</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>Travel tips and packing guides</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our blog is coming soon with helpful travel tips, packing guides, and insights 
                to make your journeys more enjoyable and stress-free.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}