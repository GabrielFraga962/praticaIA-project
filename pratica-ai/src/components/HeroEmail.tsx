"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export const PREFILL_EVENT = "pratica:prefill-email";

/** E-mail do hero: leva o endereço para o formulário VIP, que pede o resto. */
export function HeroEmail() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: email.trim() }));
        document.getElementById("lista-vip")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="mx-auto flex w-full max-w-[520px] flex-col items-stretch gap-1.5 rounded-[22px] bg-white p-1.5 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.18),0_20px_50px_-20px_rgba(2,6,26,0.6)]"
    >
      <label className="flex min-w-0 flex-1 items-center gap-2.5 pl-4 text-[#566074]">
        <Mail className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
        <span className="sr-only">E-mail</span>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 min-w-0 sm:h-11 flex-1 bg-transparent text-[15px] text-[#0b1220] outline-none placeholder:text-[#8a93a6]"
        />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#2457ff] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1c48e0]"
      >
        Garantir acesso VIP
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
      </button>
    </form>
  );
}
