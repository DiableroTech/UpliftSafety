import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ScrollProgressBar from "../components/motion/ScrollProgressBar";
import {
  useSectionEnterProgress,
  useSectionInViewportProgress,
} from "../motion/scroll";

type CourseTheme = "photo" | "split" | "light" | "featured";

type Course = {
  title: string;
  duration: string;
  paragraphs: readonly string[];
  theme: CourseTheme;
  image?: string;
};

const courses: readonly Course[] = [
  {
    title: "Safety Leadership Training",
    duration: "8h",
    theme: "photo",
    image: "/home-showcases/leadership-supervision.jpg",
    paragraphs: [
      "What does safety leadership mean, how does it impact culture, what does safety leadership look like? We offer safety leadership training presented in a one-day, 8 hour format. This training can be customized for all levels of an organization: safety committees, supervisors, managers and executives.",
      "Have you received safety leadership training in the past that did not have sustainable results? We can provide proactive leadership metrics that ensure your organization is expecting and measuring the correct safety KPIs to drive results.",
    ],
  },
  {
    title: "Confined Space Training",
    duration: "1 day",
    theme: "split",
    image: "/home-showcases/hazard-incident-training.jpg",
    paragraphs: [
      "This one-day confined space training utilizes the 3M course curriculum and is recognized by all provincial regulators. It addresses principles and concepts of confined space safety and examines the roles of the attendant and entrant.",
      "A variety of instructional techniques (challenge questions, workbook exercises, case studies, and practical applications) are used to educate participants. Suited for confined space attendants, entrants, and supervisors of confined space entries.",
    ],
  },
  {
    title: "Incident Investigation Training",
    duration: "4–8h",
    theme: "light",
    paragraphs: [
      "If a workplace incident results in an injury, or could have caused a serious injury, employers have specific regulatory responsibilities. Incident investigations help identify the cause while finding ways to prevent reoccurrence.",
      "Presented as a 4 or 8 hour course covering applicable OHS regulation, how to respond to incidents, investigative interview skills, causal factors, root cause, and how to get value from your actions. Customizable for all levels of an organization.",
    ],
  },
  {
    title: "Hazard ID & Risk Assessment Training",
    duration: "4–8h",
    theme: "featured",
    image: "/home-showcases/hazard-incident-training.jpg",
    paragraphs: [
      "Facilitated in a 4 or 8 hour session. Participants learn how to identify hazards and complete a quantified risk assessment, then discuss which control measures should be in place to eliminate or mitigate the risk.",
      "The Uplift Safety team uses personal experiences of workplace incidents to immerse the learner in real-world examples. Participants leave with a new understanding and perspective of workplace hazards.",
    ],
  },
  {
    title: "Safety Committee (JHSC) Training",
    duration: "8h",
    theme: "photo",
    image: "/home-showcases/on-site-advisors.jpg",
    paragraphs: [
      "This 8 hour training meets the WorkSafeBC regulation for new safety committee member training. It introduces new members to the basic principles of workplace health and safety, and serves as a refresher for experienced members.",
      "Participants learn legal responsibilities, duties and functions of the Joint Committee, health and safety legislation, rights and responsibilities, key elements of an effective committee, evaluation, workplace inspection, and incident investigation.",
    ],
  },
  {
    title: "Equipment Safeguarding Training",
    duration: "4–8h",
    theme: "split",
    image: "/training/equipment-training-homepage.png",
    paragraphs: [
      "Presented in a 4 or 8 hour format focusing specifically on equipment hazards. Based on the CSA Z432 standard and applicable provincial regulations: a deep dive into equipment hazards, associated risk rating, and control measures.",
      "We introduce the CSA Z432 safeguarding risk assessment tool and complex guarding options such as light curtains, presence sensing devices, and safety-rated equipment interlocks.",
    ],
  },
  {
    title: "Industrial Safety Supervision Training",
    duration: "2 days",
    theme: "light",
    paragraphs: [
      "Front-line supervision is the most important position in the organization. Supervisors work directly with the front line to achieve the organization's goals. They need to understand their role, legal rights and responsibilities, and how important it is to be present in the workplace.",
      "Using adult learning principles, this 2 day training teaches supervisors how to be safety leaders, engage the workforce, and drive positive operational results, with the confidence to lead in today's evolving workplace.",
    ],
  },
  {
    title: "Fall Protection Training",
    duration: "½ or 1 day",
    theme: "featured",
    image: "/training/safety-training-homepage-2.png",
    paragraphs: [
      "Fall protection training can be completed as a half or full day course. Utilizing the 3M curriculum, both courses are recognized by provincial regulators.",
      "The half day course is suited for those who work at height in a specific situation with an established approved anchor point using basic connectors and body supports. The full day course is for those who work at height in various situations and will select and utilize the appropriate system components.",
    ],
  },
  {
    title: "Asbestos Safety Training",
    duration: "L1 / L2",
    theme: "photo",
    image: "/training/asbestos-training-homepage.jpg",
    paragraphs: [
      "Level 1 Asbestos Awareness: one day training for individuals and companies that could encounter asbestos materials during typical work. Provides WorkSafeBC Level 1 Certification.",
      "Level 2 Asbestos Safety Abatement: three day training for abatement workers who need to complete asbestos abatement work safely. Provides WorkSafeBC Level 2 Certification.",
    ],
  },
];

