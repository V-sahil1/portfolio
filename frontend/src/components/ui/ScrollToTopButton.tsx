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
        "fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-brand-600 shadow-sm transition-all duration-300 hover:border-brand-400 dark:border-white/[0.12] dark:bg-slate-900 dark:text-brand-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <FiArrowUp className="h-5 w-5" />
    </button>
  );
}
