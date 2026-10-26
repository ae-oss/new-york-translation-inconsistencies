import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "New York Translation Inconsistencies",
  description: "Evidence-reviewed differences between English New York government guidance and its published translations, with transparent multilingual coverage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader />{children}<footer className="site-footer"><div className="container">New York Translation Inconsistencies · Public research reader · Updated 26 October 2026</div></footer></body></html>;
}
