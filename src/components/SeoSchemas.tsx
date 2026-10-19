import React from "react";

// ═══════════════════════════════════════════════
// CONSTANTS — single source of truth
// ═══════════════════════════════════════════════

export const SITE_URL = "https://idcardtools.com";
export const SITE_NAME = "idcardtools";
export const SITE_TITLE =
  "idcardtools — Print E-Aadhaar on PVC Card & Free PDF Tools";
export const SITE_DESCRIPTION =
  "Print your E-Aadhaar on premium PVC cards. 31+ free PDF tools and 30+ image tools. UIDAI-compliant. Privacy-first. Trusted by 2M+ Indians.";

// ✅ REAL contact info — verified
export const CONTACT_EMAIL = "hello@idcardtools.com";
export const CONTACT_PHONE = "+918699592500"; // E.164 for schema
export const CONTACT_PHONE_DISPLAY = "+91 86995-92500"; // UI display

const LOGO_URL = `${SITE_URL}/icons/icon-512.png`; // ✅ PNG, not ICO
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "Indiranagar",
  addressLocality: "Bangalore",
  addressRegion: "Karnataka",
  postalCode: "560038",
  addressCountry: "IN",
};

// ═══════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════

export type BreadcrumbItem = {
  name: string;
  path: string; // e.g. "/", "/e-aadhaar"
};

export type HowToStep = {
  name: string;
  text: string;
};

export type Review = {
  author: string;
  date: string; // ISO 8601: "2026-10-01"
  rating: number; // 1-5
  text: string;
};

export type ProductSchemaInput = {
  name: string;
  description: string;
  path: string;
  image?: string;
  sku?: string;
  mpn?: string;
  price?: { low: string; high: string; currency?: string };
  reviews?: Review[];              // ✅ Optional — real reviews only
  aggregateRating?: {               // ✅ Optional — omit if not available
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
    worstRating?: string;
  };
};

// ═══════════════════════════════════════════════
// 1. JSON-LD RENDERER
// ═══════════════════════════════════════════════

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

// ═══════════════════════════════════════════════
// 2. ORGANIZATION
// ═══════════════════════════════════════════════

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    alternateName: ["ID Card Tools", "idcardtools.com"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: OG_IMAGE,
    description: SITE_DESCRIPTION,
    foundingDate: "2023",
    foundingLocation: {
      "@type": "Place",
      name: "Bangalore, Karnataka, India",
    },
    email: CONTACT_EMAIL,        // ✅ hello@idcardtools.com
    telephone: CONTACT_PHONE,     // ✅ +918699592500
    address: ADDRESS,
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE,
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Kannada"],
        hoursAvailable: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "10:00",
            closes: "18:00",
          },
        ],
      },
    ],
    // ⚠️ sameAs — SIRF tab uncomment karo jab accounts REAL hain
    // sameAs: [
    //   "https://twitter.com/idcardtools",
    //   "https://www.instagram.com/idcardtools",
    //   "https://www.linkedin.com/company/idcardtools",
    // ],
  };
}

// ═══════════════════════════════════════════════
// 3. WEBSITE
// ═══════════════════════════════════════════════

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    alternateName: "ID Card Tools",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}#organization` },
    // ⚠️ SearchAction — Google ne Oct 2024 mein Sitelinks Search Box deprecate kar diya
    // Isliye isko include nahi kar rahe. Koi fayda nahi, sirf clutter.
  };
}

// ═══════════════════════════════════════════════
// 4. BREADCRUMB
// ═══════════════════════════════════════════════

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  // ⚠️ Minimum 2 items chahiye — single item Google ignore karta hai
  if (!items || items.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${items[items.length - 1].path}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,                              // ✅ Field present
      item: `${SITE_URL}${item.path}`,              // ✅ Absolute URL
    })),
  };
}

// ═══════════════════════════════════════════════
// 5. HOWTO
// ═══════════════════════════════════════════════

export function howToSchema({
  name,
  description,
  steps,
  totalTime = "PT5M",
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    tool: [{ "@type": "HowToTool", name: "Web browser" }],
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// ═══════════════════════════════════════════════
// 6. PRODUCT — no fake ratings
// ═══════════════════════════════════════════════

export function productSchema({
  name,
  description,
  path,
  image = OG_IMAGE,
  sku,
  mpn,
  price = { low: "99", high: "149", currency: "INR" },
  reviews,
  aggregateRating,
}: ProductSchemaInput) {
  const productUrl = `${SITE_URL}${path}`;

  // ⚠️ Ratings sirf tab include karo jab REAL hain
  const reviewData =
    reviews && reviews.length > 0
      ? reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          datePublished: r.date,
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: r.text,
        }))
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name,
    description,
    image: [image],
    url: productUrl,
    brand: { "@type": "Brand", name: SITE_NAME },
    ...(sku && { sku }),
    ...(mpn && { mpn }),

    // ✅ Sirf tab add karo jab data real hai
    ...(aggregateRating && { aggregateRating }),
    ...(reviewData && { review: reviewData }),

    offers: {
      "@type": "AggregateOffer",
      priceCurrency: price.currency || "INR",
      lowPrice: price.low,
      highPrice: price.high,
      offerCount: "2",
      availability: "https://schema.org/InStock",
      offers: [
        {
          "@type": "Offer",
          name: "Single Card",
          price: price.high,
          priceCurrency: price.currency || "INR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/contacts`,
        },
        {
          "@type": "Offer",
          name: "Bulk (10+ cards)",
          price: price.low,
          priceCurrency: price.currency || "INR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/contacts`,
        },
      ],
    },
  };
}

// ═══════════════════════════════════════════════
// 7. FAQ
// ═══════════════════════════════════════════════

export type FAQItem = { q: string; a: string };

export function faqSchema(items: FAQItem[], path: string) {
  if (!items || items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}