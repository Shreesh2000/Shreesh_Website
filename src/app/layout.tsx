import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shreesh Kawathekar | Enterprise GenAI & Full Stack Engineer",
  description: "Portfolio of Shreesh Kawathekar, specializing in production-grade React applications and AI/RAG pipelines.",
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
