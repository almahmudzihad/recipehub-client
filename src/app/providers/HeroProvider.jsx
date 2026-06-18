"use client";

import { HeroUIProvider } from "@heroui/react";

export default function HeroProvider({ children }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}