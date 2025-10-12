import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, MapPin, Sprout, TrendingUp, Camera, Database } from "lucide-react";
import Hero from "@/components/Hero";
import SoilDashboard from "@/components/SoilDashboard";
import CropRotation from "@/components/CropRotation";
import PastureManagement from "@/components/PastureManagement";
import MapVisualization from "@/components/MapVisualization";
import PlantIdentification from "@/components/PlantIdentification";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2 h-auto bg-muted/50 p-2">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="soil" className="gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Soil Health</span>
            </TabsTrigger>
            <TabsTrigger value="crops" className="gap-2">
              <Sprout className="h-4 w-4" />
              <span className="hidden sm:inline">Crop Rotation</span>
            </TabsTrigger>
            <TabsTrigger value="pasture" className="gap-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Pasture</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">GIS Map</span>
            </TabsTrigger>
            <TabsTrigger value="identify" className="gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Identify</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-[var(--transition-smooth)]">
                <CardHeader>
                  <Database className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Soil Monitoring</CardTitle>
                  <CardDescription>
                    Real-time soil health tracking with AI-powered analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveTab("soil")} variant="outline" className="w-full">
                    View Dashboard
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-[var(--transition-smooth)]">
                <CardHeader>
                  <Sprout className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>Crop Rotation</CardTitle>
                  <CardDescription>
                    ML-powered recommendations for optimal crop sequences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveTab("crops")} variant="outline" className="w-full">
                    Get Recommendations
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-[var(--transition-smooth)]">
                <CardHeader>
                  <Leaf className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Pasture Management</CardTitle>
                  <CardDescription>
                    Prevent overgrazing with intelligent rotation planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveTab("pasture")} variant="outline" className="w-full">
                    Plan Rotation
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-[var(--transition-smooth)]">
                <CardHeader>
                  <MapPin className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>GIS Integration</CardTitle>
                  <CardDescription>
                    ArcGIS REST API integration for remote sensing data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveTab("map")} variant="outline" className="w-full">
                    View Map
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-[var(--transition-smooth)]">
                <CardHeader>
                  <Camera className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Plant Identification</CardTitle>
                  <CardDescription>
                    CNN-powered image recognition for plants and soil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveTab("identify")} variant="outline" className="w-full">
                    Upload Image
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-[var(--transition-smooth)] bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle>SDG Impact</CardTitle>
                  <CardDescription>
                    Supporting UN Sustainable Development Goals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span>SDG 2: Zero Hunger</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>SDG 15: Life on Land</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="soil" className="mt-8">
            <SoilDashboard />
          </TabsContent>

          <TabsContent value="crops" className="mt-8">
            <CropRotation />
          </TabsContent>

          <TabsContent value="pasture" className="mt-8">
            <PastureManagement />
          </TabsContent>

          <TabsContent value="map" className="mt-8">
            <MapVisualization />
          </TabsContent>

          <TabsContent value="identify" className="mt-8">
            <PlantIdentification />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
