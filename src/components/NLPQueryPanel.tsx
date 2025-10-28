import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Send, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "./LoadingSpinner";

interface NLPQueryPanelProps {
  soilData?: any;
  cropData?: any;
  weatherData?: any;
}

const NLPQueryPanel = ({ soilData, cropData, weatherData }: NLPQueryPanelProps) => {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const exampleQueries = [
    "What crop should I plant next based on my soil health?",
    "What are the main risks to my current crop?",
    "How can I improve my soil's nitrogen levels?",
    "Is the weather suitable for planting this week?",
  ];

  const handleAnalyze = async () => {
    if (!query.trim()) {
      toast({
        title: "Query required",
        description: "Please enter a question about your farm",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        "analyze-crop-insights",
        {
          body: {
            query,
            soilData,
            cropData,
            weatherData,
          },
        }
      );

      if (functionError) throw functionError;

      setAnalysis(data);
      toast({
        title: "Analysis complete",
        description: "AI has processed your query",
      });
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze query");
      toast({
        title: "Analysis failed",
        description: err.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  return (
    <Card className="shadow-[var(--shadow-soft)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" aria-hidden="true" />
          AI-Powered Natural Language Analysis
        </CardTitle>
        <CardDescription>
          Ask questions about your farm in plain language and get AI-powered insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="nlp-query" className="text-sm font-medium mb-2 block">
            Your Question
          </label>
          <Textarea
            id="nlp-query"
            placeholder="E.g., What should I plant after potatoes to restore soil nitrogen?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
            className="resize-none"
            aria-label="Natural language query input"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Try these:</span>
          {exampleQueries.map((example, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => handleExampleClick(example)}
              className="text-xs h-auto py-1 px-2"
            >
              {example}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !query.trim()}
          className="w-full gap-2"
          aria-label="Analyze query"
        >
          {isAnalyzing ? (
            <>
              <LoadingSpinner size="sm" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Analyze with AI
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysis && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">AI Analysis</h4>
              <Badge
                variant={
                  analysis.riskScore < 30
                    ? "default"
                    : analysis.riskScore < 70
                    ? "secondary"
                    : "destructive"
                }
              >
                Risk Score: {analysis.riskScore}/100
              </Badge>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {analysis.analysis}
              </p>
            </div>

            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h5 className="font-medium text-sm mb-2 text-foreground">
                  Key Recommendations
                </h5>
                <ul className="space-y-1">
                  {analysis.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NLPQueryPanel;
