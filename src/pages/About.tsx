import { useState } from "react";

const heroImg =
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80";

const cities = [
  "Kamloops",
  "Kelowna",
  "Vernon",
  "Penticton",
  "Prince George",
  "Edmonton",
  "Calgary",
  "Jasper",
  "Saskatoon",
  "Winnipeg",
];

const people = [
  {
    name: "Marsha Bell",
    creds: "MSc, CIH",
    photo: "/123.avif",
    preview:
      "Marsha has extensive experience assisting organizations with occupational health, hygiene and safety solutions including; exposure control plans, hygiene monitoring, serious and fatal incident investigations, and conducting risk assessments. She regularly advises employers on regulation interpretations, health and safety program development, leadership training, and work refusal resolutions. Marsha is known for her empathetic approach towards stubborn and complex workplace safety risks and is focused on providing professional advice that prepares organizations with information necessary to avoid regulatory enforcement orders and penalties.",
    more: [
      "Marsha holds a Masters degree in Occupational Hygiene from McGill University, along with the Certified Industrial Hygienist (CIH) designation required to perform specialized hygiene services referenced by regulation. Over the years, Marsha has also received specialized certifications, but is most passionate about safety leadership training and utilizing the principles of Human and Organizational Performance (HOP) to engage organizations in reducing human loss. In 2023, Marsha was recognized as one of Canada's Top Women in Safety.",
      "Marsha spends her time away from work with her husband and children hiking and exploring the trails in British Columbia. She loves gardening, travelling and spending time with her extended family in Manitoba.",
    ],
  },
  {
    name: "Jason Zaffino",
    creds: "MBA, CRSP",
    photo: "/1234.avif",
    preview:
      "Jason provides strategic and practical advice to employers on health and safety issues in the workplace. Jason's services are rooted in his ability to take complex equipment and process risks and simplify solutions into easily understood and operational programs. He does this by thoroughly understanding his clients' objectives – an understanding that he reaches through collaboration, by asking the right questions, with a keen awareness of his clients' safety needs. Jason is frequently engaged for workplace safety policy and procedure development, conducting workplace safety culture assessments, and delivering impactful safety leadership training.",
    more: [
      "Jason holds a Masters degree in Business Administration (MBA) with a specialty in Safety Leadership, and holds the Canadian Registered Safety Professional (CRSP) designation. Jason has extensive experience with administrative bodies such as WorksafeBC, OHS Alberta, and OHS Saskatchewan. In 2021 Jason received international recognition winning a safety innovation award for lockout and in 2023 was recognized as one of Canada's top safety leaders under 35.",
      "Jason is an avid sports and outdoor enthusiast. Away from work he can be found at a local golf course, ski hill or hockey arena. He spends part of his time in his hometown of Jasper, Alberta.",
    ],
  },
];

function PersonCard({ person }: { person: (typeof people)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="bg-ink-2">
      <div className="p-8 sm:p-12">
        <img
          src={person.photo}
          alt={person.name}
          className="mb-6 aspect-[4/5] w-3/5 max-w-[240px] object-cover object-top"
        />
        <p className="font-display text-[11px] tracking-[0.2em] text-hi uppercase">
          Principal consultant
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold">{person.name}</h2>
        <p className="mt-1 text-sm text-mute">{person.creds}</p>
        <p className="mt-6 text-[15px] leading-relaxed text-paper/75">
          {person.preview}
        </p>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            {person.more.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="mt-4 text-[15px] leading-relaxed text-paper/75"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-6 font-display text-[11px] font-semibold tracking-[0.16em] text-hi uppercase hover:underline"
        >
          {open ? "Read less" : "Read more →"}
        </button>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <>
      <section className="relative isolate min-h-[36svh] overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/30" />
        <div className="relative mx-auto flex min-h-[36svh] max-w-6xl flex-col justify-end px-5 pb-12 pt-24">
          <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-hi uppercase">
            Our story
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Meet regulatory requirements, protect workers, and mitigate loss.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">
            Uplift Safety is a partnership dedicated to providing the highest
            level of expertise in occupational health and safety. Based in
            Kamloops, BC, we serve virtually every industry from British
            Columbia to Manitoba.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-px bg-line px-5 sm:grid-cols-2">
        {people.map((person) => (
          <PersonCard key={person.name} person={person} />
        ))}
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-hi uppercase">
            Serving
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold">
            Western Canada. And beyond.
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-y-3 text-paper/80 sm:grid-cols-5">
            {cities.map((city) => (
              <li key={city} className="font-display text-sm tracking-wide">
                {city}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
