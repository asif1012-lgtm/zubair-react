import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import MetaTags from "@/components/meta-tags";
import React from 'react';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MetaTags 
        title="Contact Form | Home"
        description="Welcome to our multilingual contact form"
      />

      <div className="flex-1 flex justify-center items-center p-4 sm:p-8">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
              Welcome to Our Contact Form
            </h1>

            <div className="space-y-4 text-gray-600">
              <p>
                Please fill out our contact form to get in touch with us. We support multiple languages and ensure secure form submission.
              </p>

              <p>
                Features of our contact form:
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li>Multiple language support</li>
                <li>Secure form submission</li>
                <li>Mobile-friendly design</li>
                <li>Advanced validation</li>
              </ul>
            </div>

            <Button 
              onClick={() => setLocation("/validation")}
              className="w-full py-3 text-base bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Start Contact Form
            </Button>
          </CardContent>
        </Card>
      </div>

      <footer className="text-center p-3 sm:p-4 text-xs sm:text-sm text-gray-500 border-t">
        © 2025 Contact Form Application
      </footer>
    </div>
  );
}