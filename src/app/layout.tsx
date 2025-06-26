import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav } from "./_components/topnav";
import { Footer } from "./_components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { defaultMetadata, siteConfig } from "./metadata.config";
import Script from "next/script";
import dynamic from "next/dynamic";

const CookieConsent = dynamic(() => import("@/app/_components/CookieConsent"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";

// Use the default metadata from our config
export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isProd = process.env.NODE_ENV === 'production';
  const googleAnalyticsId = process.env.GOOGLE_ANALYTICS || 'G-HHHHHHHHHHHHHHH'; // Fallback for development
  
  return (
    <html lang="en">
      <head>
        {/* Favicon links for better browser compatibility */}
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#b91c1c" />
        <meta name="msapplication-TileColor" content="#b91c1c" />
        <meta name="theme-color" content="#000000" />
        
        {/* Explicit Open Graph tags for better WhatsApp compatibility */}
        <meta property="og:title" content="Rust Tools Suite - Raid Calculator and Tools" />
        <meta property="og:description" content="Comprehensive tools for Rust players including raid calculator, recycling optimizer, decay timer, and server tracker." />
        <meta property="og:image" content={`${siteConfig.url}/images/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Rust Tools Suite" />
        
        {/* Twitter Card tags for better sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rust Tools Suite - Raid Calculator and Tools" />
        <meta name="twitter:description" content="Comprehensive tools for Rust players including raid calculator, recycling optimizer, decay timer, and server tracker." />
        <meta name="twitter:image" content={`${siteConfig.url}/images/twitter-image.png`} />
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
        <meta name="twitter:creator" content={siteConfig.twitterHandle} />
        
        {/* Preconnect to domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD structured data for better search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteConfig.url}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                email: "contact@yourdomain.com",
                contactType: "customer service",
              },
              sameAs: [
                "https://twitter.com/yourtwitterhandle",
                "https://github.com/yourgithubname",
                // Add your social media links here
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} flex flex-col min-h-screen font-mono`}
      >
        <TopNav />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieConsent />
        {isProd && (
          <>
            <Analytics />
            <SpeedInsights />
            {/* Google Analytics */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
