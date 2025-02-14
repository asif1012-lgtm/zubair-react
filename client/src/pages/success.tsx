import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import MetaTags from "@/components/meta-tags";

export default function Success() {
  const [_, navigate] = useLocation();

  return (
    <>
      <MetaTags 
        title="Contact Form | Success"
        description="Your form has been submitted successfully"
      />
      
      <div className="container max-w-lg mx-auto py-12">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-primary mb-4" />
            <CardTitle className="text-3xl font-bold">Success!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your form has been submitted successfully. Thank you for your submission.
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="w-full"
            >
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
