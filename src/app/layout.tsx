import type { Metadata } from "next";
import { Audiowide } from 'next/font/google';
import "./globals.css";
import BackgroundImage from "../../public/background.jpg";

const audiowide = Audiowide({ subsets: ['latin'], weight: '400' });



;

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
        className={`${audiowide.className} antialiased select-none text-white text-base 2xl:text-xl bg-[url('/background.jpg')] bg-cover bg-center`}
      >
        {children}
      </body>
    </html>
  );
}
