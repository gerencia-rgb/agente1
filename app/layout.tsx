import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentKit demo",
  description: "Demo of ChatKit with hosted workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@openai/chatkit@latest/dist/chatkit.js"
          strategy="beforeInteractive"
          async
        />

      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
