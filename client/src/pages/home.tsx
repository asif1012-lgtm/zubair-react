import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import MetaTags from "@/components/meta-tags";

export default function Home() {
  const [_, navigate] = useLocation();

  return (
    <>
      <MetaTags 
        title="Contact Form | Home"
        description="Welcome to our contact form. Get started by clicking below."
      />
      
      <div className="container max-w-lg mx-auto py-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Thank you for visiting. Please complete our contact form to proceed.
            </p>
            <Button 
              className="w-full"
              size="lg"
              onClick={() => navigate("/validation")}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
