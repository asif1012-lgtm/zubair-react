import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import MetaTags from "@/components/meta-tags";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary/5 to-primary/10">
      <MetaTags 
        title="Contact Form | Home"
        description="Welcome to our contact form application"
      />
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Please fill out our contact form to get in touch with us. We'll get back to you as soon as possible.
          </p>
          <Link href="/validation">
            <Button 
              className="w-full sm:w-auto px-8 py-6 text-lg rounded-lg bg-primary hover:bg-primary/90 transition-colors duration-200"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}