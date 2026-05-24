import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexLocalWeb | Premium Websites for Indian Local Businesses",
  description:
    "NexLocalWeb builds premium, mobile-first websites for local businesses across India.",
  openGraph: {
    title: "NexLocalWeb | Websites that make local businesses look premium",
    description:
      "AI-powered web design and frontend development for ambitious Indian local businesses.",
    type: "website",
    locale: "en_IN"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){if(typeof window==="undefined")return;if(!window.requestAnimationFrame){window.requestAnimationFrame=function(callback){return window.setTimeout(function(){callback(Date.now())},16)}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(handle){window.clearTimeout(handle)}}}();`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
