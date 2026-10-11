/** Google tag (GA4 / Google Ads). It is loaded only after the visitor accepts cookies (see components/ConsentBanner.tsx). */
export const GOOGLE_TAG_ID = "G-L22NVST9Q4";
export const CONSENT_KEY = "taap_cookie_consent";
export const OPEN_SETTINGS_EVENT = "taap:open-cookie-settings";

type Gtag = (...args: unknown[]) => void;

/** Sends an event to the Google tag when it is loaded (i.e. consent was granted); a no-op otherwise. Never pass anything the visitor typed. */
export function gtagEvent(name: string, params: Record<string, string | number> = {}) {
  const g = (typeof window !== "undefined" ? (window as unknown as { gtag?: Gtag }).gtag : undefined);
  if (g) g("event", name, params);
}
