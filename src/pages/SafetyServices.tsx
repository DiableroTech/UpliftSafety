import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { ArrowRight, Quotes } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import ScrollClipReveal from "../components/motion/ScrollClipReveal";
import ScrollProgressBar from "../components/motion/ScrollProgressBar";
import Reveal from "../components/Reveal";
import { useSectionInViewportProgress } from "../motion/scroll";
import {
  categoryLightIntroVariants,
  categoryLightRootVariants,
  choreoBodySlide,
  choreoPhotoFade,
  choreoScrimSlide,
  choreoTitleSlide,
  gridItemRevealVariants,
  gridStaggerVariants,
  revealViewport,
  revealViewportHalf,
  servicesChoreoViewport,
  type RevealViewportOptions,
} from "../motion/uplift";

const services = [
  {
    title: "Programs & procedures",
    summary: "Program development · Lockout · Confined space",
    sections: [
      {
        heading: "Safety Program Development",
        body: [
          "Struggling to find the time and resources to build an effective workplace health and safety program? The Uplift Safety experts will help you build a proactive Occupational Health and Safety Program customized for your business. Whether you require a single safety policy, a permit or a full safety program we will work with your organization from development through implementation. Our safety programs will meet or exceed the requirements of COR audits as well as contractor prequalification systems ISN, Avetta and ComplyWorks.",
        ],
      },
      {
        heading: "Lockout and Safe Work Procedures",
        body: [
          "Safe Work Procedures, Lockout Procedures and Competency Assessments lay the foundation for an effective worker training program. Uplift Safety can provide fully customized worker training packages to ensure due diligence in your onboarding and training programs.",
          "Only need lockout procedures? Improve worker training, equipment knowledge and reduce lockout risk with a customized Uplift Safety lockout procedure. Our lockout procedures are the perfect lockout solution for all types of manufacturing equipment.",
        ],
      },
      {
        heading: "Confined Space Hazard Assessments",
        body: [
          "Trust your confined spaces to trained and certified professionals. Regulations require professionals holding one of the following designations; CIH, ROH, CSP, CRSP or P. Eng. to develop confined space hazard assessments. The Uplift Safety team has the required credentials, training and years of field experience developing confined space programs for large industrial workplaces. Our programs include confined space inventories, confined space hazard assessments, safe entry procedures, rescue plans and meet or exceed the regulations.",
        ],
      },
    ],
  },
  {
    title: "Assessment & audit",
    summary: "Hazard & risk · COR / OSSE audits",
    sections: [
      {
        heading: "Hazard & Risk Assessments",
        body: [
          "Hazard identification and risk assessment can be complex, technical and time consuming. If done correctly, this fundamental element of any effective Safety Management System can proactively prevent injuries. The Uplift Safety Team has extensive experience completing risk assessments in high risk industries including oil and gas, mining and forest products manufacturing. Our risk assessments include; combustible dust, equipment safeguarding, mobile/pedestrian interface, PPE, Storage Racking, Emergency Eye Wash and many more. Contact Uplift Safety to discuss your unique workplace hazards.",
        ],
      },
      {
        heading: "Safety Audits",
        body: [
          "The effectiveness of a safety audit isn't the audit tool, it's the auditor. When done correctly, safety audits are the ideal way to identify gaps in your current health and safety program and processes. Uplift Safety offers industry leading safety auditors who can identify strengths and opportunities for improvement while engaging your workforce. In addition to our own safety compliance audits, Uplift Safety is also a certified external OSSE (COR) auditor for the Manufacturing Safety Alliance of BC.",
        ],
      },
    ],
  },
  {
    title: "Incidents & shutdowns",
    summary: "Investigations · Turnaround support",
    sections: [
      {
        heading: "Incident Investigations",
        body: [
          "Are you struggling to complete incident investigations, determine root cause and implement meaningful change in your workplace? Uplift Safety has extensive experience completing high potential and serious incident investigations, including fatality investigations. If there is potential regulator involvement in an incident, it is important that the incident investigation is done thoroughly and in accordance with the regulations. Uplift Safety can offer expertise in this area and walk you through this important and stressful process.",
        ],
      },
      {
        heading: "Shutdown and Turnaround Safety",
        body: [
          "Managing the safety of your workers and hundreds of contractors during shutdowns and turnarounds can be a difficult task. Uplift Safety has the people and experience to provide safety support during these crucial, safety sensitive activities. We have developed a series of contractor management tools that can help ensure all work remains in compliance, is completed safely and on-time. Through thorough job planning, auditing and feedback we will work with your organization and contractors to ensure your turnaround or shutdown is a success.",
        ],
      },
    ],
  },
  {
    title: "People & culture",
    summary: "Advisors · Culture surveys · Presentations",
    sections: [
      {
        heading: "Safety Advisors and Managers",
        body: [
          "Are you struggling to recruit a qualified safety professional? Do you need safety support but don't require a full time employee? The Uplift Safety team has over 35 years of safety experience from the front line to C-Suite and can provide your organization with experienced on-site safety support. Depending on your organizations needs we can provide contract safety services, mentorship to young safety professionals or professional safety coaching for leadership and executive teams.",
        ],
      },
      {
        heading: "Safety Culture Surveys",
        body: [
          "How is your workplace safety culture? Safety culture is difficult to measure and workers are usually hesitant to be honest during internal assessments. Uplift Safety has developed a series of safety culture questions that are completed in one-on-one interviews with our consultants and your workers. The results will identify how safety leadership impacts the workplace safety culture. The confidential report will provide site management an opportunity to identify weaknesses and begin positively changing their safety culture.",
        ],
      },
      {
        heading: "Event Presentations",
        body: [
          "Providing your organization with relevant safety presentations and content is one of the best ways to keep your workers engaged, educated and informed about health and safety. The Uplift Safety team has presented to groups both large and small from the front line to the executive boardroom. When you select an Uplift Safety presentation we guarantee the participants will find our sessions engaging, thought provoking and informative. Contact Uplift Safety to discuss your specific event or presentation.",
        ],
      },
    ],
  },
];

