"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-blossom text-ink hover:bg-blossom-dark",
  secondary: "bg-parchment text-ink hover:bg-gold",
  ghost: "bg-sky-light text-ink hover:bg-sky",
};

export default function PixelButton({
  variant = "primary",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "font-pixel text-[10px] sm:text-xs uppercase tracking-wide px-5 py-3 border-4 border-ink shadow-pixel active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-100 select-none",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
