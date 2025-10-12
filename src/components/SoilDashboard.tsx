import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Activity, Beaker } from "lucide-react";

const SoilDashboard = () => {
  const soilData = {
    moisture: { value: 65, status: "optimal", icon: Droplets },
    ph: { value: 6.8, status: "good", icon: Beaker },
    nitrogen: { value: 42, status: "low", icon: Activity },
    ndvi: { value: 0.72, status: "healthy", icon: Thermometer }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
      case "healthy":
      case "good":
        return "bg-accent";
      case "low":
        return "bg-yellow-500";
      default:
        return "bg-destructive";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Soil Health Monitoring</h2>
        <p className="text-muted-foreground">
          Real-time analysis powered by machine learning and IoT sensors
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20 shadow-[var(--shadow-soft)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soilData.moisture.value}%</div>
            <Progress value={soilData.moisture.value} className="mt-2" />
            <Badge className={`mt-2 ${getStatusColor(soilData.moisture.status)}`}>
              {soilData.moisture.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-accent/20 shadow-[var(--shadow-soft)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
            <Beaker className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soilData.ph.value}</div>
            <Progress value={(soilData.ph.value / 14) * 100} className="mt-2" />
            <Badge className={`mt-2 ${getStatusColor(soilData.ph.status)}`}>
              {soilData.ph.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-[var(--shadow-soft)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Nitrogen</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soilData.nitrogen.value} ppm</div>
            <Progress value={soilData.nitrogen.value} className="mt-2" />
            <Badge className={`mt-2 ${getStatusColor(soilData.nitrogen.status)}`}>
              {soilData.nitrogen.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-accent/20 shadow-[var(--shadow-soft)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">NDVI Index</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soilData.ndvi.value}</div>
            <Progress value={soilData.ndvi.value * 100} className="mt-2" />
            <Badge className={`mt-2 ${getStatusColor(soilData.ndvi.status)}`}>
              {soilData.ndvi.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
          <CardDescription>Support Vector Machine predictions based on current soil conditions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">Soil Classification</h4>
            <p className="text-sm text-muted-foreground">
              The SVM model classifies this soil as <strong className="text-accent">Loamy with moderate organic content</strong>.
              Optimal for vegetables and legumes.
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">Degradation Risk</h4>
            <p className="text-sm text-muted-foreground">
              Low risk detected. Nitrogen levels require attention. Consider nitrogen-fixing cover crops.
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">Next Action</h4>
            <p className="text-sm text-muted-foreground">
              Schedule soil amendment with compost or organic fertilizer within 2 weeks.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SoilDashboard;
