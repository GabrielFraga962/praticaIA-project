"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/motion/button/base";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { Logomark } from "./Logomark";

const NAV = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#recursos", label: "Recursos" },
  { href: "#comparativo", label: "Comparativo" },
];

// Linha (em px a partir do topo) onde a pílula fica; se uma seção marcada
// com data-nav-tone="dark" cruza essa linha, a pílula assume o tom escuro.
const PROBE_Y = 48;

function useNavState() {
  const [tone, setTone] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const over = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-tone='dark']")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= PROBE_Y && r.bottom >= PROBE_Y;
      });
      setTone(over ? "dark" : "light");
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { tone, scrolled };
}

export function Header() {
  const { tone, scrolled } = useNavState();

  return (
    <header
      data-header
      data-tone={tone}
      data-scrolled={scrolled}
      className="group pointer-events-none sticky top-0 z-50 h-20 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[scrolled=true]:px-3 data-[scrolled=true]:pt-3 sm:data-[scrolled=true]:px-5 sm:data-[scrolled=true]:pt-5"
    >
      <div
        className={[
          "pointer-events-auto mx-auto flex w-full items-center justify-between gap-4 border backdrop-blur-xl md:gap-10",
          "transition-[max-width,height,padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // Topo: barra de largura total, sem moldura.
          "h-20 max-w-[90rem] rounded-none border-transparent bg-background/85 px-5 sm:px-8 lg:px-12",
          // Rolada: pílula flutuante.
          "group-data-[scrolled=true]:h-14 group-data-[scrolled=true]:max-w-[50rem] group-data-[scrolled=true]:rounded-[28px] group-data-[scrolled=true]:pr-2 group-data-[scrolled=true]:pl-4 sm:group-data-[scrolled=true]:pl-5",
          "group-data-[scrolled=true]:border-white/60 group-data-[scrolled=true]:bg-white/72 group-data-[scrolled=true]:shadow-[0_1px_2px_rgb(11_18_32/0.04),0_8px_24px_rgb(11_18_32/0.08)]",
          "dark:group-data-[scrolled=true]:border-white/12 dark:group-data-[scrolled=true]:bg-[#0a0e17]/60 dark:group-data-[scrolled=true]:shadow-[0_8px_24px_rgb(0_0_0/0.3)]",
          "group-data-[tone=dark]:group-data-[scrolled=true]:border-white/12 group-data-[tone=dark]:group-data-[scrolled=true]:bg-[#0a0e17]/20 group-data-[tone=dark]:group-data-[scrolled=true]:shadow-none",
        ].join(" ")}
      >
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="PráticaAI, início">
          <Logomark />
          <span className="display text-lg font-semibold tracking-[-0.02em] transition-colors group-data-[tone=dark]:text-white">
            PráticaAI
          </span>
        </a>

        <nav aria-label="Seções" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground group-data-[tone=dark]:text-white/70 group-data-[tone=dark]:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle
            variant="circle-blur"
            start="top-right"
            aria-label="Alternar tema claro e escuro"
            className="size-9 rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground group-data-[tone=dark]:text-white/70 group-data-[tone=dark]:hover:bg-white/10 group-data-[tone=dark]:hover:text-white"
            iconClassName="size-4"
          />
          <ButtonLink
            href="#lista-vip"
            size="md"
            className="h-10 rounded-full px-4 text-sm transition-colors group-data-[tone=dark]:bg-white group-data-[tone=dark]:text-[#0b1220]"
          >
            <span className="whitespace-nowrap">
              <span className="hidden sm:inline">Entrar na </span>
              <span className="sm:hidden">Lista VIP</span>
              <span className="hidden sm:inline">lista VIP</span>
            </span>
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
