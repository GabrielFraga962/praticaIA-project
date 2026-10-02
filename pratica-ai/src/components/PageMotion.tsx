"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

const EASE = "expo.out";
const motionOk = "(prefers-reduced-motion: no-preference)";

/**
 * Sistema de movimento da página, orquestrado em um só lugar.
 *  1. Títulos sobem linha a linha de dentro de uma máscara (SplitText).
 *  2. Hero: o app entra, a fonte citada acende e a janela acompanha o cursor.
 *  3. "Ciclo × Fluxo": ao entrar na tela, cada passo antigo esmaece enquanto o
 *     novo se acende e o check é desenhado (DrawSVG). Anima uma vez, no tempo,
 *     sem prender nem acompanhar a rolagem.
 *  4. Prévia, tabela e CTA entram uma vez, também no tempo.
 * Sem JS ou com movimento reduzido, tudo já está visível.
 */
/** Conta de 0 até o valor em data-t-count, preservando prefixo, sufixo e vírgula. */
function countUp(tl: gsap.core.Timeline, el: HTMLElement, at: number, duration = 1.4) {
  const end = Number(el.dataset.tCount);
  const dec = Number(el.dataset.tDecimals ?? 0);
  const fmt = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const n = { v: 0 };
  const paint = () => { el.textContent = `${el.dataset.tPrefix ?? ""}${fmt.format(n.v)}${el.dataset.tSuffix ?? ""}`; };
  paint();
  tl.to(n, { v: end, duration, ease: "power3.out", onUpdate: paint }, at);
}

/** Peças internas de um cartão de depoimento: estrelas, gráfico, conversa e números. */
function animateTestimonialCard(tl: gsap.core.Timeline, card: HTMLElement, at: number) {
  const q = gsap.utils.selector(card);
  tl.from(q("[data-t-stars] svg"), { scale: 0, rotate: -72, duration: 0.6, stagger: 0.06, ease: "back.out(3)" }, at + 0.25)
    .from(q("[data-t-quote-icon]"), { scale: 0, rotate: -160, duration: 0.9, ease: "back.out(2.2)" }, at + 0.2)
    .from(q("[data-t-bars] > span"), {
      scaleY: 0,
      transformOrigin: "50% 100%",
      duration: 0.9,
      stagger: 0.07,
      ease: "power4.out",
    }, at + 0.35)
    .from(q("[data-t-bars] > span:last-child"), { filter: "brightness(2.2)", duration: 1.2, ease: "power2.out" }, at + 1)
    .from(q("[data-t-bubble='user']"), { opacity: 0, x: 24, scale: 0.9, transformOrigin: "100% 100%", duration: 0.7, ease: "back.out(1.8)" }, at + 0.3)
    .from(q("[data-t-bubble='ai']"), { opacity: 0, x: -16, scale: 0.92, transformOrigin: "0% 100%", duration: 0.8, ease: "back.out(1.6)" }, at + 0.85)
    .from(q("blockquote"), { opacity: 0, y: 14, filter: "blur(6px)", duration: 0.9 }, at + 0.3)
    .from(q("figcaption"), { opacity: 0, y: 10, duration: 0.8 }, at + 0.5);
  q<HTMLElement>("[data-t-count]").forEach((el) => countUp(tl, el, at + 0.4));
}

