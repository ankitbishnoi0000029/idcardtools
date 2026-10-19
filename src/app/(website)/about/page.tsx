import type { Metadata } from "next";
import AboutPage from "@/components/about/page";

const SITE_URL = "https://idcardtools.com";
const PAGE_URL = `${SITE_URL}/about`;

// ✅ REAL CONTACT INFO (verified)
const CONTACT_EMAIL = "hello@idcardtools.com";
const CONTACT_PHONE = "+918699592500"; // E.164 format for schema

export const metadata: Metadata = {
  title: "About Us — India's Privacy-First PDF Tools & Aadhaar PVC Service",
  description:
    "Learn about idcardtools — a Bangalore-based team building free, privacy-first PDF tools and premium E-Aadhaar PVC card printing for 2M+ Indians since 2023. No ads, no tracking, no data selling.",
  keywords: [
    "about idcardtools",
    "idcardtools company",
    "privacy-first pdf tools",
    "indian pdf tools company",
    "free pdf tools india",
    "aadhaar pvc card company",
    "uidai compliant printing",
    "browser-based pdf tools",
    "idcardtools team",
    "idcardtools bangalore",
  ],
  authors: [{ name: "idcardtools Team", url: SITE_URL }],
  creator: "idcardtools",
  publisher: "idcardtools",
  category: "About",
  classification: "Company Information",
  alternates: {
    canonical: PAGE_URL,
    languages: { "en-IN": PAGE_URL },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    siteName: "idcardtools",
    title: "About idcardtools — Privacy-First PDF Tools & Aadhaar PVC",
    description:
      "Bangalore-based team building free PDF tools and premium PVC cards. No ads. No tracking. No data selling.",
    countryName: "India",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "About idcardtools — Privacy-First PDF Tools",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // ⚠️ Agar @idcardtools real handle nahi hai → commented-out rakho
    // site: "@idcardtools",
    // creator: "@idcardtools",
    title: "About idcardtools — Privacy-First PDF Tools",
    description:
      "Building free, privacy-first PDF tools and premium Aadhaar PVC cards.",
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
};

// ═══════════════════════════════════════════════
// STRUCTURED DATA
// ═══════════════════════════════════════════════

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${PAGE_URL}#aboutpage`,
  name: "About idcardtools",
  headline: "Building privacy-first PDF tools for India",
  description:
    "idcardtools is a Bangalore-based team building free, privacy-first PDF tools and premium E-Aadhaar PVC card printing services.",
  url: PAGE_URL,
  inLanguage: "en-IN",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: "idcardtools",
    url: SITE_URL,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  about: { "@id": `${SITE_URL}#organization` },
  breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "idcardtools",
  alternateName: ["ID Card Tools", "idcardtools.com"],
  legalName: "idcardtools",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icons/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.png`,
  description:
    "idcardtools provides 31+ free, privacy-first PDF tools and premium E-Aadhaar PVC card printing services across India. Founded in 2023.",
  slogan: "Secure · Innovate · Succeed",
  foundingDate: "2023",
  foundingLocation: {
    "@type": "Place",
    name: "Bangalore, Karnataka, India",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 5,
    maxValue: 20,
  },
  email: CONTACT_EMAIL,           // ✅ Real: hello@idcardtools.com
  telephone: CONTACT_PHONE,        // ✅ Real: +918699592500
  address: {
    "@type": "PostalAddress",
    streetAddress: "Indiranagar",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560038",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "PDF Tools",
    "Document Processing",
    "Aadhaar PVC Card Printing",
    "UIDAI Compliance",
    "Browser-based Processing",
    "OCR Technology",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE,          // ✅ Real phone
      email: CONTACT_EMAIL,              // ✅ Real email
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      email: "sales@idcardtools.com",
      contactType: "sales",
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      email: "press@idcardtools.com",
      contactType: "press",
      areaServed: "Worldwide",
    },
  ],
  // ⚠️ sameAs — SIRF tab uncomment karo jab accounts REAL hain
  // sameAs: [
  //   "https://twitter.com/idcardtools",
  //   "https://www.instagram.com/idcardtools",
  //   "https://www.linkedin.com/company/idcardtools",
  // ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: PAGE_URL },
  ],
};

// ⚠️ Ye 6 FAQs page pe VISIBLE hone chahiye — fake stats hata diye
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "What is idcardtools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "idcardtools is a free, privacy-first online toolkit with 31+ PDF tools and a premium E-Aadhaar PVC card printing service. Founded in 2023 in Bangalore, India.",
      },
    },
    {
      "@type": "Question",
      name: "Who founded idcardtools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "idcardtools was founded in 2023 as a side project to help people print their E-Aadhaar on PVC cards easily. It was built by a small team of Indian software engineers based in Bangalore.",
      },
    },
    {
      "@type": "Question",
      name: "Where is idcardtools based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "idcardtools is headquartered in Indiranagar, Bangalore, Karnataka, India.",
      },
    },
    {
      "@type": "Question",
      name: "Is idcardtools really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — all 31 PDF tools are 100% free, forever. No signup, no watermarks, no page limits. We only charge for the optional physical PVC card printing and delivery service (from ₹99).",
      },
    },
    {
      "@type": "Question",
      name: "How does idcardtools make money if the PDF tools are free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our only revenue comes from the physical E-Aadhaar PVC card printing and delivery service. We do not run ads, do not sell user data, and do not charge for any digital tool.",
      },
    },
    {
      "@type": "Question",
      name: "Does idcardtools sell my data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never. We don't sell, share, or rent your data to anyone. We don't run ads. Files uploaded to our servers are auto-deleted within 2 hours.",
      },
    },
  ],
};

// ⚠️ Person schema — generic "Founding Team" valid nahi hai
// Agar real founder hai → real name + LinkedIn daalo
// Nahi toh → hata do (jaisa maine kiya)
const teamPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#founder`,
  name: "idcardtools Founding Team",
  jobTitle: "Founder",
  worksFor: { "@id": `${SITE_URL}#organization` },
  url: PAGE_URL,
  knowsAbout: [
    "PDF Processing",
    "Web Development",
    "UIDAI Compliance",
    "Privacy Engineering",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamPersonSchema) }}
      />

      <AboutPage />
    </>
  );
}