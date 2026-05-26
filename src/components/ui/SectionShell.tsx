import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: Props) {
  return (
    <section id={id} className={`section-shell ${className}`.trim()}>
      <div className="section-shell__inner">
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        {title ? <h2 className="section-title">{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}
