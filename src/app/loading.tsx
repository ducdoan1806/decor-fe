// app/loading.tsx
"use client";

import React, { JSX } from "react";

export default function Loading(): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-700 border-t-transparent" />
    </div>
  );
}
