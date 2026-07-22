// src/types/index.ts

// --- Tool 1: Headline Hero ---
export type HeadlineCategory = 'Curiosity' | 'Urgency' | 'Benefit' | 'Authority';

export interface Headline {
  id: string;
  text: string;
  category: HeadlineCategory;
}

export interface HeadlineRequest {
  topic: string;
  audience: string;
  goal: string;
}

// --- Tool 2: MetaMorphosis ---
export interface MetaAuditResult {
  seoScore: number;
  missingMetadata: string[];
  ctrSuggestions: string[];
  improvements: string[];
}

// --- Tool 3: Persona Builder ---
export interface PersonaRequest {
  business: string;
  audience: string;
  product: string;
  tone: string;
}

export interface PersonaResult {
  idealCustomer: string;
  painPoints: string[];
  goals: string[];
  objections: string[];
  messagingAngles: string[];
  acquisitionChannels: string[];
}