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
    photo: "/rewebsitekickoff/123.png",
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
    photo: "/rewebsitekickoff/1234.png",
    preview:
      "Jason provides strategic and practical advice to employers on health and safety issues in the workplace. Jason's services are rooted in his ability to take complex equipment and process risks and simplify solutions into easily understood and operational programs. He does this by thoroughly understanding his clients' objectives, an understanding that he reaches through collaboration, by asking the right questions, with a keen awareness of his clients' safety needs. Jason is frequently engaged for workplace safety policy and procedure development, conducting workplace safety culture assessments, and delivering impactful safety leadership training.",
    more: [
      "Jason holds a Masters degree in Business Administration (MBA) with a specialty in Safety Leadership, and holds the Canadian Registered Safety Professional (CRSP) designation. Jason has extensive experience with administrative bodies such as WorksafeBC, OHS Alberta, and OHS Saskatchewan. In 2021 Jason received international recognition winning a safety innovation award for lockout and in 2023 was recognized as one of Canada's top safety leaders under 35.",
      "Jason is an avid sports and outdoor enthusiast. Away from work he can be found at a local golf course, ski hill or hockey arena. He spends part of his time in his hometown of Jasper, Alberta.",
    ],
  },
];

function PersonCard({ person }: { person: (typeof people)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="bg-paper">
      <div className="p-6 sm:p-12">
        <img
          src={person.photo}
          alt={person.name}
          className="mb-6 aspect-[4/5] w-3/5 max-w-[240px] object-cover object-top"
        />
        <h2 className="font-display text-3xl font-bold">{person.name}</h2>
        <p className="mt-1 text-sm text-mute">{person.creds}</p>
        <p className="mt-6 max-w-[65ch] text-[15px] leading-relaxed text-mute">
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
                className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-mute"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-6 font-display text-[11px] font-semibold tracking-[0.16em] text-blue uppercase hover:underline"
        >
          {open ? "Read less" : "Read more"}
        </button>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <>
      <section className="relative isolate min-h-[32svh] overflow-hidden sm:min-h-[40svh]">
        <img
          src={heroImg}
          alt=""
          className="hero-reveal absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue via-blue/80 to-blue/30" />
        <div className="relative mx-auto flex min-h-[32svh] max-w-6xl flex-col justify-end px-5 pt-12 pb-10 text-white sm:min-h-[40svh] sm:pt-16 sm:pb-12">
          <h1 className="enter-slide max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Meet regulatory requirements, protect workers, and mitigate loss.
          </h1>
          <p className="enter-slide d2 mt-4 max-w-[65ch] text-base leading-relaxed text-white/80 sm:mt-5 sm:text-lg">
            A Kamloops partnership. Occupational health and safety from British Columbia to Manitoba.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <p className="max-w-[65ch] text-[15px] leading-relaxed text-mute">
          Uplift Safety is a partnership dedicated to providing the highest
          level of expertise in occupational health and safety. Based in
          Kamloops, BC, we serve virtually every industry from British
          Columbia to Manitoba.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-px bg-blue px-5 sm:grid-cols-2">
        {people.map((person) => (
          <PersonCard key={person.name} person={person} />
        ))}
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold">
            Western Canada. And beyond.
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-y-3 sm:grid-cols-5">
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
