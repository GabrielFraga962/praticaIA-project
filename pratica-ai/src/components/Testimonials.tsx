import { ArrowRight, Quote, Sparkles, Star } from "lucide-react";

const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=faces&fit=crop&w=96&h=96&q=80`;

type Person = { name: string; role: string; photo: string };

const MARIANA: Person = { name: "Mariana Couto", role: "Estuda para o TJ-SP há 1 ano", photo: avatar("1635085817993-a440600d7118") };
const RAFAEL: Person = { name: "Rafael Nunes", role: "OAB · 2ª fase Administrativo", photo: avatar("1603346133925-f81519e36f7c") };
const JULIA: Person = { name: "Júlia Prado", role: "Medicina · Residência USP", photo: avatar("1593636677199-11450abb6e7b") };
const THIAGO: Person = { name: "Thiago Alves", role: "Concurso · Receita Federal", photo: avatar("1658931382461-050f1a083414") };
const BEATRIZ: Person = { name: "Beatriz Lima", role: "Vestibulanda · 3º ano", photo: avatar("1710605304960-e46e52ef281f") };

// Acertos semanais (% da altura do gráfico); a última barra é a semana atual.
const BARS = [36, 42, 39, 52, 60, 68, 79, 92];

function Author({ person, dark = false }: { person: Person; dark?: boolean }) {
  return (
    <figcaption className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={person.photo} alt="" width={40} height={40} loading="lazy" className="size-10 rounded-full object-cover" />
      <span className="flex flex-col gap-0.5">
        <span className={`text-[15px] font-semibold ${dark ? "text-white" : "text-foreground"}`}>{person.name}</span>
        <span className={`text-[13px] ${dark ? "text-white/65" : "text-muted-foreground"}`}>{person.role}</span>
      </span>
    </figcaption>
  );
}

function Stars({ size = "size-3.5" }: { size?: string }) {
  return (
    <span data-t-stars className="flex gap-0.5 text-[#2457ff] dark:text-accent" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${size} fill-current`} strokeWidth={0} aria-hidden />
      ))}
    </span>
  );
}

const quoteText = "text-[17px] leading-[1.45] font-medium text-foreground";
const lightCard = "flex flex-col justify-between gap-5 rounded-3xl bg-muted p-6 sm:p-7";

