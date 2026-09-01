import { useState } from "react";

export type AccordionSection = {
  heading: string;
  body: string[];
};

export type AccordionItem = {
  title: string;
  summary?: string;
  sections: AccordionSection[];
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `accordion-panel-${i}`;
        const n = String(i + 1).padStart(2, "0");

        return (
          <div key={item.title} className="border-b border-line last:border-b-0">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className={`flex w-full items-start gap-3 px-4 py-4 text-left transition-colors sm:items-center sm:gap-6 sm:px-8 sm:py-5 ${
                isOpen ? "bg-ink-2" : "hover:bg-ink-2/60"
              }`}
            >
              <span className="mt-1 font-display text-[11px] tracking-[0.18em] text-hi sm:mt-0">
                {n}
              </span>
              <span className="flex-1">
                <span className="block font-display text-lg font-semibold tracking-tight sm:text-xl">
                  {item.title}
                </span>
                {item.summary && (
                  <span className="mt-1 block text-sm text-mute">
                    {item.summary}
                  </span>
                )}
              </span>
              <span
                className={`font-display text-hi transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="space-y-8 border-t border-line bg-ink-2 px-5 py-6 sm:px-8 sm:pl-[4.75rem]">
                  {item.sections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="font-display text-sm font-semibold tracking-wide text-hi">
                        {section.heading}
                      </h3>
                      {section.body.map((para) => (
                        <p
                          key={para.slice(0, 48)}
                          className="mt-2 text-[15px] leading-relaxed text-paper/75"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
