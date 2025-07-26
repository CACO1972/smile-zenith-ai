import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  BarChart3
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

const DentalDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Mock data - En producción esto vendría de APIs
  const patientMetrics: PatientMetrics = {
    totalPatients: 1247,
    activePatients: 892,
    inactivePatients: 355,
    newThisMonth: 67,
    churnRate: 8.2,
    averageLifetimeValue: 89500, // CLP
    npsScore: 74
  };

  const campaignMetrics: CampaignMetrics = {
    totalCampaigns: 12,
    activeCampaigns: 4,
    conversionRate: 23.8,
    roi: 4.2,
    messagesDelivered: 2341,
    responsesReceived: 557
  };

  const inactivePatients = [
    { id: 1, name: "María González", lastVisit: "2023-08-15", treatments: "Limpieza, Blanqueamiento", value: 45000, phone: "+56912345678", priority: "high" },
    { id: 2, name: "Carlos Rodríguez", lastVisit: "2023-07-22", treatments: "Ortodoncia", value: 320000, phone: "+56987654321", priority: "medium" },
    { id: 3, name: "Ana Martínez", lastVisit: "2023-06-10", treatments: "Implante", value: 180000, phone: "+56955667788", priority: "high" },
    { id: 4, name: "Pedro Silva", lastVisit: "2023-09-03", treatments: "Endodoncia", value: 95000, phone: "+56944556677", priority: "low" },
  ];

  const activeCampaigns = [
    { id: 1, name: "Reactivación Pacientes Q3", type: "WhatsApp", audience: 355, sent: 355, responded: 87, status: "active" },
    { id: 2, name: "Limpieza Preventiva", type: "SMS", audience: 892, sent: 789, responded: 234, status: "active" },
    { id: 3, name: "Blanqueamiento Verano", type: "Email", audience: 456, sent: 456, responded: 78, status: "paused" },
    { id: 4, name: "Ortodoncia Invisible", type: "WhatsApp", audience: 234, sent: 234, responded: 56, status: "active" },
  ];

  const priorityColors = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-warning text-warning-foreground", 
    low: "bg-success text-success-foreground"
  };

  const campaignStatusColors = {
    active: "bg-success text-success-foreground",
    paused: "bg-warning text-warning-foreground",
    completed: "bg-muted text-muted-foreground"
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard IA Marketing Dental</h1>
          <p className="text-muted-foreground">
            Sistema integral de inteligencia para tu clínica dental
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Zap className="h-4 w-4 mr-2" />
            Nueva Campaña
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientMetrics.totalPatients.toLocaleString()}</div>
            <p className="text-xs text-success">
              +{patientMetrics.newThisMonth} este mes
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Inactivos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{patientMetrics.inactivePatients}</div>
            <p className="text-xs text-muted-foreground">
              Oportunidad de reactivación
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Marketing</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{campaignMetrics.roi}:1</div>
            <p className="text-xs text-muted-foreground">
              Retorno por peso invertido
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientMetrics.npsScore}</div>
            <Progress value={patientMetrics.npsScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="reactivation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reactivation">🎯 Reactivación IA</TabsTrigger>
          <TabsTrigger value="campaigns">📱 Campañas Activas</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics Avanzado</TabsTrigger>
        </TabsList>

        <TabsContent value="reactivation" className="space-y-4">
          <Card className="border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Pacientes Prioritarios para Reactivación
              </CardTitle>
              <CardDescription>
                IA identifica pacientes con mayor probabilidad de respuesta y valor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inactivePatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-soft transition-all duration-normal">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{patient.name}</span>
                        <span className="text-sm text-muted-foreground">
                          Última visita: {patient.lastVisit}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {patient.treatments}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">
                          ${patient.value.toLocaleString()} CLP
                        </div>
                        <Badge className={priorityColors[patient.priority as keyof typeof priorityColors]}>
                          {patient.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-success">
                          <Zap className="h-4 w-4 mr-1" />
                          Campaña IA
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card className="border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Campañas de Marketing Automatizadas
              </CardTitle>
              <CardDescription>
                Gestiona todas tus campañas multicanal desde un solo lugar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-soft transition-all duration-normal">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{campaign.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {campaign.type} • {campaign.audience} pacientes objetivo
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">
                          {campaign.responded}/{campaign.sent} respuestas
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {((campaign.responded / campaign.sent) * 100).toFixed(1)}% conversión
                        </div>
                      </div>
                      <Badge className={campaignStatusColors[campaign.status as keyof typeof campaignStatusColors]}>
                        {campaign.status.toUpperCase()}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Predicciones IA</CardTitle>
                <CardDescription>
                  Insights automáticos para optimizar tu estrategia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pacientes en riesgo de abandono</span>
                  <span className="text-2xl font-bold text-warning">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Ingresos proyectados (30d)</span>
                  <span className="text-2xl font-bold text-success">$12.4M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mejor día para campañas</span>
                  <span className="text-lg font-medium">Martes 10:00</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Rendimiento Canales</CardTitle>
                <CardDescription>
                  Efectividad por medio de comunicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">WhatsApp</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">SMS</span>
                    <span className="text-sm font-medium">43%</span>
                  </div>
                  <Progress value={43} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Email</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DentalDashboard;