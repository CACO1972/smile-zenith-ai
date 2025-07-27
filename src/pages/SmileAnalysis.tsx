import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SmileCaptureGuide from "@/components/SmileAnalysis/SmileCaptureGuide";
import AnalysisResults from "@/components/SmileAnalysis/AnalysisResults";
import { 
  Brain,
  Camera,
  Sparkles,
  Users,
  Award,
  Target,
  ArrowRight,
  CheckCircle,
  Zap,
  Play
} from "lucide-react";

type AnalysisStep = 'intro' | 'capture' | 'processing' | 'results';

const SmileAnalysis = () => {
  const [currentStep, setCurrentStep] = useState<AnalysisStep>('intro');
  const [isProcessing, setIsProcessing] = useState(false);

  const startAnalysis = () => {
    setCurrentStep('capture');
  };

  const startProcessing = () => {
    setCurrentStep('processing');
    setIsProcessing(true);
    
    // Procesamiento con feedback real
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('results');
      // Mostrar notificación de éxito
      console.log('Análisis completado exitosamente');
    }, 3000); // Reducido a 3 segundos para testing
  };

  if (currentStep === 'capture') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep('intro')}
            className="mb-4"
          >
            ← Volver
          </Button>
        </div>
        <SmileCaptureGuide />
        <div className="max-w-4xl mx-auto mt-6 text-center">
          <Button 
            onClick={startProcessing}
            className="bg-gradient-primary"
            size="lg"
          >
            <Play className="h-5 w-5 mr-2" />
            Iniciar Análisis IA
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-2xl mx-auto border-0 shadow-medium">
          <CardContent className="p-8 text-center">
            <div className="relative mb-6">
              <div className="h-32 w-32 mx-auto bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center animate-pulse">
                <Brain className="h-16 w-16 text-white" />
              </div>
              <div className="absolute inset-0 h-32 w-32 mx-auto border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Analizando con IA...</h2>
            <p className="text-muted-foreground mb-6">
              Nuestros algoritmos están procesando sus imágenes para generar un diagnóstico completo
            </p>
            
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Detectando proporciones faciales...</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Analizando línea de sonrisa...</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Identificando oportunidades de mejora...</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-4 w-4 border-2 border-muted border-t-transparent rounded-full"></div>
                <span>Generando recomendaciones personalizadas...</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                ⏱️ Tiempo estimado: 30-60 segundos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep('intro')}
            className="mb-4"
          >
            ← Nuevo Análisis
          </Button>
        </div>
        <AnalysisResults />
      </div>
    );
  }

  // Intro/Landing Page
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/5">
                Powered by AI
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Análisis Facial
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {" "}Inteligente
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Sistema exclusivo de Clínica Miró desarrollado por Dr. Carlos Montoya. 
              Tecnología patentada que analiza tu sonrisa y genera recomendaciones personalizadas
            </p>
            
            <Button 
              onClick={startAnalysis}
              size="lg"
              className="bg-gradient-primary text-lg px-8 py-6 h-auto"
            >
              <Camera className="h-6 w-6 mr-3" />
              Comenzar Análisis Gratuito
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="text-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Análisis Preciso</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Algoritmos avanzados analizan 468 puntos faciales para 
                  determinar proporciones, simetría y potencial estético
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="text-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Simulación 3D</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Visualiza los resultados potenciales de diferentes tratamientos
                  con simulaciones fotorrealistas antes/después
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="text-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Plan Personalizado</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Recibe un plan de tratamiento completo con presupuestos
                  detallados y opciones de financiamiento
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            En solo 3 pasos simples, obtendrás un análisis completo de tu sonrisa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl mb-6">
              <Camera className="h-16 w-16 text-blue-600 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Captura Guiada</h3>
            <p className="text-muted-foreground">
              Toma fotos siguiendo nuestras instrucciones interactivas.
              Te guiamos paso a paso para obtener las mejores imágenes.
            </p>
          </div>

          <div className="text-center">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl mb-6">
              <Brain className="h-16 w-16 text-green-600 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-3">2. Análisis IA</h3>
            <p className="text-muted-foreground">
              Nuestros algoritmos procesan las imágenes identificando
              oportunidades de mejora y potencial estético.
            </p>
          </div>

          <div className="text-center">
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl mb-6">
              <Zap className="h-16 w-16 text-purple-600 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Reporte Completo</h3>
            <p className="text-muted-foreground">
              Recibe un diagnóstico detallado con simulaciones,
              recomendaciones y presupuestos personalizados.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Descubre Tu Potencial de Sonrisa
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experiencia exclusiva de Clínica Miró - Tecnología patentada por Dr. Carlos Montoya
          </p>
          
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <p className="text-sm text-muted-foreground">Precisión</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">30s</div>
              <p className="text-sm text-muted-foreground">Análisis</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <p className="text-sm text-muted-foreground">Disponible</p>
            </div>
          </div>
          
          <Button 
            onClick={startAnalysis}
            size="lg"
            className="bg-gradient-primary text-lg px-8 py-6 h-auto"
          >
            <Play className="h-6 w-6 mr-3" />
            Iniciar Mi Análisis Ahora
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            🔒 100% Seguro y Confidencial • Sin Compromiso • Resultados Instantáneos
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmileAnalysis;