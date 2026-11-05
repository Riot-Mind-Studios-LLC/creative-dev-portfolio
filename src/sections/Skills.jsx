// src: https://www.youtube.com/watch?v=ifOJ0R5UQOc

// import dependancies
import { useState } from "react";

const skills = [
  // Development
  { name: "HTML 5", level: 95, category: "Development" },
  { name: "JSX", level: 40, category: "Development" },
  { name: "CSS 3", level: 95, category: "Development" },
  { name: "JavaScript ES6", level: 85, category: "Development" },
  { name: "Vite", level: 40, category: "Development" },
  { name: "React", level: 40, category: "Development" },
  { name: "Tailwind CSS", level: 55, category: "Development" },
  { name: "JSON", level: 75, category: "Development" },
  { name: "GSAP", level: 95, category: "Development" },
  { name: "Shadcn", level: 45, category: "Development" },
  // Production
  { name: "Rich-Media Ad Banners", level: 100, category: "Production" },
  {
    name: "Dynamic Creative Optimization",
    level: 85,
    category: "Production",
  },
  {
    name: "Digital Out-of-Home",
    level: 85,
    category: "Production",
  },
  { name: "RESTful APIs", level: 75, category: "Production" },
  { name: "Programmatic Development", level: 75, category: "Production" },
  { name: "Single-Page Applications", level: 60, category: "Production" },
  { name: "Dynamic Creative", level: 70, category: "Production" },
  { name: "Banner Animation", level: 95, category: "Production" },
  { name: "Click Tags", level: 80, category: "Production" },
  { name: "HTML 5 Validation", level: 100, category: "Production" },
  // Operations
  { name: "Google Doubleclick", level: 70, category: "Operations" },
  { name: "Google Ads", level: 65, category: "Operations" },
  { name: "Meta Business Suite", level: 85, category: "Operations" },
  { name: "Shopify Analytics", level: 85, category: "Operations" },
  { name: "Google Analytics", level: 65, category: "Operations" },
  { name: "Campaign Trafficking", level: 50, category: "Operations" },
  { name: "Ad Server Delivery", level: 75, category: "Operations" },
  { name: "Flashtalking", level: 80, category: "Operations" },
  { name: "Production Documentation", level: 85, category: "Operations" },
  { name: "Meta Ads Manager", level: 65, category: "Operations" },
  { name: "Google Business Suite", level: 90, category: "Operations" },
  { name: "Creative QA", level: 95, category: "Operations" },
  // Tools
  { name: "VS Code", level: 95, category: "Tools" },
  { name: "Chrome Dev Tools", level: 95, category: "Tools" },
  { name: "Terminal CLI", level: 75, category: "Tools" },
  { name: "Git / GitHub", level: 80, category: "Tools" },
  { name: "Notion", level: 70, category: "Tools" },
  { name: "Microsift Suite", level: 90, category: "Tools" },
  { name: "Adobe Creative Suite", level: 95, category: "Tools" },
  { name: "Affinity", level: 85, category: "Tools" },
  { name: "Figma", level: 35, category: "Tools" },
  { name: "Asana", level: 75, category: "Tools" },
  { name: "Canva", level: 90, category: "Tools" },
];

const categories = ["Development", "Production", "Operations", "Tools"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Development");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "" || skill.category === activeCategory,
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
            <span className="font-serif italic font-normal text-primary">
              to P&L.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A decade of hand-coded animation, a growing production foundation,
            marketing technologies, ad operations and the business and design
            tools I use to ship real work.
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
