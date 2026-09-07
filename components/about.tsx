import { Reveal } from "@/components/reveal";
import { ProfileImage } from "@/components/profile-image";
import { SectionDivider } from "@/components/section-divider";
import { SectionHeading } from "@/components/section";
import { TerminalLine } from "@/components/terminal-line";

const FACTS: Array<[string, string]> = [
  ["Based in", "Phnom Penh, Cambodia"],
  ["Focus", "Full-stack & AI tooling"],
  ["Availability", "Open to new work"],
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

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p className="text-xl font-medium leading-snug text-text">
                I&apos;m a full-stack developer who cares about the details most people never see —
                clean architecture, honest UX, and code that holds up under real use.
              </p>
              <p>
                I build fast, reliable web applications end to end. My recent work sits at the
                intersection of web engineering and AI tooling, where precision matters most.
              </p>
              <p>
                I believe great interfaces are functional first, and only ever as complex as they
                need to be.
              </p>
              <TerminalLine />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
              <div className="flex-none">
                <ProfileImage size="lg" />
              </div>
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:flex-1">
                {FACTS.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {label}
                    </p>
                    <p className="mt-2.5 text-sm font-medium text-text">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}