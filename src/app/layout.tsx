import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// export const revalidate = 10

export const metadata: Metadata = {
  title: "Netx.js 14 Image Gallery",
  description: "A cool portfolio project built using Next.js 14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-300" >
        <Navbar/>
        <main className="max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
