// src/app/metamorphosis/actions.ts
"use server";

import { generateStructuredData } from "@/lib/gemini";
import { MetaAuditResult } from "@/types";

export async function analyzeMetadataAction(
  input: string,
  inputType: "url" | "html"
): Promise<MetaAuditResult> {
  let contentToAnalyze = input;

  // If the user provided a URL, fetch the HTML on the server to avoid CORS
  if (inputType === "url") {
    try {
      // Ensure URL has protocol
      const targetUrl = input.startsWith("http") ? input : `https://${input}`;
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Pivot-Growth-Bot/1.0",
        },
        next: { revalidate: 0 }, // Don't cache this fetch
      });

      if (!response.ok) throw new Error("Failed to fetch URL");
      
      const html = await response.text();
      // Extract just the <head> and <h1>-<h3> tags to save LLM context window/tokens
      const headMatch = html.match(/<head[^>]*>[\s\S]*?<\/head>/i);
      const headingsMatch = html.match(/<h[1-3][^>]*>[\s\S]*?<\/h[1-3]>/gi);
      
      contentToAnalyze = `
        HEAD: ${headMatch ? headMatch[0] : "No <head> found."}
        HEADINGS: ${headingsMatch ? headingsMatch.join("\n") : "No headings found."}
      `;
    } catch (error) {
      console.error("[MetaMorphosis Fetch Error]:", error);
      throw new Error("Could not fetch the URL. Please check the link or try pasting raw HTML.");
    }
  }

  const prompt = `
    You are an expert Technical SEO and Growth Engineer.
    Analyze the following HTML markup (specifically the Title, Meta Description, OG Tags, Twitter Tags, and Heading Structure).

    HTML Context:
    ${contentToAnalyze.substring(0, 15000)} // Limit to prevent token overflow

    Provide a technical audit based on this exact JSON schema:
    {
      "seoScore": number (0-100),
      "missingMetadata": string[] (List of critical tags missing, e.g., "Missing og:image"),
      "ctrSuggestions": string[] (Actionable ideas to improve the title/description for clicks),
      "improvements": string[] (Technical SEO suggestions regarding heading structure or tag length)
    }
  `;

  try {
    return await generateStructuredData<MetaAuditResult>(prompt);
  } catch (error) {
    console.error("[MetaMorphosis Action Error]:", error);
    throw new Error("Failed to analyze metadata. Please try again.");
  }
}
