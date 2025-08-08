import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import heroImage from "@/assets/dental-ai-hero.jpg";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-12 xl:gap-x-8">
          
          {/* Text Content */}
          <div className="lg:col-span-6 xl:col-span-7">
            <Badge className="inline-flex items-center gap-1 mb-6 bg-white/20 text-white border-white/30">
              <Sparkles className="h-3 w-3" />
              by HUMANA.ai
            </Badge>
            
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:col-span-2 xl:col-auto">
              Sistema Exclusivo{" "}
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Clínica Miró
              </span>{" "}
              con IA
            </h1>
            
            <div className="mt-6 max-w-xl text-lg leading-8 text-white/90 lg:max-w-none">
              <p>
                Sistema patentado y desarrollado exclusivamente por el Dr. Carlos Montoya 
                para Clínica Miró. Recupera pacientes inactivos, automatiza campañas y 
                multiplica tus ingresos con inteligencia artificial de última generación.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-white/70" />
                <span className="text-sm">
                  <strong className="font-semibold">5:1</strong> ROI promedio
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-white/70" />
                <span className="text-sm">
                  <strong className="font-semibold">+40%</strong> reactivación
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-white/70" />
                <span className="text-sm">
                  <strong className="font-semibold">24/7</strong> automatizado
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-strong"
              >
                Ver Demo en Vivo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                Solicitar Consulta Gratuita
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10">
              <p className="text-sm text-white/70 mb-4">
                Desarrollado y patentado por:
              </p>
              <div className="flex flex-wrap gap-4 text-white/90">
                <span className="text-sm font-bold">Dr. Carlos Montoya</span>
                <span className="text-sm font-medium">•</span>
                <span className="text-sm font-bold">Director Clínica Miró</span>
                <span className="text-sm font-medium">•</span>
                <span className="text-sm font-medium">Sistema Patentado</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6 xl:col-span-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"></div>
              <img
                src={heroImage}
                alt="Dashboard de Marketing Dental con IA"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-strong ring-1 ring-white/20"
              />
              
              {/* Floating metrics cards */}
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-strong border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">+67%</div>
                    <div className="text-xs text-muted-foreground">Reactivación</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-strong border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">IA</div>
                    <div className="text-xs text-muted-foreground">Activada</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;