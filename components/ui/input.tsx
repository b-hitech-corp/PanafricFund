import { cn } from "@/lib/utils";
import * as React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-xl border border-brown/20 bg-white px-3 text-sm text-brown placeholder:text-brown/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze",
        props.className,
      )}
    />
  );
}
