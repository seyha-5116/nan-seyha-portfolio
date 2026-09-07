"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRightIcon,
  CopyIcon,
  FacebookIcon,
  GithubIcon,
  MailIcon,
  PhoneIcon,
  TelegramIcon,
} from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionHeading } from "@/components/section";
import { CONTACT_LINKS, type ContactLink } from "@/lib/site";

const ROW_ICONS: Record<ContactLink["id"], typeof MailIcon> = {
  email: MailIcon,
  phone: PhoneIcon,
  github: GithubIcon,
  telegram: TelegramIcon,
  facebook: FacebookIcon,
};

const COPY_FALLBACKS: Partial<Record<ContactLink["id"], string>> = {
  email: "nanseyha4@gmail.com",
  phone: "+855 76 328 7323",
};

export function Contact() {
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="05" label="Contact" />
        </Reveal>

        <Reveal>
          <h2 className="fluid-h2 max-w-2xl font-display font-bold text-text">
            Let&apos;s build something <span className="text-brass">together</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Have a project in mind or just want to say hello? Reach out through any channel below —
            I typically reply within a day.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACT_LINKS.map((link) => (
              <ContactCard
                key={link.id}
                link={link}
                copyValue={COPY_FALLBACKS[link.id]}
                copyAsButton={link.id === "email"}
                onCopy={showToast}
              />
            ))}
            <div className="flex h-full flex-col justify-center gap-2 rounded-2xl border border-brass/25 bg-brass/[0.06] p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                Response
              </p>
              <p className="font-mono text-xs leading-relaxed text-muted">
                OPEN FOR WORK. PREFERRED CHANNEL: TELEGRAM. TYPICAL RESPONSE &lt; 24H.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>

      <Toast message={toast} />
    </section>
  );
}

function ContactCard({
  link,
  copyValue,
  copyAsButton = false,
  onCopy,
}: {
  link: ContactLink;
  copyValue?: string;
  copyAsButton?: boolean;
  onCopy: (message: string) => void;
}) {
  const reduce = useReducedMotion();
  const Icon = ROW_ICONS[link.id];

  const handleClick = () => {
    if (!copyValue || copyAsButton) return;
    navigator.clipboard?.writeText(copyValue).catch(() => undefined);
    onCopy(`${link.label} copied — ${link.value}`);
  };

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!copyValue) return;
    navigator.clipboard?.writeText(copyValue).catch(() => undefined);
    onCopy(`${link.label} copied — ${link.value}`);
  };

  return (
    <motion.a
      href={link.href}
      onClick={handleClick}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileHover={reduce ? undefined : { x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="group flex h-full cursor-pointer items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brass/40 hover:bg-surface-2 focus-visible:border-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/30 sm:p-6"
    >
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-text transition-colors group-hover:border-brass group-hover:text-brass">
        <Icon className="text-lg" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted group-hover:text-brass">
          {link.label}
        </span>
        <span className="mt-1 block truncate text-sm text-text">{link.value}</span>
      </span>
      {copyValue && copyAsButton ? (
        <button
          type="button"
          aria-label={`Copy ${link.label}`}
          onClick={handleCopy}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") handleCopy(event);
          }}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-line-strong bg-surface-2 text-muted transition-colors hover:border-brass hover:text-brass focus-visible:border-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/30"
        >
          <CopyIcon className="text-sm" />
        </button>
      ) : null}
      <ArrowRightIcon className="flex-none text-base text-muted transition-transform group-hover:translate-x-1 group-hover:text-brass" />
    </motion.a>
  );
}

function Toast({ message }: { message: string | null }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <AnimatePresence>
        {message ? (
          <motion.div
            role="status"
            aria-live="polite"
            className="rounded-full border border-line-strong bg-surface-2/95 px-5 py-2.5 font-mono text-xs text-text shadow-xl backdrop-blur-md"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}