# نظام إدارة المكتب — التشغيل والإعداد

## المتغيرات (Vercel → Settings → Environment Variables)
| المتغير | الغرض |
|---|---|
| `DATABASE_URL` | رابط Postgres (Neon/Supabase) — يُضاف تلقائيًا عند ربط قاعدة من Vercel Storage |
| `APP_ENC_KEY` | مفتاح تشفير الملفات وأسرار المصادقة الثنائية (٣٢ بايت base64). **لا تفقده**، فبدونه لا تُفك المستندات |
| `S3_BUCKET` `S3_REGION` `S3_ENDPOINT` `S3_ACCESS_KEY_ID` `S3_SECRET_ACCESS_KEY` | تخزين المستندات المشفّرة في أي خدمة متوافقة مع S3 (الأولوية له) |
| `BLOB_READ_WRITE_TOKEN` | بديل: Vercel Blob (خاص) |
| `CRON_SECRET` | يحمي مهمة التذكيرات اليومية |
| `RESEND_API_KEY` | البريد (موجود) |

## أول تشغيل
1. أنشئ قاعدة Postgres وضع `DATABASE_URL`.
2. `DATABASE_URL=... npm run db:migrate` (ينشئ الجداول).
3. `DATABASE_URL=... npm run admin:create -- <username> "<password>" "<الاسم>"` (مدير النظام؛ يُفرض تغيير كلمة المرور عند أول دخول).
4. ادخل من `/admin/login` وأنشئ بقية المستخدمين من «المستخدمون».

## محليًا للتجربة
`npm run build && ALLOW_LOCAL_DB=1 npx next start -p 3001` ثم `npm run db:seed` لبيانات تجريبية.
(قاعدة محلية مدمجة تُحفظ في `.data/` ولا تُرفع).


## رفع الملفات الكبيرة مباشرة إلى المخزن (حتى 100 ميغابايت)

الملفات حتى 4 ميغابايت تمرّ عبر الخادم كما كانت. ما فوقها يُشفَّر في متصفح المستخدم (AES-256-GCM بمفتاح خاص بكل مستند مُشتقّ من `APP_ENC_KEY`) ثم يُرسل مباشرة إلى R2 بعنوان موقّع قصير العمر؛ ويُفتح بالعكس: يُنزَّل الملف المشفّر من R2 ويُفكّ تشفيره في المتصفح. لا يمرّ محتوى مقروء عبر Vercel.

**مطلوب مرة واحدة:** ضبط CORS على الـbucket في Cloudflare (R2 ← الـbucket ← Settings ← CORS Policy):

```json
[
  {
    "AllowedOrigins": ["https://tnz-law-website.vercel.app", "https://taap.sa", "https://www.taap.sa"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

بدون CORS يظهر خطأ «تعذّر الرفع إلى المخزن».
