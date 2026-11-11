import type { Metadata } from "next";
import { cormorant, manrope, montserrat } from "./fonts";
import { site } from "@/content/site";
import { Preloader } from "@/components/motion/Preloader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SunsetBackground } from "@/components/motion/SunsetBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

/** Runs before paint: stamp skip so the overlay never flashes on repeat / reduce. */
const preloaderBootScript = `(function(){try{var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var s=false;try{s=sessionStorage.getItem("vd-preloaded")==="1"}catch(e){}if(r||s)document.documentElement.setAttribute("data-vd-preloaded","1")}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: preloaderBootScript }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>
          <Preloader />
          <SunsetBackground />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
