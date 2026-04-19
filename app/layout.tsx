import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/nav";

export const metadata: Metadata = {
  title: "PanAfricFund",
  description: "Building African economic power through diaspora investment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
