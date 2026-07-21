// src/app/persona-builder/page.tsx
"use client";

import { useState } from "react";
import { Download, User, Target, MessageSquare, AlertTriangle, Zap } from "lucide-react";
import { generatePersonaAction } from "./actions";
import { PersonaRequest, PersonaResult } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PersonaBuilderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PersonaResult | null>(null);
  const [formData, setFormData] = useState<PersonaRequest>({
    business: "",
    audience: "",
    product: "",
    tone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const generatedPersona = await generatePersonaAction(formData);
      setResult(generatedPersona);
    } catch (error) {
      console.error(error);
      alert("Failed to generate persona. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const exportToMarkdown = () => {
    if (!result) return;

    const markdownContent = `
# Target Persona: ${formData.audience}
**Company:** ${formData.business} | **Product:** ${formData.product}

## Ideal Customer Profile
${result.idealCustomer}

## Core Pain Points
${result.painPoints.map(p => `- ${p}`).join('\n')}

## Primary Goals
${result.goals.map(g => `- ${g}`).join('\n')}

## Common Objections
${result.objections.map(o => `- ${o}`).join('\n')}

## Messaging Angles
${result.messagingAngles.map(m => `- ${m}`).join('\n')}

## Top Acquisition Channels
${result.acquisitionChannels.map(c => `- ${c}`).join('\n')}
    `.trim();

    // Browser-native file download
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.audience.replace(/\s+/g, '-').toLowerCase()}-persona.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Persona Builder</h1>
          <p className="text-gray-500 mt-2">Generate actionable customer profiles for growth experiments.</p>
        </div>
        {result && (
          <Button onClick={exportToMarkdown} variant="outline" className="hidden md:flex">
            <Download className="w-4 h-4 mr-2" />
            Export Markdown
          </Button>
        )}
      </div>

      <Card className="mb-12">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Business / Company Name"
              placeholder="e.g., Buffer"
              value={formData.business}
              onChange={(e) => setFormData({ ...formData, business: e.target.value })}
              required
              disabled={isLoading}
            />
            <Input
              label="Target Audience"
              placeholder="e.g., Freelance Social Media Managers"
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              required
              disabled={isLoading}
            />
            <Input
              label="Product or Feature"
              placeholder="e.g., New AI content scheduler"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              required
              disabled={isLoading}
            />
            <Input
              label="Brand Tone"
              placeholder="e.g., Helpful, approachable, transparent"
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              required
              disabled={isLoading}
            />
            <div className="md:col-span-2 mt-2">
              <Button type="submit" isLoading={isLoading} className="w-full">
                {isLoading ? 'Generating Persona...' : 'Build Persona'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Rendering */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
          
          {/* Mobile Export Button */}
          <Button onClick={exportToMarkdown} variant="outline" className="w-full md:hidden mb-6">
            <Download className="w-4 h-4 mr-2" /> Export Markdown
          </Button>

          <Card className="bg-gray-900 text-white border-0">
            <CardHeader className="pb-2">
              <h3 className="font-semibold text-gray-300 flex items-center">
                <User className="w-4 h-4 mr-2" /> Ideal Customer Profile
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{result.idealCustomer}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-500" /> Pain Points
                </h3>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {result.painPoints.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2 text-gray-300">•</span> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-green-500" /> Goals & Desires
                </h3>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {result.goals.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2 text-gray-300">•</span> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-blue-500" /> Messaging Angles
                </h3>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {result.messagingAngles.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2 text-gray-300">•</span> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-500" /> Acquisition Channels
                </h3>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {result.acquisitionChannels.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2 text-gray-300">•</span> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
        </div>
      )}
    </div>
  );
}