import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_API = "https://api.indexnow.org/indexnow";
const INDEXNOW_KEY = "e51af7aa898b4a129e6e37c12d11f25e";
const SITE_HOST = "idcardtools.com";
const KEY_LOCATION = `https://idcardtools.com/${INDEXNOW_KEY}.txt`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const urlList: string[] = Array.isArray(body?.urlList) ? body.urlList : [];
    const singleUrl: string | undefined = body?.url;

    const urls: string[] = [];
    if (singleUrl) urls.push(singleUrl);
    for (const u of urlList) {
      if (typeof u === "string" && u.startsWith("http")) urls.push(u);
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { error: "No URLs provided. Send `url` or `urlList`." },
        { status: 400 }
      );
    }

    const payload = {
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    };

    const res = await fetch(INDEXNOW_API, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    return NextResponse.json(
      { ok: res.ok, status: res.status, sent: urls, response: text },
      { status: res.ok ? 200 : res.status }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to submit to IndexNow", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "IndexNow",
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    host: SITE_HOST,
    endpoint: INDEXNOW_API,
  });
}