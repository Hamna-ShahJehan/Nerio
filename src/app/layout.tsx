import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import StickySidebar from "@/components/StickySidebar";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sports News",
  description: "Sports News - Your daily dose of sports updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={interTight.variable}>
      <body className="min-h-screen flex flex-col font-body antialiased">
        {children}
        <StickySidebar />
      </body>
    </html>
  );
}
