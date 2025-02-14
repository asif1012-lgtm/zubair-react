import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useMobile } from "@/hooks/use-mobile";
import MetaTags from "@/components/meta-tags";

export default function Home() {
  const isMobile = useMobile();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div 
        className="w-full md:w-[42%] h-[27vh] md:h-screen shrink-0"
        style={{
          backgroundImage: 'url("https://pub-804f6dcb45594c119ba6e0d63e10c013.r2.dev/bg-img.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-white">
        <MetaTags 
          title="Meta Verificado | Inicio"
          description="Obtenga su insignia verificada hoy - Meta Verificado"
        />
        <img 
          src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
          alt="Logo de Meta"
          className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} mb-3 sm:mb-4`}
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#212529] mb-3 sm:mb-4">
          Obtén tu <br />Meta Verificado
        </h1>
        <Link href="/validation">
          <Button 
            size={isMobile ? "default" : "lg"}
            className="px-6 sm:px-7 md:px-8 py-2 sm:py-2.5 rounded-md bg-[#1877f2] hover:bg-[#166fe5] text-sm sm:text-base transition-colors duration-200"
          >
            Solicitar
            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </Link>
        <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-center text-[#65676B] px-2 sm:px-4">
          Haz crecer tu presencia social con Meta Verificado – una nueva suscripción
          {!isMobile && <br />} disponible para creadores y empresas en Instagram y {!isMobile && <br />}Facebook.
        </p>
        <p className="mt-3 sm:mt-4 text-[13px] sm:text-[15px] md:text-[17px] text-[#1877f2]">Regístrate ahora para creadores</p>
        <div className="mt-3 sm:mt-4 text-center px-4 text-[#65676B]">
          <span className="font-semibold">¿Eres una empresa?</span> Obtén más información en
        </div>
        <a href="#" className="mt-2 text-xs sm:text-sm text-[#1877f2] hover:underline">Soporte de Meta para empresas</a>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm italic text-[#65676B] px-4 text-center">
          Las características, disponibilidad y precios pueden variar según la región.
        </p>
      </div>
    </div>
  );
}