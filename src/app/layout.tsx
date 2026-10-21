import type { Metadata, Viewport } from "next";
import { AnalyticsConsent } from "@/components/analytics/analytics-consent";
import "./globals.css";

const SITE_URL = "https://idcardtools.com";
const SITE_NAME = "idcardtools";
const SITE_TITLE = "idcardtools — Print E-Aadhaar on PVC Card & Free PDF Tools";
const SITE_DESCRIPTION = "Print your E-Aadhaar on premium PVC cards. 31+ free PDF tools — merge, split, compress, convert, sign, and protect. UIDAI-compliant. No signup. Privacy-first. Trusted by 2M+ Indians.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: ["print e-aadhaar on pvc card", "e-aadhaar pvc card print online", "aadhaar card printing service", "uidai approved pvc card", "free pdf tools online", "merge pdf free", "split pdf online", "compress pdf free", "pdf to word converter", "pdf to excel converter", "pdf to jpg converter", "jpg to pdf converter", "sign pdf online free", "protect pdf with password", "unlock pdf password", "ai pdf summarizer", "translate pdf free", "ocr pdf online", "pdf tools india", "idcardtools", "id card tools", "idcardtools.com", "aadhaar card pvc print", "pan card print", "voter id print", "id card auto crop", "print aadhaar card"],

  authors: [{ name: "idcardtools", url: SITE_URL }],
  creator: "idcardtools",
  publisher: "idcardtools",
  applicationName: SITE_NAME,
  generator: "Next.js",
  category: "Productivity",
  classification: "PDF Tools, ID Card Printing",

  alternates: {
    canonical: "/",
    languages: { "en-IN": "/" },
  },

  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },

  // Icons — proper sizes + apple-touch
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },

  // iOS PWA — dedicated field (better than "other")
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },

  // OpenGraph — fixed image dimensions
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    countryName: "India",
    images: [
      {
        url: `${SITE_URL}/og-image.png`, // 1200x630 banao
        width: 1200,
        height: 630,
        alt: "idcardtools — Print E-Aadhaar on PVC Card & Free PDF Tools",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@idcardtools",
    creator: "@idcardtools",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // theme-color/viewport fields yahan NAHI (viewport export mein hain)
  other: {
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#ff6a00",
    "msapplication-config": "/browserconfig.xml",
  },

  // public/manifest.json ke saath match
  manifest: "/manifest.json",

  appLinks: {
    web: {
      url: SITE_URL,
      should_fallback: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ff6a00", // manifest ke theme_color se match
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      dir="ltr"
      suppressHydrationWarning
    >
      <head>
        {/* Pre-hydration cleanup: strip browser-extension-injected attributes
            (e.g. CRXLauncher adds "crxlauncher" / "crxlauncher-bridged" to <html>)
            BEFORE React hydrates, preventing hydration mismatch warnings. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var attrs = ['crxlauncher', 'crxlauncher-bridged'];
                  var root = document.documentElement;
                  attrs.forEach(function(a) { root.removeAttribute(a); });
                  var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(m) {
                      if (m.type === 'attributes' && attrs.indexOf(m.attributeName) !== -1) {
                        root.removeAttribute(m.attributeName);
                      }
                    });
                  });
                  observer.observe(root, { attributes: true });
                  setTimeout(function() { observer.disconnect(); }, 5000);
                } catch (e) {}
              })();
            `,
          }}
        />

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
          rel="dns-prefetch"
          href="https://unpkg.com"
        />

        {/* Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "idcardtools",
              alternateName: ["ID Card Tools", "idcardtools.com"],
              url: SITE_URL,
              logo: `${SITE_URL}/icons/icon-512.png`,
              description: SITE_DESCRIPTION,
            }),
          }}
        />

        {/* WebSite — SearchAction optional (deprecated by Google Oct 2024) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              alternateName: "ID Card Tools",
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              inLanguage: "en-IN",
              publisher: {
                "@type": "Organization",
                name: "idcardtools",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/icons/icon-512.png`,
                  width: 512,
                  height: 512,
                },
              },
            }),
          }}
        />
      </head>

      <body className="relative min-h-screen bg-[#f4f1ea] text-[#0a0a0a] antialiased">
        <main className="relative mt-20">{children}</main>
        <AnalyticsConsent />
      </body>
    </html>
  );
}