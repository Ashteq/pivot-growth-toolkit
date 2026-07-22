// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '@/utilities/env';

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    temperature: 0.7,
  }
});

export async function generateStructuredData<T>(prompt: string): Promise<T> {
  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    if (!text) {
      throw new Error('Gemini returned an empty response.');
    }

    // --- NEW FIX: Clean markdown formatting ---
    // Remove ```json at the start and ``` at the end if the LLM added them
    text = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '');
    text = text.replace(/^```\s*/i, '').replace(/\s*```$/i, '');
    
    // Now it is pure JSON string, safe to parse
    return JSON.parse(text) as T;
    
  } catch (error) {
    // This is the log that prints in your WSL terminal
    console.error('[Gemini Service Error]:', error);
    throw new Error('Failed to generate AI content. Please try again.');
  }
}