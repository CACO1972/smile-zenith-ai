import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroSection from "@/components/HeroSection";
import DentalDashboard from "@/components/DentalDashboard";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState<"landing" | "dashboard">(
    searchParams.get("view") === "dashboard" ? "dashboard" : "landing"
  );

  useEffect(() => {
    setCurrentView(searchParams.get("view") === "dashboard" ? "dashboard" : "landing");
  }, [searchParams]);

  if (currentView === "dashboard") {
    return <DentalDashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Demo banner */}
      <div className="w-full bg-muted/40 border-b border-border text-center py-2 text-sm text-muted-foreground">
        Versión demo del beta — algunas funciones están en desarrollo. Lanzamiento pronto.
      </div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Quick Demo Access */}
      <div className="py-12 sm:py-16 mobile-padding text-center bg-muted/30">
        <div className="mobile-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            ¿Listo para ver el sistema en acción?
          </h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            Explora el sistema exclusivo desarrollado por Dr. Carlos Montoya para Clínica Miró
          </p>
          <Button 
            onClick={() => setCurrentView("dashboard")}
            size="lg"
            className="bg-gradient-primary shadow-medium touch-target w-full sm:w-auto"
          >
            Entrar al Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
