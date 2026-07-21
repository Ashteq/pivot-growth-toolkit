"use server";

import { generateStructuredData } from "@/lib/gemini";
import { Headline, HeadlineRequest } from "@/types";

export async function generateHeadlinesAction(data: HeadlineRequest): Promise<Headline[]> {
  const prompt = `
    You are an expert growth marketer and copywriter.
    Generate exactly 10 high-converting headlines based on the following:
    Topic: ${data.topic}
    Target Audience: ${data.audience}
    Goal: ${data.goal}

    Categorize them into exactly these four categories: "Curiosity", "Urgency", "Benefit", "Authority".
    Ensure there is at least one headline for each category.

    Return the result strictly as a JSON array of objects matching this schema:
    [
      {
        "id": "unique-string-id",
        "text": "The headline copy",
        "category": "Curiosity"
      }
    ]
  `;

  try {
    // We pass our strict TS interface to the abstraction we built earlier
    const headlines = await generateStructuredData<Headline[]>(prompt);
    return headlines;
  } catch (error) {
    console.error("[Headline Action Error]:", error);
    throw new Error("Failed to generate headlines. Please try again.");
  }
}