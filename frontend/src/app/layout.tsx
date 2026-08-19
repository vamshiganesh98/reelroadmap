import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReelRoadmap",
  description: "Learn AI from Instagram reels with a personalized roadmap",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
