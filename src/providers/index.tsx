"use client";

import { JotaiProvider } from "@/providers/jotai";
import { FramerProvider } from "@/providers/framer-motion";
import { CookiesProvider } from "react-cookie";

export const Providers = (props: { children: React.ReactNode }) => {
  return (
    <CookiesProvider>
      <JotaiProvider>
        <FramerProvider>{props.children}</FramerProvider>
      </JotaiProvider>
    </CookiesProvider>
  );
};
