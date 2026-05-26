import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  href?: string;
  children: React.ReactNode;
};

export function PirateButton({ href, children, className = "", ...props }: Props) {
  const classes = `pirate-btn ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span className="pirate-btn__label">{children}</span>
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      <span className="pirate-btn__label">{children}</span>
    </button>
  );
}
