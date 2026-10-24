import type { PDFPageProxy, PageViewport } from "pdfjs-dist";

export type Box = { x: number; y: number; w: number; h: number };

// Output 1016 x 638 ka ratio hi card ka ratio hai
export const CARD_RATIO = 1016 / 638;

// Card ki height ke fraction mein text anchor kahan hota hai (0 = card ka top, 1 = card ka bottom).
// Ye values sample layout se li gayi hain. Agar auto-box thoda upar/neeche aaye, to yahan adjust karein.
const LAYOUT = {
  front: { topFrac: 100 / 638, bottomFrac: 598 / 638 },
  back: { topFrac: 40 / 638, bottomFrac: 600 / 638 },
};

type Anchor = { str: string; x: number; y: number; w: number };

// Sirf horizontal text lein (vertical text jaise "Aadhaar No. Issued" ko chhod dein)
const isHorizontal = (it: any) => Math.abs(it.transform[1]) < 0.01;

export async function findCardBoxes(page: PDFPageProxy, viewport: PageViewport): Promise<{ front: Box; back: Box } | null> {
  const tc = await page.getTextContent();
  const W = viewport.width;
  const H = viewport.height;
  const s = viewport.scale;

  const anchors: Anchor[] = [];
  for (const it of tc.items as any[]) {
    if (!it.str || !it.str.trim() || !isHorizontal(it)) continue;
    const [x, y] = viewport.convertToViewportPoint(it.transform[4], it.transform[5]);
    anchors.push({ str: it.str, x, y, w: it.width * s });
  }

  const sideOf = (left: boolean) => anchors.filter((a) => (left ? a.x < W / 2 : a.x >= W / 2));

  // Sabse upar wala matching text
  const topOf = (re: RegExp, left: boolean) => {
    const list = sideOf(left).filter((a) => re.test(a.str));
    return list.length ? list.reduce((p, q) => (q.y < p.y ? q : p)) : undefined;
  };

  // Sabse neeche wala matching text
  const bottomOf = (re: RegExp, left: boolean) => {
    const list = sideOf(left).filter((a) => re.test(a.str));
    return list.length ? list.reduce((p, q) => (q.y > p.y ? q : p)) : undefined;
  };

  const fTop = topOf(/Government|भारत/, true);
  const fBot = bottomOf(/मेरी|मेरा|पहचान/, true);
  const bTop = topOf(/VID/, false);
  const bBot = bottomOf(/uidai/i, false) ?? bottomOf(/help@/i, false);

  if (!fTop || !fBot || !bTop || !bBot) {
    console.warn("Anchors nahi mile", { fTop, fBot, bTop, bBot });
    return null;
  }

  // Top aur bottom anchor ki y-distance se card ki height, phir ratio se width
  const build = (top: Anchor, bottom: Anchor, layout: { topFrac: number; bottomFrac: number }, right: boolean): Box | null => {
    const hc = (bottom.y - top.y) / (layout.bottomFrac - layout.topFrac);
    if (!isFinite(hc) || hc <= 0) return null;
    const wc = hc * CARD_RATIO;
    if (wc > W * 0.6) return null;

    // Card ka horizontal center: is side ke text ke center ka median
    // (median se logo/outlier text ka asar kam hota hai)
    const inRange = sideOf(!right).filter((a) => a.y >= top.y - 2 && a.y <= bottom.y + 2);
    const centers = inRange.map((a) => a.x + a.w / 2).sort((p, q) => p - q);
    const cx = centers.length ? centers[Math.floor(centers.length / 2)] : (top.x + bottom.x) / 2;

    let x = cx - wc / 2;
    let y = top.y - layout.topFrac * hc;
    x = Math.max(0, Math.min(x, W - wc));
    y = Math.max(0, Math.min(y, H - hc));
    return { x, y, w: wc, h: hc };
  };

  const front = build(fTop, fBot, LAYOUT.front, false);
  const back = build(bTop, bBot, LAYOUT.back, true);
  if (!front || !back) {
    console.warn("Card box build nahi hua", { front, back });
    return null;
  }

  return { front, back };
}
