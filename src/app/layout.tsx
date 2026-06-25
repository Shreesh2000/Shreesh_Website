import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shreesh | Software Engineer",
  description: "Portfolio of Shreesh Kawathekar — Software Developer & GenAI Engineer with 3 years building React, Next.js, TypeScript apps and enterprise RAG pipelines.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover' as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="film-grain"></div>
        <div className="vignette"></div>
        {children}
      </body>
    </html>
  );
}
