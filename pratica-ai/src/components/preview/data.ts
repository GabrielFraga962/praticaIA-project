import { FileText, ImageIcon, Link2, NotebookPen, type LucideIcon } from "lucide-react";

export type Material = {
  id: string;
  icon: LucideIcon;
  title: string;
  kind: string;
  meta: string;
  pages: number;
  topics: string[];
  indexing?: boolean;
};

export type Disciplina = {
  name: string;
  base: { materiais: number; paginas: number; topicos: number };
  recentes: Material[];
};

// Conteúdo ilustrativo (arte conceitual). Nada aqui é dado real de usuário.
export const DISCIPLINAS: Disciplina[] = [
  {
    name: "Direito Constitucional",
    base: { materiais: 12, paginas: 148, topicos: 63 },
    recentes: [
      { id: "c1", icon: FileText, title: "Constitucional — Resumo do Cap. 4", kind: "PDF", meta: "32 páginas", pages: 32, topics: ["Controle de constitucionalidade", "Princípios"] },
      { id: "c2", icon: NotebookPen, title: "Anotações das aulas 12 a 18", kind: "Anotação", meta: "2.400 palavras", pages: 9, topics: ["Direitos fundamentais"] },
      { id: "c3", icon: ImageIcon, title: "Caderno — fotos do quadro", kind: "Fotos", meta: "4 imagens", pages: 4, topics: ["Remédios constitucionais"] },
      { id: "c4", icon: Link2, title: "Súmulas vinculantes do STF", kind: "Link", meta: "1 página", pages: 1, topics: ["Súmulas"] },
    ],
  },
  {
    name: "Direito Administrativo",
    base: { materiais: 7, paginas: 96, topicos: 41 },
    recentes: [
      { id: "a1", icon: FileText, title: "Administrativo — Atos e poderes", kind: "PDF", meta: "28 páginas", pages: 28, topics: ["Atos administrativos", "Poder de polícia"] },
      { id: "a2", icon: NotebookPen, title: "Anotações sobre licitações", kind: "Anotação", meta: "1.900 palavras", pages: 7, topics: ["Licitações"] },
      { id: "a3", icon: Link2, title: "Lei 14.133/2021 comentada", kind: "Link", meta: "1 página", pages: 1, topics: ["Contratos"] },
    ],
  },
  {
    name: "Raciocínio Lógico",
    base: { materiais: 5, paginas: 54, topicos: 22 },
    recentes: [
      { id: "r1", icon: FileText, title: "Lista de exercícios — Proposições", kind: "PDF", meta: "18 páginas", pages: 18, topics: ["Tabela-verdade"] },
      { id: "r2", icon: ImageIcon, title: "Caderno — resolução comentada", kind: "Fotos", meta: "6 imagens", pages: 6, topics: ["Equivalências lógicas"] },
    ],
  },
  {
    name: "Língua Portuguesa",
    base: { materiais: 9, paginas: 120, topicos: 37 },
    recentes: [
      { id: "p1", icon: FileText, title: "Português — Regência e crase", kind: "PDF", meta: "22 páginas", pages: 22, topics: ["Regência", "Crase"] },
      { id: "p2", icon: NotebookPen, title: "Anotações de redação oficial", kind: "Anotação", meta: "1.200 palavras", pages: 5, topics: ["Redação oficial"] },
      { id: "p3", icon: Link2, title: "Manual de Redação da Presidência", kind: "Link", meta: "1 página", pages: 1, topics: ["Ofício"] },
    ],
  },
];

// Materiais que o botão "Adicionar material" simula, em sequência.
export const NOVOS: Omit<Material, "id" | "indexing">[] = [
  { icon: FileText, title: "Resumo da aula 19", kind: "PDF", meta: "14 páginas", pages: 14, topics: ["Poder constituinte"] },
  { icon: NotebookPen, title: "Anotações da aula 20", kind: "Anotação", meta: "1.800 palavras", pages: 6, topics: ["Organização do Estado"] },
  { icon: ImageIcon, title: "Foto do quadro — revisão", kind: "Foto", meta: "2 imagens", pages: 2, topics: ["Revisão geral"] },
];

export type Cite = { source: string; page: string; quote: string; highlight: string };
export type Parte = string | { cite: number };
export type Questao = {
  statement: string;
  correct: boolean; // true = "Certo"
  explicacao: Parte[];
  fontes: Cite[];
};

export const QUESTOES: Questao[] = [
  {
    statement: "O controle difuso de constitucionalidade só pode ser exercido pelo Supremo Tribunal Federal.",
    correct: false,
    explicacao: [
      "Qualquer juiz ou tribunal pode exercer o controle difuso, no julgamento de um caso concreto.",
      { cite: 1 },
      " Ao STF cabe a palavra final, por meio do recurso extraordinário.",
      { cite: 2 },
    ],
    fontes: [
      { source: "Anotações das aulas 12 a 18", page: "p. 18", quote: "No sistema difuso, a inconstitucionalidade é arguida em qualquer processo e", highlight: "qualquer juiz ou tribunal pode afastar a lei no caso concreto." },
      { source: "Constitucional — Resumo do Cap. 4", page: "p. 22", quote: "O recurso extraordinário leva a questão ao Supremo, que", highlight: "dá a palavra final sobre a constitucionalidade." },
    ],
  },
  {
    statement: "O Presidente da República pode propor ação direta de inconstitucionalidade.",
    correct: true,
    explicacao: [
      "O Presidente da República está entre os legitimados para propor a ação direta de inconstitucionalidade, junto de outros órgãos e entidades.",
      { cite: 1 },
    ],
    fontes: [
      { source: "Constitucional — Resumo do Cap. 4", page: "p. 25", quote: "Podem propor a ação direta de inconstitucionalidade:", highlight: "o Presidente da República, o Procurador-Geral da República e o Conselho Federal da OAB, entre outros." },
    ],
  },
  {
    statement: "O habeas corpus protege a liberdade de locomoção.",
    correct: true,
    explicacao: [
      "O habeas corpus é o remédio constitucional contra ilegalidade ou abuso de poder que ameace a liberdade de locomoção.",
      { cite: 1 },
    ],
    fontes: [
      { source: "Caderno — fotos do quadro", page: "foto 2", quote: "Remédios constitucionais:", highlight: "habeas corpus protege a liberdade de locomoção." },
    ],
  },
];
