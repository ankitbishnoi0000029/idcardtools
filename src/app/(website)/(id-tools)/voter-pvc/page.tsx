import type { Metadata } from "next";
import { Voter } from "@/components/paidtool/voter";

// 🚀 SEO Metadata (Next.js App Router)
export const metadata: Metadata = {
  title: "Voter PDF to PVC Card Cutter Online Free (85.6×54mm) | e-EPIC PVC Print",
  description: "Free online tool to convert Voter ID PDF (e-EPIC) to PVC card. Auto-crop front & back to exact CR80 85.6×54mm size. No upload, 100% secure, works in browser. Download print-ready layout instantly.",
  keywords: [
    "voter PDF to PVC card",
    "Voter ID PVC print online",
    "e-EPIC to PVC card",
    "voter card cutter online",
    "voter ID 85.6x54mm",
    "e-EPIC PDF crop",
    "Voter ID PVC card size",
    "PVC voter card print",
    "voter ID card print online free",
    "e-EPIC download and print",
  ],
  alternates: {
    canonical: "https://yourdomain.com/tools/voter-card-cutter",
  },
  openGraph: {
    title: "Voter PDF to PVC Card Cutter Online Free (85.6×54mm)",
    description: "Auto-crop Voter ID PDF front & back to exact PVC card size. No upload, 100% secure, works in browser.",
    url: "https://yourdomain.com/tools/voter-card-cutter",
    siteName: "Your Brand",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-voter-cutter.jpg", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "Voter PDF to PVC Card Cutter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voter PDF to PVC Card Cutter Online Free (85.6×54mm)",
    description: "Auto-crop Voter ID PDF front & back to exact PVC card size. 100% secure, browser-based.",
    images: ["https://yourdomain.com/og-voter-cutter.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 📄 Page Component
export default function Page() {
  return (
    <>
      {/* Schema.org Structured Data (WebApplication) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Voter PDF to PVC Card Cutter",
            description:
              "Free online tool to crop Voter ID (e-EPIC) PDF front and back to exact 85.6×54mm PVC card size. 100% client-side, no upload required.",
            url: "https://yourdomain.com/tools/voter-card-cutter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
            featureList: [
              "Auto-crop Voter ID front & back",
              "Exact CR80 85.6×54mm size",
              "Password-protected PDF support",
              "No file upload – 100% secure",
              "Works in browser",
            ],
          }),
        }}
      />

      {/* FAQ Schema (Google Rich Snippets) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the exact size of a PVC Voter ID card?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The standard size for a PVC Voter ID (EPIC) card is CR80, which is 85.60 mm × 54.0 mm (approximately 8.6 cm × 5.4 cm) with a thickness of 0.76 mm.",
                },
              },
              {
                "@type": "Question",
                name: "Is this Voter PDF to PVC card cutter free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, this tool is completely free to use. There are no hidden charges, watermarks, or sign-up requirements.",
                },
              },
              {
                "@type": "Question",
                name: "Is my Voter ID PDF uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, all processing happens 100% locally in your browser. Your PDF file never leaves your device, ensuring complete privacy.",
                },
              },
              {
                "@type": "Question",
                name: "How do I download my e-EPIC PDF?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Go to voters.eci.gov.in, login with your mobile number, click 'e-EPIC Download', enter your EPIC number, verify with OTP, and download the PDF.",
                },
              },
              {
                "@type": "Question",
                name: "Can I print the Voter ID on PVC at home?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. After cropping, you can print the output on an A4 glossy sticker sheet or directly on a PVC card printer. Always set printer scale to 100% (Actual Size) for accurate dimensions.",
                },
              },
              {
                "@type": "Question",
                name: "Does the QR code remain scannable after cropping?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the tool uses lossless vector cropping so the QR code, photo, and security features remain crisp and scannable.",
                },
              },
            ],
          }),
        }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* H1 Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Voter PDF to PVC Card Cutter – Print & Download (Exact 85.6×54mm)
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Free, secure, and browser-based tool to crop your e-EPIC Voter ID PDF
          front and back to the standard CR80 PVC card size. No file upload
          required.
        </p>

        {/* Main Tool Component */}
        <section className="mb-12">
          <Voter />
        </section>

        {/* 🚀 3-Step Guide Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            How to Convert Voter PDF to PVC Card in 3 Easy Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Upload */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                1
              </div>
              <div className="mt-4 mb-4 flex justify-center">
                <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload & Unlock PDF</h3>
              <p className="text-sm text-gray-600">
                Upload your downloaded e-EPIC PDF. If it asks for a password,
                enter your EPIC number or the password provided by the election
                portal to unlock it securely in your browser.
              </p>
            </div>

            {/* Step 2: Auto Crop */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                2
              </div>
              <div className="mt-4 mb-4 flex justify-center">
                <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Auto-Crop to PVC Size</h3>
              <p className="text-sm text-gray-600">
                The tool automatically detects the Front and Back sides of your
                Voter ID. It perfectly crops them to the exact standard PVC size
                (85.6 × 54 mm) without losing any quality.
              </p>
            </div>

            {/* Step 3: Download & Print */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                3
              </div>
              <div className="mt-4 mb-4 flex justify-center">
                <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Download & Print Sticker</h3>
              <p className="text-sm text-gray-600">
                Click download to get a high-quality 2-page PDF. You can print
                this directly on A4 Sticker sheets (for front & back), cut them
                out, and paste them on a blank PVC card.
              </p>
            </div>
          </div>
        </section>

        {/* 🔄 Section: How Input to Preview Works (Visual Flow) */}
        <section className="mb-16 bg-gradient-to-br from-orange-50 to-indigo-50 rounded-2xl p-6 md:p-10 border border-orange-100 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
            From PDF to Preview: How It Works
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            See exactly how your Voter ID PDF transforms into a perfectly cropped
            PVC card right before you download it.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative">
            {/* 1. INPUT BOX */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-md w-full border-t-4 border-orange-500 relative z-10 text-center">
              <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">1. Input PDF</h3>
              <p className="text-sm text-gray-600">
                Upload your password-protected e-EPIC PDF (downloaded from
                voters.eci.gov.in). Enter your password to unlock it securely.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex flex-col items-center justify-center text-orange-300">
              <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="md:hidden flex flex-col items-center justify-center text-orange-300 py-2">
              <svg className="w-8 h-8 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* 2. PROCESS BOX */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-md w-full border-t-4 border-purple-500 relative z-10 text-center">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">2. Auto-Crop Engine</h3>
              <p className="text-sm text-gray-600">
                Our browser-based engine detects the exact card boundaries,
                perfectly cropping the Front & Back to 85.6×54mm without losing
                quality.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex flex-col items-center justify-center text-orange-300">
              <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="md:hidden flex flex-col items-center justify-center text-orange-300 py-2">
              <svg className="w-8 h-8 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* 3. OUTPUT BOX (Live Preview UI Mockup) */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-md w-full border-t-4 border-green-500 relative z-10 text-center">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">3. Live Preview & Download</h3>
              <p className="text-sm text-gray-600 mb-3">
                Adjust the cut line slider if needed and see the result instantly
                before downloading your print-ready PDF.
              </p>

              {/* Fake Preview UI */}
              <div className="bg-gray-100 p-2 rounded-lg border border-gray-300 relative">
                <div className="bg-white h-16 w-full rounded border flex flex-col justify-between p-1">
                  <div className="bg-green-500/20 border border-green-500 rounded h-1/2 w-full flex items-center justify-center text-[10px] text-green-700 font-bold">
                    Front Card Preview
                  </div>
                  <div className="bg-orange-500/20 border border-orange-500 rounded h-1/2 w-full mt-1 flex items-center justify-center text-[10px] text-orange-700 font-bold">
                    Back Card Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📖 Detailed Content Section: What, Why, How */}
        <section className="mb-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What is a Voter PDF to PVC Card Cutter?
          </h2>
          <p className="text-gray-600 mb-4">
            The e-EPIC (Electronic Electoral Photo Identity Card) is a digital
            PDF version of your Voter ID issued by the Election Commission of
            India. It is downloaded from the Voters' Services Portal
            (voters.eci.gov.in) or the Voter Helpline App. However, the PDF is
            formatted as a full-page document, often A4 size, containing the
            card along with instructions and disclaimers[reference:0].
          </p>
          <p className="text-gray-600 mb-4">
            To carry it in your wallet or use it for daily identity
            verification, you need the card in the standard PVC size. Our tool
            automatically detects the card boundaries in your PDF, extracts both
            the front and back sides, and generates a high‑resolution,
            print‑ready layout at the exact <strong>CR80 size: 85.6 mm × 54.0
            mm</strong>[reference:1].
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Why Do You Need This Tool?
          </h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>
              <strong>Exact Size:</strong> Manual cropping often leads to cards
              that don't fit standard wallet sleeves or PVC card trays. This
              tool locks the crop box to 85.6 × 54 mm.
            </li>
            <li>
              <strong>Privacy First:</strong> Unlike other online tools that
              upload your PDF to a server, this tool processes everything
              locally. Your Voter ID data stays private[reference:2].
            </li>
            <li>
              <strong>High Resolution:</strong> Screenshots can blur the QR
              code and photo. Our lossless PDF cropping preserves vector
              clarity for KYC scanners and polling booth verification.
            </li>
            <li>
              <strong>Durability:</strong> A printed PVC card is waterproof and
              lasts for years, unlike a flimsy paper printout[reference:3].
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            How It Works (Step-by-Step)
          </h3>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>
              <strong>Download your e-EPIC:</strong> Visit voters.eci.gov.in,
              login, click "e-EPIC Download", enter your EPIC number, verify
              with OTP, and save the PDF[reference:4].
            </li>
            <li>
              <strong>Upload the PDF:</strong> Drag and drop the file into the
              tool above. If it is password‑protected, enter the password
              (usually your EPIC number or a password set by the portal).
            </li>
            <li>
              <strong>Adjust (if needed):</strong> Use the slider to fine‑tune
              the split between the front and back sides.
            </li>
            <li>
              <strong>Download:</strong> Click "Download Front & Back PDF" to
              get a two‑page PDF with each side perfectly cropped.
            </li>
            <li>
              <strong>Print:</strong> Print on an A4 glossy sticker sheet or a
              PVC card printer. Set scale to <strong>100% (Actual
              Size)</strong> and margins to none[reference:5].
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Technical Specifications (CR80 Card Size)
          </h3>
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
                  <td className="border px-4 py-2">85.60 × 54.0 mm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Dimensions (inches)</td>
                  <td className="border px-4 py-2">3.370 × 2.125 in</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Thickness</td>
                  <td className="border px-4 py-2">0.76 mm (760 microns)</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Corner Radius</td>
                  <td className="border px-4 py-2">2.88 – 3.48 mm</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Source: Election Commission of India specifications for PVC EPIC[reference:6][reference:7].
          </p>
        </section>

        {/* 🔍 Detailed FAQ Section (On-Page) */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                What is the exact size of a PVC Voter ID card?
              </h3>
              <p className="text-gray-600 mt-1">
                The standard size for a PVC Voter ID (EPIC) card is CR80, which
                is 85.60 mm × 54.0 mm (approximately 8.6 cm × 5.4 cm) with a
                thickness of 0.76 mm[reference:8].
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Is this Voter PDF to PVC card cutter free?
              </h3>
              <p className="text-gray-600 mt-1">
                Yes, this tool is completely free to use. There are no hidden
                charges, watermarks, or sign-up requirements.
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Is my Voter ID PDF uploaded to a server?
              </h3>
              <p className="text-gray-600 mt-1">
                No, all processing happens 100% locally in your browser. Your
                PDF file never leaves your device, ensuring complete
                privacy[reference:9].
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                How do I download my e-EPIC PDF?
              </h3>
              <p className="text-gray-600 mt-1">
                Go to voters.eci.gov.in, login with your mobile number, click
                "e-EPIC Download", enter your EPIC number, verify with OTP, and
                download the PDF[reference:10].
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Can I print the Voter ID on PVC at home?
              </h3>
              <p className="text-gray-600 mt-1">
                Yes. After cropping, you can print the output on an A4 glossy
                sticker sheet or directly on a PVC card printer. Always set
                printer scale to 100% (Actual Size) for accurate
                dimensions[reference:11].
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Does the QR code remain scannable after cropping?
              </h3>
              <p className="text-gray-600 mt-1">
                Yes, the tool uses lossless vector cropping so the QR code,
                photo, and security features remain crisp and scannable.
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Is a PVC Voter ID card legally valid?
              </h3>
              <p className="text-gray-600 mt-1">
                The e-EPIC PDF is a valid identity proof. A self‑printed PVC
                copy is for convenience and durability, but it does not replace
                the official PVC EPIC issued by the Election Commission[reference:12].
              </p>
            </div>
          </div>
        </section>

        {/* ⚠️ Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm text-yellow-800">
          <strong>Disclaimer:</strong> This tool is not affiliated with the
          Election Commission of India. It only crops the card portion from your
          own e-EPIC PDF for personal printing. The self‑printed PVC card does
          not carry the official security features (hologram, micro‑text, etc.)
          of the government‑issued PVC EPIC.
        </div>
      </main>
    </>
  );
}