import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Sprout, Beef, Warehouse } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [farmerType, setFarmerType] = useState<"crop" | "livestock" | "mixed">("crop");
  const [crops, setCrops] = useState("");
  const [harvestMonth, setHarvestMonth] = useState("");
  const [waterUsage, setWaterUsage] = useState("");
  const [livestockCount, setLivestockCount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const cropsArray = crops.split(",").map(c => c.trim()).filter(c => c);
      
      const { error } = await supabase.from("farmer_profiles").insert({
        user_id: user.id,
        farmer_type: farmerType,
        crops: cropsArray.length > 0 ? cropsArray : null,
        harvest_schedule: harvestMonth ? { month: harvestMonth } : null,
        water_usage_per_day: waterUsage ? parseFloat(waterUsage) : null,
        livestock_count: livestockCount ? parseInt(livestockCount) : null,
      });

      if (error) throw error;

      toast({
        title: "Profile Created!",
        description: "Your farmer profile has been saved successfully.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome! Let's Get Started</CardTitle>
          <CardDescription>
            Tell us about your farming operation so we can provide personalized insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <Label>What type of farmer are you?</Label>
              <RadioGroup value={farmerType} onValueChange={(value: any) => setFarmerType(value)}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="crop" id="crop" />
                  <Label htmlFor="crop" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Sprout className="w-5 h-5" />
                    <span>Crop Farmer</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="livestock" id="livestock" />
                  <Label htmlFor="livestock" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Beef className="w-5 h-5" />
                    <span>Livestock Farmer</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Warehouse className="w-5 h-5" />
                    <span>Mixed Farming</span>
                  </Label>
                </div>
              </RadioGroup>
              <Button onClick={() => setStep(2)} className="w-full">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {(farmerType === "crop" || farmerType === "mixed") && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="crops">What crops do you farm?</Label>
                    <Textarea
                      id="crops"
                      placeholder="e.g., Maize, Wheat, Potatoes (separate with commas)"
                      value={crops}
                      onChange={(e) => setCrops(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvest">When do you typically harvest?</Label>
                    <Input
                      id="harvest"
                      placeholder="e.g., April, September"
                      value={harvestMonth}
                      onChange={(e) => setHarvestMonth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="water">Daily water usage (liters per day)</Label>
                    <Input
                      id="water"
                      type="number"
                      placeholder="e.g., 5000"
                      value={waterUsage}
                      onChange={(e) => setWaterUsage(e.target.value)}
                    />
                  </div>
                </>
              )}

              {(farmerType === "livestock" || farmerType === "mixed") && (
                <div className="space-y-2">
                  <Label htmlFor="livestock">How many animals do you have?</Label>
                  <Input
                    id="livestock"
                    type="number"
                    placeholder="e.g., 50"
                    value={livestockCount}
                    onChange={(e) => setLivestockCount(e.target.value)}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                  {loading ? "Saving..." : "Complete Setup"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
