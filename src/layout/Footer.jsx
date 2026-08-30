import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiShopify } from "react-icons/si";

const socialLinks = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/avelazquez585/",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com/Riot-Mind-Studios-LLC",
    label: "GitHub",
  },
  { icon: SiShopify, href: "https://riotmindstudios.com/", label: "SHopify" },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-12 border-t border-border">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
          Built with frustration &
          <span className="font-serif italic font-normal text-white">
            {" "}
            love, using React.
          </span>
        </h2>
        <p className="text-muted-foreground animate-fade-in animation-delay-200">
          I built this portfolio in React by combining separate resources into
          something distinctly mine, hitting real roadblocks along the way —
          mismatched imports, dependency conflicts, an outdated Tailwind setup —
          and working through each one instead of copying & pasting it. The
          result isn't just a finished site; it's proof I can build, debug, and
          ship a real application.
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#" className="text-xl font-bold tracking-tight">
              AV<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Adrian Velazquez. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
