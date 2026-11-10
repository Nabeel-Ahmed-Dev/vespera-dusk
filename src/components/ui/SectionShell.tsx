import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  dataSection: string;
  children: ReactNode;
  className?: string;
  as?: "section" | "footer" | "nav" | "div";
  "aria-label"?: string;
};

export function SectionShell({
  id,
  dataSection,
  children,
  className = "",
  as: Tag = "section",
  "aria-label": ariaLabel,
}: SectionShellProps) {
  // Avoid `relative` + `absolute` on the same node — Tailwind source order
  // can let `relative` win and break overlays (e.g. transparent nav on hero).
  const isOutOfFlow = /\b(absolute|fixed|sticky)\b/.test(className);

  return (
    <Tag
      id={id}
      data-section={dataSection}
      aria-label={ariaLabel}
      className={`${isOutOfFlow ? "" : "relative "}w-full ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
