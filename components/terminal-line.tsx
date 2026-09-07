export function TerminalLine() {
  return (
    <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-2/60 px-4 py-2 font-mono text-xs text-muted">
      <span aria-hidden="true" className="text-brass">
        →
      </span>
      status: building things that last
    </p>
  );
}