import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-graphite text-white hover:bg-ink"
      : "border border-line bg-white text-graphite hover:border-graphite";

  return (
    <Link href={href} className={`focus-luma inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${styles} ${className}`}>
      {children}
    </Link>
  );
}
