import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AntiClone } from "@/components/ui/AntiClone";
import { NavBar } from "@/components/ui/NavBar";
import "./globals.css";

// Fonte principal do DuduStudio
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DuduStudio — Sites prontos para o seu negócio",
  description:
    "Compre sites profissionais prontos para uso. Experimente o demo antes de comprar. Pizzaria, clínica, e-commerce e muito mais.",
  openGraph: {
    title: "DuduStudio — Sites prontos para o seu negócio",
    description: "Experimente o demo antes de comprar.",
    siteName: "DuduStudio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AntiClone />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
