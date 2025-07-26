import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroSection from "@/components/HeroSection";
import DentalDashboard from "@/components/DentalDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard">("landing");

  if (currentView === "dashboard") {
    return <DentalDashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Quick Demo Access */}
      <div className="py-16 px-6 text-center bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            ¿Listo para ver el sistema en acción?
          </h2>
          <p className="text-muted-foreground mb-8">
            Explora el dashboard completo con datos reales de clínicas dentales chilenas
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
