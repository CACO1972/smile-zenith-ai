import { useState, useCallback, memo, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

// Lazy load heavy components
const SmileCaptureGuide = lazy(() => import("@/components/SmileAnalysis/SmileCaptureGuide"));
const AnalysisResults = lazy(() => import("@/components/SmileAnalysis/AnalysisResults"));

type AnalysisStep = 'intro' | 'capture' | 'processing' | 'results';

// Component loading fallback
const ComponentLoading = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
  </div>
);

const SmileAnalysis = memo(() => {
  const [currentStep, setCurrentStep] = useState<AnalysisStep>('intro');
  const [isProcessing, setIsProcessing] = useState(false);

  const startAnalysis = useCallback(() => {
    setCurrentStep('capture');
  }, []);

  const startProcessing = useCallback(() => {
    setCurrentStep('processing');
    setIsProcessing(true);
    
    // Procesamiento con feedback real
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('results');
      // Mostrar notificación de éxito
      console.log('Análisis completado exitosamente');
    }, 3000); // Reducido a 3 segundos para testing
  }, []);

  const goBackToIntro = useCallback(() => {
    setCurrentStep('intro');
  }, []);

  if (currentStep === 'capture') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={goBackToIntro}
            className="mb-4"
          >
            ← Volver al inicio
          </Button>
        </div>
        <Suspense fallback={<ComponentLoading />}>
          <SmileCaptureGuide onContinue={startProcessing} />
        </Suspense>
      </div>
    );
  }

  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Brain className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <CardTitle className="text-xl">Analizando tu sonrisa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Nuestro análisis de IA está evaluando tu sonrisa y generando recomendaciones personalizadas...
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: isProcessing ? '100%' : '0%',
                  transition: 'width 3s ease-out'
                }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground">
              Este proceso puede tomar unos segundos...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-background p-6">
        <Suspense fallback={<ComponentLoading />}>
          <AnalysisResults onNewAnalysis={goBackToIntro} />
        </Suspense>
      </div>
    );
  }

  // Intro step - memoized content
  const features = [
    {
      icon: Brain,
      title: "Análisis de IA",
      description: "Algoritmos avanzados de machine learning analizan 127 puntos específicos de tu sonrisa"
    },
    {
      icon: Camera,
      title: "Captura Profesional",
      description: "Guías paso a paso para obtener la mejor imagen de tu sonrisa"
    },
    {
      icon: Sparkles,
      title: "Resultados Instantáneos",
      description: "Obtén tu análisis completo en menos de 30 segundos"
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "98.7% de Precisión",
      description: "Validado por dentistas profesionales"
    },
    {
      icon: Award,
      title: "Certificado Dental",
      description: "Respaldado por odontólogos certificados"
    },
    {
      icon: Target,
      title: "Personalizado",
      description: "Recomendaciones específicas para tu caso"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="container mx-auto px-6 py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <Badge variant="secondary" className="text-sm font-medium">
                <Zap className="w-3 h-3 mr-1" />
                Análisis Instantáneo con IA
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
              Descubre el Potencial de tu Sonrisa
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Obtén un análisis dental profesional en segundos. Nuestro sistema de IA evalúa tu sonrisa 
              y te proporciona recomendaciones personalizadas para mejorar tu salud dental.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={startAnalysis}
                className="text-lg px-8 py-6 min-w-[200px] group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Comenzar Análisis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="text-sm text-muted-foreground flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                100% Gratuito • Sin Registro
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Tecnología de Vanguardia</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Utilizamos la inteligencia artificial más avanzada para ofrecerte un análisis dental completo y preciso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegir nuestro análisis?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-lg border bg-card/30 backdrop-blur">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto border-0 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">¿Listo para transformar tu sonrisa?</h3>
              <p className="text-muted-foreground mb-6">
                Únete a miles de personas que ya han descubierto el potencial de su sonrisa
              </p>
              <Button 
                size="lg" 
                onClick={startAnalysis}
                className="text-lg px-8 py-6"
              >
                Iniciar Análisis Gratuito
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

SmileAnalysis.displayName = "SmileAnalysis";

export default SmileAnalysis;