import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionHeading } from "@/components/section";
import { TerminalLine } from "@/components/terminal-line";

const FACTS: Array<[string, string]> = [
  ["Based in", "Phnom Penh, Cambodia"],
  ["Focus", "Full-stack & AI tooling"],
  ["Availability", "Open to freelance work"],
  ["Reach", "Telegram / email"],
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="01" label="About" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p className="text-text">
                I&apos;m a full-stack developer who cares about the details most people never see —
                clean architecture, honest UX, and code that holds up under real use. I build fast,
                reliable web applications end to end.
              </p>
              <p>
                My recent work sits at the intersection of web engineering and AI tooling, where
                precision matters most. I believe great interfaces are functional first, and only
                ever as complex as they need to be.
              </p>
              <TerminalLine />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="border border-line">
              {FACTS.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 border-b border-line px-6 py-5 last:border-b-0"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</dt>
                  <dd className="text-right text-sm text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}