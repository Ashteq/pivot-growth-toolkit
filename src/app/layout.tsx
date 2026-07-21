// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pivot | AI-Powered Growth Toolkit",
  description: "Internal experimentation tools for growth engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          {/* 
            The sidebar is fixed and 64 units wide (16rem). 
            We push the main content to the right by the same amount using pl-64.
          */}
          <main className="flex-1 pl-64 bg-white relative">
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}