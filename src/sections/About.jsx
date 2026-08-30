// import dependancies
import {
  Code2,
  Sprout,
  Building2,
  Rocket,
  Package,
  Server,
  Laptop,
  Briefcase,
} from "lucide-react";

// about highlights list
const highlights = [
  {
    icon: Laptop,
    title: "Technical Foundation",
    description:
      "B.S. in Web Design & Development, Full Sail University — the formal grounding behind a decade of hands-on code.",
  },
  {
    icon: Briefcase,
    title: "Business Foundation",
    description:
      "M.S. in Business Innovation & Entrepreneurship, Full Sail University — graduated valedictorian.",
  },
  {
    icon: Code2,
    title: "Hand-Coded Precision",
    description:
      "10+ years writing vanilla HTML, CSS, and JavaScript by hand — no templates, no drag-and-drop shortcuts.",
  },
  {
    icon: Rocket,
    title: "Animation & Motion",
    description:
      "Deep GreenSock/GSAP expertise, bringing brand campaigns to life through fluid, high-performance animation.",
  },
  {
    icon: Building2,
    title: "Business Development",
    description:
      "Founder of a multi-division e-commerce business — Understanding the product from the code up to the P&L.",
  },
  {
    icon: Sprout,
    title: "Full-Stack Growth",
    description:
      "Actively expanding into React and modern app development, building on a decade of front-end fundamentals.",
  },
  {
    icon: Package,
    title: "Agency-Grade Production",
    description:
      "Delivered high-volume, deadline-driven work for brands like Mercedes-Benz, Google, T-Mobile, and Starbucks.",
  },
  {
    icon: Server,
    title: "Data-Informed Decisions",
    description:
      "Hands-on with Meta Ads, Google Ads, and Google Analytics — building and reading the numbers, not just the code.",
  },
];

const About = () => {
  return (
    <section id="about" className="pt-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* left column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Code. Animation. Business.
              <span className="font-serif italic font-normal text-white">
                {" "}
                I bring them together.
              </span>
            </h2>

            {/* about me copy */}
            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I'm a Creative Developer with 10+ years of experience
                hand-coding HTML5 animated ad units for major agencies and
                brands, using vanilla JavaScript, CSS, and GreenSock/GSAP. My
                work has shipped for clients like Mercedes-Benz, Google,
                T-Mobile, and Starbucks — high-volume, deadline-driven
                production where the code has to be lightweight, cross-platform
                compliant, and pixel-precise. That's the core of what I do: I
                build things by hand, not by dragging templates around.
              </p>
              <p>
                I'm currently expanding that foundation into React, building
                real applications from the ground up rather than just following
                tutorials passively. I'm not claiming advanced or
                production-scale React experience — I'm at the level where I can
                build and reason through basic to intermediate web apps, and I'm
                growing that skill set deliberately, project by project. What
                carries over from over a decade of animation and interaction
                work is an eye for how things should move and respond, which I'm
                now applying inside component-based architecture instead of
                standalone banner units.
              </p>
              <p>
                Outside of client work, I founded and run a multi-division
                e-commerce business, handling everything from product design to
                paid ad campaigns to fulfillment operations. It's given me a
                working understanding of both sides of digital work — the code
                that builds the experience, and the business decisions that
                depend on it. I bring that same hands-on, no-shortcuts approach
                to every project, whether it's a 300x250 banner or a full
                data-driven dashboard.
              </p>
            </div>

            {/* mission statement */}
            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "My mission is to bridge everything I know — hand-coded
                animation craft, front-end development, and real business
                experience — into work that's more than experimental. I build
                with intention: precise, reusable, and purposeful, never built
                on shortcuts. Merging these disciplines is how I create
                genuinely new assets businesses and platforms can actually build
                on."
              </p>
            </div>
          </div>

          {/* right column */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl animate-fade-in">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
