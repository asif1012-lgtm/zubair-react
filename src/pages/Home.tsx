import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import MetaTags from "@/components/meta-tags";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Meta Tags for SEO */}
      <MetaTags 
        title="Meta Verified | Home"
        description="Request a verified badge on Facebook - Get Started"
      />

      <Header />

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-4 sm:p-8">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
              Get Verified on Facebook
            </h1>

            <div className="space-y-4 text-gray-600">
              <p>
                The verified badge is a mark of authenticity that appears next to a Facebook Page or profile's name to show that Facebook has confirmed it is the genuine presence of the public figure, celebrity, or brand it represents.
              </p>
              
              <p>
                To be eligible for verification, your account must:
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>Represent a real person, registered business, or entity</li>
                <li>Have a complete profile with an about section, profile picture, and at least one post</li>
                <li>Follow Facebook's Terms of Service and Community Standards</li>
              </ul>
            </div>

            <Button 
              onClick={() => setLocation("/validation")}
              className="w-full py-3 text-base bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Start Verification Process
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
