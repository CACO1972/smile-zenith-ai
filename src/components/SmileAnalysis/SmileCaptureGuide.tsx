import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Camera, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  RotateCcw,
  Play,
  User,
  Smile,
  FlipHorizontal
} from "lucide-react";

interface CaptureStep {
  id: string;
  title: string;
  description: string;
  instruction: string;
  type: 'frontal' | 'lateral' | 'intraoral';
  required: boolean;
  completed: boolean;
}

const SmileCaptureGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [images, setImages] = useState<{[key: string]: string}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const captureSteps: CaptureStep[] = [
    {
      id: 'frontal_neutral',
      title: 'Rostro Frontal - Neutral',
      description: 'Foto frontal con labios cerrados y expresión relajada',
      instruction: 'Mantenga la cabeza recta, mire directamente a la cámara',
      type: 'frontal',
      required: true,
      completed: false
    },
    {
      id: 'frontal_smile',
      title: 'Rostro Frontal - Sonrisa',
      description: 'Foto frontal mostrando su mejor sonrisa',
      instruction: 'Sonría ampliamente mostrando sus dientes',
      type: 'frontal',
      required: true,
      completed: false
    },
    {
      id: 'lateral_left',
      title: 'Perfil Izquierdo',
      description: 'Foto de perfil desde el lado izquierdo',
      instruction: 'Gire 90° hacia la izquierda, mantenga la postura',
      type: 'lateral',
      required: true,
      completed: false
    },
    {
      id: 'lateral_right',
      title: 'Perfil Derecho',
      description: 'Foto de perfil desde el lado derecho',
      instruction: 'Gire 90° hacia la derecha, mantenga la postura',
      type: 'lateral',
      required: true,
      completed: false
    },
    {
      id: 'intraoral_upper',
      title: 'Arcada Superior',
      description: 'Vista intraoral de los dientes superiores',
      instruction: 'Abra la boca, enfoque los dientes superiores',
      type: 'intraoral',
      required: false,
      completed: false
    },
    {
      id: 'intraoral_lower',
      title: 'Arcada Inferior',
      description: 'Vista intraoral de los dientes inferiores',
      instruction: 'Abra la boca, enfoque los dientes inferiores',
      type: 'intraoral',
      required: false,
      completed: false
    }
  ];

  const [steps, setSteps] = useState(captureSteps);

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const stepId = steps[currentStep].id;
        
        setImages(prev => ({ ...prev, [stepId]: imageUrl }));
        
        // Marcar el paso como completado
        setSteps(prev => prev.map((step, index) => 
          index === currentStep ? { ...step, completed: true } : step
        ));

        toast({
          title: "Imagen capturada",
          description: `${steps[currentStep].title} guardada correctamente`,
        });

        // Avanzar al siguiente paso si no es el último
        if (currentStep < steps.length - 1) {
          setTimeout(() => setCurrentStep(currentStep + 1), 1000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCapture = () => {
    fileInputRef.current?.click();
  };

  const retakePhoto = () => {
    const stepId = steps[currentStep].id;
    setImages(prev => {
      const newImages = { ...prev };
      delete newImages[stepId];
      return newImages;
    });
    
    setSteps(prev => prev.map((step, index) => 
      index === currentStep ? { ...step, completed: false } : step
    ));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'frontal': return <User className="h-5 w-5" />;
      case 'lateral': return <FlipHorizontal className="h-5 w-5" />;
      case 'intraoral': return <Smile className="h-5 w-5" />;
      default: return <Camera className="h-5 w-5" />;
    }
  };

  const completedRequired = steps.filter(s => s.required && s.completed).length;
  const totalRequired = steps.filter(s => s.required).length;
  const progress = (completedRequired / totalRequired) * 100;

  if (!hasConsent) {
    return (
      <Card className="max-w-2xl mx-auto border-0 shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Camera className="h-6 w-6 text-primary" />
            Análisis Facial Inteligente
          </CardTitle>
          <p className="text-muted-foreground">
            Consentimiento informado para captura y análisis de imágenes
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Información importante
            </h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Las imágenes serán procesadas con inteligencia artificial</li>
              <li>• El análisis es preliminar y no sustituye una consulta profesional</li>
              <li>• Sus datos están protegidos y encriptados</li>
              <li>• Puede solicitar la eliminación de sus imágenes en cualquier momento</li>
              <li>• Las imágenes no serán compartidas con terceros</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">¿Qué analizaremos?</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Análisis Estético</p>
                <p className="text-muted-foreground">Proporciones faciales, simetría, línea de sonrisa</p>
              </div>
              <div>
                <p className="font-medium">Detección Dental</p>
                <p className="text-muted-foreground">Estado dental, alineación, color</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button 
              className="flex-1 bg-gradient-primary" 
              onClick={() => setHasConsent(true)}
            >
              Acepto y Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Captura Guiada de Imágenes</h2>
            <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/5">
              {completedRequired}/{totalRequired} Requeridas
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Paso {currentStep + 1} de {steps.length}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Steps List */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Pasos de Captura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                  index === currentStep 
                    ? 'bg-primary/10 border border-primary/20' 
                    : step.completed 
                      ? 'bg-success/10 border border-success/20'
                      : 'bg-muted/50 hover:bg-muted'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    getStepIcon(step.type)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${index === currentStep ? 'text-primary' : ''}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {step.description}
                  </p>
                </div>
                {step.required && (
                  <Badge variant="secondary" className="text-xs">
                    Requerida
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current Step */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStepIcon(steps[currentStep].type)}
                {steps[currentStep].title}
              </CardTitle>
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Instruction */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      Instrucciones
                    </p>
                    <p className="text-blue-700 dark:text-blue-200 text-sm mt-1">
                      {steps[currentStep].instruction}
                    </p>
                  </div>
                </div>
              </div>

              {/* Camera Area */}
              <div className="relative">
                {images[steps[currentStep].id] ? (
                  <div className="relative">
                    <img 
                      src={images[steps[currentStep].id]} 
                      alt={steps[currentStep].title}
                      className="w-full max-w-md mx-auto rounded-lg shadow-soft"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-success text-success-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Capturada
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center">
                    <Camera className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Presione el botón para capturar la imagen
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>💡 Asegúrese de tener buena iluminación</p>
                      <p>📱 Mantenga el dispositivo estable</p>
                      <p>👤 Siga las instrucciones de posicionamiento</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                {images[steps[currentStep].id] ? (
                  <Button variant="outline" onClick={retakePhoto}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Repetir Foto
                  </Button>
                ) : (
                  <Button 
                    onClick={triggerCapture}
                    className="bg-gradient-primary"
                    size="lg"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Capturar Imagen
                  </Button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Anterior
            </Button>
            
            <div className="flex gap-2">
              {currentStep < steps.length - 1 && (
                <Button onClick={nextStep}>
                  Siguiente
                </Button>
              )}
              
              {progress === 100 && (
                <Button 
                  className="bg-gradient-success"
                  onClick={() => {
                    toast({
                      title: "¡Listo para analizar!",
                      description: `${completedRequired} imágenes capturadas correctamente`,
                    });
                    console.log('Imágenes procesadas:', Object.keys(images));
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar Análisis
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmileCaptureGuide;