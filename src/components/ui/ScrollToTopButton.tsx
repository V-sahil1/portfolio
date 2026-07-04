import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { cn } from "@/lib/utils";

/** Floating button that scrolls back to the top once the user scrolls down. */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-lg shadow-brand-600/30 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <FiArrowUp className="h-5 w-5" />
    </button>
  );
}
