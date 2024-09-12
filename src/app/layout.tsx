import { Providers } from "@/providers";
import { inter } from "@/assets/fonts/inter";

import "../assets/styles/globals.css";
import "../assets/styles/prosemirror.css";

import type { Metadata } from "next";
import ThemeInit from "@/providers/theme";

export const metadata: Metadata = {
  title: {
    default: "Vocabulary App",
    template: "%s | Vocabulary App",
  },
  description: "A simple vocabulary app with AI-powered features.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInit />
      </head>
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
