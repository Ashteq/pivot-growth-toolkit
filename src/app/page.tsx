// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Automatically route users to the first tool in the toolkit
  redirect("/headline-hero");
}