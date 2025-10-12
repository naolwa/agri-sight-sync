import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

const CropRotation = () => {
  const rotationPlan = [
    {
      season: "Current Season",
      crop: "Potatoes",
      status: "growing",
      nutrientDemand: { N: "high", P: "medium", K: "high" }
    },
    {
      season: "Next Season",
      crop: "Legumes (Beans/Peas)",
      status: "recommended",
      benefit: "Fixes nitrogen, replenishes soil",
      nutrientDemand: { N: "low", P: "medium", K: "low" }
    },
    {
      season: "Season 3",
      crop: "Leafy Greens",
      status: "recommended",
      benefit: "Light nutrient demand, soil recovery",
      nutrientDemand: { N: "medium", P: "low", K: "low" }
    },
    {
      season: "Season 4",
      crop: "Root Vegetables",
      status: "recommended",
      benefit: "Utilize restored nutrients",
      nutrientDemand: { N: "medium", P: "medium", K: "medium" }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Crop Rotation Planner</h2>
        <p className="text-muted-foreground">
          AI-powered recommendations using Artificial Neural Networks
        </p>
      </div>

      <Card className="border-destructive/30 bg-destructive/5 shadow-[var(--shadow-soft)]">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <CardTitle className="text-destructive">Important: Avoid Continuous Potatoes</CardTitle>
              <CardDescription className="text-destructive/80">
                Do not replant potatoes immediately after harvest. This depletes soil nutrients and increases disease risk.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {rotationPlan.map((period, index) => (
          <Card 
            key={index}
            className={`shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] ${
              period.status === "growing" 
                ? "border-primary/30 bg-primary/5" 
                : "border-accent/20 hover:border-accent/40"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {period.crop}
                    {period.status === "recommended" && (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    )}
                  </CardTitle>
                  <CardDescription>{period.season}</CardDescription>
                </div>
                <Badge variant={period.status === "growing" ? "default" : "outline"}>
                  {period.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {period.benefit && (
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <strong className="text-foreground">Benefit:</strong> {period.benefit}
                </div>
              )}
              <div>
                <p className="text-sm font-medium mb-2 text-foreground">Nutrient Demand:</p>
                <div className="flex gap-2">
                  <Badge variant="outline">N: {period.nutrientDemand.N}</Badge>
                  <Badge variant="outline">P: {period.nutrientDemand.P}</Badge>
                  <Badge variant="outline">K: {period.nutrientDemand.K}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-[var(--shadow-soft)] bg-gradient-to-br from-accent/10 to-primary/5">
        <CardHeader>
          <CardTitle>ML Model Explanation</CardTitle>
          <CardDescription>How our ANN predicts optimal crop sequences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Our Artificial Neural Network analyzes:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Current soil nutrient levels (N, P, K)</li>
            <li>Historical crop performance data</li>
            <li>Weather patterns and seasonal conditions</li>
            <li>Disease and pest pressure history</li>
            <li>Soil structure and organic matter content</li>
          </ul>
          <p>
            The model recommends crops that balance nutrient uptake with soil regeneration,
            maximizing yield while maintaining long-term soil health.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button size="lg" className="gap-2">
          Generate Custom Plan
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CropRotation;
