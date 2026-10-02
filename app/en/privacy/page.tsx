import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Use",
  description: `How ${firmEn.nameShort} collects, uses, and protects website visitor data, and your rights under the Saudi Personal Data Protection Law.`,
  alternates: { canonical: "/en/privacy", languages: { ar: "/privacy", en: "/en/privacy" } },
  openGraph: {
    title: "Privacy Policy & Terms of Use",
    description: `How ${firmEn.nameShort} collects, uses, and protects website visitor data, and your rights under the Saudi Personal Data Protection Law.`,
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const lastUpdated = "1 October 2026";

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Scope of this policy",
    body: [
      `This page explains how ${firmEn.nameFull} ("the Firm", "we") collects, uses, and protects the personal data of visitors to its website, and sets out your rights over that data. It does not apply to information you provide after the Firm has formally accepted a legal engagement — that information is covered by attorney–client confidentiality, a stricter and broader duty than what this page describes.`,
    ],
  },
  {
    title: "2. Data we collect",
    body: [
      `We only collect data you provide directly through the site's forms: your name, organisation (if any), email address, and the matter type and description when you submit a "Matter Brief", or your email and audience category when you subscribe to legal alerts.`,
      `The site does not use advertising trackers or visitor-behaviour analytics, and does not collect location data or payment information.`,
    ],
  },
  {
    title: "3. Purpose and legal basis for processing",
    body: [
      `We process this data with your explicit consent given at submission, for two specific purposes only: responding to and evaluating your request ahead of a possible engagement, or sending the legal alerts you subscribed to. We do not use your data for any other purpose and do not pass it to third parties for marketing.`,
    ],
  },
  {
    title: "4. Sharing of data",
    body: [
      `We do not sell or rent your personal data. Form submissions are sent as email messages directly to the Firm's inbox through an email delivery provider (Resend), acting solely as a data processor on our behalf to deliver the message; the website does not retain your data in a public database.`,
      `We may disclose limited data if required by applicable law or a valid court order in the Kingdom of Saudi Arabia.`,
    ],
  },
  {
    title: "5. Data retention",
    body: [
      `We retain form submissions in our email records for as long as needed to respond to your request or for ordinary professional record-keeping, and you may request their deletion at any time using the process in Section 6.`,
    ],
  },
  {
    title: "6. Your rights under the Personal Data Protection Law",
    body: [
      `Under Saudi Arabia's Personal Data Protection Law, you have the right to: access the personal data we hold about you, request its correction, request its deletion, withdraw your consent to processing at any time, and lodge a complaint with the Saudi Data & AI Authority (SDAIA) if you believe our processing of your data breaches the law.`,
      `To exercise any of these rights, contact us using the email address in Section 9.`,
    ],
  },
  {
    title: "7. Cookies",
    body: [
      `Our public website does not use tracking or advertising cookies. Purely functional session cookies are used only within the client portal and the firm's admin dashboard, where they are necessary for secure sign-in and are not used for any other purpose.`,
    ],
  },
  {
    title: "8. Terms of use",
    body: [
      `All content published on the blog and informational pages — including text, logo, and design — is owned by ${firmEn.nameFull}, and may not be republished or used commercially without prior written permission, though brief quotation with attribution is permitted.`,
      `Legal content published on the blog is general information for awareness purposes; it is not legal advice and does not create an attorney–client relationship. That relationship arises only once the Firm has accepted a specific, scoped engagement.`,
      `This policy and your use of the website are governed by the laws of the Kingdom of Saudi Arabia, with jurisdiction before the competent courts in Riyadh.`,
    ],
  },
  {
    title: "9. Privacy contact",
    body: [
      `For any question about this policy, or to exercise your rights over your data, contact us at ${firm.email} or via the "Contact" page.`,
    ],
  },
  {
    title: "10. Updates to this policy",
    body: [
      `We may update this policy from time to time to reflect changes in our practices or in applicable law. Last updated: ${lastUpdated}.`,
    ],
  },
];

export default function PrivacyPageEn() {
  return (
    <div>
      <PageHero photo="/brand/riyadh-skyline.jpg">
        <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
          <SectionHeading as="h1" eyebrow="Privacy & Terms" title="Privacy Policy & Terms of Use" tone="onDark" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85">
            How we collect, use, and protect website visitor data, and your rights over it under the Saudi Personal Data Protection Law.
          </p>
        </div>
      </PageHero>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <div className="glass-card space-y-10 rounded-3xl p-7 md:p-12">
            {sections.map((s) => (
              <div key={s.title} className="border-t border-[#d0a751]/40 pt-8 first:border-t-0 first:pt-0">
                <h2 className="font-display text-xl font-bold leading-[1.5] text-ink md:text-2xl">{s.title}</h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-[1.02rem] leading-[2.1] text-ink-soft">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
