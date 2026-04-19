import * as React from "react";

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-sm font-medium text-brown">{children}</label>;
}
