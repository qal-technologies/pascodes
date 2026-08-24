import { NextRequest, NextResponse } from "next/server";
import { estimatePrice } from "@/lib/price-estimator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, name, email, projectType, pages, description } = body;

    const baseEstimate = estimatePrice({
      projectType: projectType || "webapp",
      pages: Number(pages) || 4,
      description: description || "",
    });

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        source: "fallback",
        estimate: baseEstimate.price,
        priceBreakdown: baseEstimate.priceBreakdown,
        explanation: "Estimated using PoshCodes rule-based software matrix. (Set GEMINI_API_KEY for AI breakdown).",
        verb: baseEstimate.verb,
      });
    }

    const prompt = `
You are senior system architect at PoshCodes. Analyze this software build request and calculate a final estimated price (in USD).
Project Details:
- Title: ${title || "Untitled"}
- Project Type: ${projectType}
- Page/Screen Count: ${pages}
- Description: ${description}

Rule-Based Benchmark Price: $${baseEstimate.price} USD.
Existing Breakdown: ${JSON.stringify(baseEstimate.priceBreakdown)}

Return strictly valid JSON in this exact structure without markdown backticks:
{
  "estimate": number,
  "explanation": "string explaining the technical breakdown and cost reasoning for a client",
  "priceBreakdown": { "Category Name": number }
}
`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API returned status ${res.status}`);
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    return NextResponse.json({
      success: true,
      source: "gemini",
      estimate: parsed.estimate || baseEstimate.price,
      priceBreakdown: parsed.priceBreakdown || baseEstimate.priceBreakdown,
      explanation: parsed.explanation || "Gemini AI analysis complete.",
      verb: baseEstimate.verb,
    });
  } catch (error: any) {
    console.error("Gemini API estimation error:", error);
    const fallback = estimatePrice({
      projectType: "webapp",
      pages: 4,
      description: "",
    });
    return NextResponse.json({
      success: true,
      source: "fallback",
      estimate: fallback.price,
      priceBreakdown: fallback.priceBreakdown,
      explanation: "Calculated via PoshCodes core estimation algorithm.",
      verb: fallback.verb,
    });
  }
}
