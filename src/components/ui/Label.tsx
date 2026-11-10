import type { ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
};

export function Label({
  children,
  className = "",
  as: Tag = "p",
}: LabelProps) {
  return (
    <Tag
      className={`text-[10px] font-semibold tracking-label uppercase ${className}`}
    >
      {children}
    </Tag>
  );
}
