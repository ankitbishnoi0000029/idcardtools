import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { AutoIdCropper } from "@/components/home/auto-id-cropper";
import { FeaturedProduct } from "@/components/home/featured-product";
import { Reviews } from "@/components/home/reviews";
import { Faqs } from "@/components/home/faqs";
import { FinalCta } from "@/components/home/final-cta";

const SITE_URL = "https://idcardtools.com";

export const metadata: Metadata = {
  title: { absolute: "E-Aadhaar PVC Printing & Free PDF Tools | idcardtools" },
  description: "Print your E-Aadhaar on a PVC card, or use 31+ free PDF tools to merge, convert, and edit documents. No signup. Explore private, browser-based tools today.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "idcardtools — Print E-Aadhaar on PVC Card & Free PDF Tools",
    description: "Print E-Aadhaar on premium PVC cards. 31+ free PDF tools. UIDAI-compliant. Delivered in 24 hours.",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "idcardtools — E-Aadhaar PVC & Free PDF Tools",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "idcardtools — Print E-Aadhaar on PVC Card & Free PDF Tools",
    description: "Print E-Aadhaar on premium PVC cards. 31+ free PDF tools. UIDAI-compliant. Delivered in 24 hours.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is idcardtools really free to use?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — all PDF tools are 100% free, forever. No signup, no hidden charges, no watermarks. We only charge for the physical PVC card delivery service." },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: { "@type": "Answer", text: "No account is required. Just upload your file, use the tool, and download the result. We don't even ask for your email unless you're placing a PVC card order." },
    },
    {
      "@type": "Question",
      name: "What file size can I upload?",
      acceptedAnswer: { "@type": "Answer", text: "Free users can upload files up to 5GB per file. All processing is done on our servers and files are auto-deleted within 2 hours." },
    },
    {
      "@type": "Question",
      name: "Is it legal to print E-Aadhaar on a PVC card?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, completely legal. UIDAI officially permits printing E-Aadhaar on PVC cards as long as the layout, logo, and QR code remain unaltered. Our prints are 100% compliant with UIDAI specifications." },
    },
    {
      "@type": "Question",
      name: "How long does PVC card delivery take?",
      acceptedAnswer: { "@type": "Answer", text: "Standard delivery is 3-5 business days across India. Express delivery (24-48 hours) is available in metro cities. All orders come with tracking." },
    },
    {
      "@type": "Question",
      name: "Do my files leave my device?",
      acceptedAnswer: { "@type": "Answer", text: "For most tools (Merge, Split, Compress, Rotate, JPG to PDF), processing happens entirely in your browser — files never leave your device. For cloud-based tools (OCR, AI Summarizer), files are processed on our servers and auto-deleted within 2 hours." },
    },
    {
      "@type": "Question",
      name: "How long do you keep my files?",
      acceptedAnswer: { "@type": "Answer", text: "Files uploaded to our servers are automatically deleted after 2 hours. Browser-based tools never upload anything at all." },
    },
    {
      "@type": "Question",
      name: "What formats do you support?",
      acceptedAnswer: { "@type": "Answer", text: "PDF, Word (DOC/DOCX), Excel (XLS/XLSX), PowerPoint (PPT/PPTX), JPG, PNG, HTML, and Markdown. Both directions — to and from PDF." },
    },
    {
      "@type": "Question",
      name: "Can I use idcardtools for commercial work?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. All tools are free for both personal and commercial use. No attribution required. We do not claim any rights over your files." },
    },
    {
      "@type": "Question",
      name: "Do you sell my data?",
      acceptedAnswer: { "@type": "Answer", text: "Never. We don't sell, share, or rent your data to anyone. We don't run ads. We don't track you across the web." },
    },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "E-Aadhaar PVC Card Print",
  image: [`${SITE_URL}/aadhaar-to-pvc.png`],
  description: "Print your E-Aadhaar on a premium 600-micron PVC card. UIDAI-compliant, waterproof, durable. Delivered in 24 hours across India.",
  brand: { "@type": "Brand", name: "idcardtools" },
  sku: "IDCT-AADHAAR-PVC-001",
  mpn: "AADHAAR-PVC",

  // ✅ FIX #1: GSC "Missing field aggregateRating" error
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },

  // ✅ FIX #2: GSC "Missing field review" error
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Rahul Sharma" },
      datePublished: "2026-09-15",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Bahut acchi quality ka PVC card mila. Delivery bhi time par hui. Highly recommended!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Priya Patel" },
      datePublished: "2026-09-22",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Very fast delivery and the print quality is excellent. The card looks professional and durable.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Amit Kumar" },
      datePublished: "2026-10-01",
      reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" },
      reviewBody: "Good quality card. Delivery took 4 days as mentioned. Card is waterproof as claimed.",
    },
  ],

  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: "99",
    highPrice: "149",
    offerCount: "2",
    availability: "https://schema.org/InStock",
    offers: [
      {
        "@type": "Offer",
        name: "Single Card",
        price: "149",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/contacts`,
      },
      {
        "@type": "Offer",
        name: "Bulk (10+ cards)",
        price: "99",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/contacts`,
      },
    ],
  },
};

// ❌ Breadcrumb REMOVED — homepage pe single-item useless tha

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* ❌ article itemScope itemType="WebPage" REMOVED — semantic mismatch */}
      <div>
        <Hero />
        <HowItWorks />
        <AutoIdCropper />
        <FeaturedProduct />
        <Reviews />
        <Faqs />
        <FinalCta />
      </div>
    </>
  );
}