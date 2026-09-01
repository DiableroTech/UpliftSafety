import PageHero from "../components/PageHero";
import Tabs from "../components/Tabs";

const hygiene = [
  {
    label: "Exposure control",
    sections: [
      {
        heading: "Exposure Control Plans",
        body: [
          "Do you work with hazardous materials, chemicals or other substances? Exposure control plans protect workers from hazardous materials or substances that may be harmful to their short term or long term health. Exposure control plans are required for substances such as; formaldehyde, isocyanates, lead, silica, asbestos, welding fumes, benzene, biological agents, noise, particulate, heat/cold and many others. We will provide you with an exposure control plan that outlines roles and responsibilities, risk identification, control measures, requirements for education, training and written procedures.",
        ],
      },
      {
        heading: "Occupational Hygiene Monitoring",
        body: [
          "Many organizations don't know where to start when understanding worker exposures to hazardous airborne substances. Our certified industrial hygienist has the industry experience and qualifications to conduct airborne sampling and interpret the results. Our certified industrial hygienist (CIH) will conduct an assessment, monitor worker exposure and provide you with a report outlining your exposure profile. From here, we can further assist you with developing a control plan unique to your organization.",
        ],
      },
    ],
  },
  {
    label: "Air & climate",
    sections: [
      {
        heading: "Heat and Cold Stress",
        body: [
          "If you are required to evaluate whether temperature extremes place your workers at risk of heat stress or cold related illness, we can help. Using specialized instruments, the Uplift Safety team can evaluate your workplace conditions to determine worker exposure and risk factors in accordance with OHS regulations and established Occupational Hygiene standards. Uplift Safety can provide you with accurate information and practical advice to ensure your workers safety.",
        ],
      },
      {
        heading: "Indoor Air Quality and Mould",
        body: [
          "Many organizations struggle with identifying and resolving the source of indoor air quality (IAQ) complaints. Resolving these concerns requires an understanding of building ventilation systems, and airborne contaminants. Uplift Safety has the expertise you need to resolve indoor air quality (IAQ) complaints. We will complete an investigation, interview workers, inspect for likely sources and conduct air sampling if warranted. Call us for guidance in resolving your indoor air quality concerns.",
        ],
      },
      {
        heading: "Ventilation",
        body: [
          "If you are relying on ventilation to control contaminants you need to assess whether it is properly functioning. General ventilation systems control indoor building air quality, whereas local exhaust ventilation can provide contaminant control local to the source of the hazard or contaminant. Our certified industrial hygienist can assist you with ventilation concerns to ensure adequate hazard control and monitor the efficacy of your exhaust systems.",
        ],
      },
    ],
  },
  {
    label: "Body & hearing",
    sections: [
      {
        heading: "Ergonomic Assessments",
        body: [
          "Musculoskeletal Injuries (MSIs) are one of the leading causes of lost time injuries in manufacturing, healthcare and other industries. The Uplift Safety Ergonomics and MSI program has a proven record of reducing MSI injuries, engaging workers and reducing recordable injury rates. We start with ergonomic assessments of your worksite to identify ergonomic risks and potential control measures. We can provide ergonomic training to both workers and management to help you reduce these injuries.",
        ],
      },
      {
        heading: "Noise Assessments",
        body: [
          "If you need help with noise related risks, we can provide the right information to protect workers and prevent noise induced hearing loss. When workers are or may be exposed to noise above 82 dBA Lex, employers must measure the noise exposure unless an exemption applies. Our qualified professionals have conducted noise surveys and can help you navigate noise regulations. We can conduct noise dosimetry on workers, workplace noise surveys, and provide recommendations for engineering controls, hearing protection, education and fit testing.",
        ],
      },
    ],
  },
  {
    label: "Respiratory",
    sections: [
      {
        heading: "Fit Testing",
        body: [
          "Keeping workers up to date on respirator fit testing can be time consuming and exhausting for your safety team. Uplift Safety can perform quantitative and qualitative fit testing for various respirator types, and provide the necessary education to complement your respiratory protection program. The team will answer questions about respirator types, the fit testing process, or what filters are correct for your workplace.",
        ],
      },
      {
        heading: "Welding Fumes",
        body: [
          "Worksites where welding (TIG, MIG, MCAW, and others) occurs may expose workers to hazardous concentrations of antimony, beryllium, cadmium, chromium, copper, iron oxide, lead, manganese, molybdenum, nickel, vanadium, and zinc oxide. Our certified hygienist can sample worker exposure to welding fumes, perform a welding fume assessment, assess ventilation requirements and recommend other control measures. Sampling and recommendations can be integrated into your company's safety program so you meet regulatory requirements.",
        ],
      },
    ],
  },
  {
    label: "Hazardous materials",
    sections: [
      {
        heading: "Asbestos",
        body: [
          "An industrial hygienist plays a crucial role in assessing and managing asbestos-related hazards. Our hygienists have the professional qualifications required to perform asbestos sampling and inventories. They can measure the concentration of airborne asbestos fibers and perform clearance air sampling after an abatement project in accordance with WorkSafeBC Regulations. Based on risk assessments and exposure monitoring, they can develop control strategies to minimize or eliminate asbestos exposure.",
        ],
      },
      {
        heading: "Silica",
        body: [
          "Our certified industrial hygienist can conduct comprehensive exposure assessments to evaluate silica in the workplace. This involves collecting air samples, conducting personal monitoring, and analyzing samples to determine silica concentration. Based on sampling and risk evaluation, we recommend and develop silica control strategies, and can train workers and management on hazards, control measures, PPE, and practices that reduce exposure.",
        ],
      },
      {
        heading: "Lead",
        body: [
          "Our industrial hygienists identify potential sources and pathways of lead exposure: work processes, materials, equipment, and areas of concern. We conduct exposure assessments, then recommend and develop control strategies to minimize or eliminate lead exposure. Hygienists can also collaborate with healthcare professionals to establish and maintain medical surveillance programs.",
        ],
      },
      {
        heading: "Formaldehyde",
        body: [
          "Formaldehyde is a carcinogen found in manufacturing, healthcare, construction, and textiles. Our industrial hygienists conduct air sampling to measure concentration in the work environment. Results inform exposure levels and control measures, and we assist with understanding and complying with formaldehyde exposure limits.",
        ],
      },
      {
        heading: "Isocyanates",
        body: [
          "Isocyanates are used in polyurethane production and pose significant health hazards. Air sampling for isocyanates is specialized and must be performed by an industrial hygienist familiar with their unique properties and field instability. We place sampling devices where isocyanates are used or released (spray booths, production lines) and collect representative samples, then recommend control strategies for regulatory compliance.",
        ],
      },
      {
        heading: "VOCs",
        body: [
          "Exposure to high concentrations of volatile organic compounds can have adverse health effects. Our industrial hygienists conduct air sampling and monitoring to measure VOC concentration in your work environment. Results inform control measures, and we assist with understanding and meeting regulatory requirements.",
        ],
      },
      {
        heading: "Infectious diseases",
        body: [
          "Infectious diseases can show up where workplaces have risks from birds, rodents, mould, bacteria, viruses, fungi, and parasites. Some can pass from person to person or from animal to person. Our industrial hygienist can assess infectious disease hazards and recommend control measures such as air sampling, hygiene procedures, engineering controls and PPE.",
        ],
      },
    ],
  },
];

export default function Hygiene() {
  return (
    <>
      <PageHero
        title="Hygiene Services"
        image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2000&q=80"
      >
        Exposure control, air sampling, and assessments. Delivered by a
        Certified Industrial Hygienist.
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <Tabs items={hygiene} />
      </section>
    </>
  );
}
