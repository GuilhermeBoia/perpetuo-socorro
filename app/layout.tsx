import type { Metadata } from "next";
import { Libre_Baskerville, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    url: "https://perpetuosocorrojp.com.br",
    title: "Paróquia Nossa Senhora do Perpétuo Socorro - João Pessoa",
    description: "Paróquia Nossa Senhora do Perpétuo Socorro, João Pessoa - PB. Acompanhe nossa programação semanal.",
    images: [
      {
        url: "https://perpetuosocorrojp.com.br/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paróquia Nossa Senhora do Perpétuo Socorro - João Pessoa",
        type: "image/png",
      },
    ],
    locale: "pt-BR",
    siteName: "Paróquia Nossa Senhora do Perpétuo Socorro",
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
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
