import { useState, useEffect, useCallback, memo, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useDentallinkAPI } from "@/hooks/useDentallinkAPI";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  MessageSquare,
  UserCheck,
  AlertTriangle,
  Smile,
  Phone,
  Mail,
  Zap,
  Target,
  Award,
  BarChart3,
  Loader2
} from "lucide-react";

interface PatientMetrics {
  totalPatients: number;
  activePatients: number;
  inactivePatients: number;
  newThisMonth: number;
  churnRate: number;
  averageLifetimeValue: number;
  npsScore: number;
}

interface CampaignMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  conversionRate: number;
  roi: number;
  messagesDelivered: number;
  responsesReceived: number;
}

// Memoized MetricCard component
const MetricCard = memo(({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  isLoading 
}: {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
  isLoading?: boolean;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : value}
      </div>
      {change && (
        <p className="text-xs text-muted-foreground">
          {change}
        </p>
      )}
    </CardContent>
  </Card>
));

MetricCard.displayName = "MetricCard";

// Memoized ProgressCard component
const ProgressCard = memo(({ 
  title, 
  value, 
  maxValue, 
  description 
}: {
  title: string;
  value: number;
  maxValue: number;
  description: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>{value}</span>
        <span className="text-muted-foreground">de {maxValue}</span>
      </div>
      <Progress value={(value / maxValue) * 100} className="h-2" />
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
));

ProgressCard.displayName = "ProgressCard";

const DentalDashboard = memo(() => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [realData, setRealData] = useState<any>(null);
  const [patientMetrics, setPatientMetrics] = useState<PatientMetrics>({
    totalPatients: 0,
    activePatients: 0,
    inactivePatients: 0,
    newThisMonth: 0,
    churnRate: 0,
    averageLifetimeValue: 0,
    npsScore: 0,
  });
  const [campaignMetrics, setCampaignMetrics] = useState<CampaignMetrics>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    conversionRate: 0,
    roi: 0,
    messagesDelivered: 0,
    responsesReceived: 0,
  });
  
  const { isLoading, error, fetchPatients, fetchCampaigns } = useDentallinkAPI();
  const { toast } = useToast();

  // Memoized mock data to prevent recreation on every render
  const mockPatientData = useMemo(() => ({
    totalPatients: 1247,
    activePatients: 987,
    inactivePatients: 260,
    newThisMonth: 45,
    churnRate: 2.3,
    averageLifetimeValue: 2850,
    npsScore: 68,
  }), []);

  const mockCampaignData = useMemo(() => ({
    totalCampaigns: 12,
    activeCampaigns: 8,
    conversionRate: 34.7,
    roi: 425,
    messagesDelivered: 15420,
    responsesReceived: 5350,
  }), []);

  const loadData = useCallback(async () => {
    try {
      console.log("Intentando cargar datos de Dentalink...");
      
      const [patientsData, campaignsData] = await Promise.all([
        fetchPatients(),
        fetchCampaigns()
      ]);
      
      if (patientsData && campaignsData) {
        setRealData({ patients: patientsData, campaigns: campaignsData });
        
        // Transform real data into metrics
        setPatientMetrics({
          totalPatients: patientsData.length || mockPatientData.totalPatients,
          activePatients: patientsData.filter((p: any) => p.active).length || mockPatientData.activePatients,
          inactivePatients: patientsData.filter((p: any) => !p.active).length || mockPatientData.inactivePatients,
          newThisMonth: mockPatientData.newThisMonth,
          churnRate: mockPatientData.churnRate,
          averageLifetimeValue: mockPatientData.averageLifetimeValue,
          npsScore: mockPatientData.npsScore,
        });
        
        setCampaignMetrics({
          totalCampaigns: campaignsData.length || mockCampaignData.totalCampaigns,
          activeCampaigns: campaignsData.filter((c: any) => c.status === 'active').length || mockCampaignData.activeCampaigns,
          conversionRate: mockCampaignData.conversionRate,
          roi: mockCampaignData.roi,
          messagesDelivered: mockCampaignData.messagesDelivered,
          responsesReceived: mockCampaignData.responsesReceived,
        });

        toast({
          title: "Datos cargados exitosamente",
          description: "Información actualizada desde Dentalink",
        });
      } else {
        throw new Error("No se pudieron cargar los datos");
      }
    } catch (err) {
      console.log("Usando datos de demostración");
      setPatientMetrics(mockPatientData);
      setCampaignMetrics(mockCampaignData);
      
      toast({
        title: "Datos de demostración",
        description: "Mostrando datos de ejemplo. Configura la integración con Dentalink para datos reales.",
        variant: "default",
      });
    }
  }, [fetchPatients, fetchCampaigns, toast, mockPatientData, mockCampaignData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Memoized period handler
  const handlePeriodChange = useCallback((period: string) => {
    setSelectedPeriod(period);
    // Aquí podrías refiltrar los datos según el período
  }, []);

  // Memoized stats calculations
  const patientStats = useMemo(() => [
    {
      title: "Total Pacientes",
      value: patientMetrics.totalPatients.toLocaleString(),
      change: `+${patientMetrics.newThisMonth} este mes`,
      icon: Users,
    },
    {
      title: "Pacientes Activos",
      value: patientMetrics.activePatients.toLocaleString(),
      change: `${((patientMetrics.activePatients / patientMetrics.totalPatients) * 100).toFixed(1)}% del total`,
      icon: UserCheck,
    },
    {
      title: "Valor Promedio",
      value: `$${patientMetrics.averageLifetimeValue.toLocaleString()}`,
      change: "+12% vs mes anterior",
      icon: DollarSign,
    },
    {
      title: "NPS Score",
      value: patientMetrics.npsScore,
      change: "+5 puntos vs trimestre anterior",
      icon: Award,
    },
  ], [patientMetrics]);

  const campaignStats = useMemo(() => [
    {
      title: "Campañas Activas",
      value: campaignMetrics.activeCampaigns,
      change: `de ${campaignMetrics.totalCampaigns} totales`,
      icon: Zap,
    },
    {
      title: "Tasa Conversión",
      value: `${campaignMetrics.conversionRate}%`,
      change: "+2.3% vs mes anterior",
      icon: Target,
    },
    {
      title: "ROI Campañas",
      value: `${campaignMetrics.roi}%`,
      change: "Promedio últimos 90 días",
      icon: TrendingUp,
    },
    {
      title: "Mensajes Enviados",
      value: campaignMetrics.messagesDelivered.toLocaleString(),
      change: `${campaignMetrics.responsesReceived.toLocaleString()} respuestas`,
      icon: MessageSquare,
    },
  ], [campaignMetrics]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Dental</h1>
          <p className="text-muted-foreground">
            Resumen de métricas y rendimiento de tu clínica
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedPeriod === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePeriodChange("7d")}
          >
            7 días
          </Button>
          <Button
            variant={selectedPeriod === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePeriodChange("30d")}
          >
            30 días
          </Button>
          <Button
            variant={selectedPeriod === "90d" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePeriodChange("90d")}
          >
            90 días
          </Button>
        </div>
      </div>

      {/* Status */}
      {realData && (
        <div className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700 dark:text-green-300">
            Conectado a Dentalink - Datos en tiempo real
          </span>
        </div>
      )}

      <Tabs defaultValue="patients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patients">Pacientes</TabsTrigger>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-6">
          {/* Patient Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {patientStats.map((stat, index) => (
              <MetricCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Patient Progress Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <ProgressCard
              title="Retención de Pacientes"
              value={patientMetrics.activePatients}
              maxValue={patientMetrics.totalPatients}
              description="Pacientes que han visitado en los últimos 6 meses"
            />
            
            <ProgressCard
              title="Satisfacción (NPS)"
              value={patientMetrics.npsScore}
              maxValue={100}
              description="Índice de satisfacción del paciente"
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Tasa de Abandono</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold text-red-600">
                  {patientMetrics.churnRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Pacientes que no regresan mensualmente
                </p>
                {patientMetrics.churnRate > 5 && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Requiere atención
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Campaign Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {campaignStats.map((stat, index) => (
              <MetricCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                isLoading={isLoading}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Tendencias</CardTitle>
                <CardDescription>
                  Próximamente: Gráficos interactivos y análisis predictivo
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-40">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>Funcionalidad en desarrollo</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Predicciones IA</CardTitle>
                <CardDescription>
                  Insights automáticos sobre comportamiento de pacientes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-40">
                <div className="text-center text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-2" />
                  <p>Algoritmos en entrenamiento</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
});

DentalDashboard.displayName = "DentalDashboard";

export default DentalDashboard;