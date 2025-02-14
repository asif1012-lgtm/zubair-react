import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import MetaTags from "@/components/meta-tags";

export default function Success() {
  const [_, navigate] = useLocation();

  return (
    <>
      <MetaTags 
        title="Meta Verificado | Éxito"
        description="Su formulario ha sido enviado con éxito"
      />

      <div className="container max-w-lg mx-auto py-12">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-[#1877f2] mb-4" />
            <CardTitle className="text-3xl font-bold">¡Éxito!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-[#65676B]">
              Su formulario ha sido enviado con éxito. Gracias por su envío.
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="w-full bg-[#1877f2] hover:bg-[#166fe5]"
            >
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}