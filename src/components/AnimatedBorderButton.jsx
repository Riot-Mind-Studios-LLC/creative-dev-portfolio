// import dependancies
import { Download } from "lucide-react";

const AnimatedBorderButton = () => {
  return (
    <a
      href={`${import.meta.env.BASE_URL}downloads/adrian-velazquez-resume.pdf`}
      download="adrian-velazquez-resume.pdf"
      className="relative items-center justify-center bg-transparent border border-border text-foreground hover:border-primary/50 transition-all duration-1000 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group px-8 py-4 text-lg font-medium rounded-full overflow-visible animated-border inline-flex"
    >
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none download-cv-border"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }} 
      >
        <path
          d="M 30,1 A 29,29 0 0 0 1,30 L 1,30 A 29,29 0 0 0 30,59 L 170,59 A 29,29 0 0 0 199,30 L 199,30 A 29,29 0 0 0 170,1 Z"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeDasharray="400 550"
          strokeDashoffset="400"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animated-border-path"
        />
      </svg>
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Download className="w-5 h-5" />
        Download CV
      </span>
    </a>
  );
};

export default AnimatedBorderButton;