const textOnPhoto = "[text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.65)]";

function ServiceBlockContent({
  heading,
  body,
  onPhoto = false,
}: {
  heading: string;
  body: string[];
  onPhoto?: boolean;
}) {
  return (
    <div>
      <h3
        className={`font-display text-lg font-bold tracking-tight ${onPhoto ? "text-accent" : "text-blue"}`}
      >
        {heading}
      </h3>
      <div
        className={`mt-3 space-y-3 text-[15px] leading-relaxed ${onPhoto ? "text-white/90" : "text-mute"}`}
      >
        {body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}

function StaggeredServiceGrid({
  sections,
  onPhoto = false,
  layout = "grid",
}: {
  sections: (typeof services)[number]["sections"];
  onPhoto?: boolean;
  layout?: "grid" | "stack";
}) {
  const reduce = useReducedMotion();
  const layoutClass =
    layout === "stack"
      ? "flex flex-col gap-10"
      : "mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2";

  if (reduce) {
    return (
      <div className={layoutClass}>
        {sections.map((s) => (
          <ServiceBlockContent key={s.heading} {...s} onPhoto={onPhoto} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={layoutClass}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={gridStaggerVariants}
    >
      {sections.map((s) => (
        <motion.div key={s.heading} variants={gridItemRevealVariants} style={{ backfaceVisibility: "hidden" }}>
          <ServiceBlockContent {...s} onPhoto={onPhoto} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function CategoryLight({
  index,
  service,
  sectionViewport = revealViewport,
}: {
  index: number;
  service: (typeof services)[number];
  sectionViewport?: RevealViewportOptions;
}) {
  const reduce = useReducedMotion();
  const intro = (
    <>
      <p className="text-center font-display text-[11px] font-semibold tracking-[0.24em] text-mute uppercase">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h2 className="mt-2 text-center font-display text-3xl font-extrabold tracking-tight text-blue uppercase sm:text-4xl">
        {service.title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-mute">{service.summary}</p>
    </>
  );

  if (reduce) {
    return (
      <section className="bg-white px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          {intro}
          <StaggeredServiceGrid sections={service.sections} />
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="bg-white px-5 py-16 sm:py-20"
      initial="hidden"
      whileInView="show"
      viewport={sectionViewport}
      variants={categoryLightRootVariants}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div variants={categoryLightIntroVariants}>{intro}</motion.div>
        <motion.div
          className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2"
          variants={gridStaggerVariants}
        >
          {service.sections.map((s) => (
            <motion.div
              key={s.heading}
              variants={gridItemRevealVariants}
              style={{ backfaceVisibility: "hidden" }}
            >
              <ServiceBlockContent {...s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function CategoryPhoto({ index, service, image }: { index: number; service: (typeof services)[number]; image: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useSectionInViewportProgress(sectionRef);
  const photoY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.03]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-paper"
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={reduce ? undefined : servicesChoreoViewport}
      variants={reduce ? undefined : { hidden: {}, show: {} }}
    >
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          className="h-full min-h-[24rem] w-full bg-paper bg-cover sm:min-h-[28rem]"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "right center",
            ...(reduce ? {} : { y: photoY, scale: photoScale }),
          }}
          variants={reduce ? undefined : choreoPhotoFade}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden lg:w-[62%]"
      >
        <motion.div
          className="h-full bg-black/50"
          variants={reduce ? undefined : choreoScrimSlide}
          style={{ backfaceVisibility: "hidden" }}
        />
      </div>
      <div className="mx-auto max-w-6xl px-5 py-16 text-white sm:py-20">
        <div className="lg:max-w-[52%]">
          <motion.div variants={reduce ? undefined : choreoTitleSlide} style={{ backfaceVisibility: "hidden" }}>
            <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-accent uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
              {service.title}
            </h2>
            <p className="mt-3 text-lg text-white/80">{service.summary}</p>
          </motion.div>
          <motion.div
            className="mt-10 space-y-10"
            variants={reduce ? undefined : choreoBodySlide}
            style={{ backfaceVisibility: "hidden" }}
          >
            {service.sections.map((s) => (
              <div key={s.heading}>
                <h3 className="font-display text-lg font-bold tracking-tight text-accent">{s.heading}</h3>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-white/90">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function CategoryFeatured({
  index,
  service,
  image,
}: {
  index: number;
  service: (typeof services)[number];
  image: string;
}) {
  const [spotlight, culture, presentations] = service.sections;

  return (
    <section className="grid lg:grid-cols-2">
      <div
        className="relative isolate min-h-[32rem] bg-cover bg-center sm:min-h-[36rem]"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Reveal delay={0} className="absolute inset-0 -z-10" innerClassName="h-full w-full bg-black/50">
          {null}
        </Reveal>
        <div className="relative flex min-h-[32rem] flex-col px-6 py-12 sm:min-h-[36rem] sm:px-10 sm:py-16 lg:px-14">
          <Reveal delay={300}>
            <p
              className={`font-display text-[11px] font-semibold tracking-[0.24em] text-accent uppercase ${textOnPhoto}`}
            >
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2
              className={`mt-3 mb-10 max-w-md font-display text-4xl font-extrabold tracking-tight text-white uppercase sm:mb-12 sm:text-5xl lg:mb-14 ${textOnPhoto}`}
            >
              {service.title}
            </h2>
          </Reveal>
          <Reveal
            delay={500}
            className="relative mt-auto max-w-md overflow-hidden border border-white p-6 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/55" aria-hidden />
            <div className="relative z-10">
              <h3
                className={`font-display text-lg font-bold tracking-tight text-white uppercase sm:text-xl ${textOnPhoto}`}
              >
                {spotlight.heading}
              </h3>
              <p
                className={`mt-2 font-display text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase ${textOnPhoto}`}
              >
                {service.summary}
              </p>
              <div
                className={`mt-4 space-y-3 text-[15px] leading-relaxed text-white/95 ${textOnPhoto}`}
              >
                {spotlight.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Link
                viewTransition
                to="/contact"
                className="relative z-10 mt-8 inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.18em] text-ink uppercase shadow-md hover:bg-[#eaff33]"
              >
                Contact us
                <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="bg-[repeating-linear-gradient(180deg,#f4f4f3_0,#f4f4f3_5rem,#ecebea_5rem,#ecebea_10rem)] px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <Reveal delay={300}>
          <h3 className="font-display text-lg font-bold tracking-tight text-blue">{culture.heading}</h3>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-mute">
            {culture.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal
          delay={500}
          className="relative mt-12 border border-ink/15 bg-white p-8 pt-12 sm:p-10 sm:pt-14"
        >
          <span className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-ink/15 bg-white">
            <Quotes size={22} weight="fill" className="text-accent" aria-hidden />
          </span>
          <p className="font-display text-lg font-bold tracking-tight text-blue">{presentations.heading}</p>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-mute italic">
            {presentations.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CategorySplit({
  index,
  service,
  image,
}: {
  index: number;
  service: (typeof services)[number];
  image?: string;
}) {
  const intro = (
    <>
      <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-accent uppercase">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
        {service.title}
      </h2>
      <p className="mt-4 text-lg text-white/80">{service.summary}</p>
    </>
  );

  const photoBlocks = service.sections.map((s) => (
    <ServiceBlockContent key={s.heading} {...s} onPhoto />
  ));

  const photoPanel = (
    <>
      <img
        alt=""
        aria-hidden
        src={image}
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
      />
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 space-y-10 px-5 py-14 sm:px-12 sm:py-20">{photoBlocks}</div>
    </>
  );

  return (
    <section className="bg-paper">
      <div
        className={`mx-auto grid max-w-6xl ${image ? "lg:grid-cols-2" : "lg:grid-cols-[2fr_3fr]"}`}
      >
        <Reveal className="bg-blue px-8 py-14 text-white sm:px-12 sm:py-20">{intro}</Reveal>
        {image ? (
          <ScrollClipReveal
            className="relative isolate min-h-[18rem] overflow-hidden"
            innerClassName="relative min-h-[18rem] h-full"
          >
            {photoPanel}
          </ScrollClipReveal>
        ) : (
          <div className="bg-paper px-5 py-14 sm:px-12 sm:py-20">
            <StaggeredServiceGrid sections={service.sections} layout="stack" />
          </div>
        )}
      </div>
    </section>
  );
}

function ServicesCta() {
  return (
    <section className="relative z-10 bg-white px-5 py-14 text-center sm:py-16">
      <p className="mx-auto max-w-3xl text-lg text-mute">
        Curious how we work, planning a future project, or ready to get started?
      </p>
      <Link
        viewTransition
        to="/contact"
        className="mt-6 inline-block bg-blue px-6 py-3 font-display text-[13px] font-semibold tracking-[0.15em] text-white uppercase hover:bg-blue/90"
      >
        Request a call back from one of our consultants
      </Link>
    </section>
  );
}

export default function SafetyServices() {
  const [hero, ...rest] = services;
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="overflow-x-clip">
      <ScrollProgressBar targetRef={pageRef} />
      <div className="hidden" aria-hidden>
        <PageHero
          title="Safety Services"
          image="/training/safety-services-homepage.jpg"
          scrim="from-blue/70 via-blue/35 to-transparent"
        >
          Providing solution-based safety services. Programs, lockout, COR audits,
          investigations, and on-site advisors.
        </PageHero>
      </div>

      <CategoryPhoto
        index={0}
        service={hero}
        image="/training/safety-services-homepage.jpg"
      />

      <ServicesCta />

      {rest.map((service, j) => {
        const i = j + 1;
        if (i % 2 === 0) {
          return (
            <CategoryLight
              key={service.title}
              index={i}
              service={service}
              sectionViewport={
                service.title === "Incidents & shutdowns" ? revealViewportHalf : revealViewport
              }
            />
          );
        }
        if (service.title === "People & culture") {
          return (
            <CategoryFeatured
              key={service.title}
              index={i}
              service={service}
              image="/home-showcases/leadership-supervision.jpg"
            />
          );
        }
        return (
          <CategorySplit
            key={service.title}
            index={i}
            service={service}
            image="/home-showcases/audits-compliance.jpg"
          />
        );
      })}

      <section className="bg-paper px-5 py-12 text-center">
        <p className="text-sm text-mute">
          Need industrial hygiene instead?{" "}
          <Link viewTransition to="/services/hygiene" className="text-blue hover:underline">
            Hygiene services
          </Link>
        </p>
      </section>
    </div>
  );
}
