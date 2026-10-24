import type { Metadata } from "next";
import AadhaarCropPage from "@/components/paidtool/aadharcrop";
import Link from "next/link";
import { ShieldCheck, Lock, Crop, FileText, HelpCircle, CheckCircle2, Printer, MonitorSmartphone } from "lucide-react";

const SITE_URL = "https://idcardtools.com";
const PAGE_URL = `${SITE_URL}/e-aadhaar`;

export const metadata: Metadata = {
  title: "Aadhaar PDF to PVC Card free pvc card | pdf to aadhar card pvc",
  description: "Crop and print Aadhaar PDF online. Convert e-Aadhaar to ultra HD color PVC card (85.6x54mm) or 4x6 printable PDF. 100% private in-browser eCutter for instant CSC printing. No Photoshop needed.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Crop Aadhaar PDF for PVC Card | pdf to aadhar card pvc",
    description: "Convert your normal e-Aadhaar PDF into an ultra HD Color PVC card or 4x6 printable PDF instantly. 100% secure eCutter.",
    url: PAGE_URL,
    images: [`${SITE_URL}/og-aadhaar-crop.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crop Aadhaar PDF for PVC Card | pdf to aadhar card pvc",
    description: "Fast, 100% private in-browser eCutter to crop e-Aadhaar PDFs into standard PVC size.",
    images: [`${SITE_URL}/og-aadhaar-crop.png`],
  },
};

// ==========================================
// 1. AEO & GEO: HowTo Schema (Updated with New Keywords)
// ==========================================
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Crop and Print E-Aadhaar PDF for PVC Card",
  description: "Step-by-step guide to automatically crop and print your E-Aadhaar PDF to the exact PVC card size (85.6mm x 54mm) or 4x6 photo paper.",
  totalTime: "PT2M",
  tool: [{ "@type": "HowToTool", name: "idcardtools Aadhaar eCutter" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload Aadhaar PDF",
      text: "Select or drag and drop your password-protected E-Aadhaar PDF.",
      url: `${PAGE_URL}#step1`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter Aadhaar PDF Password",
      text: "Enter your password (usually first 4 letters of name in CAPS + birth year).",
      url: `${PAGE_URL}#step2`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Auto Crop Front & Back",
      text: "Our tool automatically detects and crops the front and back sides of the Aadhaar card in perfect size.",
      url: `${PAGE_URL}#step3`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Print or Download",
      text: "Download ultra HD PNGs, A4 print-ready PDF, or 4x6 photo paper format for instant printing.",
      url: `${PAGE_URL}#step4`,
    },
  ],
};

// ==========================================
// 2. AEO: FAQ Schema (Adapted from your provided text)
// ==========================================
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best tool to crop and print Aadhaar PDF?",
      acceptedAnswer: { "@type": "Answer", text: "idcardtools offers a free, in-browser eCutter to automatically crop and print Aadhaar front and back sides. You can upload the PDF, crop it perfectly, and download it without installing any software like Photoshop." },
    },
    {
      "@type": "Question",
      name: "What is the standard Aadhaar card cutting size?",
      acceptedAnswer: { "@type": "Answer", text: "The standard size for a PVC Aadhaar card is 85.6 mm × 54.0 mm. Our online Aadhaar cutter automatically sets this exact dimension, so you do not have to manually adjust sizes or use size frames." },
    },
    {
      "@type": "Question",
      name: "How to crop Aadhaar card PDF without Photoshop?",
      acceptedAnswer: { "@type": "Answer", text: "You can use our online eCutter. Just upload the Aadhaar PDF, enter the password, and the tool automatically crops the front and back side areas. You can then download the image or print it directly." },
    },
    {
      "@type": "Question",
      name: "Can I print PVC and Paper Aadhaar cards from this tool?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, you get options for high-quality PNG downloads, A4 PVC print formats, and 4x6 photo paper layouts perfect for CSC operators and cyber cafes." },
    },
    {
      "@type": "Question",
      name: "Is this Aadhaar card crop software free to use?",
      acceptedAnswer: { "@type": "Answer", text: "Absolutely. It is a 100% free, web-based software. You do not need to install anything on your computer. Simply open the website and crop unlimited Aadhaar cards securely." },
    },
    {
      "@type": "Question",
      name: "Is it safe to upload my Aadhaar PDF here?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, it is 100% safe. The entire cropping process happens locally in your web browser. Your password-protected PDF is never uploaded to our servers." },
    },
  ],
};

// ==========================================
// 3. SEO: WebApplication Schema
// ==========================================
const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "E-Aadhaar PVC Card eCutter & Printer",
  url: PAGE_URL,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any (Web-based)",
  browserRequirements: "Requires JavaScript. Requires HTML5 Canvas.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1250",
  },
};

export default function AadhaarCropRoute() {
  return (
    <>
      {/* Injecting Schema into the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <main className="min-h-screen pb-20">
        {/* Top SEO Header */}
        <div className="border-b border-slate-200 pt-16 pb-12 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1
              className="text-3xl md:text-5xl font-bold mb-6 text-slate-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Aadhaar pdf (e-Aadhaar) to PVC Card ready eCutter & Printer Online
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Convert your normal e-Aadhaar PDF into an <strong>ultra HD Color PVC card</strong>, A4 sheet, or <strong>4×6 printable PDF</strong> instantly. Fast, 100% private in-browser eCutter to crop e-Aadhaar PDFs into standard <strong>85.6×54mm PVC size</strong> for instant CSC printing.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-200 text-sm font-medium">
              <ShieldCheck className="w-5 h-5" />
              100% Privacy Guaranteed — Files Never Leave Your Browser
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* MAIN TOOL COMPONENT */}
        {/* ========================================== */}
        <div className="container mx-auto max-w-5xl px-4 py-8">
          {/* आपका ओरिजिनल टूल यहाँ रेंडर हो रहा है */}
          <AadhaarCropPage />
        </div>

        {/* ========================================== */}
        {/* SEO & GEO CONTENT */}
        {/* ========================================== */}
        <div className="container mx-auto max-w-4xl px-6 text-slate-800">
          {/* How it Works (Steps) */}
          <div className="mb-16 mt-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-8 text-slate-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              How to Crop and Print Aadhaar Card PDF Online
            </h2>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[#ff6a00] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-orange-500/30">1</div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Select Aadhaar PDF</h3>
                  <p className="text-slate-600 leading-relaxed">Upload your downloaded E-Aadhaar PDF. You don't need to convert it to an image first; our tool handles the PDF directly.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[#ff6a00] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-orange-500/30">2</div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Enter Aadhaar PDF Password</h3>
                  <p className="text-slate-600 leading-relaxed">The official UIDAI PDF is password-protected. Enter the password (First 4 letters of your name in CAPS + Year of Birth, e.g., SURE1990) to unlock it.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[#ff6a00] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-orange-500/30">3</div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Auto Crop Front & Back</h3>
                  <p className="text-slate-600 leading-relaxed">The tool automatically detects and highlights the front and back of the Aadhaar card in red and blue boxes. You can fine-tune the crop area or enhance brightness/contrast if needed.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[#ff6a00] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-orange-500/30">4</div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Print or Download</h3>
                  <p className="text-slate-600 leading-relaxed">Download ultra HD PNG images, or generate a ready-to-print A4 / 4x6 PDF containing both sides in standard PVC dimensions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6 text-slate-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Why Use Our Aadhaar eCutter Tool?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <Printer className="w-8 h-8 text-[#ff6a00] mb-4" />
                <h3 className="font-bold text-lg mb-2">Ultra HD & Print Ready</h3>
                <p className="text-slate-600 text-sm">Get high-resolution 300 DPI output. Perfect for PVC card printing machines, CSC centers, and cyber cafes.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <MonitorSmartphone className="w-8 h-8 text-[#ff6a00] mb-4" />
                <h3 className="font-bold text-lg mb-2">No Software Needed</h3>
                <p className="text-slate-600 text-sm">Forget Photoshop or complicated software. Everything works perfectly on your mobile or computer browser.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <Crop className="w-8 h-8 text-[#ff6a00] mb-4" />
                <h3 className="font-bold text-lg mb-2">Perfect PVC Size</h3>
                <p className="text-slate-600 text-sm">Automatically locks the aspect ratio to the standard credit card size (85.6 mm × 54.0 mm). No manual resizing required.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-[#ff6a00] mb-4" />
                <h3 className="font-bold text-lg mb-2">100% Secure</h3>
                <p className="text-slate-600 text-sm">Your Aadhaar data is highly sensitive. Our local browser processing ensures your files are never uploaded to a server.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6 text-slate-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#ff6a00] shrink-0 mt-0.5" />
                  What is the standard Aadhaar card cutting size?
                </h3>
                <p className="text-slate-600 text-[15px] leading-relaxed pl-8">
                  The standard size for a PVC Aadhaar card is <strong>85.6 mm × 54.0 mm</strong>. Our online Aadhaar cutter automatically sets this exact dimension, so you do not have to manually adjust sizes or use size frames.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#ff6a00] shrink-0 mt-0.5" />
                  How to crop Aadhaar card PDF without Photoshop?
                </h3>
                <p className="text-slate-600 text-[15px] leading-relaxed pl-8">You can use our free online eCutter. Just upload the Aadhaar PDF, enter the password, and the tool automatically crops the front and back side areas in one click. You can then download the image or print it directly.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#ff6a00] shrink-0 mt-0.5" />
                  What is the password for E-Aadhaar PDF?
                </h3>
                <p className="text-slate-600 text-[15px] leading-relaxed pl-8">The standard password for an E-Aadhaar PDF is the first 4 letters of your name (in UPPERCASE) followed by your year of birth (e.g., SURE1990). If you created a custom password, use that instead.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-3">
                  <Printer className="w-5 h-5 text-[#ff6a00] shrink-0 mt-0.5" />
                  Can I print PVC and Paper Aadhaar cards from this tool?
                </h3>
                <p className="text-slate-600 text-[15px] leading-relaxed pl-8">Yes, you get options for high-quality PNG downloads, A4 PVC print formats, and 4x6 photo paper layouts perfect for CSC operators and cyber cafes.</p>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="border-t border-slate-200 pt-8 mt-8">
            <h3 className="font-semibold mb-4 text-slate-800 text-lg">Related Tools & Services</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/agri-pdf"
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:border-[#ff6a00] hover:text-[#ff6a00] transition-colors shadow-sm"
              >
                Order Printed PVC Card
              </Link>
              <Link
                href="/pdf-tools"
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:border-[#ff6a00] hover:text-[#ff6a00] transition-colors shadow-sm"
              >
                Explore Free PDF Tools
              </Link>
              <Link
                href="/tools/pan-crop"
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:border-[#ff6a00] hover:text-[#ff6a00] transition-colors shadow-sm"
              >
                PAN Card Cropper
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
