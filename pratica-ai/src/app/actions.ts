"use server";

import { supabase } from "@/lib/supabase";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  field?: "email" | "perfil" | "disposicao_pagar";
  email?: string;
};

const PERFIS = ["universitario", "concurseiro", "vestibulando", "autodidata"] as const;
const DISPOSICOES = ["sim", "talvez", "nao"] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const perfil = String(formData.get("perfil") ?? "");
  const disposicaoPagar = String(formData.get("disposicao_pagar") ?? "");

  if (!EMAIL_REGEX.test(email)) {
    return { status: "error", field: "email", message: "Informe um e-mail válido." };
  }

  if (!PERFIS.includes(perfil as (typeof PERFIS)[number])) {
    return { status: "error", field: "perfil", message: "Selecione seu perfil de estudo." };
  }

  if (!DISPOSICOES.includes(disposicaoPagar as (typeof DISPOSICOES)[number])) {
    return { status: "error", field: "disposicao_pagar", message: "Responda se você assinaria." };
  }

  const { error } = await supabase.from("leads").insert({
    email,
    perfil,
    disposicao_pagar: disposicaoPagar,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        status: "error",
        field: "email",
        message: "Esse e-mail já está na lista de acesso antecipado.",
      };
    }
    return {
      status: "error",
      message: "Não foi possível enviar agora. Tente novamente em instantes.",
    };
  }

  return { status: "success", email };
}
