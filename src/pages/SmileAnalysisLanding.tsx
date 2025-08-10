import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Smile, CheckCircle, Users, Clock, ArrowRight } from "lucide-react";

const SmileAnalysisLanding = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Capture UTM parameters for tracking
  const utmSource = searchParams.get("utm_source") || "direct";
  const utmCampaign = searchParams.get("utm_campaign") || "smile-analysis";

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa tu nombre y email",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("smile_analysis_leads")
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          age: formData.age ? parseInt(formData.age) : null,
          utm_source: utmSource,
          utm_campaign: utmCampaign
        });

      if (error) throw error;

      toast({
        title: "¡Perfecto!",
        description: "Ahora comenzaremos tu análisis gratuito",
      });

      // Navigate to analysis with lead info
      navigate("/smile-analysis", {
        state: {
          leadData: formData,
          fromLanding: true
        }
      });
    } catch (error) {
      console.error("Error saving lead:", error);
      toast({
        title: "Error",
        description: "Hubo un problema. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background mobile-optimized mobile-safe">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto mobile-padding py-12 sm:py-16 lg:py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 text-sm sm:text-base px-4 py-2">
              ✨ Análisis 100% Gratuito
            </Badge>
            <h1 className="mobile-heading-xl font-bold mb-4 sm:mb-6 leading-tight">
              Descubre la <span className="text-yellow-300">Sonrisa Perfecta</span> que Mereces
            </h1>
            <p className="mobile-heading-sm mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto">
              Análisis profesional con IA en solo 2 minutos
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center mobile-gap text-base sm:text-lg flex-wrap">
              <div className="flex items-center gap-2 touch-target">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Sin costo</span>
              </div>
              <div className="flex items-center gap-2 touch-target">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>2 minutos</span>
              </div>
              <div className="flex items-center gap-2 touch-target">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>+5,000 sonrisas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto mobile-padding py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-2 mobile-card">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-gradient-primary p-3 sm:p-4 rounded-full">
                  <Smile className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <CardTitle className="mobile-heading-md">Comienza tu Análisis Gratuito</CardTitle>
              <CardDescription className="mobile-text">
                Solo necesitamos algunos datos para personalizar tu análisis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="mobile-space-y">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm sm:text-base">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Tu nombre"
                      required
                      className="mobile-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="mobile-input"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+34 600 000 000"
                      className="mobile-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm sm:text-base">Edad (opcional)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="25"
                      min="16"
                      max="100"
                      className="mobile-input"
                    />
                  </div>
                </div>

                <div className="bg-muted/50 mobile-card rounded-lg">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base">¿Qué incluye tu análisis gratuito?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      Análisis de proporciones faciales
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      Evaluación de tu sonrisa
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      Recomendaciones personalizadas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      Opciones de tratamiento
                    </li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mobile-button bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Guardando..."
                  ) : (
                    <>
                      Comenzar Análisis Gratuito
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground leading-relaxed">
                  Al continuar, aceptas recibir información sobre nuestros tratamientos dentales. 
                  Puedes cancelar en cualquier momento.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-muted/30 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto mobile-padding text-center">
          <h2 className="mobile-heading-lg font-bold mb-6 sm:mb-8">Miles de personas ya descubrieron su sonrisa perfecta</h2>
          <div className="mobile-grid-3 mobile-gap max-w-5xl mx-auto">
            <div className="bg-background mobile-card rounded-lg shadow-md">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">+5,000</div>
              <p className="text-muted-foreground mobile-text">Análisis realizados</p>
            </div>
            <div className="bg-background mobile-card rounded-lg shadow-md">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground mobile-text">Satisfacción de pacientes</p>
            </div>
            <div className="bg-background mobile-card rounded-lg shadow-md">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground mobile-text">Años de experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmileAnalysisLanding;