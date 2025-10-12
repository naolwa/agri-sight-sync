import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, CircleDot } from "lucide-react";
import { useState } from "react";

const PastureManagement = () => {
  const [ndvi, setNdvi] = useState("0.35");
  const [animalsPerHa, setAnimalsPerHa] = useState("2.5");
  const [restDays, setRestDays] = useState<number | null>(null);

  const calculateRestPeriod = () => {
    const currentNdvi = parseFloat(ndvi);
    const grazingPressure = parseFloat(animalsPerHa);
    const baselineNdvi = 0.4;
    const recoveryRate = 0.01;

    const deficit = Math.max(0, baselineNdvi - currentNdvi);
    const daysForRecovery = deficit / recoveryRate;
    const grazingFactor = 1 + Math.log1p(Math.max(0.1, grazingPressure));
    const calculatedDays = Math.ceil(daysForRecovery * grazingFactor);
    
    setRestDays(Math.max(7, Math.min(calculatedDays, 365)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Pasture Rotation Planner</h2>
        <p className="text-muted-foreground">
          Prevent overgrazing and soil depletion with intelligent rotation scheduling
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Rest Period Calculator
            </CardTitle>
            <CardDescription>
              Calculate optimal pasture rest duration based on current conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ndvi">Current NDVI (Vegetation Index)</Label>
              <Input
                id="ndvi"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={ndvi}
                onChange={(e) => setNdvi(e.target.value)}
                placeholder="0.35"
              />
              <p className="text-xs text-muted-foreground">
                NDVI range: 0 (bare soil) to 1 (dense vegetation)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="animals">Grazing Pressure (animals/hectare)</Label>
              <Input
                id="animals"
                type="number"
                step="0.1"
                min="0"
                value={animalsPerHa}
                onChange={(e) => setAnimalsPerHa(e.target.value)}
                placeholder="2.5"
              />
            </div>

            <Button onClick={calculateRestPeriod} className="w-full">
              Calculate Rest Period
            </Button>

            {restDays !== null && (
              <div className="rounded-lg bg-accent/10 border border-accent/20 p-4">
                <p className="text-sm text-muted-foreground mb-2">Recommended Rest Period:</p>
                <p className="text-3xl font-bold text-accent">{restDays} days</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on heuristic: baseline NDVI recovery with grazing pressure adjustment
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <CircleDot className="h-5 w-5" />
              Current Pasture Status
            </CardTitle>
            <CardDescription>
              Real-time monitoring from remote sensing data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Parcel A</span>
                <Badge className="bg-accent">Resting (12 days left)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Parcel B</span>
                <Badge variant="outline">Grazing (3 animals/ha)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Parcel C</span>
                <Badge className="bg-primary">Ready (NDVI: 0.68)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Parcel D</span>
                <Badge className="bg-yellow-500">Needs Rest (NDVI: 0.22)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle>How the Heuristic Works</CardTitle>
          <CardDescription>Understanding pasture rest period calculation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">Step 1: NDVI Deficit</h4>
            <p>
              Calculate how far current vegetation (NDVI) is below the healthy baseline (0.4).
              Larger deficit = more recovery needed.
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">Step 2: Recovery Rate</h4>
            <p>
              Assume vegetation recovers at ~0.01 NDVI points per day under optimal conditions.
              Divide deficit by recovery rate to get base rest days.
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">Step 3: Grazing Pressure Adjustment</h4>
            <p>
              Scale rest period based on stocking density. Higher animal counts increase soil compaction
              and require longer recovery. Factor = 1 + ln(1 + animals/ha).
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">Step 4: Practical Bounds</h4>
            <p>
              Enforce minimum 7 days (practical minimum) and maximum 365 days (1 year cap).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PastureManagement;
