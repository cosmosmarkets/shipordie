"use client";

import { useId, useState } from "react";

type Item = { q: string; a: string };

export function FaqAccordion({ items }: { items: readonly Item[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-btn-${index}`;
        return (
          <div key={item.q} className="faq-item">
            <button
              id={buttonId}
              type="button"
              className="faq-item__trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.q}</span>
              <span className="faq-item__icon" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="faq-item__panel"
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
