// src: https://www.youtube.com/watch?v=ifOJ0R5UQOc

// import dependancies
import { useState } from "react";

const skills = [
  // Core / Frontend
  { name: "HTML 5", level: 95, category: "frontend" },
  { name: "CSS 3", level: 85, category: "frontend" },
  { name: "JavaScript ES6", level: 90, category: "frontend" },
  { name: "GSAP / GreenSock", level: 95, category: "frontend" },
  { name: "React", level: 40, category: "frontend" },
  { name: "Shadcn", level: 15, category: "frontend" },
  { name: "JSX", level: 35, category: "frontend" },
  { name: "Tailwind CSS", level: 60, category: "frontend" },
  { name: "TypeScript", level: 10, category: "frontend" },
  { name: "API's", level: 35, category: "frontend" },
  { name: "jQuery", level: 20, category: "frontend" },
  { name: "UI / UX", level: 35, category: "frontend" },

  // Design & Dev Tools
  { name: "Git / GitHub", level: 60, category: "tools" },
  { name: "npm / Node.js", level: 35, category: "tools" },
  { name: "Gulp.js", level: 10, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Vite", level: 40, category: "tools" },
  { name: "Terminal CLI", level: 75, category: "tools" },
  { name: "Claude Code", level: 55, category: "tools" },
  { name: "Flashtalking", level: 45, category: "tools" },
  { name: "Canva", level: 85, category: "tools" },
  { name: "Google Doubleclick", level: 65, category: "tools" },
  { name: "Google Web Designer", level: 35, category: "tools" },
  { name: "Filezilla", level: 75, category: "tools" },
  { name: "Adobe Photoshop", level: 95, category: "tools" },
  { name: "Adobe Illustrator", level: 95, category: "tools" },
  { name: "Affinity", level: 75, category: "tools" },

  // Business
  { name: "Shopify", level: 95, category: "business" },
  { name: "SEO", level: 85, category: "business" },
  { name: "Claude AI", level: 85, category: "business" },
  { name: "Printful", level: 95, category: "business" },
  { name: "Asana", level: 80, category: "business" },
  { name: "ChatGPT", level: 80, category: "business" },
  { name: "Slack", level: 40, category: "business" },
  { name: "Google Analytics", level: 40, category: "business" },
  { name: "Meta Business Suite", level: 60, category: "business" },
];

const categories = ["all", "frontend", "tools", "business"];

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