export function PageMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ——— Tudo que vale com movimento permitido ———
    mm.add(motionOk, () => {
      // Hero.
      const title = document.querySelector<HTMLElement>("[data-hero-title]");
      const app = document.querySelector<HTMLElement>("[data-hero-app]");
      const source = document.querySelector<HTMLElement>("[data-source-card]");
      const intro = gsap.timeline({ defaults: { ease: EASE } });

      if (title) {
        SplitText.create(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(title, { visibility: "visible" });
            return gsap.from(self.lines, { yPercent: 115, duration: 1.1, stagger: 0.09, ease: EASE });
          },
        });
      }
      gsap.utils
        .toArray<HTMLElement>("[data-hero]")
        .filter((el) => el !== app)
        .forEach((el, i) => intro.to(el, { opacity: 1, y: 0, duration: 0.9 }, 0.35 + i * 0.12));
      // Subtítulo do hero: palavra a palavra, saindo do desfoque.
      const lead = document.querySelector<HTMLElement>("[data-hero-lead]");
      if (lead) {
        SplitText.create(lead, {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            gsap.set(lead, { visibility: "visible" });
            return gsap.fromTo(
              self.words,
              { opacity: 0, filter: "blur(10px)", y: 6 },
              { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8, stagger: 0.025, ease: "power2.out", delay: 0.45 },
            );
          },
        });
      }
      if (app) intro.fromTo(app, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.3 }, 0.5);
      if (source) {
        intro.fromTo(
          source,
          { opacity: 0, y: 14, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, immediateRender: true },
          1.15,
        );
      }

      // Títulos de seção: linha a linha, saindo de uma máscara.
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1,
              stagger: 0.08,
              ease: EASE,
              scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
            });
          },
        });
      });

      // Parágrafos de apoio: linha a linha, logo depois do título.
      gsap.utils.toArray<HTMLElement>("[data-split-text]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 0.9,
              delay: 0.25,
              stagger: 0.07,
              ease: EASE,
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            });
          },
        });
      });

      // Revelações simples ao rolar.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: EASE,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      // Recursos: cada cartão entra e monta suas peças em sequência.
      const features = document.querySelector<HTMLElement>("[data-features]");
      if (features) {
        const q = gsap.utils.selector(features);
        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: features, start: "top 82%", toggleActions: "play none none none" },
        });
        tl.from(q("[data-feature-card]"), { opacity: 0, y: 48, duration: 1.1, stagger: 0.14 }, 0)
          // Acervo: os materiais caem e se empilham, cada um somando trechos.
          .from(q("[data-stack-item]"), { opacity: 0, y: -36, scale: 0.92, duration: 0.9, stagger: 0.16 }, 0.35)
          .from(q("[data-stack-gain]"), { opacity: 0, x: 10, duration: 0.6, stagger: 0.16 }, 0.65)
          .from(q("[data-stack-total]"), { opacity: 0, y: 12, scale: 0.9, duration: 0.8 }, 0.95);
        const count = q("[data-count]")[0];
        if (count) {
          const total = Number(count.dataset.count);
          const fmt = new Intl.NumberFormat("pt-BR");
          const n = { v: 0 };
          tl.to(n, {
            v: total,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => { count.textContent = fmt.format(Math.round(n.v)); },
          }, 0.95);
        }
        // Configuração: os chips acendem um a um.
        tl.from(q("[data-chip]"), { opacity: 0, y: 10, scale: 0.88, duration: 0.7, stagger: 0.08, ease: "back.out(1.6)" }, 0.5)
          // Correção: a citação se desenrola a partir da borda.
          .fromTo(q("[data-quote]"), { clipPath: "inset(0% 100% 0% 0% round 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 12px)", duration: 1 }, 0.75)
          .from(q("[data-quote-icon]"), { opacity: 0, scale: 0.5, rotate: -20, duration: 0.6, ease: "back.out(2)" }, 1)
          .from(q("[data-feature-text]"), { opacity: 0, y: 16, duration: 0.8, stagger: 0.06 }, 0.55);
      }

      // Prévia: o palco sobe e assenta ao entrar; os cartões das abas vêm em sequência.
      const stage = document.querySelector<HTMLElement>("[data-window]");
      if (stage) {
        gsap.from(stage, {
          y: 56,
          opacity: 0,
          scale: 0.975,
          transformOrigin: "50% 0%",
          duration: 1.2,
          ease: EASE,
          scrollTrigger: { trigger: stage, start: "top 88%", toggleActions: "play none none none" },
        });
      }
      const cards = gsap.utils.toArray<HTMLElement>("[data-tab-card]");
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: { trigger: cards[0], start: "top 95%", toggleActions: "play none none none" },
        });
      }

      // Tabela: linhas em sequência e ícones desenhados.
      const rows = gsap.utils.toArray<HTMLElement>("#comparativo tbody tr");
      if (rows.length) {
        const table = "#comparativo table";
        gsap.from(rows, {
          opacity: 0,
          y: 12,
          duration: 0.7,
          stagger: 0.08,
          ease: EASE,
          scrollTrigger: { trigger: table, start: "top 80%", toggleActions: "play none none none" },
        });
        gsap.from("#comparativo tbody svg path", {
          drawSVG: "0%",
          duration: 0.6,
          stagger: 0.035,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: { trigger: table, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      // CTA final: o painel se abre até a largura toda ao entrar.
      // Textos de apoio: sobem linha a linha, saindo de uma máscara.
      gsap.utils.toArray<HTMLElement>("[data-lead]").forEach((lead) => {
        SplitText.create(lead, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(lead, { opacity: 1 });
            return gsap.from(self.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: EASE,
              scrollTrigger: { trigger: lead, start: "top 88%", toggleActions: "play none none none" },
            });
          },
        });
      });

      // Lista VIP: os benefícios entram em cascata, cada selo "carimbando" o check.
      const perks = document.querySelector<HTMLElement>("[data-vip-perks]");
      if (perks) {
        const q = gsap.utils.selector(perks);
        gsap
          .timeline({ defaults: { ease: EASE }, scrollTrigger: { trigger: perks, start: "top 90%", toggleActions: "play none none none" } })
          .to(q("[data-perk]"), { opacity: 1, x: 0, duration: 0.8, stagger: 0.12 }, 0.15)
          .from(q("[data-perk-badge]"), { scale: 0.4, duration: 0.6, stagger: 0.12, ease: "back.out(2.4)" }, 0.2)
          .from(q("[data-perk-check]"), { scale: 0, rotate: -45, duration: 0.45, stagger: 0.12, ease: "back.out(3)" }, 0.35);
      }

      const panel = document.querySelector<HTMLElement>("[data-cta-panel]");
      if (panel) {
        gsap.fromTo(
          panel,
          { clipPath: "inset(8% 4% round 40px)", opacity: 0.4 },
          {
            clipPath: "inset(0% 0% round 32px)",
            opacity: 1,
            duration: 1.3,
            ease: EASE,
            scrollTrigger: { trigger: panel, start: "top 90%", toggleActions: "play none none none" },
          },
        );
      }


      // Depoimentos: a nota sobe contando e as estrelas giram até o lugar.
      const rating = document.querySelector<HTMLElement>("[data-testimonials] [data-t-count='4.9']");
      if (rating) {
        const tl = gsap.timeline({ defaults: { ease: EASE }, scrollTrigger: { trigger: rating, start: "top 88%", toggleActions: "play none none none" } });
        tl.from(rating, { opacity: 0, y: 24, duration: 0.9 }, 0);
        countUp(tl, rating, 0.1, 1.6);
        animateTestimonialCard(tl, rating.parentElement!, -0.1);
      }

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    // ——— Ciclo × Fluxo, desktop: cada par anima uma vez quando entra, sem prender a rolagem ———
    // ——— Mobile: o header se recolhe ao descer e volta ao subir ———
    mm.add(`${motionOk} and (max-width: 767px)`, () => {
      const header = document.querySelector<HTMLElement>("[data-header]");
      if (!header) return;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 160;
          gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.45, ease: "power3.out", overwrite: true });
        },
      });
      // Ao sair do mobile (ex.: girar o tablet), garante o header de volta no lugar.
      return () => {
        gsap.killTweensOf(header);
        gsap.set(header, { clearProps: "transform" });
      };
    });

    mm.add(`${motionOk} and (min-width: 1024px)`, () => {
      const befores = gsap.utils.toArray<HTMLElement>("[data-before]");
      const afters = gsap.utils.toArray<HTMLElement>("[data-after]");
      if (!befores.length || befores.length !== afters.length) return;

      const checks = afters.map((a) => a.querySelector<SVGPathElement>("[data-check] path, svg[data-check] path"));
      gsap.set(afters, { opacity: 0.15, x: 20 });
      gsap.set(checks.filter(Boolean), { drawSVG: "0%" });

      befores.forEach((b, i) => {
        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: b, start: "top 82%", toggleActions: "play none none none" },
        });
        tl.to(afters[i], { opacity: 1, x: 0, duration: 1.1 }, 0)
          .to(b, { opacity: 0.75, x: -6, duration: 1 }, 0.15);
        if (checks[i]) tl.to(checks[i], { drawSVG: "100%", duration: 0.7, ease: "power2.out" }, 0.35);
      });
    });

    // ——— Ciclo × Fluxo, telas pequenas: sem fixar, só revelar ———
    mm.add(`${motionOk} and (max-width: 1023px)`, () => {
      gsap.utils.toArray<HTMLElement>("[data-before], [data-after]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 16,
          duration: 0.8,
          ease: EASE,
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
        });
      });
    });

    // ——— Depoimentos, desktop: o mural se monta em leque e as colunas flutuam em ritmos diferentes ———
    mm.add(`${motionOk} and (min-width: 1024px)`, () => {
      const wall = document.querySelector<HTMLElement>("[data-t-wall]");
      if (!wall) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-t-card]", wall);
      // Nada de `once` neste arquivo: um trigger que já nasce disparado se mata enquanto o próximo ScrollTrigger é criado e o GSAP quebra lendo `.end`.
      const tl = gsap.timeline({ defaults: { ease: EASE }, scrollTrigger: { trigger: wall, start: "top 80%", toggleActions: "play none none none" } });
      cards.forEach((card, i) => {
        const at = i * 0.14;
        tl.fromTo(
          card,
          { opacity: 0, y: 90, rotate: i % 2 ? 2.5 : -2.5, scale: 0.94, clipPath: "inset(12% 6% 0% 6% round 24px)" },
          { opacity: 1, y: 0, rotate: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.3 },
          at,
        );
        animateTestimonialCard(tl, card, at);
      });
      // Parallax suave: cada coluna desliza num ritmo próprio enquanto a seção passa.
      [["[data-t-col='2']", -40], ["[data-t-col='3']", -80]].forEach(([sel, y]) => {
        const col = wall.querySelector(sel as string);
        if (col) gsap.fromTo(col, { y: 0 }, { y, ease: "none", scrollTrigger: { trigger: wall, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      });
    });

    // ——— Depoimentos, telas menores: cartões empilham e o carrossel desliza para dentro ———
    mm.add(`${motionOk} and (max-width: 1023px)`, () => {
      const stack = document.querySelector<HTMLElement>("[data-t-stack]");
      if (!stack) return;
      const rail = stack.querySelector<HTMLElement>("[data-t-rail]");
      gsap.utils.toArray<HTMLElement>("[data-t-card]", stack).forEach((card) => {
        const inRail = rail?.contains(card);
        if (inRail) return;
        const tl = gsap.timeline({ defaults: { ease: EASE }, scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" } });
        tl.from(card, { opacity: 0, y: 60, scale: 0.95, duration: 1.1 }, 0);
        animateTestimonialCard(tl, card, 0);
      });
      if (rail) {
        const railCards = gsap.utils.toArray<HTMLElement>("[data-t-card]", rail);
        const tl = gsap.timeline({ defaults: { ease: EASE }, scrollTrigger: { trigger: rail, start: "top 88%", toggleActions: "play none none none" } });
        tl.from(railCards, { opacity: 0, x: 120, rotate: 3, duration: 1.1, stagger: 0.12 }, 0);
        railCards.forEach((c, i) => animateTestimonialCard(tl, c, i * 0.12));
        // A seta do "arraste" dá uma cutucada para convidar o gesto.
        tl.to("[data-t-arrow]", { x: 5, duration: 0.45, repeat: 3, yoyo: true, ease: "sine.inOut" }, 0.9);
      }
    });

    // ——— Cursor: a janela do hero inclina de leve ———
    mm.add(`${motionOk} and (hover: hover) and (pointer: fine)`, () => {
      const win = document.querySelector<HTMLElement>("[data-hero-window]");
      const area = document.querySelector<HTMLElement>("#top");
      if (!win || !area) return;
      gsap.set(win, { transformPerspective: 1100 });
      const rx = gsap.quickTo(win, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(win, "rotationY", { duration: 0.6, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = area.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        ry(nx * 5);
        rx(-ny * 4);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      area.addEventListener("pointermove", move);
      area.addEventListener("pointerleave", leave);
      return () => {
        area.removeEventListener("pointermove", move);
        area.removeEventListener("pointerleave", leave);
      };
    });

    return () => mm.revert();
  });

  return null;
}
