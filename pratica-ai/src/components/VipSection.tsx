import { Check } from "lucide-react";
import { LeadForm } from "./LeadForm";

const PERKS = [
  "Acesso antes da abertura pública",
  "Ajude a moldar o produto com seu feedback",
  "Seu acervo pronto desde o primeiro dia",
];

export function VipSection() {
  return (
    <section id="lista-vip" className="px-3 sm:px-6">
      <div
        className="grid gap-12 overflow-hidden rounded-[28px] px-5 py-20 text-white sm:rounded-[36px] sm:px-12 sm:py-28 lg:grid-cols-[minmax(0,36rem)_31.25rem] lg:items-center lg:justify-center lg:gap-16 xl:gap-24 lg:px-24 lg:py-28"
        style={{ background: "linear-gradient(45deg, #2457ff 0%, #0e2280 40%, #071033 100%)" }}
        data-cta-panel
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-white/60">LISTA VIP</p>
          <h2
            className="display mt-5 max-w-[36rem] text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.03]"
            data-split
          >
            Seja dos primeiros a estudar com memória.
          </h2>
          <p className="mt-6 max-w-[30rem] text-pretty text-lg leading-[1.55] text-white/70" data-lead>
            Entre na lista e garanta acesso antecipado à PráticaAI.
          </p>
          <ul className="mt-9 flex flex-col gap-3.5" data-vip-perks>
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px]" data-perk>
                <span className="flex size-6 items-center justify-center rounded-full bg-white/15" data-perk-badge>
                  <Check className="size-3.5" strokeWidth={2.5} aria-hidden data-perk-check />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
