// src: https://www.youtube.com/watch?v=ifOJ0R5UQOc

// import dependancies
import { useState } from "react";

const skills = [
  // Core / Build tools & frameworks
  { name: "HTML 5", level: 95, category: "build tools & frameworks" },
  { name: "JSX", level: 40, category: "build tools & frameworks" },
  { name: "CSS 3", level: 95, category: "build tools & frameworks" },
  { name: "JavaScript ES6", level: 85, category: "build tools & frameworks" },
  { name: "Vite", level: 40, category: "build tools & frameworks" },
  { name: "TypeScript", level: 30, category: "build tools & frameworks" },
  { name: "React", level: 40, category: "build tools & frameworks" },
  { name: "Tailwind CSS", level: 55, category: "build tools & frameworks" },
  { name: "PHP", level: 45, category: "build tools & frameworks" },
  { name: "JSON", level: 75, category: "build tools & frameworks" },

  // Software
  { name: "VS Code", level: 95, category: "software" },
  { name: "Chrome Dev Tools", level: 95, category: "software" },
  { name: "Terminal CLI", level: 75, category: "software" },
  { name: "Git / GitHub", level: 80, category: "software" },
  { name: "Google Web Designer", level: 35, category: "software" },
  { name: "Agentic Coding", level: 85, category: "software" },
  { name: "Flashtalking", level: 45, category: "software" },
  { name: "Google Doubleclick", level: 65, category: "software" },
  { name: "Adobe Creative Suite", level: 95, category: "software" },
  { name: "Affinity", level: 85, category: "software" },
  { name: "Google Analytics", level: 50, category: "software" },
  { name: "Meta Business Suite", level: 60, category: "software" },
  { name: "Claude AI", level: 90, category: "software" },

  // Libraries & Platforms
  { name: "Animated Banners", level: 100, category: "libraries & platforms" },
  { name: "npm / Node.js", level: 35, category: "libraries & platforms" },
  { name: "Gulp.js", level: 10, category: "libraries & platforms" },
  { name: "GSAP", level: 95, category: "libraries & platforms" },
  {
    name: "Dynamic Creative Optimization",
    level: 85,
    category: "libraries & platforms",
  },
  { name: "Shadcn", level: 45, category: "libraries & platforms" },
  { name: "jQuery", level: 35, category: "libraries & platforms" },
  {
    name: "Digital Out-of-Home",
    level: 85,
    category: "libraries & platforms",
  },
  { name: "lucide-react", level: 95, category: "libraries & platforms" },
  { name: "ESLint", level: 85, category: "libraries & platforms" },
  { name: "Ajax", level: 45, category: "libraries & platforms" },
  { name: "RESTful API's", level: 75, category: "libraries & platforms" },
  { name: "Shopify", level: 95, category: "libraries & platforms" },
  { name: "Notion", level: 95, category: "libraries & platforms" },
  { name: "SEO", level: 85, category: "libraries & platforms" },
  { name: "Asana", level: 80, category: "libraries & platforms" },
];

const categories = [
  "all",
  "build tools & frameworks",
  "software",
  "libraries & platforms",
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory,
  );

  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center overflow-hidden pt-32"
    >
      {/* bg glow */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            From pixels{" "}
            <span className="font-serif italic font-normal text-white">
              to P&L.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A decade of hand-coded animation, a growing React foundation, and
            the business and design tools I use to ship real work.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full transition-colors duration-300 capitalize ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="glass p-6 rounded-lg border border-primary/30 animate-fade-in animation-delay-300 transition-all"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-background/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span
                  className={`text-sm ${skill.level >= 85 ? "text-primary font-semibold" : "text-muted-foreground"}`}
                >
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
