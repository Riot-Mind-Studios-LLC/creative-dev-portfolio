// import dependancies
import { ArrowUpRight } from "lucide-react";

// import assets
import project1 from "@/assets/project1.png";
import project2 from "@/assets/project2.png";
import project3 from "@/assets/project3.png";
import project4 from "@/assets/project4.png";
import project5 from "@/assets/project5.png";
import project6 from "@/assets/project6.png";

// projects array
const projects = [
  {
    title: "Grocery List App",
    description:
      "Don't Forget The Bacon is a fully responsive React grocery list app built from scratch with Vite, Tailwind CSS v4, and GSAP. The app features preset item categories organized in a collapsible accordion, a custom item input, light/dark theme toggle, and list export via download, native share, or email. The standout feature is an animated 'Bacon Meter' built with GSAP's useGSAP() hook — a progress bar that fills as items are added, caps below 100% until bacon makes the list, and plays a celebratory spin animation once it does. State is lifted and shared across components using React's useState, with real-time UI updates driven by one-directional data flow. Built solo as a hands-on introduction to modern front-end tooling.",
    image: project1,
    tags: ["React", "Vite", "Tailwind CSS", "GSAP", "Claude AI"],
    link: "/creative-dev-portfolio/apps/dont-forget-the-bacon/index.html",
  },
  {
    title: "Rich Media - Ad Banners",
    description:
      "Over the past 10+ years, I've hand-coded HTML5 animated ad banners for major agency clients — building each campaign from the ground up in vanilla HTML, CSS, and JavaScript, animated with GreenSock (TweenMax/TimelineMax/GSAP). My work spans automotive, food & beverage, technology, fashion, and pharmaceutical brands including Mercedes-Benz, Google, T-Mobile, Starbucks, Spotify, Toyota, and Converse, built across five agencies handling high-volume production on tight timelines. Every banner is built to spec against IAB standard sizes and platform requirements (DoubleClick, Flashtalking), with a focus on clean, lightweight code, precise cross-browser performance, and pixel-accurate execution from design to final delivery.",
    image: project2,
    tags: ["HTML", "CSS", "JS", "GSAP"],
    link: "/creative-dev-portfolio/apps/banner-projects/index.html",
  },
  {
    title: "Shopify E-Commerce Production & Management",
    description:
      "I'm the sole owner and operator of Riot Mind Studios, LLC, a home-based ecommerce company built around four product studios. Label Co. handles in-house design, production, and shipping, while Print Works, Wovn Depot, and Gravity Labs use print-on-demand fulfillment for posters, apparel, and custom accessories. I manage the entire operation independently — from product design and Shopify storefront management to fulfillment logistics, customer service, marketing, and financial systems — using structured processes and disciplined cash management to keep the business lean, organized, and built for sustainable growth.",
    image: project3,
    tags: [
      "Ecommerce Operations",
      "Product Design & Development",
      "Systems & Process Management",
    ],
    link: "https://riotmindstudios.com/",
  },
  {
    title: "Ad Banner Staging Site",
    description:
      "A custom-built, client-facing HTML5 banner staging and review platform that streamlines digital campaign production. Built in vanilla HTML, CSS, and JavaScript, it organizes animated banners by IAB size with fallback previews, live playback, source manifests, clickthrough URLs, and downloads. Color-coded badges track production status with automated versioning. Campaign details feed into a report featuring asset counts, status summaries, timelines, and banner breakdowns. Additional features include sticky navigation, HTML5 validation, design deck viewing, ad standards references, onboarding guides, and a JSON-driven manifest for fast campaign deployment.",
    image: project4,
    tags: ["HTML", "CSS", "JS", "Claude AI"],
    link: "/creative-dev-portfolio/apps/banner-staging/index.html",
  },
  {
    title: "Vehicle Maintenance Tracker App",
    description:
      "Panther Tracker is a vehicle maintenance tracker built for the Ford Panther platform community — Crown Victoria, Grand Marquis, and Town Car owners across the 2003–2011 model years. Built solo with React 19, Vite, Tailwind CSS v4, shadcn/ui with Radix UI primitives, and GSAP for interactive animations, the app covers six sections: vehicle profile management with photo upload, a searchable maintenance log, mileage- and date-based reminders with automatic overdue detection, parts and cost tracking, document storage, and data management tools. The current build runs on browser local storage as a fully working demo, with a planned production version connecting to a real backend for cross-device persistence, serving as a free tool for the Panther enthusiast community.",
    image: project5,
    tags: ["React", "Vite", "Tailwind CSS", "GSAP", "Claude AI", "Shadcn"],
    link: "/creative-dev-portfolio/apps/panther-tracker/index.html",
  },
  {
    title: "Product Inventory Tracker",
    description:
      "The Data Label Inventory Tracker is a custom inventory app built for Label Co., one of the studios under Riot Mind Studios, to track physical stock of automotive reproduction labels sold to owners of Ford Panther-platform vehicles. It tracks in-house-printed inventory across dozens of model- and year-specific SKUs, then calculates how many complete product bundles can be fulfilled based on the lowest-stocked component — surfacing the exact bottleneck at a glance. Built with React, Vite, and Tailwind CSS using shadcn/ui, it runs entirely client-side with no backend, persisting data through localStorage, and features a responsive, dark-mode interface with low-stock alerts, one-click export, and derived demand tracking for print-on-demand items.",
    image: project6,
    tags: ["React", "Vite", "Tailwind CSS", "Claude AI", "Shadcn"],
    link: "/creative-dev-portfolio/apps/data-label-inventory-tracker/index.html",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="pt-32 relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* section header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            What I've built{" "}
            <span className="font-serif italic font-normal text-white">
              {" "}
              & what I'm building.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of work spanning animated ad campaigns, e-commerce
            operations, and the React applications I'm building now — each one
            shows a different side of how I approach a problem.
          </p>
        </div>

        {/* projects grid section */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              {/* project images */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-900 group-hover:scale-110"
                />
                {/* over image gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent opacity-60" />
                {/* overlay project links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* project info */}
              <div className="p-6 space-y-4">
                {/* project title */}
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                {/* project description */}
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                {/* project tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16 mt-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Agentic Coding...
          </span>
          <h2 className="text-1xl md:text-2xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            A note on these
            <span className="font-serif italic font-normal text-white">
              {" "}
              React projects.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            I'm actively building my React skills through hands-on projects like
            the ones featured here. Along the way, I've used AI tools (including
            Claude) as a learning aid — to help explain concepts, work through
            problems, and understand best practices as I build. Every project
            reflects my own decisions and iteration; AI has been a resource in
            my learning process, not a replacement for it. This is part of an
            ongoing effort to grow my front-end toolkit beyond my 10+ years of
            hand-coded HTML5/GSAP work.<br />
            <a
              href="https://github.com/Riot-Mind-Studios-LLC/react-sandbox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground underline"
            >
              {" "}
              See where my current React skills are on GitHub.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
