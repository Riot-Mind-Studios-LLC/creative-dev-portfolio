// import dependancies
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiShopify } from "react-icons/si";

// import assets
import heroBg from "@/assets/hero-bg.jpg";
import profileImg from "@/assets/profile-image.jpg";

// import components
import Button from "@/components/Button";
import AnimatedBorderButton from "../components/AnimatedBorderButton";

// skills list
const skills = [
  "Google Analytics",
  "JSON",
  "Claude Code",
  "Adobe Illustrator",
  "RESTful APIs",
  "Shadcn / UI",
  "GreenSock / GSAP 3",
  "Adobe Photoshop",
  "React",
  "CSS",
  "Shopify Email Marketing",
  "UI Development",
  "Terminal CLI",
  "Gulp.js",
  "VS Code",
  "Radix UI",
  "Shopify",
  "JSX",
  "JavaScript (ES6+)",
  "Flashtalking",
  "HTML5",
  "Git",
  "Tailwind CSS",
  "DoubleClick / Campaign Manager",
  "Fetch API",
  "Vite",
  "GSAP + React (useGSAP)",
  "JSON Server",
  "Affinity Designer",
  "Google Ads",
  "npm / Node.js",
  "Meta Ads",
  "TweenMax / TimelineMax",
];

const Hero = () => {
  const [particles] = useState(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 5}s`,
    }));
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* bg image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Hero Bg Image"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-non">
        {/* loop through an array of 30 dots */}
        {/* create an array by using the Array() function and define the length, in this case 30 */}
        {/* loop through the 30 times by using map() */}
        {/* for each item that it loops, get the index and enter a div */}
        {/* style the div to style the dots */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1.5 h-1.5 rounded-full opacity-40"
            style={{
              backgroundColor: "#20b2a6",
              left: particle.left,
              top: particle.top,
              animation: particle.animation,
              animationDelay: particle.animationDelay,
            }}
          />
        ))}
      </div>

      {/* hero section main content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* left column - text content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              {/* title badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                / Front-End / Creative Developer
              </span>
            </div>

            {/* hero section headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Crafting
                <span className="text-primary glow-text"> digital</span>
                <br />
                experiences
                <br />
                <span className="font-serif italic font-normal text-white">
                  since 2015.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Hi, I'm Adrian Velazquez — a Creative Developer specializing in
                front-end development with focus in
                <span className="font-semibold">
                  {" "}
                  Animated Ad Banners, Single Page Apps & Data Driven
                  Dashboards, and Shopify E-Commerce Operations.{" "}
                </span>
                I bridge design, code, and business — building products &
                experiences end-to-end, not just interfaces.
              </p>
            </div>

            {/* cta section */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full animate-fade-in animation-delay-300">
              <a href="#contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Contact Me <ArrowRight className="w-5 h-5 " />
                </Button>
              </a>
              <AnimatedBorderButton className="w-full sm:w-auto" />
            </div>

            {/* social links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="tex-sm text-muted-foreground">Socials:</span>
              {[
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/avelazquez585/",
                },
                {
                  icon: FaGithub,
                  href: "https://github.com/Riot-Mind-Studios-LLC",
                },
                {
                  icon: SiShopify,
                  href: "https://riotmindstudios.com/",
                  alt: "Riot Mind Studios",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  {<social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* right column - profile image */}
          <div className="relative animate-fade-in animation-delay-300">
            {/* profile image */}
            <div className="relative max-w-md mx-auto">
              <div className="relative glass rounded-3xl p-2 glow-border">
                <img
                  src={profileImg}
                  alt="Adrian Velazquez Profile Image"
                  className="w-full aspect-4/5 object-cover rounded-2xl"
                />

                {/* floating badge */}
                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-md">Available for work</span>
                  </div>
                </div>

                {/* stats badge */}
                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-xs text-muted-foreground">
                    Years Exp.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* scrolling skills section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>

          <div className="relative overflow-hidden">
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
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

      {/* scroll down section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-800 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">About me</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
