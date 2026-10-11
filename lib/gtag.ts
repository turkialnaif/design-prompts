/** Google tag (GA4 / Google Ads), loaded on every page by components/GoogleTag.tsx. */
export const GOOGLE_TAG_ID = "G-L22NVST9Q4";

type Gtag = (...args: unknown[]) => void;
type W = Window & { dataLayer?: unknown[]; gtag?: Gtag };

/**
 * Makes sure `gtag` exists before Google's own script has arrived, so a click that happens early is queued on the
 * dataLayer and sent once the library loads instead of being lost.
 */
export function ensureGtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  return w.gtag;
}

/** Sends an event to the Google tag. Never pass anything the visitor typed: only the page path and the like. */
export function gtagEvent(name: string, params: Record<string, string | number> = {}) {
  ensureGtag()?.("event", name, params);
}
