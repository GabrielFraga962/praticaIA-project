"use client";

import { useActionState, useEffect, useState } from "react";
import { ArrowRight, Check, Loader2, Lock, Mail } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/actions";
import { Button } from "@/components/motion/button/base";
import { Input } from "@/components/motion/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/motion/select";
import { PREFILL_EVENT } from "./HeroEmail";
import { lerOrigem } from "./VisitTracker";

const initialState: LeadFormState = { status: "idle" };

const PERFIS = [
  { value: "universitario", label: "Universitário" },
  { value: "concurseiro", label: "Concurseiro" },
  { value: "vestibulando", label: "Vestibulando / Ensino Médio" },
  { value: "autodidata", label: "Autodidata" },
];

const DISPOSICOES = [
  { value: "sim", label: "Sim, com certeza" },
  { value: "talvez", label: "Talvez, testaria a grátis primeiro" },
  { value: "nao", label: "Não" },
];

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="px-1 text-sm font-medium text-foreground">
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <p role="alert" className="min-h-4 px-1 text-xs text-destructive">
      {message}
    </p>
  );
}

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(
    (prevState: LeadFormState, formData: FormData) => {
      formData.set("origem", lerOrigem());
      return submitLead(prevState, formData);
    },
    initialState
  );
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState<string>();
  const [disposicao, setDisposicao] = useState<string>();
  const [openSelect, setOpenSelect] = useState<"perfil" | "disposicao" | null>(null);
  // O e-mail digitado no hero chega aqui, já preenchido.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (value) setEmail(value);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const errorFor = (field: NonNullable<LeadFormState["field"]>) =>
    state.status === "error" && state.field === field ? state.message : undefined;

  if (state.status === "success") {
    return (
      <div
        id="lead-form"
        className="rounded-[24px] bg-card p-8 text-card-foreground shadow-[0_30px_80px_rgba(2,6,26,0.4)] sm:p-9"
        role="status"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-[#2457ff] text-white">
          <Check className="size-5" strokeWidth={2} />
        </span>
        <h3 className="display mt-6 text-3xl">Você está na lista.</h3>
        <p className="mt-3 text-pretty text-muted-foreground">
          Guardamos{" "}
          <span className="font-medium text-foreground">{state.email}</span> na fila do teste beta.
          Você recebe o convite antes da abertura geral.
        </p>
      </div>
    );
  }

  return (
    <form
      id="lead-form"
      action={formAction}
      noValidate
      className="rounded-[24px] bg-card p-6 text-card-foreground shadow-[0_30px_80px_rgba(2,6,26,0.4)] sm:p-9"
    >
      <h3 className="display text-[26px] font-semibold tracking-[-0.02em]">Garanta seu acesso VIP</h3>

      <div className="mt-5 flex flex-col gap-1">
        <Input
          label="E-mail"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="voce@email.com"
          leftIcon={<Mail strokeWidth={1.75} />}
          value={email}
          onChange={setEmail}
          error={errorFor("email") ?? false}
          reserveErrorLine
          classNames={{ field: "rounded-xl bg-muted" }}
        />

        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="perfil-trigger">Perfil de estudo</FieldLabel>
          <div className={openSelect === "perfil" ? "relative z-30" : "relative"}>
            <Select
              value={perfil}
              onValueChange={setPerfil}
              open={openSelect === "perfil"}
              onOpenChange={(o) => setOpenSelect(o ? "perfil" : null)}
            >
              <SelectTrigger className="h-12 bg-muted">
                <SelectValue placeholder="Selecione seu perfil" />
              </SelectTrigger>
              <SelectContent>
                {PERFIS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="perfil" value={perfil ?? ""} />
          </div>
          <FieldError message={errorFor("perfil")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>
            Se a PráticaAI estivesse disponível hoje por R$ 29/mês, você assinaria?
          </FieldLabel>
          <div className={openSelect === "disposicao" ? "relative z-30" : "relative"}>
            <Select
              value={disposicao}
              onValueChange={setDisposicao}
              open={openSelect === "disposicao"}
              onOpenChange={(o) => setOpenSelect(o ? "disposicao" : null)}
            >
              <SelectTrigger className="h-12 bg-muted">
                <SelectValue placeholder="Selecione uma resposta" />
              </SelectTrigger>
              <SelectContent>
                {DISPOSICOES.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="disposicao_pagar" value={disposicao ?? ""} />
          </div>
          <FieldError message={errorFor("disposicao_pagar")} />
        </div>
      </div>

      {state.status === "error" && !state.field ? (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="mt-3 h-[54px] w-full rounded-xl bg-[#2457ff] text-white hover:bg-[#1c48e0]"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Enviando
          </>
        ) : (
          <>
            Quero garantir meu acesso VIP
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </>
        )}
      </Button>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="size-3" strokeWidth={2} aria-hidden />
        Sem spam. Só avisamos quando abrir sua vaga.
      </p>
    </form>
  );
}
