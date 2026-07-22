// src/app/metamorphosis/page.tsx
"use client";

import { useState } from "react";
import { analyzeMetadataAction } from "./actions";
import { MetaAuditResult } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Globe, Code, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

export default function MetaMorphosisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState<"url" | "html">("url");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<MetaAuditResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setResult(null);
    
    try {
      const auditData = await analyzeMetadataAction(inputValue, inputType);
      setResult(auditData);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to analyze data.";
      console.error(error);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">MetaMorphosis</h1>
        <p className="text-gray-500">Instant SEO & CTR audits for any landing page.</p>
      </div>

      <Card className="mb-12">
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-6">
            <Button
              type="button"
              variant={inputType === "url" ? "primary" : "ghost"}
              onClick={() => setInputType("url")}
              className="w-32"
            >
              <Globe className="w-4 h-4 mr-2" /> URL
            </Button>
            <Button
              type="button"
              variant={inputType === "html" ? "primary" : "ghost"}
              onClick={() => setInputType("html")}
              className="w-32"
            >
              <Code className="w-4 h-4 mr-2" /> HTML
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {inputType === "url" ? (
              <Input
                placeholder="https://buffer.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
            ) : (
              <textarea
                className="w-full h-32 rounded-md border border-gray-200 p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                placeholder="Paste <head> HTML here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
            )}
            <div className="flex justify-end">
              <Button type="submit" isLoading={isLoading}>
                {isLoading ? "Running Audit..." : "Analyze Page"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Dashboard */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
          
          {/* SEO Score Hero Card */}
          <Card className="md:col-span-1 bg-gray-900 text-white flex flex-col justify-center items-center py-10">
            <h3 className="text-gray-400 font-medium mb-2">Overall SEO Score</h3>
            <div className="text-7xl font-bold tracking-tighter">
              {result.seoScore}
            </div>
            <p className="text-sm mt-4 text-gray-400">Out of 100</p>
          </Card>

          {/* Details Column */}
          <div className="md:col-span-2 space-y-6">
            
            <Card>
              <CardHeader className="pb-3 border-b border-gray-100 flex flex-row items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-gray-900">Missing Metadata</h3>
              </CardHeader>
              <CardContent className="pt-4">
                {result.missingMetadata.length > 0 ? (
                  <ul className="space-y-2">
                    {result.missingMetadata.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2 mt-0.5 text-red-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-600 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> All critical tags present!
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 border-b border-gray-100 flex flex-row items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">CTR Suggestions</h3>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {result.ctrSuggestions.map((suggestion, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                    {suggestion}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Technical Improvements</h3>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600 marker:text-gray-400">
                  {result.improvements.map((improvement, i) => (
                    <li key={i}>{improvement}</li>
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
