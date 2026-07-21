// src/components/ui/skeleton.tsx
import React from "react";

export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200/60 ${className}`}
      {...props}
    />
  );
}