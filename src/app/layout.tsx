import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_WP_BASE_URL}
        />
      </head>
      <body
        className={`${archivo.variable} antialiased overflow-x-hidden`}
      >
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M63QSR');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-M63QSR"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Header menu={menu} logo={logo} />
        {children}
        <Footer footer={footer} />
        <Copyright footer={footer} />
      </body>
    </html>
  );
}
