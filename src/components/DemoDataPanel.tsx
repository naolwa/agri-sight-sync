import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Sparkles, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "./LoadingSpinner";

const DemoDataPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const { toast } = useToast();

  const loadDemoData = async () => {
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to load demo data",
          variant: "destructive",
        });
        return;
      }

      // Insert demo soil analysis
      const { error: soilError } = await supabase.from("soil_analyses").insert([
        {
          user_id: user.id,
          image_url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
          ph_level: 6.5,
          nitrogen_level: 45,
          moisture_level: 28,
          health_score: 85,
          ndvi_value: 0.74,
          latitude: -23.9045,
          longitude: 29.4689,
        },
        {
          user_id: user.id,
          image_url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
          ph_level: 7.1,
          nitrogen_level: 32,
          moisture_level: 31,
          health_score: 78,
          ndvi_value: 0.68,
          latitude: -23.9045,
          longitude: 29.4689,
        },
        {
          user_id: user.id,
          image_url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
          ph_level: 6.8,
          nitrogen_level: 38,
          moisture_level: 26,
          health_score: 82,
          ndvi_value: 0.71,
          latitude: -23.9045,
          longitude: 29.4689,
        },
      ]);

      if (soilError) throw soilError;

      // Update farmer profile with demo data
      const { error: profileError } = await supabase
        .from("farmer_profiles")
        .update({
          location: "Polokwane, Limpopo",
          current_crop: "potatoes",
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      setDemoLoaded(true);
      toast({
        title: "Demo data loaded successfully",
        description: "Explore the dashboard to see AI-powered insights",
      });
    } catch (error: any) {
      console.error("Error loading demo data:", error);
      toast({
        title: "Failed to load demo data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-[var(--shadow-soft)] border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          Demo Data
        </CardTitle>
        <CardDescription>
          Load sample farm data to explore AgriSight Sync's AI capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-sm text-foreground">Includes:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-primary" />
              3 soil analysis records with full nutrient data
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-primary" />
              Farm location (Polokwane, Limpopo)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-primary" />
              Current crop (Potatoes) for rotation analysis
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-primary" />
              Sample GPS coordinates for GIS mapping
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={loadDemoData}
            disabled={isLoading || demoLoaded}
            className="flex-1 gap-2"
            aria-label="Load demo data"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                Loading...
              </>
            ) : demoLoaded ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Demo Data Loaded
              </>
            ) : (
              <>
                <Database className="h-4 w-4" />
                Load Demo Data
              </>
            )}
          </Button>
          {demoLoaded && <Badge variant="default">Active</Badge>}
        </div>

        <p className="text-xs text-muted-foreground">
          This will add sample data to your account to showcase AI-powered crop rotation
          recommendations, risk scoring, and GIS visualization features.
        </p>
      </CardContent>
    </Card>
  );
};

export default DemoDataPanel;
