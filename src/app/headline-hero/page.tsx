// src/app/headline-hero/page.tsx
"use client";

import { useState } from "react";
import { Copy, RefreshCw, Star } from "lucide-react";
import { generateHeadlinesAction } from "./actions";
import { Headline, HeadlineRequest, HeadlineCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES: HeadlineCategory[] = ["Curiosity", "Urgency", "Benefit", "Authority"];

export default function HeadlineHeroPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<HeadlineRequest>({
    topic: "",
    audience: "",
    goal: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHeadlines([]);
    
    try {
      const results = await generateHeadlinesAction(formData);
      setHeadlines(results);
    } catch (error) {
      console.error(error);
      alert("Failed to generate headlines. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    // In a full production app, you'd trigger a Toast component here
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  // Senior touch: A clean helper to avoid inline filtering messes in the JSX
  const getHeadlinesByCategory = (category: HeadlineCategory) => {
    return headlines.filter((h) => h.category === category);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Headline Hero</h1>
        <p className="text-gray-500">Generate high-converting marketing copy in seconds.</p>
      </div>

      {/* Input Section */}
      <Card className="mb-12">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <Input
              label="Topic or Product"
              id="topic"
              placeholder="e.g., AI scheduling tool"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
              disabled={isLoading}
            />
            <Input
              label="Target Audience"
              id="audience"
              placeholder="e.g., Busy founders"
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              required
              disabled={isLoading}
            />
            <Input
              label="Primary Goal"
              id="goal"
              placeholder="e.g., Start a free trial"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              required
              disabled={isLoading}
            />
            <div className="md:col-span-3 mt-2">
              <Button type="submit" isLoading={isLoading} className="w-full">
                {isLoading ? 'Generating 10 Headlines...' : 'Generate Headlines'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {headlines.length > 0 && (
        <div className="space-y-12">
          {CATEGORIES.map((category) => {
            const categoryHeadlines = getHeadlinesByCategory(category);
            
            if (categoryHeadlines.length === 0) return null;

            return (
              <div key={category} className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                  {category}
                </h2>
                <div className="grid gap-3">
                  {categoryHeadlines.map((headline) => (
                    <div 
                      key={headline.id} 
                      className="group flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                      <p className="text-gray-800 text-sm font-medium pr-4">
                        {headline.text}
                      </p>
                      
                      {/* Actions Toolbar - Visible on hover (Linear-style UX) */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600"
                          onClick={() => copyToClipboard(headline.text)}
                          title="Copy to clipboard"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-gray-400 hover:text-green-600"
                          title="Regenerate this specific idea"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${favorites.has(headline.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                          onClick={() => toggleFavorite(headline.id)}
                          title="Favorite"
                        >
                          <Star className="h-4 w-4" fill={favorites.has(headline.id) ? "currentColor" : "none"} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}