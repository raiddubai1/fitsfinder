import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Have questions about PackSmart? We'd love to hear from you!
              </CardDescription>
              <div className="mt-4 space-y-2">
                <p className="text-sm"><strong>Email:</strong> hello@packsmart.app</p>
                <p className="text-sm"><strong>Support:</strong> support@packsmart.app</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Follow Us</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Stay updated with the latest features and travel tips.
              </CardDescription>
              <div className="mt-4 space-y-2">
                <p className="text-sm">Connect with us on social media</p>
                <p className="text-sm text-muted-foreground">Social links coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}