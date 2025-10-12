import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Satellite, Download } from "lucide-react";

const MapVisualization = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">GIS Integration</h2>
        <p className="text-muted-foreground">
          ArcGIS REST API integration for remote sensing and spatial analysis
        </p>
      </div>

      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Satellite className="h-5 w-5" />
                Interactive Map Viewer
              </CardTitle>
              <CardDescription>
                Visualize soil health, NDVI, and land use patterns
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-primary/20 via-accent/10 to-muted flex items-center justify-center border border-border">
            <div className="text-center space-y-3">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground max-w-md">
                Interactive map component would render here using Folium, Leaflet, or ArcGIS JS API
              </p>
              <Button variant="outline">
                Load Map Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Data Layers</CardTitle>
            <CardDescription>Available remote sensing layers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">NDVI (Vegetation Index)</span>
              <Badge className="bg-accent">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Soil Moisture</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Land Cover Classification</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Temperature (LST)</span>
              <Badge variant="outline">Available</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Rainfall Data</span>
              <Badge variant="outline">Available</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Data Sources</CardTitle>
            <CardDescription>Connected remote sensing platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <h4 className="font-semibold text-sm mb-1 text-foreground">ArcGIS REST API</h4>
              <p className="text-xs text-muted-foreground">
                Environmental layers, land use data, spatial analysis
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <h4 className="font-semibold text-sm mb-1 text-foreground">Sentinel Hub</h4>
              <p className="text-xs text-muted-foreground">
                Satellite imagery, NDVI calculation, multispectral analysis
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <h4 className="font-semibold text-sm mb-1 text-foreground">OpenWeather API</h4>
              <p className="text-xs text-muted-foreground">
                Weather forecasts, historical climate data, rainfall patterns
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle>Sample ArcGIS Query</CardTitle>
          <CardDescription>Example REST API integration code</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted/50 p-4 rounded-lg overflow-x-auto">
{`# Python example using ArcGIS REST API
import requests

def fetch_ndvi_data(lat, lon):
    endpoint = "https://services.arcgisonline.com/arcgis/rest/services/..."
    params = {
        "geometry": f"{lon},{lat}",
        "geometryType": "esriGeometryPoint",
        "sr": "4326",
        "f": "json"
    }
    response = requests.get(endpoint, params=params)
    return response.json()`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapVisualization;
