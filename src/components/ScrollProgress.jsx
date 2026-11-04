// import dependancies
import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  // useRef = a direct handle on the bar's DOM element
  // updating it through a ref skips a React re-render on every scroll event
  const barRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      // scrollable distance = full page height minus the height of the visible window
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      // progress = how far down the page you are, from 0 to 1
      // the check prevents dividing by 0 on a page too short to scroll
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      // scaleX stretches the bar: 0 = empty, 1 = full width
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    // set the correct width on load, in case the page opens partway down
    updateProgress();

    // update when the user scrolls or the window size changes
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    // remove both listeners if this component ever leaves the page
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    // fixed = stays at the top of the screen
    // z-60 = sits above the navbar, which uses z-50
    // origin-left = the bar grows from the left edge
    // the inline style starts the bar empty until the first update runs
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-60 h-1 w-full origin-left bg-primary"
      style={{ transform: "scaleX(0)" }}
    />
  );
};

export default ScrollProgress;
