# Pivot — AI-Powered Growth Toolkit

Pivot is a focused, production-grade MVP designed to accelerate marketing experiments. It provides three specialized tools for Growth teams to generate copy, analyze SEO surfaces, and map user personas—all powered by the Google Gemini API.

## Problem Statement
Growth engineering isn't about building complex infrastructure; it's about accelerating learning loops. Marketing teams often waste hours brainstorming headlines, manually auditing metadata, or struggling to document persona variations. Pivot solves this by embedding AI directly into specific, isolated marketing workflows to increase output velocity without sacrificing quality.

## Architecture

```mermaid
graph TD
    Client[Client UI - React Server/Client Components]
    RouteHandlers[Next.js Route Handlers /api/*]
    GeminiService[Gemini API Service Abstraction]
    LLM[Google Gemini API]
    
    Client -->|User Input| RouteHandlers
    RouteHandlers -->|Prompt Engineering| GeminiService
    GeminiService -->|REST| LLM
    LLM -->|JSON Stream| GeminiService
    GeminiService -->|Type-safe Response| RouteHandlers
    RouteHandlers -->|UI Update| Client