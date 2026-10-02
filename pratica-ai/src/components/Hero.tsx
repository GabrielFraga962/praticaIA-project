import { Check } from "lucide-react";
import { HeroApp } from "./HeroApp";
import { HeroEmail } from "./HeroEmail";

const PERKS = ["Grátis no lançamento", "Sem cartão", "Vagas limitadas"];

export function Hero() {
  return (
    <section id="top" className="px-3 sm:px-6">
      <div
        className="relative overflow-hidden rounded-[28px] px-4 pt-16 text-white sm:rounded-[36px] sm:pt-22"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(80,120,255,0.28), transparent 70%), linear-gradient(180deg, #071033 0%, #0e2280 55%, #2457ff 100%)",
        }}
      >
        <div className="mx-auto max-w-[56rem] text-center">
          <p
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1 pl-1 pr-4 text-[13px] text-white/85"
            data-hero
          >
            <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#2457ff]">
              Beta
            </span>
            <span className="sm:hidden">Acesso antecipado</span>
            <span className="hidden sm:inline">Acesso antecipado para a lista VIP</span>
          </p>

          <h1
            className="display mt-8 text-[clamp(2.6rem,6.2vw,4.75rem)] leading-[1.02] tracking-[-0.032em]"
            data-hero-title
          >
            Sua IA de estudos que já sabe o que você estudou.
          </h1>

          <p
            className="mx-auto mt-6 max-w-[42rem] text-pretty text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-normal text-white/75"
            data-hero-lead
          >
            A PráticaAI memoriza suas anotações, cadernos e PDFs num acervo só seu. Configure uma vez
            e treine com exercícios e correções que citam o seu próprio material.
          </p>

          <div className="mt-8" data-hero>
            <HeroEmail />
            <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[13px] text-white/65">
              {PERKS.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5" strokeWidth={2} aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-[70rem]" data-hero-app>
          <HeroApp />
        </div>
      </div>
    </section>
  );
}
