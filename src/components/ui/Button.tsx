import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "night" | "honey" | "outline" | "outline-light";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  magnetic?: boolean;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  night: "bg-night text-cream5",
  honey: "bg-honey3 text-night",
  outline: "border border-night/40 bg-transparent text-night",
  "outline-light": "border border-cream/40 bg-transparent text-cream",
};

export function Button({
  children,
  variant = "night",
  magnetic = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-8",
    "text-[13px] font-semibold tracking-button uppercase",
    "transition-colors",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const motionProps = magnetic
    ? { "data-magnetic": true, className: `${classes} js-magnetic-cta` }
    : { className: classes };

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <a href={href} {...motionProps} {...rest}>
        <span data-magnetic-label>{children}</span>
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type="button" {...motionProps} {...buttonProps}>
      <span data-magnetic-label>{children}</span>
    </button>
  );
}
