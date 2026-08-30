import { Clock } from "@/components/clock";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs text-muted">© {year} Nan Seyha — Built with Next.js</p>
        <div className="flex flex-col gap-1.5 sm:items-end">
          <Clock />
          <p className="font-mono text-xs text-muted">N 11°33′ E 104°54′ — PHNOM PENH</p>
        </div>
      </div>
    </footer>
  );
}