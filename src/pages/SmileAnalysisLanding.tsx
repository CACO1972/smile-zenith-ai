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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              ✨ Análisis 100% Gratuito
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Descubre la <span className="text-yellow-300">Sonrisa Perfecta</span> que Mereces
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Análisis profesional con IA en solo 2 minutos
            </p>
            <div className="flex justify-center items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Sin costo</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>2 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>+5,000 sonrisas analizadas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-2">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-primary p-3 rounded-full">
                  <Smile className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">Comienza tu Análisis Gratuito</CardTitle>
              <CardDescription className="text-lg">
                Solo necesitamos algunos datos para personalizar tu análisis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Edad (opcional)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="25"
                      min="16"
                      max="100"
                    />
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">¿Qué incluye tu análisis gratuito?</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ Análisis de proporciones faciales</li>
                    <li>✓ Evaluación de tu sonrisa</li>
                    <li>✓ Recomendaciones personalizadas</li>
                    <li>✓ Opciones de tratamiento</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-lg py-6 bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Guardando..."
                  ) : (
                    <>
                      Comenzar Análisis Gratuito
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Al continuar, aceptas recibir información sobre nuestros tratamientos dentales. 
                  Puedes cancelar en cualquier momento.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Miles de personas ya descubrieron su sonrisa perfecta</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-background p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary mb-2">+5,000</div>
              <p className="text-muted-foreground">Análisis realizados</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Satisfacción de pacientes</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Años de experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmileAnalysisLanding;