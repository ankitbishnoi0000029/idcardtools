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

// ✅ FIXED: Schema perfectly matches the Faqs.tsx content
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is idcardtools really free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes — all our PDF tools are 100% free, forever. No signup, no hidden charges, no watermarks. We only charge for the physical E-Aadhaar PVC card delivery service (from ₹99)." } },
    { "@type": "Question", name: "Do I need to create an account?", acceptedAnswer: { "@type": "Answer", text: "No account is required. Just upload your file, use the tool, and download the result. We don't even ask for your email unless you're placing a PVC card order." } },
    { "@type": "Question", name: "What file size can I upload?", acceptedAnswer: { "@type": "Answer", text: "Free users can upload files up to 5GB per file. For PVC card orders, your E-Aadhaar PDF just needs to be under 20MB (which every official E-Aadhaar PDF is)." } },
    { "@type": "Question", name: "Do you have mobile apps?", acceptedAnswer: { "@type": "Answer", text: "Not yet — but our entire toolkit works perfectly on mobile browsers (Chrome, Safari, Edge). No installation required. Just open, upload, and go." } },
    { "@type": "Question", name: "Is it legal to print E-Aadhaar on a PVC card?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely legal. UIDAI officially permits printing E-Aadhaar on PVC cards as long as the layout, logo, and QR code remain unaltered. Our prints are 100% compliant with UIDAI specifications." } },
    { "@type": "Question", name: "How long does delivery take?", acceptedAnswer: { "@type": "Answer", text: "Standard delivery is 3-5 business days across India. Express delivery (24-48 hours) is available in metro cities for an additional charge. All orders come with tracking." } },
    { "@type": "Question", name: "How is my PVC Aadhaar different from the original paper one?", acceptedAnswer: { "@type": "Answer", text: "It contains the exact same information, QR code, and layout as your E-Aadhaar. The only difference is the material — 600-micron PVC (same as bank cards) instead of paper. It's waterproof, tear-proof, and pocket-sized." } },
    { "@type": "Question", name: "Can I order in bulk for my team or family?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. We offer special pricing for orders of 10+ cards. Email us at hello@idcardtools.com with the quantity and we'll send you a custom quote within 24 hours." } },
    { "@type": "Question", name: "Do my files leave my device?", acceptedAnswer: { "@type": "Answer", text: "For most tools (Merge, Split, Compress, Rotate, JPG to PDF), processing happens entirely in your browser — files never leave your device. For cloud-based tools (OCR, AI Summarizer), files are processed on our servers and auto-deleted within 2 hours." } },
    { "@type": "Question", name: "What formats do you support?", acceptedAnswer: { "@type": "Answer", text: "PDF, Word (DOC/DOCX), Excel (XLS/XLSX), PowerPoint (PPT/PPTX), JPG, PNG, HTML, and Markdown. Both directions — to and from PDF." } },
    { "@type": "Question", name: "Can I use this for commercial work?", acceptedAnswer: { "@type": "Answer", text: "Yes. All tools are free for both personal and commercial use. No attribution required. We do not claim any rights over your files." } },
    { "@type": "Question", name: "What happens if a conversion fails?", acceptedAnswer: { "@type": "Answer", text: "If something goes wrong, try again with a smaller file or a different format. If it still fails, email us the file and we'll investigate within 24 hours. Your files are always auto-deleted after processing." } },
    { "@type": "Question", name: "How long do you keep my files?", acceptedAnswer: { "@type": "Answer", text: "Files uploaded to our servers (for OCR, AI, or PVC orders) are automatically deleted after 2 hours. Browser-based tools never upload anything at all." } },
    { "@type": "Question", name: "Do you sell my data?", acceptedAnswer: { "@type": "Answer", text: "Never. We don't sell, share, or rent your data to anyone. We don't run ads. We don't track you across the web. Our only revenue is the small fee we charge for physical PVC card deliveries." } },
    { "@type": "Question", name: "Is my Aadhaar data secure?", acceptedAnswer: { "@type": "Answer", text: "Your E-Aadhaar PDF is encrypted in transit (TLS 1.3), stored encrypted at rest, and permanently deleted within 2 hours of your PVC card being printed. Only you and our printing operator see the file. We never store biometric data." } },
  ],
};

// ✅ FIXED: Schema matches the reviews shown in UI exactly
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "E-Aadhaar PVC Card Print",
  image: [`${SITE_URL}/aadhaar-to-pvc.png`],
  description: "Print your E-Aadhaar on a premium 600-micron PVC card. UIDAI-compliant, waterproof, durable. Delivered in 24 hours across India.",
  brand: { "@type": "Brand", name: "idcardtools" },
  sku: "IDCT-AADHAAR-PVC-001",
  mpn: "AADHAAR-PVC",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "5",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    { "@type": "Review", author: { "@type": "Person", name: "Priya Sharma" }, datePublished: "2026-10-15", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "I printed over 200 E-Aadhaar PVC cards for my clients last month. The quality is exactly like a bank card — nobody can tell the difference." },
    { "@type": "Review", author: { "@type": "Person", name: "Rajesh Kumar" }, datePublished: "2026-10-18", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "The AI summarizer saved me hours of reading contracts. What used to take an entire evening now takes 30 seconds." },
    { "@type": "Review", author: { "@type": "Person", name: "Anjali Verma" }, datePublished: "2026-10-20", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "We process 500+ employee documents every quarter. The bulk PDF tools handle everything flawlessly. The privacy features mean I never worry." },
    { "@type": "Review", author: { "@type": "Person", name: "Mohammed Faisal" }, datePublished: "2026-10-22", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "Clean interface, no ads, no signup. The PVC Aadhaar card service alone is worth it — mine looks better than the original paper version." },
    { "@type": "Review", author: { "@type": "Person", name: "Sneha Patel" }, datePublished: "2026-10-24", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "The redaction tool is a lifesaver for court filings. It permanently removes sensitive information before I submit. I recommend this to every junior." }
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: "99",
    highPrice: "149",
    offerCount: "2",
    availability: "https://schema.org/InStock",
    offers: [
      { "@type": "Offer", name: "Single Card", price: "149", priceCurrency: "INR", availability: "https://schema.org/InStock", url: `${SITE_URL}/agri-pdf` },
      { "@type": "Offer", name: "Bulk (10+ cards)", price: "99", priceCurrency: "INR", availability: "https://schema.org/InStock", url: `${SITE_URL}/agri-pdf` },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
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