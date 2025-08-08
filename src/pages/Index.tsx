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
      <div className="py-16 px-6 text-center bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            ¿Listo para ver el sistema en acción?
          </h2>
          <p className="text-muted-foreground mb-8">
            Explora el sistema exclusivo desarrollado por Dr. Carlos Montoya para Clínica Miró
          </p>
          <Button 
            onClick={() => setCurrentView("dashboard")}
            size="lg"
            className="bg-gradient-primary shadow-medium"
          >
            Entrar al Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
