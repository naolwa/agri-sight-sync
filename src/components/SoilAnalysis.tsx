import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, Loader2, CheckCircle, AlertTriangle, Leaf, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SoilAnalysisProps {
  farmerType?: string;
}

const SoilAnalysis = ({ farmerType }: SoilAnalysisProps) => {
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setAnalysis(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Image = reader.result as string;
        setImageUrl(base64Image);
        
        // Analyze the soil
        setAnalyzing(true);
        const { data: functionData, error: functionError } = await supabase.functions.invoke(
          "analyze-soil",
          {
            body: { 
              imageData: base64Image,
              farmerType: farmerType || "crop"
            },
          }
        );

        if (functionError) {
          throw functionError;
        }

        setAnalysis(functionData);
        
        toast({
          title: "Analysis Complete!",
          description: "Your soil analysis results are ready",
        });
      };

      reader.onerror = () => {
        throw new Error("Failed to read file");
      };
    } catch (error: any) {
      console.error("Error analyzing soil:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to analyze soil image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Soil Image for Analysis</CardTitle>
          <CardDescription>
            Upload a photo of your soil and get AI-powered analysis with personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 hover:border-primary transition-colors">
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Click to upload or drag and drop
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="soil-upload"
              disabled={uploading || analyzing}
            />
            <label htmlFor="soil-upload">
              <Button disabled={uploading || analyzing} asChild>
                <span>
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Select Image"
                  )}
                </span>
              </Button>
            </label>
          </div>

          {imageUrl && (
            <div className="mt-4">
              <img
                src={imageUrl}
                alt="Soil sample"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Soil Health Analysis</CardTitle>
              <CardDescription>AI-powered assessment of your soil condition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Overall Health Score</span>
                  <span className="text-2xl font-bold text-primary">{analysis.health_score}%</span>
                </div>
                <Progress value={analysis.health_score} className="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      Moisture Level
                    </span>
                    <Badge variant={analysis.moisture_level > 50 ? "default" : "destructive"}>
                      {analysis.moisture_level}%
                    </Badge>
                  </div>
                  <Progress value={analysis.moisture_level} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">pH Level</span>
                    <Badge variant={analysis.ph_level >= 6 && analysis.ph_level <= 7.5 ? "default" : "secondary"}>
                      {analysis.ph_level}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-500" />
                      Nitrogen
                    </span>
                    <Badge>{analysis.nitrogen_level}%</Badge>
                  </div>
                  <Progress value={analysis.nitrogen_level} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">NDVI Value</span>
                    <Badge>{analysis.ndvi_value?.toFixed(2) || "N/A"}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Personalized advice for your farm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.should_rest && (
                <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-900">Land Rest Required</p>
                    <p className="text-sm text-orange-700">
                      Your soil needs time to recover. Consider letting this land rest for the upcoming season.
                    </p>
                  </div>
                </div>
              )}

              {analysis.rotation_needed && farmerType === "livestock" && (
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Animal Rotation Recommended</p>
                    <p className="text-sm text-blue-700">
                      Rotating your animals to different grazing areas will help prevent land degradation and promote soil recovery.
                    </p>
                  </div>
                </div>
              )}

              {analysis.suggested_crop && !analysis.should_rest && (
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900">Suggested Crop</p>
                    <p className="text-sm text-green-700">
                      Based on your soil conditions, consider planting: <strong>{analysis.suggested_crop}</strong>
                    </p>
                  </div>
                </div>
              )}

              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold">Additional Recommendations:</p>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SoilAnalysis;
