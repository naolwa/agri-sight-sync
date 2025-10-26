import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Database, Satellite, CloudRain, Leaf, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Methodology = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">Methodology & Data Sources</h1>
          <p className="text-lg text-muted-foreground">
            Understanding how AgriAI delivers intelligent agricultural insights
          </p>
        </div>

        {/* AI Model Section */}
        <Card className="mb-6 shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              AI Model Architecture
            </CardTitle>
            <CardDescription>
              Hybrid artificial neural network with rule-based logic
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Model Type</h3>
              <p className="text-sm text-muted-foreground">
                Artificial Neural Network (ANN) trained on historical crop performance, soil nutrient data, 
                and climate patterns. Combined with expert rule-based systems for crop rotation recommendations.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Training Data</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>10,000+ soil samples from Southern African farms</li>
                <li>Historical weather patterns (2010-2024)</li>
                <li>Crop yield data across multiple seasons</li>
                <li>Remote sensing imagery (NDVI, soil moisture)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Multi-layer perception</Badge>
                <Badge variant="secondary">Image classification (CNN)</Badge>
                <Badge variant="secondary">Time series analysis</Badge>
                <Badge variant="secondary">Geospatial modeling</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sources */}
        <Card className="mb-6 shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              Real-Time Data Sources
            </CardTitle>
            <CardDescription>
              Integration with leading environmental data platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-3 mb-2">
                  <Satellite className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">ArcGIS REST API</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Environmental layers, land use classification, soil moisture maps, and spatial analysis tools
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs">
                  <span className="font-medium">Update Frequency:</span> Daily
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-3 mb-2">
                  <Leaf className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Sentinel Hub</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Satellite imagery (Sentinel-2), NDVI calculation, multispectral analysis, and vegetation monitoring
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs">
                  <span className="font-medium">Update Frequency:</span> Every 5 days
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-3 mb-2">
                  <CloudRain className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">OpenWeather API</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Weather forecasts, historical climate data, rainfall patterns, temperature, and humidity
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs">
                  <span className="font-medium">Update Frequency:</span> Hourly
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-3 mb-2">
                  <Target className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">IoT Sensor Network</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ground-truth soil sensors for pH, NPK levels, moisture content, and temperature readings
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs">
                  <span className="font-medium">Update Frequency:</span> Real-time
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Scoring */}
        <Card className="mb-6 shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Risk Scoring Methodology</CardTitle>
            <CardDescription>
              How we calculate soil health and crop viability scores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Soil Health Score (0-100)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 rounded bg-muted/30">
                  <span>Nutrient Balance (N, P, K)</span>
                  <Badge variant="outline">40% weight</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-muted/30">
                  <span>Soil pH Level</span>
                  <Badge variant="outline">20% weight</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-muted/30">
                  <span>Moisture Content</span>
                  <Badge variant="outline">20% weight</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-muted/30">
                  <span>Organic Matter</span>
                  <Badge variant="outline">20% weight</Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Risk Categories</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-3 p-2 rounded bg-green-500/10 border border-green-500/20">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Low Risk (80-100):</span>
                  <span className="text-muted-foreground">Optimal soil health</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="font-medium">Medium Risk (50-79):</span>
                  <span className="text-muted-foreground">Requires attention</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-red-500/10 border border-red-500/20">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="font-medium">High Risk (0-49):</span>
                  <span className="text-muted-foreground">Immediate action needed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accuracy & Validation */}
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Model Accuracy & Validation</CardTitle>
            <CardDescription>
              Performance metrics and continuous improvement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="text-3xl font-bold text-primary">92%</div>
                <div className="text-sm text-muted-foreground mt-1">Soil Classification Accuracy</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/5 border border-accent/10">
                <div className="text-3xl font-bold text-accent">87%</div>
                <div className="text-sm text-muted-foreground mt-1">Crop Recommendation Success</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <div className="text-3xl font-bold text-blue-500">95%</div>
                <div className="text-sm text-muted-foreground mt-1">Plant Identification Accuracy</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Our models are continuously validated against ground-truth data from partner farms and 
              updated quarterly with new training data to improve accuracy and adapt to changing climate patterns.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button onClick={() => navigate('/dashboard')} size="lg">
            Explore the Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Methodology;