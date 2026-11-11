import type { Metadata } from "next";
import { cormorant, manrope, montserrat } from "./fonts";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SunsetBackground } from "@/components/motion/SunsetBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>
          <SunsetBackground />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
