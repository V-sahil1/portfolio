import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Container className="text-center">
        <p className="font-mono text-7xl font-bold text-gradient sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-400">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-500 px-6 py-3 font-medium text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </Container>
    </div>
  );
}
