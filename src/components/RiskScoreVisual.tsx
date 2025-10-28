import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, TrendingDown, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface RiskScoreVisualProps {
  currentRisk: number;
  historicalData?: Array<{ date: string; risk: number; yield: number }>;
  riskFactors?: Array<{ factor: string; impact: number; severity: "low" | "medium" | "high" }>;
}

const RiskScoreVisual = ({ currentRisk, historicalData, riskFactors }: RiskScoreVisualProps) => {
  const getRiskLevel = (score: number) => {
    if (score < 30) return { label: "Low Risk", color: "text-green-600 dark:text-green-400", variant: "default" as const };
    if (score < 70) return { label: "Medium Risk", color: "text-yellow-600 dark:text-yellow-400", variant: "secondary" as const };
    return { label: "High Risk", color: "text-red-600 dark:text-red-400", variant: "destructive" as const };
  };

  const riskLevel = getRiskLevel(currentRisk);

  const defaultHistorical = historicalData || [
    { date: "Week 1", risk: 35, yield: 85 },
    { date: "Week 2", risk: 42, yield: 82 },
    { date: "Week 3", risk: 38, yield: 87 },
    { date: "Week 4", risk: currentRisk, yield: 90 },
  ];

  const defaultFactors = riskFactors || [
    { factor: "Nutrient Deficiency", impact: 25, severity: "medium" as const },
    { factor: "Soil Moisture", impact: 15, severity: "low" as const },
    { factor: "Disease Risk", impact: 35, severity: "high" as const },
    { factor: "Weather Patterns", impact: 20, severity: "medium" as const },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" aria-hidden="true" />
            ML-Powered Risk Score
          </CardTitle>
          <CardDescription>
            Supervised learning model analyzing soil, weather, and crop health
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-foreground">{currentRisk}</div>
              <Badge variant={riskLevel.variant} className="mt-2">
                {riskLevel.label}
              </Badge>
            </div>
            <AlertTriangle className={`h-16 w-16 ${riskLevel.color}`} aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Risk Level</span>
              <span className={`font-medium ${riskLevel.color}`}>{currentRisk}%</span>
            </div>
            <Progress value={currentRisk} className="h-3" aria-label={`Risk level ${currentRisk}%`} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle>Risk & Yield Trend Analysis</CardTitle>
          <CardDescription>Historical correlation between risk factors and crop yield</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={defaultHistorical}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="risk"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorRisk)"
                name="Risk Score"
              />
              <Area
                type="monotone"
                dataKey="yield"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorYield)"
                name="Expected Yield %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle>Risk Factor Breakdown</CardTitle>
          <CardDescription>Individual contributors to overall risk score</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {defaultFactors.map((factor, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{factor.factor}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      factor.severity === "high"
                        ? "destructive"
                        : factor.severity === "medium"
                        ? "secondary"
                        : "default"
                    }
                    className="text-xs"
                  >
                    {factor.severity}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{factor.impact}%</span>
                </div>
              </div>
              <Progress value={factor.impact} className="h-2" aria-label={`${factor.factor} impact ${factor.impact}%`} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskScoreVisual;
