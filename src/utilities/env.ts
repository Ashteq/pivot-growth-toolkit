// src/utilities/env.ts

export const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable missing: ${name}. Check your .env.local file.`);
  }
  return value;
};

export const ENV = {
  GEMINI_API_KEY: requireEnv('GEMINI_API_KEY'), 
};