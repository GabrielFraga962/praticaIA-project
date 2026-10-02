import {
  CircleCheck,
  FileImage,
  FileText,
  Layers,
  Library,
  ListChecks,
  Quote,
  SlidersHorizontal,
  Sparkles,
  StickyNote,
  Workflow,
} from "lucide-react";

const NAV = [
  { icon: Library, label: "Acervo", active: true },
  { icon: Workflow, label: "Sessões" },
  { icon: ListChecks, label: "Correções" },
  { icon: SlidersHorizontal, label: "Configuração" },
];

const FILES = [
  { icon: FileText, title: "Resumo — Controle de constitucionalidade.pdf", meta: "PDF · 24 pág.", when: "há 2 dias" },
  { icon: FileImage, title: "Caderno — Direitos fundamentais (foto)", meta: "Imagem · OCR", when: "ontem" },
  { icon: StickyNote, title: "Anotações da aula 12", meta: "Nota · 3 min", when: "hoje" },
];

/** Arte do app no hero: o acervo e uma correção que cita o próprio material. */
export function HeroApp() {
  return (
    <div
      className="rounded-t-[24px] border border-b-0 border-white/15 bg-white/[0.12] p-2.5 pb-0 backdrop-blur-sm"
      role="img"
      aria-label="Prévia do app: o acervo de materiais do estudante e a correção de uma questão citando a fonte"
    >
      <div
        data-hero-window
        className="overflow-hidden rounded-t-[16px] bg-white text-left text-[#0b1220]"
      >
        <div className="flex h-9 items-center gap-2 border-b border-[#e3e7ee] px-4">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>

        <div className="grid grid-cols-1 overflow-hidden sm:h-[290px] md:grid-cols-[1fr_1.6fr] lg:grid-cols-[220px_1fr_340px]">
          <aside className="hidden flex-col gap-1 bg-[#f3f5f9] px-3 py-5 lg:flex">
            <p className="px-2 pb-1 text-[10.5px] font-semibold tracking-[0.12em] text-[#566074]">
              ESTUDOS
            </p>
            {NAV.map(({ icon: Icon, label, active }) => (
              <span
                key={label}
                className={`flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] ${
                  active ? "border border-[#e3e7ee] bg-white font-medium" : "text-[#566074]"
                }`}
              >
                <Icon className={`size-4 ${active ? "text-[#2457ff]" : ""}`} strokeWidth={1.75} />
                {label}
              </span>
            ))}
          </aside>

          <div className="px-4 py-5 sm:px-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs text-[#566074]">OAB · 1ª fase · Direito Constitucional</p>
                <p className="display mt-1 text-[22px] font-semibold sm:text-[26px]">Seu acervo</p>
              </div>
              <span className="tabular inline-flex items-center gap-2 rounded-full bg-[#2457ff]/[0.08] px-3 py-1.5 text-xs font-medium text-[#2457ff]">
                <Layers className="size-3.5" strokeWidth={2} />
                128 materiais · 2.340 trechos
              </span>
            </div>
            <ul className="mt-4 divide-y divide-[#e3e7ee] rounded-xl border border-[#e3e7ee]">
              {FILES.map(({ icon: Icon, title, meta, when }) => (
                <li key={title} className="flex items-center gap-3.5 px-4 py-3.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f3f5f9]">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 block text-[13px] font-medium sm:truncate">{title}</span>
                    <span className="block text-[11px] text-[#566074]">{meta}</span>
                  </span>
                  <span className="shrink-0 text-[11px] text-[#566074]">{when}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden border-l border-[#e3e7ee] px-5 py-5 md:block">
            <p className="flex items-center gap-2 text-[13px] font-semibold">
              <Sparkles className="size-4 text-[#2457ff]" strokeWidth={1.75} />
              Correção da questão 7
            </p>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-[#f3f5f9] px-3.5 py-2.5 text-xs">
              <span className="text-[#566074]">Sua resposta</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#b45309]">
                <CircleCheck className="size-3.5" strokeWidth={2} />
                Parcialmente correta
              </span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed">
              Você acertou o conceito de controle difuso, mas faltou citar o efeito inter partes da
              decisão — está no seu resumo.
            </p>
            <div
              className="mt-3 rounded-lg border-l-2 border-[#2457ff] bg-[#2457ff]/[0.07] px-3 py-2.5"
              data-source-card
            >
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2457ff]">
                <Quote className="size-3" strokeWidth={2} />
                Fonte: Resumo — Controle…, pág. 7
              </p>
              <p className="mt-1 text-[11.5px] leading-snug text-[#0b1220]/80">
                “No controle difuso, a decisão produz efeitos apenas entre as partes do processo…”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
