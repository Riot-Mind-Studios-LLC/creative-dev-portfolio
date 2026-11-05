// import dependancies
import { ArrowUpRight } from "lucide-react";

// case studies array
// each object = one card. the Case Studies section loops through this list
// sections = the story steps. labels can differ per card, so each step stores its own label and text
// link is optional. a card with no link simply shows no "View project" button
const caseStudies = [
  {
    title: "Tracking Eight Ads From One Template",
    type: "Marketing Technology",
    sections: [
      {
        label: "Problem",
        text: "Eight audience-specific ads need separate click reporting, but they share one template.",
      },
      {
        label: "Diagnosis",
        text: "A single click URL couldn't show which version earned the click, so the destination had to live in the feed instead of the template.",
      },
      {
        label: "Fix",
        text: "Each feed row has its own exit URL with UTM values for source and content. The template sets clickTag from the selected row, and the click handler reads it when the ad is clicked. The field names are built to map to dynamic content in Campaign Manager 360 or Flashtalking.",
      },
      {
        label: "Result",
        text: "Each ad can open its own tagged URL, so one template can still report by audience. This is a self-hosted demo and hasn't run on a live ad server.",
      },
    ],
    tags: ["Marketing Technology", "clickTag", "UTM Parameters", "DCO"],
    // link: "/creative-dev-portfolio/apps/orrin-dco/index.html",
  },
  {
    title: "Giving Clients One Place to Review Banners",
    type: "Client Workflow",
    sections: [
      {
        label: "Problem",
        text: "Banner reviews involve multiple sizes, files, click URLs, and approval stages.",
      },
      {
        label: "Approach",
        text: "Reviewers needed to see the live ad, fallback, status, and delivery details together.",
      },
      {
        label: "Build",
        text: "I created a reusable staging site organized by IAB size. It includes live playback, fallback previews, clickthrough URLs, source downloads, and a JSON-driven file manifest. Status badges show Draft, In Review, Approved, or Delivered, and version dates update from the file's last-modified date.",
      },
      {
        label: "Result",
        text: "Each campaign gets one shared review page, and the setup guide lets the template be duplicated for the next project.",
      },
    ],
    tags: ["Client Review", "Campaign Delivery", "Rich Media", "JSON"],
    // link: "/creative-dev-portfolio/apps/banner-staging/index.html",
  },
  {
    title: "Fitting Variable DCO Copy Inside a Fixed Ad",
    type: "Troubleshooting",
    sections: [
      {
        label: "Problem",
        text: "One 300x250 template produces eight ads, and the copy length changes with every row in the feed.",
      },
      {
        label: "Diagnosis",
        text: "A long headline or offer could overflow the layout, and adjusting each version by hand would defeat the purpose of one template.",
      },
      {
        label: "Fix",
        text: "I built a fitText function that lowers the font size one pixel at a time until the text fits its box. Each text element has its own height limit and minimum size, and the layout positions around the final text.",
      },
      {
        label: "Result",
        text: "All eight ads rendered inside the frame. Auto-fit reduced the Chicago and Seattle offers to one line, and the banner folder stayed at about 79 KB with no image files.",
      },
    ],
    tags: ["DCO", "Dynamic Creative", "Data Feed", "GSAP", "QA"],
    // link: "/creative-dev-portfolio/apps/orrin-dco/index.html",
  },
  {
    title: "Matching Legal ISI Copy Across Design and Code",
    type: "Client Problem Solving",
    sections: [
      {
        label: "Problem",
        text: "A set of Idorsia banners included Important Safety Information (ISI) that had to match the .psd file exactly for legal reasons, including line breaks at specific words.",
      },
      {
        label: "Diagnosis",
        text: "Photoshop and web browsers render type differently, so the design couldn't be translated directly. Forcing an exact match would have broken modern coding conventions.",
      },
      {
        label: "Resolution",
        text: "I worked through several rounds with the account manager and client, explaining the rendering differences and why a direct copy of the layout would break the code.",
      },
      {
        label: "Result",
        text: "We reached a compromise: the code stayed intact, and the ISI rendered as closely to the design as the browser allowed.",
      },
    ],
    tags: [
      "Client Communication",
      "Pharma Advertising",
      "ISI Copy",
      "HTML5 Banners",
    ],
  },
];

const CaseStudies = () => {
  return (
    // id="case-studies" is the address the nav link will jump to in step 2
    <section id="case-studies" className="pt-32 relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* section header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            The problems,{" "}
            <span className="font-serif italic font-normal text-primary">
              {" "}
              & the fixes.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            How I work through tracking, client review, dynamic copy, and legal
            requirements. This section covers one client project and three
            builds from this portfolio.
          </p>
        </div>

        {/* case studies grid: 1 column on phones, 2 columns from md screens up */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* loop through caseStudies to render one card per object */}
          {caseStudies.map((study, idx) => (
            <article
              key={idx}
              className="glass rounded-2xl p-6 space-y-5 animate-fade-in"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              {/* case study type and title */}
              <div className="space-y-3">
                <span className="text-xs font-medium tracking-wider uppercase text-highlight">
                  {study.type}
                </span>
                <h3 className="text-xl font-semibold">{study.title}</h3>
              </div>

              {/* second loop: render every story step inside this one card */}
              <div className="space-y-4">
                {study.sections.map((section) => (
                  <div key={section.label}>
                    <h4 className="text-sm font-semibold text-secondary-foreground mb-1">
                      {section.label}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* case study tags */}
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* && = only show this link when the study has one */}
              {study.link && (
                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-foreground transition-colors"
                >
                  View project <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
