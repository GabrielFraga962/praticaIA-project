import { Logomark } from "./Logomark";

const LINKS = ["Privacidade", "Termos", "Contato"];

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-5 px-5 text-center py-10 sm:px-8 md:flex-row md:justify-between md:text-left lg:px-[72px]">
      <span className="flex items-center gap-2.5">
        <Logomark className="size-6" />
        <span className="display text-[17px] font-semibold">PráticaAI</span>
      </span>
      <p className="text-sm text-muted-foreground">
        © 2026 PráticaAI. Feito para quem estuda sério.
      </p>
      <nav aria-label="Rodapé" className="flex gap-7 text-sm text-muted-foreground">
        {LINKS.map((l) => (
          <a key={l} href="#" className="transition-colors hover:text-foreground">
            {l}
          </a>
        ))}
      </nav>
    </footer>
  );
}
