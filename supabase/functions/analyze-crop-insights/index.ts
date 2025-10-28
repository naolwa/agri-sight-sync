import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, soilData, cropData, weatherData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing natural language query:", query);

    // Build context from available data
    const context = `
Soil Analysis Data:
- pH Level: ${soilData?.ph || "N/A"}
- Nitrogen: ${soilData?.nitrogen || "N/A"} ppm
- Phosphorus: ${soilData?.phosphorus || "N/A"} ppm
- Potassium: ${soilData?.potassium || "N/A"} ppm
- Organic Matter: ${soilData?.organicMatter || "N/A"}%
- Moisture: ${soilData?.moisture || "N/A"}%

Current Crop: ${cropData?.currentCrop || "N/A"}
Location: ${cropData?.location || "N/A"}

Weather Conditions:
- Temperature: ${weatherData?.temperature || "N/A"}°C
- Rainfall: ${weatherData?.rainfall || "N/A"}mm
- Humidity: ${weatherData?.humidity || "N/A"}%

User Query: ${query}
`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an agricultural AI assistant specializing in crop rotation, soil health, and sustainable farming practices. Analyze the provided farm data and respond to farmer queries with actionable, scientific insights. Focus on:
- Crop rotation recommendations based on soil nutrient levels
- Risk assessment for diseases, pests, and nutrient deficiencies
- Optimal planting schedules considering weather patterns
- Soil improvement strategies
- Yield optimization techniques

Provide clear, concise answers with risk scores (0-100) where applicable.`
          },
          {
            role: "user",
            content: context
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    // Extract risk score from response (simple pattern matching)
    const riskMatch = aiResponse?.match(/risk[:\s]+(\d+)/i);
    const riskScore = riskMatch ? parseInt(riskMatch[1]) : 50;

    console.log("AI analysis complete");

    return new Response(
      JSON.stringify({
        analysis: aiResponse,
        riskScore,
        recommendations: extractRecommendations(aiResponse),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in analyze-crop-insights:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function extractRecommendations(text: string): string[] {
  const recommendations: string[] = [];
  const lines = text.split("\n");
  
  for (const line of lines) {
    if (line.match(/^[-•*]\s+/) || line.match(/^\d+\.\s+/)) {
      recommendations.push(line.replace(/^[-•*]\s+/, "").replace(/^\d+\.\s+/, "").trim());
    }
  }
  
  return recommendations.length > 0 ? recommendations : [text.substring(0, 200)];
}
