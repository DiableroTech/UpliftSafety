import CourseCatalog from "../components/CourseCatalog";
import PageHero from "../components/PageHero";

const courses = [
  {
    title: "Forklift Training",
    duration: "Ives / CSA",
    body: [
      "Using the Ives training curriculum, this Counterbalance Forklift Training is designed using parameters set out by CSA standards and provincial safety regulations. Students gain practical knowledge in applicable safety regulations, their responsibilities, how to inspect equipment, how to determine lift capacity and load limitation, and how to safely operate forklifts in the workplace.",
      "Educational materials, student workbooks, case studies and hands-on exercises keep students engaged for the duration of the course.",
    ],
  },
  {
    title: "Boom Lift Training",
    duration: "Ives / CSA",
    body: [
      "Using the Ives training curriculum, this Boom Lift / Aerial Platform Training is designed to CSA standards and provincial safety regulations. Students gain practical knowledge in applicable safety regulations, their responsibilities, equipment inspection, lift capacity and load limitation, and safe operation of boom lifts.",
      "Educational materials, workbooks, case studies and hands-on exercises keep students engaged throughout.",
    ],
  },
  {
    title: "Telehandler Training",
    duration: "Ives / CSA",
    body: [
      "Using the Ives training curriculum, this Telehandler / Zoom Boom Training is designed to CSA standards and provincial safety regulations. Students gain practical knowledge in applicable safety regulations, their responsibilities, equipment inspection, lift capacity and load limitation, and safe operation of telehandlers.",
      "Educational materials, workbooks, case studies and hands-on exercises keep students engaged throughout.",
    ],
  },
  {
    title: "Scissor Lift Training",
    duration: "Ives / CSA",
    body: [
      "Using the Ives training curriculum, this Scissor Lift Training is designed to CSA standards and provincial safety regulations. Students gain practical knowledge in applicable safety regulations, their responsibilities, equipment inspection, lift capacity and load limitation, and safe operation of scissor lifts.",
      "Educational materials, workbooks, case studies and hands-on exercises keep students engaged throughout.",
    ],
  },
  {
    title: "Propane Training",
    duration: "PTI",
    body: [
      "Using the PTI (Propane Training Institute) curriculum, this course provides propane forklift operators with the information necessary to meet CSA Standard and provincial regulations. The course includes both a written and practical hands-on examination.",
      "Assumes forklift operators will be volume-filling propane forklift cylinders using propane dispensing equipment at their employer’s location.",
    ],
  },
];

export default function Equipment() {
  return (
    <>
      <PageHero
        kicker="Mobile equipment"
        title="Mobile Equipment Training"
        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80"
      >
        Forklift, boom lift, telehandler, scissor lift, and propane training
        using the Ives and PTI curriculum, designed to CSA standards and
        provincial safety regulations.
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <CourseCatalog courses={courses} />
      </section>
    </>
  );
}
