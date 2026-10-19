import ContactPage from "@/components/contact-page";
import type { Metadata } from "next";

const SITE_URL = "https://idcardtools.com";
const PAGE_URL = `${SITE_URL}/contacts`;

// ✅ REAL CONTACT INFO (verified)
const CONTACT_EMAIL = "hello@idcardtools.com";
const CONTACT_PHONE = "+918699592500";        // schema format (E.164)
const CONTACT_PHONE_DISPLAY = "+91 86995-92500"; // UI display

// ═══════════════════════════════════════════════
// ⚠️ VERIFY KARO:
// 1. ✅ Telephone — REAL (confirmed)
// 2. ✅ Email — REAL (hello@idcardtools.com)
// 3. ⚠️ Social handles — real hone par uncomment karo
// 4. ⚠️ Address — real hai? (Indiranagar Bangalore)
// ═══════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Contact Us — Support, Bulk Orders & Partnerships",
  description:
    "Get in touch with idcardtools. Email support within 2 hours, phone support Mon-Fri 10AM-6PM, or visit our Bangalore office. Bulk PVC card orders and partnerships welcome.",
  keywords: [
    "contact idcardtools",
    "idcardtools support",
    "bulk pvc card order",
    "aadhaar pvc bulk order",
    "pvc card partnership",
    "id card printing customer service",
    "pdf tools support",
    "contact pdf tools company",
    "bangalore id card printing",
    "indiranagar pvc card",
    "idcardtools bangalore",
  ],
  authors: [{ name: "idcardtools", url: SITE_URL }],
  creator: "idcardtools",
  publisher: "idcardtools",
  category: "Contact",
  alternates: {
    canonical: PAGE_URL,
    languages: { "en-IN": PAGE_URL },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    siteName: "idcardtools",
    title: "Contact idcardtools — Support, Bulk Orders & Partnerships",
    description:
      "Email support within 2 hours. Phone support Mon-Fri. Bangalore office by appointment. Bulk PVC card orders welcome.",
    countryName: "India",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact idcardtools",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // ⚠️ Real handle hone par uncomment karo
    // site: "@idcardtools",
    // creator: "@idcardtools",
    title: "Contact idcardtools — Support & Bulk Orders",
    description: "Email support within 2 hours. Bulk PVC card orders welcome.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ═══════════════════════════════════════════════
// STRUCTURED DATA
// ═══════════════════════════════════════════════

// 1. ContactPage
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${PAGE_URL}#contactpage`,
  name: "Contact idcardtools",
  description:
    "Get in touch with idcardtools for support, bulk orders, or partnerships. Email response within 2 hours.",
  url: PAGE_URL,
  inLanguage: "en-IN",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: "idcardtools",
    url: SITE_URL,
  },
  about: { "@id": `${SITE_URL}#organization` },
  breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
};

// 2. Organization + ContactPoint
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "idcardtools",
  alternateName: ["ID Card Tools", "idcardtools.com"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icons/icon-512.png`,
    width: 512,
    height: 512,
  },
  description:
    "idcardtools provides free PDF tools and premium E-Aadhaar PVC card printing services across India.",
  foundingDate: "2023",
  email: CONTACT_EMAIL,        // ✅ hello@idcardtools.com
  telephone: CONTACT_PHONE,    // ✅ +918699592500
  address: {
    "@type": "PostalAddress",
    streetAddress: "Indiranagar",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560038",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,   // ✅ Real phone
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Kannada"],
      hoursAvailable: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "18:00",
        },
      ],
    },
    // ⚠️ Sales/Support — sirf tab uncomment karo jab REAL ho
    // {
    //   "@type": "ContactPoint",
    //   email: "sales@idcardtools.com",
    //   contactType: "sales",
    //   areaServed: "IN",
    //   availableLanguage: ["English", "Hindi"],
    // },
    // {
    //   "@type": "ContactPoint",
    //   email: "support@idcardtools.com",
    //   contactType: "technical support",
    //   areaServed: "Worldwide",
    //   availableLanguage: ["English"],
    // },
  ],
  // ⚠️ sameAs — SIRF tab uncomment karo jab accounts REAL hain
  // sameAs: [
  //   "https://twitter.com/idcardtools",
  //   "https://www.instagram.com/idcardtools",
  //   "https://www.linkedin.com/company/idcardtools",
  // ],
};

// 3. LocalBusiness — no aggregateRating (page pe visible nahi)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#localbusiness`,
  name: "idcardtools",
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  email: CONTACT_EMAIL,        // ✅ hello@
  telephone: CONTACT_PHONE,    // ✅ +918699592500
  priceRange: "₹99 - ₹499",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Indiranagar",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560038",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "14:00",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

// 4. BreadcrumbList
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: PAGE_URL,
    },
  ],
};

// 5. FAQPage — ⚠️ Ye 6 FAQs page pe VISIBLE hone chahiye
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast do you reply to contact requests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We usually reply within 2 hours on weekdays (Monday to Friday, 10AM-6PM IST). Weekend emails may take up to 24 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer phone support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes, we offer phone support at ${CONTACT_PHONE_DISPLAY} for PVC card orders and bulk inquiries. For all other questions, please email ${CONTACT_EMAIL} for the fastest response.`,
      },
    },
    {
      "@type": "Question",
      name: "Can I visit the idcardtools office?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes, by appointment only. Our office is located in Indiranagar, Bangalore. Email ${CONTACT_EMAIL} to schedule a visit.`,
      },
    },
    {
      "@type": "Question",
      name: "How do I place a bulk PVC card order?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Email us at ${CONTACT_EMAIL} with your quantity requirement (minimum 10 cards) and we'll send you a custom quote within 24 hours. Special pricing applies for orders of 100+ cards.`,
      },
    },
    {
      "@type": "Question",
      name: "Do you offer partnerships or white-label services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes. We partner with cyber cafés, CSC centers, and businesses across India. Email ${CONTACT_EMAIL} with details about your business and we'll get back to you within 24 hours.`,
      },
    },
    {
      "@type": "Question",
      name: "What information should I include in my message?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Include your name, the specific tool or service you're asking about, and as much context as possible. If it's a bulk order, include quantity, timeline, and location.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ContactPage />
    </>
  );
}