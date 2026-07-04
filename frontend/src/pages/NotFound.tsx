import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Container className="text-center">
        <p className="font-mono text-7xl font-bold text-brand-600 sm:text-8xl dark:text-brand-400">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-400">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-500"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </Container>
    </div>
  );
}
