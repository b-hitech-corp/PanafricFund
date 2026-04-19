import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze disabled:opacity-50",
        variant === "default" && "bg-brown text-cream hover:bg-[#2f1f14]",
        variant === "outline" && "border border-brown/20 bg-white text-brown hover:bg-brown/5",
        variant === "ghost" && "text-brown hover:bg-brown/10",
        className,
      )}
      {...props}
    />
  );
}
