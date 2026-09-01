import CourseCatalog from "../components/CourseCatalog";
import PageHero from "../components/PageHero";

const courses = [
  {
    title: "Safety Leadership Training",
    duration: "8h",
    body: [
      "What does safety leadership mean, how does it impact culture, what does safety leadership look like? We offer safety leadership training presented in a one-day, 8 hour format. This training can be customized for all levels of an organization: safety committees, supervisors, managers and executives.",
      "Have you received safety leadership training in the past that did not have sustainable results? We can provide proactive leadership metrics that ensure your organization is expecting and measuring the correct safety KPIs to drive results.",
    ],
  },
  {
    title: "Confined Space Training",
    duration: "1 day",
    body: [
      "This one-day confined space training utilizes the 3M course curriculum and is recognized by all provincial regulators. It addresses principles and concepts of confined space safety and examines the roles of the attendant and entrant.",
      "A variety of instructional techniques (challenge questions, workbook exercises, case studies, and practical applications) are used to educate participants. Suited for confined space attendants, entrants, and supervisors of confined space entries.",
    ],
  },
  {
    title: "Incident Investigation Training",
    duration: "4–8h",
    body: [
      "If a workplace incident results in an injury, or could have caused a serious injury, employers have specific regulatory responsibilities. Incident investigations help identify the cause while finding ways to prevent reoccurrence.",
      "Presented as a 4 or 8 hour course covering applicable OHS regulation, how to respond to incidents, investigative interview skills, causal factors, root cause, and how to get value from your actions. Customizable for all levels of an organization.",
    ],
  },
  {
    title: "Hazard ID & Risk Assessment Training",
    duration: "4–8h",
    body: [
      "Facilitated in a 4 or 8 hour session. Participants learn how to identify hazards and complete a quantified risk assessment, then discuss which control measures should be in place to eliminate or mitigate the risk.",
      "The Uplift Safety team uses personal experiences of workplace incidents to immerse the learner in real-world examples. Participants leave with a new understanding and perspective of workplace hazards.",
    ],
  },
  {
    title: "Safety Committee (JHSC) Training",
    duration: "8h",
    body: [
      "This 8 hour training meets the WorkSafeBC regulation for new safety committee member training. It introduces new members to the basic principles of workplace health and safety, and serves as a refresher for experienced members.",
      "Participants learn legal responsibilities, duties and functions of the Joint Committee, health and safety legislation, rights and responsibilities, key elements of an effective committee, evaluation, workplace inspection, and incident investigation.",
    ],
  },
  {
    title: "Equipment Safeguarding Training",
    duration: "4–8h",
    body: [
      "Presented in a 4 or 8 hour format focusing specifically on equipment hazards. Based on the CSA Z432 standard and applicable provincial regulations: a deep dive into equipment hazards, associated risk rating, and control measures.",
      "We introduce the CSA Z432 safeguarding risk assessment tool and complex guarding options such as light curtains, presence sensing devices, and safety-rated equipment interlocks.",
    ],
  },
  {
    title: "Industrial Safety Supervision Training",
    duration: "2 days",
    body: [
      "Front-line supervision is the most important position in the organization. Supervisors work directly with the front line to achieve the organization's goals. They need to understand their role, legal rights and responsibilities, and how important it is to be present in the workplace.",
      "Using adult learning principles, this 2 day training teaches supervisors how to be safety leaders, engage the workforce, and drive positive operational results, with the confidence to lead in today's evolving workplace.",
    ],
  },
  {
    title: "Fall Protection Training",
    duration: "½ or 1 day",
    body: [
      "Fall protection training can be completed as a half or full day course. Utilizing the 3M curriculum, both courses are recognized by provincial regulators.",
      "The half day course is suited for those who work at height in a specific situation with an established approved anchor point using basic connectors and body supports. The full day course is for those who work at height in various situations and will select and utilize the appropriate system components.",
    ],
  },
  {
    title: "Asbestos Safety Training",
    duration: "L1 / L2",
    body: [
      "Level 1 Asbestos Awareness: one day training for individuals and companies that could encounter asbestos materials during typical work. Provides WorkSafeBC Level 1 Certification.",
      "Level 2 Asbestos Safety Abatement: three day training for abatement workers who need to complete asbestos abatement work safely. Provides WorkSafeBC Level 2 Certification.",
    ],
  },
];

export default function Training() {
  return (
    <>
      <PageHero
        title="Safety Training"
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
      >
        WorkSafeBC-recognized courses for leadership, confined space, fall
        protection, committees, and asbestos certification.
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <CourseCatalog courses={courses} />
      </section>
    </>
  );
}
