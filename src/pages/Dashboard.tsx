import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Upload } from "lucide-react";
import SoilDashboard from "@/components/SoilDashboard";
import CropRotation from "@/components/CropRotation";
import PastureManagement from "@/components/PastureManagement";
import PlantIdentification from "@/components/PlantIdentification";
import MapVisualization from "@/components/MapVisualization";
import SoilAnalysis from "@/components/SoilAnalysis";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setUser(session.user);
      await loadProfile(session.user.id);
    }
    setLoading(false);
  };

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("farmer_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error loading profile:", error);
      return;
    }

    if (!data) {
      navigate("/onboarding");
      return;
    }

    setProfile(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">AgriTech AI Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {profile && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Farm Profile</CardTitle>
              <CardDescription>
                {profile.farmer_type === "crop" && "Crop Farmer"}
                {profile.farmer_type === "livestock" && "Livestock Farmer"}
                {profile.farmer_type === "mixed" && "Mixed Farming"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {profile.crops && profile.crops.length > 0 && (
                  <div>
                    <span className="font-semibold">Crops:</span> {profile.crops.join(", ")}
                  </div>
                )}
                {profile.livestock_count && (
                  <div>
                    <span className="font-semibold">Livestock:</span> {profile.livestock_count} animals
                  </div>
                )}
                {profile.water_usage_per_day && (
                  <div>
                    <span className="font-semibold">Water Usage:</span> {profile.water_usage_per_day}L/day
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="soil-analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="soil-analysis">
              <Upload className="w-4 h-4 mr-2" />
              Soil Analysis
            </TabsTrigger>
            <TabsTrigger value="soil-health">Soil Health</TabsTrigger>
            <TabsTrigger value="crop-rotation">Crop Rotation</TabsTrigger>
            <TabsTrigger value="pasture">Pasture</TabsTrigger>
            <TabsTrigger value="plant-id">Plant ID</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>

          <TabsContent value="soil-analysis">
            <SoilAnalysis farmerType={profile?.farmer_type} />
          </TabsContent>

          <TabsContent value="soil-health">
            <SoilDashboard />
          </TabsContent>

          <TabsContent value="crop-rotation">
            <CropRotation />
          </TabsContent>

          <TabsContent value="pasture">
            <PastureManagement />
          </TabsContent>

          <TabsContent value="plant-id">
            <PlantIdentification />
          </TabsContent>

          <TabsContent value="map">
            <MapVisualization />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
