import { Clock } from "@/components/clock";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex w-full max-w-[80%] flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs text-muted">
          © {year} Nan Seyha <span className="text-line-strong">—</span> Built with Next.js
        </p>
        <div className="flex flex-col gap-2 sm:items-end">
          <Clock />
          <a
            href="#top"
            className="font-mono text-xs text-muted transition-colors hover:text-brass"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}