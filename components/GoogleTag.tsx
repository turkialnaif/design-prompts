import Script from "next/script";
import { GOOGLE_TAG_ID } from "@/lib/gtag";

/**
 * The Google tag for the advertising campaign and its conversions. It loads after the page itself has loaded
 * (lazyOnload), so it never competes with the content for the first paint; early clicks are queued by `ensureGtag`.
 */
export default function GoogleTag() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="lazyOnload" />
      <Script id="google-tag" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config','${GOOGLE_TAG_ID}');`}
      </Script>
    </>
  );
}
