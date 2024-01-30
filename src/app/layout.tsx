import localFont from "next/font/local";
import "@/styles/globals.css";
import { Footer, Menu } from "@/components/home";
import Script from "next/script";

const myFont = localFont({
  src: [
    {
      path: "./DMSans.woff2",
      style: "normal",
    },
    {
      path: "./DMSans-Italic.woff2",
      style: "italic",
    },
  ],
});

const GTM_ID = "GTM-M2Q49KK3";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={myFont.className}>
      <Script id="GMT">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
      <body className={`min-h-screen flex flex-col justify-between`}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <div className="container py-2">
          <Menu />
        </div>
        {children}
        <div className="container py-4">
          <Footer />
        </div>
      </body>
    </html>
  );
}
