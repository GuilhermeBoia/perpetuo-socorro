import type { Metadata } from "next";
import { Libre_Baskerville, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Paróquia Nossa Senhora do Perpétuo Socorro - João Pessoa",
  description: "Paróquia Nossa Senhora do Perpétuo Socorro, João Pessoa - PB. Acompanhe nossa programação semanal.",
  keywords: ["paróquia", "igreja católica", "joão pessoa", "perpétuo socorro", "missa", "católica"],
  openGraph: {
    type: "website",
    url: "https://perpetuosocorrojp.vercel.app/",
    title: "Paróquia Nossa Senhora do Perpétuo Socorro - João Pessoa",
    description: "Paróquia Nossa Senhora do Perpétuo Socorro, João Pessoa - PB. Acompanhe nossa programação semanal.",
    images: [
      {
        url: "https://perpetuosocorrojp.vercel.app/og-image.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${libreBaskerville.variable} ${lora.variable} antialiased font-sans bg-primary`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
