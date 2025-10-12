import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Leaf } from "lucide-react";
import { useState } from "react";

const PlantIdentification = () => {
  const [uploaded, setUploaded] = useState(false);

  const mockResults = {
    plantName: "Solanum tuberosum",
    commonName: "Potato Plant",
    confidence: 94.2,
    health: "Healthy",
    soilCondition: "Well-drained, slightly acidic",
    recommendations: [
      "Continue current watering schedule",
      "Monitor for late blight symptoms",
      "Consider nitrogen supplementation in 2-3 weeks"
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Plant Identification</h2>
        <p className="text-muted-foreground">
          CNN-powered image recognition for plants and soil assessment
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Upload a photo of your plant or soil for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4 bg-muted/20">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Drop your image here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG (max 10MB)
                </p>
              </div>
              <Button onClick={() => setUploaded(true)}>
                Select Image
              </Button>
            </div>

            {uploaded && (
              <div className="rounded-lg bg-accent/10 border border-accent/20 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-16 w-16 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Leaf className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">plant_image.jpg</p>
                    <p className="text-xs text-muted-foreground">2.4 MB</p>
                  </div>
                </div>
                <Button className="w-full" size="sm">
                  Analyze Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              {uploaded ? "CNN model predictions" : "Upload an image to see results"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {uploaded ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{mockResults.plantName}</p>
                      <p className="text-sm text-muted-foreground">{mockResults.commonName}</p>
                    </div>
                    <Badge className="bg-accent">
                      {mockResults.confidence}% confident
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Health Status</p>
                    <Badge className="bg-primary">{mockResults.health}</Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Soil Condition</p>
                    <p className="text-sm text-muted-foreground">{mockResults.soilCondition}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Recommendations</p>
                    <ul className="space-y-2">
                      {mockResults.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Leaf className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No image uploaded yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle>How CNN Recognition Works</CardTitle>
          <CardDescription>Convolutional Neural Network architecture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">1. Image Preprocessing</h4>
            <p>
              Images are resized, normalized, and augmented to ensure consistent input for the model.
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">2. Feature Extraction</h4>
            <p>
              Multiple convolutional layers extract visual features (edges, textures, colors, shapes)
              from the image using learned filters.
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">3. Classification</h4>
            <p>
              Dense neural network layers process extracted features to classify the plant species
              and assess health conditions.
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">4. Contextual Analysis</h4>
            <p>
              Results are cross-referenced with soil data, location, and season to provide
              actionable recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantIdentification;
