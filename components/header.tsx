"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { EASE } from "@/lib/motion";
import { NAV_LINKS } from "@/lib/site";

const SECTION_IDS = ["top", "about", "skills", "services", "projects", "contact"];

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 32);
  });

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[80%] items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5 font-display text-sm font-semibold tracking-[0.14em] text-text">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-brass transition-transform duration-300 group-hover:scale-125"
          />
          SEYHA
          <span className="font-mono text-[10px] text-muted transition-colors group-hover:text-brass">
            /DEV
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavUnderline key={link.href} href={link.href} active={active === link.href}>
              {link.label}
            </NavUnderline>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex h-9 items-center rounded-full bg-brass px-5 font-sans text-xs font-medium text-ink transition-colors hover:bg-brass-bright"
          >
            Get in touch
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong text-text md:hidden"
        >
          {open ? <CloseIcon className="text-base" /> : <MenuIcon className="text-base" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.9 }}
            className="overflow-hidden border-b border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-4 sm:px-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-t border-line py-4 font-display text-xl transition-colors hover:text-brass ${
                    active === link.href ? "text-brass" : "text-text"
                  }`}
                >
                  {link.label}
                  <span className="font-mono text-xs text-muted">0{NAV_LINKS.indexOf(link) + 1}</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mb-6 mt-2 inline-flex h-11 items-center justify-center rounded-full bg-brass font-mono text-xs tracking-widest text-ink"
              >
                GET IN TOUCH
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function NavUnderline({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileHover="hover"
      className={`inline-flex items-center py-2 font-sans text-sm transition-colors ${
        active ? "text-text" : "text-muted hover:text-text"
      }`}
    >
      <span className="relative py-0.5">
        {children}
        <motion.span
          variants={{ hover: { scaleX: 1 } }}
          animate={{ scaleX: active ? 1 : 0 }}
          initial={false}
          transition={{ duration: 0.3, ease: EASE }}
          className="absolute inset-x-0 -bottom-px h-[1.5px] origin-left rounded-full bg-brass"
        />
      </span>
    </motion.a>
  );
}