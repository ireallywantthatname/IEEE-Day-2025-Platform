import type { Metadata } from "next";
import { Audiowide, Outfit } from 'next/font/google';
import "./globals.css";

const audiowide = Audiowide({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-audiowide'
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit'
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
        className={`${audiowide.variable} ${outfit.variable} font-secondary antialiased select-none text-white text-base 2xl:text-xl bg-[url('/background.jpg')] bg-cover bg-center`}
      >
        {children}
      </body>
    </html>
  );
}
