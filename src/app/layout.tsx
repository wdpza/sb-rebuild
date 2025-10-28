import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Copyright from "@/components/layout/Copyright"
import { getPrimaryMenu } from "@/lib/graphql/queries/getPrimaryMenu";
import { getFooter } from "@/lib/graphql/queries/getFooter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const archivo = Archivo({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crafting Amazing Brands | Partner with Starbright",
  description: "Are you looking for a digital marketing partner? We provide end-to-end solutions to businesses looking to increase their online presence.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { menu, logo } = await getPrimaryMenu();
  const footer = await getFooter();
  
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} antialiased overflow-x-hidden`}
      >
        <Header menu={menu} logo={logo} />
        {children}
        <Footer footer={footer} />
        <Copyright footer={footer} />
      </body>
    </html>
  );
}
