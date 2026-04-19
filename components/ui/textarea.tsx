import { cn } from "@/lib/utils";
import * as React from "react";

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-xl border border-brown/20 bg-white px-3 py-2 text-sm text-brown placeholder:text-brown/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze",
        props.className,
      )}
    />
  );
}
