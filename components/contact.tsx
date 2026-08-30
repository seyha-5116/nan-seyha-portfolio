"use client";

import { motion } from "motion/react";
import {
  ArrowRightIcon,
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

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="04" label="Contact" />
        </Reveal>

        <Reveal>
          <h2 className="fluid-h2 max-w-2xl font-display font-bold text-text">
            Let&apos;s build something <span className="text-brass">together</span>
          </h2>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {CONTACT_LINKS.map((link) => (
              <ContactRow key={link.id} link={link} />
            ))}
            <div className="flex flex-col justify-center gap-2 bg-surface px-6 py-7 sm:px-7">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
                06 / Response
              </p>
              <p className="font-mono text-xs leading-relaxed text-muted">
                AV — OPEN FOR WORK. PREFERRED CHANNEL: TELEGRAM. TYPICAL RESPONSE &lt; 24H.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ link }: { link: ContactLink }) {
  const Icon = ROW_ICONS[link.id];

  return (
    <motion.a
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="group flex h-full items-center gap-4 bg-surface p-6 transition-colors hover:text-brass sm:p-7"
    >
      <span className="flex h-10 w-10 flex-none items-center justify-center border border-line-strong text-text transition-colors group-hover:border-brass group-hover:text-brass">
        <Icon className="text-lg" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-brass">
          {link.label}
        </span>
        <span className="mt-1 block truncate text-sm text-text">{link.value}</span>
      </span>
      <ArrowRightIcon className="flex-none text-base text-muted transition-transform group-hover:translate-x-1 group-hover:text-brass" />
    </motion.a>
  );
}