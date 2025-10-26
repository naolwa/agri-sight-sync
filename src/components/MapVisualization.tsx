import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Satellite, Download, Search, Bookmark, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "./LoadingSpinner";

const MapVisualization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLayers, setActiveLayers] = useState(["NDVI"]);
  const [bookmarkedLocations, setBookmarkedLocations] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search required",
        description: "Please enter a location to search",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Location found",
        description: `Showing data for: ${searchQuery}`
      });
    }, 1500);
  };

  const toggleLayer = (layer: string) => {
    setActiveLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  const handleBookmark = () => {
    const location = searchQuery || "Current Location";
    setBookmarkedLocations(prev => [...prev, location]);
    toast({
      title: "Location bookmarked",
      description: `${location} added to bookmarks`
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting map data",
      description: "Your map visualization will download shortly"
    });
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-foreground mb-2">GIS Integration</h2>
        <p className="text-muted-foreground">
          Real-time remote sensing and spatial analysis with ArcGIS REST API, Sentinel Hub, and OpenWeather
        </p>
      </header>

      {/* Search and Controls */}
      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" aria-hidden="true" />
            Location Search
          </CardTitle>
          <CardDescription>
            Search for farms, villages, or enter GPS coordinates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter location, village name, or coordinates (lat, lon)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
              aria-label="Location search"
            />
            <Button onClick={handleSearch} disabled={isLoading} aria-label="Search location">
              <Search className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleBookmark} 
              variant="outline"
              disabled={!searchQuery}
              aria-label="Bookmark location"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
          {bookmarkedLocations.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Bookmarks:</span>
              {bookmarkedLocations.map((loc, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{loc}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Map */}
      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Satellite className="h-5 w-5" aria-hidden="true" />
                Interactive Map Viewer
              </CardTitle>
              <CardDescription>
                Real-time soil health, NDVI, and environmental data visualization
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2" aria-label="View methodology">
                <Info className="h-4 w-4" />
                Info
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handleExport}
                aria-label="Export map data"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-primary/20 via-accent/10 to-muted flex items-center justify-center border border-border relative overflow-hidden">
            {isLoading ? (
              <LoadingSpinner size="lg" text="Loading map data..." />
            ) : (
              <div className="text-center space-y-3 p-6">
                <MapPin className="h-16 w-16 text-primary mx-auto" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Demo Visualization
                  </p>
                  <p className="text-xs text-muted-foreground max-w-md">
                    Interactive map with Leaflet/ArcGIS JS API showing NDVI layers, soil moisture, 
                    rainfall patterns, and land use classification. Search a location to begin.
                  </p>
                </div>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
                    NDVI: 0.74 (Healthy)
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">
                    Soil Moisture: 65%
                  </Badge>
                  <Badge className="bg-orange-500/20 text-orange-700 dark:text-orange-400">
                    Temp: 24°C
                  </Badge>
                </div>
              </div>
            )}
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm p-3 rounded-lg border border-border shadow-lg">
              <div className="text-xs font-semibold mb-2 text-foreground">Legend</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-green-500"></div>
                  <span className="text-muted-foreground">High NDVI (&gt;0.6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-yellow-500"></div>
                  <span className="text-muted-foreground">Medium (0.3-0.6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-red-500"></div>
                  <span className="text-muted-foreground">Low (&lt;0.3)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Data Layers</CardTitle>
            <CardDescription>Toggle remote sensing layers on the map</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {["NDVI (Vegetation Index)", "Soil Moisture", "Land Cover Classification", "Temperature (LST)", "Rainfall Data"].map((layer) => {
              const isActive = activeLayers.includes(layer);
              return (
                <button
                  key={layer}
                  onClick={() => toggleLayer(layer)}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted w-full text-left transition-colors"
                  aria-pressed={isActive}
                  aria-label={`Toggle ${layer} layer`}
                >
                  <span className="text-sm font-medium">{layer}</span>
                  <Badge className={isActive ? "bg-accent" : ""} variant={isActive ? "default" : "outline"}>
                    {isActive ? "Active" : "Available"}
                  </Badge>
                </button>
              );
            })}
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
