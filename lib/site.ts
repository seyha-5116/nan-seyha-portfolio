export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://seyha.dev";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export interface ContactLink {
  id: "email" | "phone" | "github" | "telegram" | "facebook";
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    value: "nanseyha4@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=nanseyha4@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Seyha%2C%0A%0A",
    external: true,
  },
  { id: "phone", label: "Phone", value: "076 328 7323", href: "tel:+855763287323" },
  { id: "github", label: "GitHub", value: "github.com/Seyha-993-701", href: "https://github.com/Seyha-993-701", external: true },
  { id: "telegram", label: "Telegram", value: "@nanseyha", href: "https://t.me/nanseyha", external: true },
  { id: "facebook", label: "Facebook", value: "facebook.com/nan.seyha.2006", href: "https://www.facebook.com/nan.seyha.2006", external: true },
];