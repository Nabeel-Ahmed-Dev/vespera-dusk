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
  return (
    <Tag
      id={id}
      data-section={dataSection}
      aria-label={ariaLabel}
      className={`relative w-full ${className}`}
    >
      {children}
    </Tag>
  );
}
