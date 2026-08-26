import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";

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

export default function Services() {
  return (
    <>
      <section className="border-b border-line px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-hi uppercase">
            Services
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Consulting that holds up on site.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/70">
            Four lanes. Everything they offer still lives inside — without a
            ten-row list.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-0 sm:py-14">
        <Accordion items={services} />
        <p className="mt-10 px-5 text-sm text-mute sm:px-8">
          Need industrial hygiene instead?{" "}
          <Link to="/services/hygiene" className="text-hi hover:underline">
            Hygiene services
          </Link>
        </p>
      </section>
    </>
  );
}
