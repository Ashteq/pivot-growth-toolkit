// src/app/persona-builder/actions.ts
"use server";

import { generateStructuredData } from "@/lib/gemini";
import { PersonaRequest, PersonaResult } from "@/types";

export async function generatePersonaAction(data: PersonaRequest): Promise<PersonaResult> {
  const prompt = `
    You are an expert Product Marketing Manager and Growth Strategist.
    Based on the following context, generate a detailed Ideal Customer Profile (ICP).

    Business/Company: ${data.business}
    Target Audience: ${data.audience}
    Product/Service: ${data.product}
    Brand Tone: ${data.tone}

    Return a strictly formatted JSON object matching this schema:
    {
      "idealCustomer": "A 2-3 sentence summary of the exact persona",
      "painPoints": ["Point 1", "Point 2", "Point 3"],
      "goals": ["Goal 1", "Goal 2", "Goal 3"],
      "objections": ["Objection 1", "Objection 2"],
      "messagingAngles": ["Angle 1", "Angle 2", "Angle 3"],
      "acquisitionChannels": ["Channel 1", "Channel 2", "Channel 3"]
    }
  `;

  try {
    return await generateStructuredData<PersonaResult>(prompt);
  } catch (error) {
    console.error("[Persona Builder Error]:", error);
    throw new Error("Failed to generate persona. Please try again.");
  }
}