function Highlight() {
  return (
    <figure data-t-card className="flex h-full min-w-0 flex-col justify-between gap-6 rounded-3xl bg-[#0a0e17] p-6 ring-1 ring-white/5 sm:gap-7 sm:p-9">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/85">Concurso · TJ-SP</span>
        <Quote data-t-quote-icon className="size-7 fill-[#2457ff] text-[#2457ff]" strokeWidth={0} aria-hidden />
      </div>
      <blockquote className="display text-[22px] leading-[1.18] font-medium tracking-[-0.02em] text-white sm:text-[28px]">
        Eu passava 20 minutos explicando meu edital pro chatbot antes de cada sessão. Agora eu só abro e estudo.
      </blockquote>
      <div className="flex flex-col gap-3.5 rounded-2xl border border-white/8 bg-white/4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white/65">Acertos em Dir. Administrativo</span>
          <span className="display text-xl font-semibold text-[#7fa0ff]" data-t-count="41" data-t-prefix="+" data-t-suffix="%">+41%</span>
        </div>
        <div data-t-bars className="flex h-20 items-end gap-1.5 sm:h-24 sm:gap-2" aria-hidden>
          {BARS.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-t-md rounded-b-[2px] ${i === BARS.length - 1 ? "bg-[#2457ff]" : "bg-white/14"}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/45">Semana 1</span>
          <span className="text-white/65">Semana 8</span>
        </div>
      </div>
      <Author person={MARIANA} dark />
    </figure>
  );
}

function Conversation() {
  return (
    <figure data-t-card className="flex flex-col gap-5 rounded-3xl bg-muted p-6 sm:p-7">
      <p className="text-[11px] font-bold tracking-[0.11em] text-muted-foreground">O MOMENTO EM QUE CAIU A FICHA</p>
      <div className="flex flex-col gap-2" aria-hidden>
        <div data-t-bubble="user" className="flex justify-end">
          <span className="rounded-[18px] rounded-br-[4px] bg-[#0b1220] px-3.5 py-2.5 text-sm text-white dark:bg-[#2457ff]">
            Me passa 10 questões de licitação
          </span>
        </div>
        <div data-t-bubble="ai" className="flex items-end gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2457ff]">
            <Sparkles className="size-3.5 text-white" aria-hidden />
          </span>
          <span className="flex-1 rounded-[18px] rounded-bl-[4px] border border-border bg-background px-3.5 py-2.5 text-sm leading-[1.4] text-foreground">
            Vou focar em dispensa e inexigibilidade — você errou 4 de 5 delas na semana passada.
          </span>
        </div>
      </div>
      <blockquote className={quoteText}>
        “Ela lembrou de um erro meu de três semanas atrás. Nem meu cursinho fazia isso.”
      </blockquote>
      <Author person={RAFAEL} />
    </figure>
  );
}

function Short({ className = "" }: { className?: string }) {
  return (
    <figure data-t-card className={`${lightCard} ${className}`}>
      <Stars />
      <blockquote className={quoteText}>
        “Subi meus PDFs uma vez só. Todo exercício novo já vem com a página de onde tirou a resposta.”
      </blockquote>
      <Author person={JULIA} />
    </figure>
  );
}

function NumberCard({ className = "" }: { className?: string }) {
  return (
    <figure data-t-card className={`flex flex-col justify-between gap-4 rounded-3xl bg-stage p-6 sm:p-7 ${className}`}>
      <p className="display text-[72px] leading-none font-semibold tracking-[-0.035em] text-white" data-t-count="12" data-t-suffix="h">12h</p>
      <blockquote className="text-base leading-[1.45] text-white/85">
        por semana que eu gastava reescrevendo prompts e hoje viraram prática de verdade.
      </blockquote>
      <hr className="border-white/20" />
      <Author person={THIAGO} dark />
    </figure>
  );
}

function Long({ className = "" }: { className?: string }) {
  return (
    <figure data-t-card className={`${lightCard} ${className}`}>
      <span className="self-start rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">ENEM 2026</span>
      <blockquote className={quoteText}>
        “Eu achava que IA pra estudo era só pedir resumo. A diferença é que aqui ela sabe o que eu já sei — e insiste
        exatamente no que eu ainda não sei.”
      </blockquote>
      <Author person={BEATRIZ} />
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="depoimentos" data-testimonials className="mx-auto max-w-[90rem] px-5 py-18 sm:px-8 sm:py-28 lg:px-[7.5rem] lg:py-36">
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-[47.5rem] flex-col gap-3.5 lg:gap-4">
          <p className="text-[13px] font-bold tracking-[0.11em] text-accent">DEPOIMENTOS</p>
          <h2 className="display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.04] tracking-[-0.025em]" data-split>
            Quem estuda com memória não volta pro zero.
          </h2>
        </div>
        <div className="flex items-center gap-3 pt-1.5 lg:gap-4 lg:pt-0">
          <span className="display text-[44px] leading-none font-semibold tracking-[-0.03em] lg:text-[64px]" data-t-count="4.9" data-t-decimals="1">4,9</span>
          <span className="flex flex-col gap-1 lg:gap-1.5">
            <Stars size="size-3.5 lg:size-4" />
            <span className="text-[13px] leading-[1.4] text-muted-foreground lg:max-w-[11.25rem]">
              média de 312 avaliações no beta fechado
            </span>
          </span>
        </div>
      </div>

      {/* Desktop: mural em três colunas. */}
      <div className="mt-16 hidden gap-5 lg:grid lg:grid-cols-[minmax(0,26fr)_minmax(0,21fr)_minmax(0,21fr)]" data-t-wall>
        <Highlight />
        <div data-t-col="2" className="flex flex-col gap-5 pt-14">
          <Conversation />
          <Short className="flex-1" />
        </div>
        <div data-t-col="3" className="flex flex-col gap-5">
          <NumberCard />
          <Long className="flex-1" />
        </div>
      </div>

      {/* Mobile/tablet: destaques empilhados e um carrossel arrastável. */}
      <div data-t-stack className="mt-7 flex flex-col gap-7 lg:hidden">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-5">
          <Highlight />
          <Conversation />
        </div>
        <div>
          <div data-t-rail className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 sm:scroll-px-8 [&::-webkit-scrollbar]:hidden">
            <NumberCard className="w-[290px] shrink-0 snap-start" />
            <Short className="w-[290px] shrink-0 snap-start" />
            <Long className="w-[290px] shrink-0 snap-start" />
          </div>
          <p data-t-hint className="mt-4 flex items-center justify-end gap-1.5 text-[13px] text-muted-foreground">
            Arraste para ver mais <ArrowRight data-t-arrow className="size-3.5" aria-hidden />
          </p>
        </div>
      </div>

      <p className="mt-7 text-xs leading-[1.4] text-muted-foreground sm:text-[13px] lg:mt-16">
        Depoimentos reais do beta fechado. Nomes publicados com autorização.
      </p>
    </section>
  );
}
