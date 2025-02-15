import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import MetaTags from "@/components/meta-tags";
import React from 'react';

export default function Success() {
  const [_, navigate] = useLocation();

  return (
    <>
      <MetaTags 
        title="Meta Verified | Success"
        description="Your verification request has been submitted successfully"
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0180FA]/10 via-[#f0f2f5] to-[#0180FA]/5 p-4">
        <Card className="max-w-lg w-full bg-white/90 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader className="text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-[#0180FA] mb-4" />
            <CardTitle className="text-3xl font-bold text-[#1c1e21]">Success!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-[#65676B]">
              Your verification request has been submitted successfully. We will review your application and get back to you soon.
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="w-full bg-[#0180FA] hover:bg-[#0180FA]/90 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200 shadow-md"
            >
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}