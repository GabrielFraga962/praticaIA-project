import type { Metadata } from "next";
import { Funnel_Display, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const display = Funnel_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
});

const body = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "PráticaAI — Estude com IA sem recriar o contexto toda vez",
  description:
    "A PráticaAI memoriza suas anotações, cadernos e materiais para criar um acervo único de estudos. Configure uma vez e gere sessões de exercícios com feedback instantâneo.",
};

// Roda antes da pintura: liga o estado inicial das animações só quando há JS
// e o usuário não pediu movimento reduzido.
const motionFlag = `document.documentElement.dataset.motion=matchMedia("(prefers-reduced-motion: no-preference)").matches?"on":"off"`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <Script id="motion-flag" strategy="beforeInteractive">
          {motionFlag}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
