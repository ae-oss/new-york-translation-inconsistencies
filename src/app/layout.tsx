import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { legal } from "@/lib/legal-research";
import { research } from "@/lib/research";
import "./globals.css";

export const metadata: Metadata = {
  title: "New York Legal Misrepresentation",
  description: "Evidence-led review of current New York government guidance against applicable binding law, with claim-level coverage and independent challenge.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader />{children}<footer className="site-footer"><div className="container">New York Legal Misrepresentation · Guidance review {legal.as_of} · Translation research {research.as_of}</div></footer></body></html>;
}
