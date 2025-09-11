import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We collect information you provide directly to us, such as when you create packing lists 
                or use our services. This may include travel preferences, destinations, and contact information.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We use the information we collect to provide, maintain, and improve our services, 
                to process your packing list requests, and to communicate with you about your travels.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}