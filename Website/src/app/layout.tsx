import { Inter } from "next/font/google";
import HeaderNav from "@/components/header-nav";
import type { Metadata } from "next";
import "./globals.css";
import FooterNav from "@/components/footer-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeto HEIWA",
  description: "CIBERDEM: Projeto HEIWA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${inter.className} antialised`}>
      <body className="flex flex-col min-h-screen">
        <HeaderNav />
        <div className="container pb-16 pt-8 flex-1">{children}</div>
        <FooterNav />
      </body>
    </html>
  );
}
