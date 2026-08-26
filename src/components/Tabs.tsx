import { useState } from "react";

export type TabSection = {
  heading: string;
  body: string[];
};

export type TabItem = {
  label: string;
  sections: TabSection[];
};

export default function Tabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0);
  const [sub, setSub] = useState(0);
  const tab = items[active];
  const section = tab.sections[Math.min(sub, tab.sections.length - 1)];
  const showPills = tab.sections.length > 1;

  function selectTab(i: number) {
    setActive(i);
    setSub(0);
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Hygiene services"
        className="flex flex-wrap gap-1 border-b border-line"
      >
        {items.map((item, i) => {
          const isOn = i === active;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isOn}
              onClick={() => selectTab(i)}
              className={`relative px-4 py-3 font-display text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors sm:px-5 ${
                isOn ? "text-hi" : "text-paper/55 hover:text-paper"
              }`}
            >
              {item.label}
              {isOn && (
                <span className="absolute inset-x-4 -bottom-px h-0.5 bg-hi sm:inset-x-5" />
              )}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="min-h-[20rem] border-x border-b border-line bg-ink-2 px-5 py-8 sm:px-8"
      >
        {showPills && (
          <div className="mb-6 flex flex-wrap gap-2">
            {tab.sections.map((s, i) => {
              const on = i === sub;
              return (
                <button
                  key={s.heading}
                  type="button"
                  onClick={() => setSub(i)}
                  className={`border px-3 py-1.5 font-display text-[10px] font-semibold tracking-[0.12em] uppercase ${
                    on
                      ? "border-hi bg-hi text-hi-ink"
                      : "border-line text-paper/70 hover:border-hi hover:text-hi"
                  }`}
                >
                  {s.heading}
                </button>
              );
            })}
          </div>
        )}
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {section.heading}
        </h2>
        {section.body.map((para) => (
          <p
            key={para.slice(0, 48)}
            className="mt-4 max-w-3xl text-[15px] leading-relaxed text-paper/75"
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
