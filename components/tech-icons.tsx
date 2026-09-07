import type { ReactNode } from "react";
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconBaseProps } from "react-icons";

type TechIconProps = { tech: string; className?: string; size?: number };

type BrandIcon = (props: IconBaseProps) => ReactNode;

const REGISTRY: Record<string, { icon: BrandIcon; color: string }> = {
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  Python: { icon: SiPython, color: "#3776AB" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#1572B6" },
  Next: { icon: SiNextdotjs, color: "#FFFFFF" },
  React: { icon: SiReact, color: "#61DAFB" },
  Node: { icon: SiNodedotjs, color: "#5FA04E" },
  Express: { icon: SiExpress, color: "#CFCFCF" },
  Prisma: { icon: SiPrisma, color: "#32A795" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  Git: { icon: SiGit, color: "#F05032" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  OpenAI: { icon: OpenAiIcon, color: "#7C9B8B" },
};

const ALIASES: Record<string, string> = {
  "Next.js": "Next",
  "Nextjs": "Next",
  "Node.js": "Node",
  "Nodejs": "Node",
  "OpenAI API": "OpenAI",
  "HTML": "HTML",
  "CSS": "CSS",
  "Html": "HTML",
  "Css": "CSS",
};

function resolveTech(tech: string): string {
  const key = tech.trim();
  if (ALIASES[key]) return ALIASES[key];
  if (REGISTRY[key]) return key;
  const match = Object.keys(REGISTRY).find((k) => k.toLowerCase() === key.toLowerCase());
  return match ?? key;
}

function OpenAiIcon(props: IconBaseProps): ReactNode {
  const size = props.size ?? 12;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={props.color ?? "#7C9B8B"}
      aria-hidden="true"
      focusable="false"
      className={props.className}
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0806 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.0524v5.5826a4.504 4.504 0 0 1-4.4945 4.4945zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.196a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.8634zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zm-12.6405 4.1346l-2.02-1.1638a.0804.0804 0 0 1-.038-.0569V6.0741a4.4992 4.4992 0 0 1 7.3753-3.4537l-.142.0805L8.704 5.46a.795.795 0 0 0-.3937.6813zm1.0971-2.3651l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" />
    </svg>
  );
}

export function TechIcon({ tech, className = "", size = 12 }: TechIconProps) {
  const key = resolveTech(tech);

  if (key === "HTML / CSS") {
    return (
      <span className={`inline-flex shrink-0 items-center gap-px ${className}`} aria-hidden="true">
        {REGISTRY.HTML.icon({ color: REGISTRY.HTML.color, size })}
        {REGISTRY.CSS.icon({ color: REGISTRY.CSS.color, size })}
      </span>
    );
  }

  const entry = REGISTRY[key];
  if (!entry) return null;

  return entry.icon({
    color: entry.color,
    size,
    className: `shrink-0 ${className}`.trim(),
  });
}
