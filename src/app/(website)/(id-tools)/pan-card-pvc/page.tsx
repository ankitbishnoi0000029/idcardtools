import type { Metadata } from "next";
import { Pan } from "@/components/paidtool/pan";

// 🚀 SEO मेटाडेटा (Next.js App Router)
export const metadata: Metadata = {
  title: "Convert e-PAN PDF to PVC Card Online Free (85.6×54mm) | PAN Card Cutter",
  description: "Free online tool to convert e-PAN PDF to PVC card. Auto-crop front & back to exact CR80 85.6×54mm size. 100% secure, works in browser. Enter PDF password (DOB) and download print-ready layout instantly.",
  keywords: ["e-PAN PDF to PVC card", "PAN card cutter online", "convert e-PAN to PVC", "PAN card PVC print", "e-PAN PDF crop", "PAN card 85.6x54mm", "PAN card print online free", "NSDL e-PAN to PVC", "UTIITSL e-PAN crop", "PAN card password DOB", "e-PAN PVC card size"],
  alternates: {
    canonical: "https://yourdomain.com/tools/pan-card-cutter",
  },
  openGraph: {
    title: "Convert e-PAN PDF to PVC Card Online Free (85.6×54mm)",
    description: "Auto-crop e-PAN PDF front & back to exact PVC card size. No upload, 100% secure, works in browser.",
    url: "https://yourdomain.com/tools/pan-card-cutter",
    siteName: "Your Brand",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-pan-cutter.jpg",
        width: 1200,
        height: 630,
        alt: "e-PAN to PVC Card Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert e-PAN PDF to PVC Card Online Free (85.6×54mm)",
    description: "Auto-crop e-PAN PDF front & back to exact PVC card size. 100% secure, browser-based.",
    images: ["https://yourdomain.com/og-pan-cutter.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 📄 पेज कंपोनेंट
export default function Page() {
  return (
    <>
      {/* Schema.org Structured Data (Google Rich Results के लिए) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "e-PAN PDF to PVC Card Converter",
            description: "Free online tool to crop e-PAN PDF front and back to exact 85.6×54mm PVC card size. 100% client-side, no upload required.",
            url: "https://yourdomain.com/tools/pan-card-cutter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
            featureList: ["Auto-crop e-PAN front & back", "Exact CR80 85.6×54mm size", "Password-protected PDF support", "No file upload – 100% secure", "Works in browser"],
          }),
        }}
      />

      {/* FAQ Schema (Google Rich Snippets के लिए) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this e-PAN to PVC card converter free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, this tool is completely free to use. There are no hidden charges, watermarks, or sign-up requirements.",
                },
              },
              {
                "@type": "Question",
                name: "Is my e-PAN PDF uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, all processing happens 100% locally in your browser. Your PDF file never leaves your device, ensuring complete privacy.",
                },
              },
              {
                "@type": "Question",
                name: "What is the exact size of a PVC PAN card?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A standard PVC PAN card follows the ISO/IEC 7810 ID-1 (CR80) format, which is exactly 85.60 mm × 53.98 mm (approximately 85.6 × 54 mm).",
                },
              },
              {
                "@type": "Question",
                name: "How do I get the password for my e-PAN PDF?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The e-PAN PDF password is usually your date of birth in DDMMYYYY format (e.g., 01011990). Some portals may use your PAN number or a password sent via SMS/email.",
                },
              },
              {
                "@type": "Question",
                name: "Does this tool work on mobile phones?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the tool is fully responsive and works seamlessly on mobile browsers like Chrome and Safari.",
                },
              },
              {
                "@type": "Question",
                name: "Will the QR code and signature remain clear after cropping?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the tool processes the PDF at high resolution (vector-based lossless cropping) so the QR code, photo, and signature remain crisp and scannable for KYC purposes.",
                },
              },
              {
                "@type": "Question",
                name: "Can I print the cropped PAN card on A4 paper?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the downloaded output is a standard PDF. You can print it on A4 paper at 100% scale (no margins) or use a dedicated PVC card printer for plastic cards.",
                },
              },
            ],
          }),
        }}
      />

      {/* ✅ यूज़र के लिए विस्तृत ऑन-पेज कंटेंट (SEO + Helpful Content) */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* H1 हेडिंग */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Convert e-PAN PDF to PVC Card Online (Exact 85.6×54mm Size)</h1>
        <p className="text-lg text-gray-600 mb-8">Free, secure, and browser-based tool to crop your e-PAN PDF front and back to the standard CR80 PVC card size. No file upload required.</p>

        {/* मुख्य टूल कंपोनेंट */}
        <section className="mb-12">
          <Pan />
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">How to Convert e-PAN PDF to PVC Card in 3 Easy Steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Upload */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">1</div>
              <div className="mt-4 mb-4 flex justify-center">
                {/* Upload Icon */}
                <svg
                  className="w-16 h-16 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload & Unlock PDF</h3>
              <p className="text-sm text-gray-600">Upload your downloaded e-PAN PDF. If it asks for a password, simply enter your Date of Birth (DDMMYYYY) format to unlock it securely in your browser.</p>
            </div>

            {/* Step 2: Auto Crop */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">2</div>
              <div className="mt-4 mb-4 flex justify-center">
                {/* Crop Icon */}
                <svg
                  className="w-16 h-16 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Auto-Crop to PVC Size</h3>
              <p className="text-sm text-gray-600">The tool automatically detects the Front and Back sides of your PAN card. It perfectly crops them to the exact standard PVC size (85.6 × 54 mm) without losing any quality.</p>
            </div>

            {/* Step 3: Download & Sticker */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">3</div>
              <div className="mt-4 mb-4 flex justify-center">
                {/* Download/Sticker Icon */}
                <svg
                  className="w-16 h-16 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Download & Print Sticker</h3>
              <p className="text-sm text-gray-600">Click download to get a high-quality 2-page PDF. You can print this directly on A4 Sticker sheets (for front & back), cut them out, and paste them on a blank PVC card.</p>
            </div>
          </div>
        </section>

        {/* कंटेंट सेक्शन: यह क्या है और कैसे काम करता है */}
        <section className="mb-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is an e-PAN PDF to PVC Card Converter?</h2>
          <p className="text-gray-600 mb-4">
            An e-PAN (electronic Permanent Account Number) is a digitally signed PDF issued by the Income Tax Department via Protean (NSDL) or UTIITSL. However, the downloaded file is an A4-sized document containing the card along with acknowledgment receipts, legal disclaimers, and tax guidelines. For everyday use—such as bank KYC, opening a demat account, or carrying it in your wallet—you need the actual card cropped to the standard <strong>ISO/IEC 7810 ID-1 (CR80)</strong> size: <strong>85.60 mm × 53.98 mm</strong>.
          </p>
          <p className="text-gray-600 mb-4">Our tool automatically detects the card boundaries, extracts both the front and back sides, and generates high-resolution, print-ready pages. Because it runs entirely in your browser, your sensitive financial data never leaves your device.</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Do You Need This Tool?</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>
              <strong>Exact Size:</strong> Manual cropping often results in cards that don't fit standard wallet sleeves or PVC card trays. This tool locks the crop box to 85.6 × 54 mm.
            </li>
            <li>
              <strong>Privacy First:</strong> Unlike other online tools that upload your PDF to a server, this tool processes everything locally. Your PAN data stays private.
            </li>
            <li>
              <strong>High Resolution:</strong> Screenshots can blur the QR code and signature. Our lossless PDF cropping preserves vector clarity for KYC scanners.
            </li>
            <li>
              <strong>Password Support:</strong> e-PAN PDFs are password-protected. This tool securely decrypts the file in your browser using your DOB (DDMMYYYY).
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">How It Works (Step-by-Step)</h3>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>
              <strong>Upload your e-PAN PDF:</strong> Drag and drop the file you downloaded from NSDL, UTIITSL, or the Income Tax portal.
            </li>
            <li>
              <strong>Enter the password:</strong> Use your date of birth in DDMMYYYY format (e.g., 01011990).
            </li>
            <li>
              <strong>Adjust (if needed):</strong> Use the slider to fine-tune the split between the front and back sides.
            </li>
            <li>
              <strong>Download:</strong> Click "Download Front & Back PDF" to get a two-page PDF with each side perfectly cropped.
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Specifications (CR80 Card Size)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-gray-600">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Property</th>
                  <th className="border px-4 py-2 text-left">Standard Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Standard</td>
                  <td className="border px-4 py-2">ISO/IEC 7810 ID-1 (CR80)</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Dimensions (mm)</td>
                  <td className="border px-4 py-2">85.60 × 53.98 mm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Dimensions (inches)</td>
                  <td className="border px-4 py-2">3.370 × 2.125 in</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Corner Radius</td>
                  <td className="border px-4 py-2">2.88 – 3.48 mm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Thickness (typical)</td>
                  <td className="border px-4 py-2">0.76 mm (30 mil)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 🔍 विस्तृत FAQ सेक्शन (ऑन-पेज) */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Is this e-PAN to PVC card converter free?</h3>
              <p className="text-gray-600 mt-1">Yes, this tool is completely free to use. There are no hidden charges, watermarks, or sign-up requirements.</p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Is my e-PAN PDF uploaded to a server?</h3>
              <p className="text-gray-600 mt-1">No, all processing happens 100% locally in your browser. Your PDF file never leaves your device, ensuring complete privacy.</p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">What is the exact size of a PVC PAN card?</h3>
              <p className="text-gray-600 mt-1">A standard PVC PAN card follows the ISO/IEC 7810 ID-1 (CR80) format, which is exactly 85.60 mm × 53.98 mm (approximately 85.6 × 54 mm).</p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">How do I get the password for my e-PAN PDF?</h3>
              <p className="text-gray-600 mt-1">The e-PAN PDF password is usually your date of birth in DDMMYYYY format (e.g., 01011990). Some portals may use your PAN number or a password sent via SMS/email.</p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Does this tool work on mobile phones?</h3>
              <p className="text-gray-600 mt-1">Yes, the tool is fully responsive and works seamlessly on mobile browsers like Chrome and Safari.</p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Will the QR code and signature remain clear after cropping?</h3>
              <p className="text-gray-600 mt-1">Yes, the tool processes the PDF at high resolution (vector-based lossless cropping) so the QR code, photo, and signature remain crisp and scannable for KYC purposes.</p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Can I print the cropped PAN card on A4 paper?</h3>
              <p className="text-gray-600 mt-1">Yes, the downloaded output is a standard PDF. You can print it on A4 paper at 100% scale (no margins) or use a dedicated PVC card printer for plastic cards.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
