import type { Metadata } from "next";
import { Bebas_Neue, Inter, Oswald } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas"
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald"
});

export const metadata: Metadata = {
  title: "Virat Kohli — The King of Modern Cricket",
  description:
    "A cinematic digital experience celebrating Virat Kohli — 85+ international centuries, IPL legend, and the greatest batsman of his generation.",
  keywords: ["Virat Kohli", "cricket", "King Kohli", "VK18", "RCB", "Indian cricket", "cinematic website"],
  openGraph: {
    title: "Virat Kohli — The King of Modern Cricket",
    description: "Netflix meets ICC meets Apple. A premium cinematic tribute to cricket's modern legend.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${bebas.variable} ${oswald.variable}`}>
        {children}
      </body>
    </html>
  );
}
