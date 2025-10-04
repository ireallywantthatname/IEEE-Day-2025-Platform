import type { Metadata } from "next";
import { Saira } from 'next/font/google';
import "./globals.css";
import ParticlesBg from "@/components/ParticlesBg";
import Navbar from "@/components/Navbar";

const saira = Saira({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: "IEEE Day Platform - 2025",
  description: "NSBM Green University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${saira.className} font-secondary antialiased select-none bg-black text-white text-base`}
      >
        <Navbar />
        <ParticlesBg />
        {children}
      </body>
    </html>
  );
}
