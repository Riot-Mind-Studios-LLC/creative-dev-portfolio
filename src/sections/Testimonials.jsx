// import dependancies
import { ChevronLeft, ChevronRight, ChevronDown, Quote } from "lucide-react";
import { useState } from "react";

// testimonials list
const testimonials = [
  {
    quote:
      "Adrian came with the skills of multiple developers in one — consistently impressive in his ability to communicate complex technical concepts while fully owning the development process, building solutions that not only met the demands of the industry but stood out above the rest.",
    author: "Jimmy McGee",
    role: "Executive Producer of Digital Production, Omnicom Production",
  },
  {
    quote:
      "Adrian is consistently dependable, delivers quality work on tight timelines, and is always collaborative with the team. His attention to detail and problem-solving abilities make him an asset to any project.",
    author: "Nichole Cruzalegui",
    role: "Digital Developer, Omnicom Production",
  },
  {
    quote:
      "An absolute powerhouse when it comes to HTML5 banner production — constantly impressive in his speed and attention to detail, handling complex versioning and resizing on quick turnarounds while taking feedback incredibly well.",
    author: "Saki Hoshiko",
    role: "Digital Project Manager / Producer, Merkley + Partners",
  },
  {
    quote:
      "Adrian consistently delivered banner campaigns ahead of schedule with outstanding attention to detail, working across bilingual campaigns in both French and English with equal speed and precision.",
    author: "Frank Cagnetto",
    role: "Senior Project Manager, Omnicom Production",
  },
  {
    quote:
      "Over several years across two jobs, Adrian has grown tremendously as both a developer and a team member — a motivated self-learner who is always willing to put in the work to deliver on schedule.",
    author: "Simon Abrams",
    role: "Creative Developer, Droga5",
  },
  {
    quote:
      "Adrian has a great eye for snappy, short-form storytelling in banner form, and his determination and work ethic coupled with diverse experience bring a fresh perspective to every project.",
    author: "Erik Hofman-Bang",
    role: "Co-Founder, Bannerboy Corporation",
  },
];

export const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setActiveIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-200 h-200 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            From the team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Kind words from
            <span className="font-serif italic font-normal text-white">
              {" "}
              amazing people.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            These recommendations come from the people who worked alongside me
            directly — managers, producers, and fellow developers who saw the
            work up close across multiple agencies and campaigns. Their words
            reflect what it's actually like to have me on a team.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="glass p-8 rounded-3xl md:p-12 glow-border animate-fade-in animation-delay-200">
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>

              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pt-4">
                "{testimonials[activeIdx].quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold">
                    {testimonials[activeIdx].author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeIdx].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
                onClick={previous}
              >
                <ChevronLeft />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIdx ? "w-8 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* scroll down section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-800 z-10">
        <a
          href="#contact"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">Contact me</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Testimonials;
