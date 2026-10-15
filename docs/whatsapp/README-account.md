# WhatsApp Business account (office sub-number)

Managed through WhatsApp Web (Claude in Chrome). Assets and sources:

- `cover-whatsapp-1920x1080.png` — profile cover (applied).
- `catalog/` — six service cards used in the WhatsApp catalog (1080×1080), one per core pillar; each links to `https://taap.sa/services/<slug>`.
- `channel-icon-1080.png` — icon of the channel "تركي النايف وشركاؤه | قانون الأعمال" (https://whatsapp.com/channel/0029VbDcu2mEKyZG9VbFcw45).
- `src/` — HTML sources and the headless-Chrome renderer (`node shot.mjs file.html out.png [w] [h]`). Fonts and logo are copies of `app/fonts` and `public/brand`.

Quick replies on the account: حجز، ساعات، عنوان، تفاصيل، استلام، ترحيب، مغلق، عمالي، تجاري، عقود، عقاري، قضية، ملخص، تقييم.
Lists: استشارة قانونية، بانتظار مستندات، عرض أتعاب مُرسل، يحتاج اتصالاً، مزعج.
Hours: Sun–Thu 08:00–17:00, Sat 10:00–14:00, Fri closed (same as `lib/site.ts`).
