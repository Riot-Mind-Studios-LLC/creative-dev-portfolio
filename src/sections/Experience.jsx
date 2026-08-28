// experiences list
const experiences = [
  {
    period: "Today",
    role: "UI Developer / Interactive Developer",
    institution: "In progress...",
    description:
      "Expanding a decade of hand-coded animation work into modern front-end development. Building real applications with React, Tailwind CSS, Shadcn, and RESTful APIs — moving from static production work to interactive, data-driven interfaces. Currently applying GSAP within React using the useGSAP hook, bridging deep animation expertise with component-based architecture. Building toward full ownership of interactive web applications, from interface to motion to deployment.",
    technologies: [
      ".jsx",
      ".vite",
      ".config",
      ".tailwindcss",
      ".git",
      ".api",
      "claude ai",
    ],
    current: true,
  },
  {
    period: "2024 - 2026",
    role: "Creative Ad Banner Developer",
    institution: "Omnicom Production",
    description:
      "Continued as Creative Developer following Omnicom's acquisition of Merkley + Partners, maintaining the same high-volume HTML5 production workflow for existing and new accounts. Applied my custom GreenSock framework across simultaneous campaigns, managing full production from comp to final ad-serving delivery. Role concluded with the position's elimination in May 2026.",
    technologies: [".html", ".css", ".js", ".gasp", ".psd", ".ai", ".php"],
    current: false,
  },
  {
    period: "2019 - 2024",
    role: "Creative Ad Banner Developer",
    institution: "Merkley + Partners",
    description:
      "Spent nearly five years as lead hands-on banner developer, building HTML5 ad units for major clients including Mercedes-Benz, Toyota, Converse, and T-Mobile using my custom GreenSock framework. Delivered up to 50 banner units per week across 3–4 simultaneous campaigns, building internal staging tools for client review and QA. Kept high-volume output consistent through the agency's later acquisition by Omnicom Production.",
    technologies: [".html", ".css", ".js", ".gasp", ".psd", ".ai", ".php"],
    current: false,
  },
  {
    period: "2018 - 2019",
    role: "Rich Media Developer",
    institution: "Bannerboy Corporation",
    description:
      "Worked at a specialized rich media shop focused exclusively on high-volume HTML5 banner output for multiple clients simultaneously. Refined my GreenSock framework to increase build speed without sacrificing animation quality or cross-browser reliability. Managed full production across several concurrent campaigns weekly and built internal staging tools for faster QA turnaround.",
    technologies: [".html", ".css", ".js", ".gasp", ".psd", ".ai", ".php"],
    current: false,
  },
  {
    period: "2018 - 2018",
    role: "Creative Banner Developer",
    institution: "Elizabeth Arden - Contract",
    description:
      "Short-term contract building HTML5 ad banners in-house for Elizabeth Arden's marketing team, applying my established GreenSock production process to brand-specific campaigns. Delivered animated units from comp to final file, managing QA and ad-serving compliance independently. Maintained the same production standards and delivery speed as my agency work, in a tighter brand-side environment.",
    technologies: [".html", ".css", ".js", ".gasp", ".psd", ".ai"],
    current: false,
  },
  {
    period: "2015 - 2017",
    role: "Rich Media Designer",
    institution: "Droga5",
    description:
      "Started my career hand-coding HTML5 banner units in vanilla JavaScript, building the early version of the custom GreenSock framework I'd carry forward for a decade. Worked from creative comps to build animated, cross-browser-compliant ad units under agency deadlines, handling asset export and ad-serving packaging. Collaborated closely with creative and account teams across concurrent campaigns.",
    technologies: [
      ".html",
      ".css",
      ".js",
      ".gasp",
      ".psd",
      ".ai",
      ".fla",
      ".swf",
    ],
    current: false,
  },
];

// brands list
const brands = [
  "Mercedes-Benz",
  "White Castle",
  "Novartis",
  "Idorsia",
  "Captain D's",
  "Google",
  "T-Mobile",
  "Starbucks",
  "Spotify",
  "Revlon",
  "Scion",
  "Johnsonville",
  "Band-Aid",
  "Toyota",
  "Dexcom",
  "Converse",
  "Husqvarna",
  "Smart-Water",
  "Printful",
  "MyCapssa",
  "Mini",
  "Chase",
  "Facebook",
  "State Farm",
];

const Experience = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* section header */}
        <div className="max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Steady work.
            <span className="font-serif italic font-normal text-white">
              {" "}
              Real growth.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            10+ years hand-coding HTML5 ad banners for major agencies and global
            brands, backed by a business background built from founding and
            running my own e-commerce company. Now expanding that foundation
            into modern front-end development, one project at a time.
          </p>
        </div>

        {/* timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* experience items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                {/* timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* content */}
                <div
                  className={`pl-8 md:pl-0 ${idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}
                >
                  <div
                    className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}
                  >
                    {/* experience info */}
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.institution}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      {exp.description}
                    </p>
                    <div
                      className={`flex-flex-wrap gap-2 mt-4 ${idx % 2 === 0 ? "md:justify-end" : ""}`}
                    >
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* scrolling brands section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Brands I've work with
          </p>

          <div className="relative overflow-hidden">
            <div className="flex animate-marquee">
              {[...brands, ...brands].map((skill, idx) => (
                <div key={idx} className="shrink-0 px-8 py-4">
                  <span className="text-md font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
