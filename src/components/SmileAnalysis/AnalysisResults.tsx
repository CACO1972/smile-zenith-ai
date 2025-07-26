import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award,
  Brain,
  Camera,
  DollarSign,
  Download,
  Eye,
  Share2,
  Smile,
  Target,
  TrendingUp,
  User,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Palette,
  Ruler,
  Calendar
} from "lucide-react";

interface AnalysisData {
  overallScore: number;
  facialProportions: {
    goldenRatio: number;
    facialThirds: number;
    symmetry: number;
  };
  smileAnalysis: {
    smileLine: 'high' | 'medium' | 'low';
    gingivalDisplay: number;
    buccalCorridor: number;
    toothProportions: number;
  };
  dentalFindings: {
    condition: 'excellent' | 'good' | 'fair' | 'poor';
    issues: string[];
    recommendations: string[];
  };
  aestheticPotential: number;
}

const AnalysisResults = () => {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);

  // Datos simulados del análisis
  const analysisData: AnalysisData = {
    overallScore: 87,
    facialProportions: {
      goldenRatio: 92,
      facialThirds: 88,
      symmetry: 85
    },
    smileAnalysis: {
      smileLine: 'medium',
      gingivalDisplay: 2.5,
      buccalCorridor: 78,
      toothProportions: 83
    },
    dentalFindings: {
      condition: 'good',
      issues: [
        'Ligero apiñamiento en incisivos inferiores',
        'Decoloración leve en dientes posteriores',
        'Asimetría menor en línea de sonrisa'
      ],
      recommendations: [
        'Ortodoncia invisible (6-8 meses)',
        'Blanqueamiento profesional',
        'Carillas estéticas (2-4 piezas)'
      ]
    },
    aestheticPotential: 95
  };

  const treatmentOptions = [
    {
      id: 'whitening',
      name: 'Blanqueamiento Profesional',
      description: 'Mejora el color dental 3-5 tonos',
      duration: '2-3 semanas',
      cost: '$180.000 - $250.000',
      priority: 'high',
      impact: 85
    },
    {
      id: 'aligners',
      name: 'Ortodoncia Invisible',
      description: 'Corrige apiñamiento y alineación',
      duration: '6-8 meses',
      cost: '$1.200.000 - $1.800.000',
      priority: 'medium',
      impact: 92
    },
    {
      id: 'veneers',
      name: 'Carillas Estéticas',
      description: 'Mejora forma, color y proporciones',
      duration: '2-3 citas',
      cost: '$280.000 - $450.000 por pieza',
      priority: 'low',
      impact: 98
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Summary */}
      <Card className="border-0 shadow-medium bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Brain className="h-8 w-8 text-primary" />
                Análisis Facial Completado
              </h1>
              <p className="text-muted-foreground mt-2">
                Reporte generado por Inteligencia Artificial • {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">
                {analysisData.overallScore}
              </div>
              <p className="text-sm text-muted-foreground">Puntuación General</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <Ruler className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className={`text-2xl font-bold ${getScoreColor(analysisData.facialProportions.goldenRatio)}`}>
                {analysisData.facialProportions.goldenRatio}%
              </div>
              <p className="text-sm text-muted-foreground">Proporción Áurea</p>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <Smile className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className={`text-2xl font-bold ${getScoreColor(analysisData.smileAnalysis.toothProportions)}`}>
                {analysisData.smileAnalysis.toothProportions}%
              </div>
              <p className="text-sm text-muted-foreground">Línea de Sonrisa</p>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <Eye className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <div className={`text-2xl font-bold ${getScoreColor(analysisData.facialProportions.symmetry)}`}>
                {analysisData.facialProportions.symmetry}%
              </div>
              <p className="text-sm text-muted-foreground">Simetría</p>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <div className={`text-2xl font-bold ${getScoreColor(analysisData.aestheticPotential)}`}>
                {analysisData.aestheticPotential}%
              </div>
              <p className="text-sm text-muted-foreground">Potencial</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">📊 Análisis Detallado</TabsTrigger>
          <TabsTrigger value="findings">🔍 Hallazgos</TabsTrigger>
          <TabsTrigger value="treatments">💎 Tratamientos</TabsTrigger>
          <TabsTrigger value="simulation">✨ Simulación</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facial Analysis */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Análisis Facial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Proporción Áurea</span>
                    <span className="text-sm font-bold">{analysisData.facialProportions.goldenRatio}%</span>
                  </div>
                  <Progress value={analysisData.facialProportions.goldenRatio} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tercios Faciales</span>
                    <span className="text-sm font-bold">{analysisData.facialProportions.facialThirds}%</span>
                  </div>
                  <Progress value={analysisData.facialProportions.facialThirds} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Simetría</span>
                    <span className="text-sm font-bold">{analysisData.facialProportions.symmetry}%</span>
                  </div>
                  <Progress value={analysisData.facialProportions.symmetry} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Smile Analysis */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="h-5 w-5 text-primary" />
                  Análisis de Sonrisa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Línea de Sonrisa</p>
                    <Badge variant="outline" className="mt-1">
                      {analysisData.smileAnalysis.smileLine.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Exposición Gingival</p>
                    <p className="text-lg font-bold">{analysisData.smileAnalysis.gingivalDisplay}mm</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Corredor Bucal</span>
                    <span className="text-sm font-bold">{analysisData.smileAnalysis.buccalCorridor}%</span>
                  </div>
                  <Progress value={analysisData.smileAnalysis.buccalCorridor} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Proporciones Dentales</span>
                    <span className="text-sm font-bold">{analysisData.smileAnalysis.toothProportions}%</span>
                  </div>
                  <Progress value={analysisData.smileAnalysis.toothProportions} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Findings */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Hallazgos Clínicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisData.dentalFindings.issues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                      <p className="text-sm">{issue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-success" />
                  Recomendaciones IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisData.dentalFindings.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-success/10 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="treatments" className="space-y-6">
          <div className="space-y-4">
            {treatmentOptions.map((treatment) => (
              <Card key={treatment.id} className="border-0 shadow-soft hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{treatment.name}</h3>
                        <Badge className={getPriorityColor(treatment.priority)}>
                          {treatment.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{treatment.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{treatment.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{treatment.cost}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span>{treatment.impact}% mejora</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right ml-6">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {treatment.impact}%
                      </div>
                      <p className="text-xs text-muted-foreground">Impacto Estético</p>
                      <Button className="mt-3" size="sm">
                        Ver Simulación
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-6">
          <Card className="border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Simulación Antes/Después
              </CardTitle>
              <p className="text-muted-foreground">
                Visualice los resultados potenciales de diferentes tratamientos
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Imagen Actual</h3>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <Camera className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Simulación con Tratamiento</h3>
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Award className="h-16 w-16 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Simulación disponible próximamente</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4 justify-center">
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir Resultados
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Reporte
                </Button>
                <Button className="bg-gradient-success">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Consulta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisResults;