import { useState } from "react";

export type Course = {
  title: string;
  duration: string;
  body: string[];
};

export default function CourseCatalog({ courses }: { courses: Course[] }) {
  const [active, setActive] = useState(0);
  const course = courses[active];

  return (
    <div className="grid border border-line lg:grid-cols-12">
      <div className="border-b border-line lg:col-span-5 lg:border-r lg:border-b-0">
        {courses.map((item, i) => {
          const on = i === active;
          const n = String(i + 1).padStart(2, "0");
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(i)}
              className={`flex w-full items-start gap-3 border-b border-line px-3 py-3.5 text-left last:border-b-0 sm:items-center sm:gap-4 sm:px-5 ${
                on ? "bg-ink-2" : "hover:bg-ink-2/50"
              }`}
            >
              <span className="font-display text-[10px] tracking-[0.16em] text-hi">
                {n}
              </span>
              <span
                className={`flex-1 font-display text-sm font-semibold tracking-tight sm:text-[15px] ${
                  on ? "text-paper" : "text-paper/75"
                }`}
              >
                {item.title}
              </span>
              <span className="shrink-0 border border-hi/50 px-2 py-0.5 font-display text-[9px] font-semibold tracking-[0.12em] text-hi uppercase">
                {item.duration}
              </span>
            </button>
          );
        })}
      </div>
      <div className="bg-ink-2 px-5 py-8 lg:col-span-7 sm:px-8 lg:sticky lg:top-16 lg:self-start">
        <p className="font-display text-[11px] tracking-[0.2em] text-hi uppercase">
          {course.duration}
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {course.title}
        </h2>
        {course.body.map((para) => (
          <p
            key={para.slice(0, 48)}
            className="mt-4 text-[15px] leading-relaxed text-paper/75"
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
