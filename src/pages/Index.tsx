import { Suspense, lazy } from "react";
import HeroSection from "@/components/HeroSection";

// Lazy load the heavy dashboard component
const DentalDashboard = lazy(() => import("@/components/DentalDashboard"));

// Loading component for the dashboard
const DashboardLoader = () => (
  <div className="container mx-auto p-6">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
      ))}
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <Suspense fallback={<DashboardLoader />}>
        <DentalDashboard />
      </Suspense>
    </div>
  );
};

export default Index;
