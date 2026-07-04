import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  "aria-label"?: string;
}

/** Standard page section with vertical rhythm and a centered container. */
export function Section({
  id,
  children,
  className,
  containerClassName,
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28", className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