const textOnPhoto =
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.65)]";

function courseNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function ScrollFadeSlide({
  progress,
  range,
  className,
  children,
  distance = "-100%",
}: {
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  children: ReactNode;
  distance?: string;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, [0, 1]);
  const x = useTransform(progress, range, [distance, "0%"]);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ opacity, x, backfaceVisibility: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

function ScrollFadeRise({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, ["3.75rem", "0rem"]);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

function CoursePhoto({ index, course }: { index: number; course: Course }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useSectionInViewportProgress(sectionRef);
  const photoY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.03]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-paper">
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          className="h-full min-h-[24rem] w-full bg-paper bg-cover sm:min-h-[28rem]"
          style={{
            backgroundImage: `url(${course.image})`,
            backgroundPosition: "right center",
            ...(reduce ? {} : { y: photoY, scale: photoScale }),
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden lg:w-[62%]"
      >
        <ScrollFadeSlide
          progress={scrollYProgress}
          range={[0, 0.35]}
          className="h-full bg-black/50"
        >
          {null}
        </ScrollFadeSlide>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-16 text-white sm:py-20">
        <div className="lg:max-w-[52%]">
          <ScrollFadeSlide progress={scrollYProgress} range={[0.08, 0.45]}>
            <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-accent uppercase">
              {courseNumber(index)}
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
              {course.title}
            </h2>
            <p className="mt-3 text-lg text-white/80">{course.duration}</p>
          </ScrollFadeSlide>
          <ScrollFadeSlide
            progress={scrollYProgress}
            range={[0.15, 0.55]}
            className="mt-10 space-y-3 text-[15px] leading-relaxed text-white/90"
            distance="-40%"
          >
            {course.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ScrollFadeSlide>
        </div>
      </div>
    </section>
  );
}

function CourseSplit({ index, course }: { index: number; course: Course }) {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <Reveal className="bg-blue px-8 py-14 text-white sm:px-12 sm:py-20">
          <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-accent uppercase">
            {courseNumber(index)}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
            {course.title}
          </h2>
          <p className="mt-4 text-lg text-white/80">{course.duration}</p>
        </Reveal>
        <Reveal className="relative isolate min-h-[18rem] overflow-hidden">
          <img
            alt=""
            aria-hidden
            src={course.image}
            className="absolute inset-0 h-full w-full object-cover"
            decoding="async"
          />
          <div aria-hidden className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 space-y-3 px-5 py-14 text-[15px] leading-relaxed text-white/90 sm:px-12 sm:py-20">
            {course.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CourseLight({ index, course }: { index: number; course: Course }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useSectionEnterProgress(sectionRef);
  const twoColumns = course.paragraphs.length > 1;

  return (
    <section ref={sectionRef} className="bg-white px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollFadeRise progress={scrollYProgress} range={[0, 0.4]}>
          <p className="text-center font-display text-[11px] font-semibold tracking-[0.24em] text-mute uppercase">
            {courseNumber(index)}
          </p>
          <h2 className="mt-2 text-center font-display text-3xl font-extrabold tracking-tight text-blue uppercase sm:text-4xl">
            {course.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-mute">{course.duration}</p>
        </ScrollFadeRise>
        <div
          className={`mt-12 grid gap-x-12 gap-y-10 ${twoColumns ? "md:grid-cols-2" : ""}`}
        >
          {course.paragraphs.map((paragraph, paragraphIndex) => (
            <ScrollFadeRise
              key={paragraph}
              progress={scrollYProgress}
              range={[0.2 + paragraphIndex * 0.15, 0.55 + paragraphIndex * 0.15]}
              className="text-[15px] leading-relaxed text-mute"
            >
              <p>{paragraph}</p>
            </ScrollFadeRise>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseFeatured({ index, course }: { index: number; course: Course }) {
  const [lead, ...rest] = course.paragraphs;

  return (
    <section className="grid lg:grid-cols-2">
      <div
        className="relative isolate min-h-[32rem] bg-cover bg-center sm:min-h-[36rem]"
        style={{ backgroundImage: `url(${course.image})` }}
      >
        <Reveal delay={0} className="absolute inset-0 -z-10" innerClassName="h-full w-full bg-black/50">
          {null}
        </Reveal>
        <div className="relative flex min-h-[32rem] flex-col px-6 py-12 sm:min-h-[36rem] sm:px-10 sm:py-16 lg:px-14">
          <Reveal delay={300}>
            <p
              className={`font-display text-[11px] font-semibold tracking-[0.24em] text-accent uppercase ${textOnPhoto}`}
            >
              {courseNumber(index)}
            </p>
            <h2
              className={`mt-3 mb-10 max-w-md font-display text-4xl font-extrabold tracking-tight text-white uppercase sm:mb-12 sm:text-5xl lg:mb-14 ${textOnPhoto}`}
            >
              {course.title}
            </h2>
          </Reveal>
          <Reveal
            delay={500}
            className="relative mt-auto max-w-md overflow-hidden border border-white p-6 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/55" aria-hidden />
            <div className="relative z-10">
              <p
                className={`font-display text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase ${textOnPhoto}`}
              >
                {course.duration}
              </p>
              <p className={`mt-4 text-[15px] leading-relaxed text-white/95 ${textOnPhoto}`}>
                {lead}
              </p>
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
      {rest.length > 0 ? (
        <div className="bg-[repeating-linear-gradient(180deg,#f4f4f3_0,#f4f4f3_5rem,#ecebea_5rem,#ecebea_10rem)] px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <Reveal delay={300} className="space-y-3 text-[15px] leading-relaxed text-mute">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      ) : null}
    </section>
  );
}

function CourseSection({ course, index }: { course: Course; index: number }) {
  switch (course.theme) {
    case "photo":
      return <CoursePhoto course={course} index={index} />;
    case "split":
      return <CourseSplit course={course} index={index} />;
    case "light":
      return <CourseLight course={course} index={index} />;
    case "featured":
      return <CourseFeatured course={course} index={index} />;
  }
}

function TrainingCta() {
  return (
    <section className="relative z-10 bg-white px-5 py-14 text-center sm:py-16">
      <Reveal from="bottom" className="mx-auto max-w-3xl">
        <p className="text-lg text-mute">Ready to book a course for your crew?</p>
        <Link
          viewTransition
          to="/contact"
          className="mt-6 inline-block bg-blue px-6 py-3 font-display text-[13px] font-semibold tracking-[0.15em] text-white uppercase hover:bg-blue/90"
        >
          Book group training
        </Link>
      </Reveal>
    </section>
  );
}

export default function TrainingV2() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [first, ...rest] = courses;

  return (
    <div ref={pageRef} className="overflow-x-clip">
      <ScrollProgressBar targetRef={pageRef} />
      <CourseSection course={first} index={0} />
      <TrainingCta />
      {rest.map((course, index) => (
        <CourseSection key={course.title} course={course} index={index + 1} />
      ))}
      <section className="bg-paper px-5 py-12 text-center">
        <p className="text-sm text-mute">
          Need mobile equipment training instead?{" "}
          <Link viewTransition to="/training/equipment" className="text-blue hover:underline">
            Mobile Equipment Training
          </Link>
        </p>
      </section>
    </div>
  );
}
