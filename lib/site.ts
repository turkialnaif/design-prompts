export const firm = {
  nameAr: "تركي النايف وشركاؤه للمحاماة والاستشارات القانونية",
  nameShortAr: "تركي النايف وشركاؤه",
  nameEn: "Turki Alnaif & Partners",
  tagline: "شريك قانوني يربط الحُكم المهني بسياق الأعمال",
  city: "الرياض، المملكة العربية السعودية",
  address: "حي الياسمين، الرياض 13326",
  addressEn: "Al Yasmin District, Riyadh 13326",
  plusCode: "RMJ5+P9F",
  mapsUrl:
    "https://www.google.com/maps?q=RMJ5+P9F+تاب+للمحاماة+والاستشارات+القانونية،+الياسمين،+الرياض+13326&ftid=0x3e2ee500591ba4a7:0xc96fb1e4ecd7a0e7",
  phone: "+966566770888",
  phoneDisplay: "966 566 770 888",
  whatsapp: "https://wa.me/966566770888",
  email: "tnz@tnzlaw.com",
  domain: "taap.sa",
  website: "https://taap.sa",
  licenseNumber: "4477",
  unifiedNumber: "7030708403",
  social: {
    linkedin: "https://www.linkedin.com/company/tapsaudi/",
    x: "https://x.com/TAPsaudi",
    tiktok: "https://www.tiktok.com/@tapsaudi",
    instagram: "https://www.instagram.com/tnz1/",
    facebook: "https://www.facebook.com/tapsaudi",
  },
};

export type Service = {
  slug: string;
  title: string;
  titleEn: string;
  stage: string;
  summary: string;
  items: { title: string; titleEn: string; description: string }[];
};

// الركائز الست لمنظومة الخدمات القانونية، كما وردت في الملف التعريفي للمكتب
export const corePillars: Service[] = [
  {
    slug: "legal-advisory",
    title: "المشورة والرأي القانوني",
    titleEn: "Advisory & Legal Opinions",
    stage: "قبل القرار",
    summary:
      "تحليل نظامي موجّه لسؤال محدد، يسبق القرار التجاري أو الإجراء، مع خيارات ومخاطر وتوصية عملية.",
    items: [
      {
        title: "الآراء القانونية",
        titleEn: "Legal Opinions",
        description: "تحليل نظامي موجّه لسؤال محدد، مع خيارات ومخاطر وتوصية عملية.",
      },
      {
        title: "تقييم المخاطر",
        titleEn: "Risk Assessment",
        description: "قراءة للمخاطر قبل التوقيع أو الإجراء أو النزاع، مع مستويات أثر واحتمال.",
      },
      {
        title: "دعم قرارات الإدارة",
        titleEn: "Board & Management Support",
        description: "مذكرات لصناع القرار ومحاضر وتوصيات مرتبطة بالحوكمة والمسؤولية.",
      },
      {
        title: "تفسير الأنظمة واللوائح",
        titleEn: "Regulatory Interpretation",
        description: "قراءة عملية للمتطلبات النظامية وأثرها على نموذج العمل أو المسألة.",
      },
      {
        title: "خطط المعالجة القانونية",
        titleEn: "Remediation Plans",
        description: "مسارات معالجة قابلة للتنفيذ عند وجود تعرض نظامي أو تعاقدي أو إجرائي.",
      },
      {
        title: "العناية القانونية المختصرة",
        titleEn: "Targeted Legal Review",
        description: "مراجعة مركزة لموضوع محدد قبل صفقة أو نزاع أو مخاطبة رسمية.",
      },
    ],
  },
  {
    slug: "corporate-contracts",
    title: "العقود والأعمال والصفقات",
    titleEn: "Corporate, Contracts & Transactions",
    stage: "بناء العلاقة",
    summary: "نساعد في بناء العلاقة التجارية قبل نشوء النزاع، من الصياغة إلى الصفقة إلى الحوكمة.",
    items: [
      {
        title: "صياغة ومراجعة العقود التجارية",
        titleEn: "Contracts",
        description: "صياغة ومراجعة العقود التجارية بما يحفظ حقوق الأطراف ويوضّح الالتزامات.",
      },
      {
        title: "الصفقات",
        titleEn: "Transactions",
        description: "صفقات الاستحواذ والاستثمار والشراكات من الناحية القانونية.",
      },
      {
        title: "الحوكمة",
        titleEn: "Governance",
        description: "الحوكمة والقرارات ومحاضر الاجتماعات وفق المتطلبات النظامية.",
      },
      {
        title: "التفاوض",
        titleEn: "Negotiation",
        description: "حزم التفاوض ومذكرات الشروط التي تدعم موقف العميل في الصفقة.",
      },
    ],
  },
  {
    slug: "disputes-arbitration",
    title: "التقاضي والتحكيم والتسوية",
    titleEn: "Disputes, Arbitration & Settlement",
    stage: "نشوء النزاع",
    summary: "إدارة النزاع من بناء النظرية وقراءة الدليل إلى تحديد أفضل نتيجة ممكنة.",
    items: [
      {
        title: "نظرية القضية",
        titleEn: "Case Theory",
        description: "بناء سرد قانوني وواقعي متماسك يربط الطلب بالدليل.",
      },
      {
        title: "التحكيم والتسوية",
        titleEn: "Arbitration & Settlement",
        description: "إدارة التحكيم والوساطة والتسوية ومحاضر الاتفاق.",
      },
      {
        title: "إدارة الأدلة",
        titleEn: "Evidence Strategy",
        description: "ترتيب المرفقات والشهود والمراسلات والخبرة والتناقضات.",
      },
      {
        title: "إدارة مخاطر التقاضي",
        titleEn: "Litigation Risk",
        description: "تقدير فرص النجاح، وتكلفة النزاع، وآثار التصعيد أو التسوية.",
      },
    ],
  },
  {
    slug: "compliance-governance",
    title: "الامتثال والتنظيم وحوكمة الأعمال",
    titleEn: "Regulatory, Compliance",
    stage: "حماية التشغيل",
    summary: "امتثال قابل للتنفيذ يحمي التشغيل اليومي للمنشأة من المخاطر النظامية.",
    items: [
      {
        title: "التراخيص والمتطلبات التنظيمية",
        titleEn: "Licensing & Regulatory Requirements",
        description: "متابعة التراخيص والمتطلبات التنظيمية ذات الصلة بنشاط المنشأة.",
      },
      {
        title: "السياسات الداخلية والحوكمة",
        titleEn: "Policies & Governance Frameworks",
        description: "بناء سياسات داخلية وأطر حوكمة تتوافق مع الأنظمة السارية.",
      },
      {
        title: "المنافسة وحماية المستهلك",
        titleEn: "Competition & Consumer Protection",
        description: "الالتزام بأنظمة المنافسة وحماية المستهلك في ممارسات العمل.",
      },
      {
        title: "العمل والموارد البشرية",
        titleEn: "Employment & HR Compliance",
        description: "الامتثال لأنظمة العمل في السياسات والعقود والإجراءات الداخلية.",
      },
      {
        title: "الزكاة والضريبة من منظور قانوني",
        titleEn: "Tax/Zakat Legal Support",
        description: "الجانب القانوني للالتزامات الزكوية والضريبية على المنشأة.",
      },
      {
        title: "المخاطر والجزاءات النظامية",
        titleEn: "Regulatory Exposure & Remediation",
        description: "تحديد التعرض النظامي ومعالجته قبل أن يتحول إلى مخالفة أو جزاء.",
      },
    ],
  },
  {
    slug: "technology-data",
    title: "القانون الرقمي والبيانات والتقنية",
    titleEn: "Technology, Data & Digital Law",
    stage: "الأصول الرقمية",
    summary: "نخدم المسائل التي تقع بين النص النظامي والمنتج الرقمي والتشغيل الفعلي.",
    items: [
      {
        title: "البيانات والخصوصية",
        titleEn: "Data & Privacy",
        description: "الامتثال لأنظمة حماية البيانات الشخصية وبناء السياسات المرتبطة بها.",
      },
      {
        title: "المنصات والتطبيقات",
        titleEn: "Platforms & Apps",
        description: "الجانب النظامي لتشغيل المنصات الرقمية والتطبيقات وشروط استخدامها.",
      },
      {
        title: "الملكية الفكرية التقنية",
        titleEn: "Tech IP Protection",
        description: "حماية البرمجيات والمنتجات التقنية من الناحية القانونية.",
      },
      {
        title: "العقود التقنية",
        titleEn: "Technology Contracts",
        description: "عقود التطوير والتشغيل والخدمات التقنية بين الأطراف.",
      },
    ],
  },
  {
    slug: "enforcement-recovery",
    title: "التنفيذ والتحصيل وإدارة المخاطر",
    titleEn: "Enforcement & Recovery",
    stage: "اكتمال الأثر",
    summary: "استكمال الأثر العملي للحكم أو الالتزام، من التنفيذ إلى تحصيل المستحقات.",
    items: [
      {
        title: "تنفيذ الأحكام والقرارات",
        titleEn: "Judgment Enforcement",
        description: "متابعة إجراءات التنفيذ أمام الجهات المختصة حتى استيفاء الحق.",
      },
      {
        title: "المطالبات والتحصيل",
        titleEn: "Claims & Debt Collection",
        description: "متابعة المطالبات المالية وتحصيل الديون بالوسائل النظامية المتاحة.",
      },
      {
        title: "إدارة مخاطر التحصيل",
        titleEn: "Recovery Risk Management",
        description: "تقييم قابلية التحصيل الفعلي وترتيب أولويات المتابعة.",
      },
    ],
  },
];

export type SpecializedLine = {
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
};

// خطوط ممارسة متخصصة ذات قيمة بحثية وتجارية كافية لصفحة مستقلة
export const specializedLines: SpecializedLine[] = [
  {
    slug: "real-estate-construction",
    title: "العقار والمقاولات",
    titleEn: "Real Estate & Construction",
    summary:
      "الجانب القانوني للمعاملات العقارية وعقود المقاولات، من التوثيق إلى متابعة العلاقة بين المطوّر والمقاول والمالك.",
  },
  {
    slug: "employment-labor",
    title: "العمل والتوظيف",
    titleEn: "Employment & Labor",
    summary:
      "عقود العمل والسياسات الداخلية والمنازعات العمالية، بما يوازن بين التزامات المنشأة وحقوق الأطراف.",
  },
  {
    slug: "franchise",
    title: "الامتياز التجاري",
    titleEn: "Franchise",
    summary:
      "الجانب القانوني لعلاقات الامتياز التجاري، من صياغة ومراجعة اتفاقيات الامتياز إلى تمثيل مانح الامتياز أو الممنوح له، ومعالجة ما قد ينشأ من نزاعات بين الطرفين.",
  },
  {
    slug: "intellectual-property",
    title: "الملكية الفكرية",
    titleEn: "Intellectual Property",
    summary: "حماية العلامات التجارية وحقوق المؤلف والأصول غير الملموسة للمنشأة.",
  },
  {
    slug: "family-business",
    title: "الشركات العائلية",
    titleEn: "Family Business",
    summary:
      "الحوكمة العائلية وهيكلة الملكية وانتقال الإدارة بين الأجيال، ضمن إطار نظامي واضح.",
  },
  {
    slug: "cyber-crime",
    title: "الجرائم المعلوماتية",
    titleEn: "Cyber Crime",
    summary: "المتابعة القانونية لوقائع الجرائم المعلوماتية والاعتداء على البيانات والأنظمة.",
  },
  {
    slug: "government-contracts",
    title: "العقود الحكومية",
    titleEn: "Government Contracts",
    summary: "التعاقد مع الجهات الحكومية والمنافسات والمشتريات، من الطرح إلى التنفيذ.",
  },
  {
    slug: "banking-islamic-finance",
    title: "التمويل المصرفي والتمويل الإسلامي",
    titleEn: "Banking & Islamic Finance",
    summary:
      "الجانب القانوني لعقود التمويل والتسهيلات المصرفية وصيغ التمويل الإسلامي، من الهيكلة إلى الضمانات والتوثيق.",
  },
  {
    slug: "capital-markets",
    title: "أسواق المال",
    titleEn: "Capital Markets",
    summary:
      "المتطلبات النظامية لطرح الأسهم وإصدار الصكوك والسندات، والالتزامات المرتبطة بهيئة السوق المالية.",
  },
  {
    slug: "insurance",
    title: "التأمين",
    titleEn: "Insurance",
    summary:
      "وثائق التأمين والمطالبات والجوانب التنظيمية لنشاط التأمين، وما ينشأ عنها من منازعات.",
  },
  {
    slug: "mergers-acquisitions",
    title: "الاندماج والاستحواذ",
    titleEn: "Mergers & Acquisitions",
    summary:
      "الجانب القانوني لصفقات الاندماج والاستحواذ، من الفحص النافي للجهالة إلى الصياغة والإقفال.",
  },
  {
    slug: "tax-zakat",
    title: "الضرائب والزكاة",
    titleEn: "Tax & Zakat",
    summary:
      "الجانب القانوني للالتزامات الزكوية والضريبية والجمركية، ومتابعة الربوط والاعتراضات أمام الجهات المختصة.",
  },
  {
    slug: "listed-company-governance",
    title: "حوكمة الشركات المساهمة",
    titleEn: "Corporate Governance for Listed Entities",
    summary:
      "أطر الحوكمة والالتزامات النظامية للشركات المساهمة، ومسؤوليات مجلس الإدارة واللجان.",
  },
  {
    slug: "foreign-investment",
    title: "الاستثمار الأجنبي",
    titleEn: "Foreign Investment",
    summary:
      "الترخيص الاستثماري وهيكلة دخول المستثمر الأجنبي إلى السوق السعودي والتزاماته النظامية.",
  },
  {
    slug: "competition-law",
    title: "المنافسة ومكافحة الاحتكار",
    titleEn: "Competition & Antitrust",
    summary:
      "الالتزام بنظام المنافسة، وإشعارات التركز الاقتصادي، والتعامل مع الهيئة العامة للمنافسة.",
  },
  {
    slug: "energy-mining",
    title: "الطاقة والتعدين",
    titleEn: "Energy & Mining",
    summary:
      "العقود والتراخيص والالتزامات النظامية في قطاعي الطاقة والتعدين، بما في ذلك الاستثمار التعديني.",
  },
  {
    slug: "healthcare-pharma",
    title: "الرعاية الصحية والدوائية",
    titleEn: "Healthcare & Pharma",
    summary:
      "التنظيم القانوني للمنشآت الصحية والمنتجات الدوائية، وعقودها وتراخيصها ومسؤولياتها.",
  },
  {
    slug: "ppp-privatization",
    title: "الشراكة بين القطاعين العام والخاص والخصخصة",
    titleEn: "PPP & Privatization",
    summary:
      "هيكلة عقود الشراكة والخصخصة وتوزيع المخاطر بين الجهة الحكومية والقطاع الخاص.",
  },
  {
    slug: "sports-entertainment",
    title: "الرياضة والترفيه",
    titleEn: "Sports & Entertainment",
    summary:
      "العقود والرعايات والتراخيص في القطاعين الرياضي والترفيهي، وما ينشأ عنها من منازعات.",
  },
  {
    slug: "transport-logistics-aviation",
    title: "النقل واللوجستيات والطيران",
    titleEn: "Transport, Logistics & Aviation",
    summary:
      "عقود النقل والخدمات اللوجستية والطيران والتراخيص التنظيمية المرتبطة بها.",
  },
  {
    slug: "bankruptcy-restructuring",
    title: "الإفلاس وإعادة الهيكلة",
    titleEn: "Bankruptcy & Restructuring",
    summary:
      "إجراءات التسوية الوقائية وإعادة التنظيم المالي والتصفية وفق نظام الإفلاس.",
  },
  {
    slug: "personal-data-protection",
    title: "حماية البيانات الشخصية",
    titleEn: "Personal Data Protection (PDPL)",
    summary:
      "الامتثال لنظام حماية البيانات الشخصية ولوائح الهيئة السعودية للبيانات والذكاء الاصطناعي، وبناء سياسات الخصوصية.",
  },
  {
    slug: "consumer-protection",
    title: "حماية المستهلك",
    titleEn: "Consumer Protection",
    summary:
      "الالتزام بأنظمة حماية المستهلك في العقود والإعلانات والممارسات التجارية، والتعامل مع الشكاوى والمخالفات.",
  },
  {
    slug: "white-collar-aml",
    title: "الجرائم الاقتصادية ومكافحة غسل الأموال",
    titleEn: "White-Collar Crime & AML",
    summary:
      "الامتثال لمكافحة غسل الأموال والفساد، والتمثيل في القضايا الاقتصادية والتحقيقات المرتبطة بها.",
  },
  {
    slug: "endowments-nonprofits",
    title: "الأوقاف والجمعيات الأهلية",
    titleEn: "Endowments & Non-Profits",
    summary:
      "تأسيس الأوقاف والجمعيات الأهلية وحوكمتها والتزاماتها النظامية أمام الجهات المشرفة.",
  },
];

export const matterMethod = [
  { step: "01", title: "Intake", titleAr: "استيعاب الوقائع والهدف" },
  { step: "02", title: "Frame", titleAr: "صياغة السؤال والخطر" },
  { step: "03", title: "Build", titleAr: "بناء الخيارات والحجة" },
  { step: "04", title: "Act", titleAr: "صياغة/تفاوض/ترافع" },
  { step: "05", title: "Close", titleAr: "تسليم مخرج قابل للاستخدام" },
  { step: "06", title: "Follow-up", titleAr: "المتابعة بعد التسليم والإنهاء" },
];

export const serviceStandard = [
  { title: "وضوح النطاق", description: "اتفاق مبكر على المطلوب والافتراضات." },
  { title: "اختصار مفيد", description: "يكفي الاختصار، ولا اختزال حيث يلزم التفصيل." },
  { title: "تواصل استباقي", description: "تحديث عند نقاط القرار لا عند السؤال فقط." },
  { title: "لغة دقيقة", description: "صياغة تناسب المحكمة والعميل والنتيجة." },
  { title: "سرية منضبطة", description: "تداول المعلومات بقدر الحاجة المهنية." },
  { title: "مخرج قابل للتنفيذ", description: "تنتهي الخدمة عند وضوح الخطوة التالية." },
];

export const deliverables = [
  { title: "رأي قانوني تنفيذي", titleEn: "Executive Legal Opinion" },
  { title: "مذكرة دفاع أو مطالبة", titleEn: "Pleading / Claim Memo" },
  { title: "خريطة مخاطر", titleEn: "Risk Map" },
  { title: "حزمة تفاوض", titleEn: "Negotiation Pack" },
  { title: "مصفوفة مستندات", titleEn: "Document Matrix" },
  { title: "خطاب أو إنذار رسمي", titleEn: "Formal Letter / Notice" },
  { title: "مسودة عقد وتعليقات", titleEn: "Contract Draft & Markup" },
  { title: "ملخص لصانع القرار", titleEn: "Decision Brief" },
];

export type Attorney = {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  seoTitle: string;
  metaDescription: string;
  bio: string[];
  experience: { title: string; description: string; href: string }[];
  // تواريخ الاعتمادات أدناه لم يتم التحقق منها من المستندات الأصلية بعد — بانتظار مراجعة المكتب قبل الإطلاق
  credentials: { title: string; body: string }[];
  approach: string[];
  hoursNote: string;
  practiceAreas: { label: string; href: string }[];
};

export const attorneys: Attorney[] = [
  {
    slug: "turki-alnayef",
    name: "تركي النايف",
    nameEn: "Turki AlNaif",
    role: "محامٍ | مؤسس ومدير تركي النايف وشركاؤه",
    seoTitle: "المحامي تركي النايف | مؤسس ومدير تركي النايف وشركاؤه",
    metaDescription:
      "تعرف على المحامي تركي النايف، مؤسس ومدير تركي النايف وشركاؤه، وخبرته في الاستشارات القانونية للشركات والمنازعات والتحكيم والمسائل التجارية.",
    bio: [
      "المحامي تركي النايف هو مؤسس ومدير مكتب تركي النايف وشركاؤه للمحاماة والاستشارات القانونية في الرياض.",
      "تخرج في القانون من كلية إدارة الأعمال، وعمل مستشارًا لعدد من الشركات، وهو خبير معتمد لدى منصة «خبرة» التابعة لوزارة العدل، إلى جانب اعتماده محكّمًا ووسيط امتياز تجاري معتمد.",
      "تشمل خبرته العمل الاستشاري للشركات والترافع في عدد من القضايا النوعية وبعض قضايا التركات الكبيرة، إلى جانب اهتمامه بالمنازعات التجارية والتحكيم والعلاقات التعاقدية.",
      "ويرتكز منهجه المهني على فهم سياق المسألة وأهداف العميل، وتحديد المركز القانوني والمخاطر والخيارات قبل الانتقال إلى الصياغة أو التفاوض أو الترافع.",
    ],
    experience: [
      {
        title: "الشركات والأعمال",
        description:
          "عمل تركي مستشارًا لعدد من الشركات، وتشمل طبيعة عمله التعامل مع المسائل التي تتطلب قراءة قانونية في سياق القرار التجاري والعلاقة بين الأطراف والمخاطر المرتبطة بها.",
        href: "/services/corporate-contracts",
      },
      {
        title: "العقود والمعاملات",
        description:
          "يمتد العمل الاستشاري إلى مراجعة العلاقات التعاقدية وتقييم المخاطر والصياغة والتفاوض، وربط الأحكام التعاقدية بما يترتب عليها أثناء التنفيذ أو عند نشوء النزاع، بما في ذلك إدارة صفقات الرعايات التجارية.",
        href: "/services/corporate-contracts",
      },
      {
        title: "المنازعات والتقاضي",
        description:
          "لديه خبرة في الترافع في عدد من القضايا النوعية، ويعتمد منهج العمل في النزاعات على قراءة الوقائع والأدلة وبناء الموقف القانوني وتقييم خيارات التصعيد أو التسوية.",
        href: "/services/disputes-arbitration",
      },
      {
        title: "التحكيم والتسوية",
        description:
          "تركي النايف محكم معتمد لدى مركز هيئة المحامين للتسوية والتحكيم وفق شهادة اعتماد سارية.",
        href: "/services/disputes-arbitration",
      },
    ],
    credentials: [
      {
        title: "محامٍ ومدرب قانوني مرخص",
        body: "مرخص من وزارة العدل برقم ترخيص 4477.",
      },
      {
        title: "عضو أساسي — الهيئة السعودية للمحامين",
        body: "عضو أساسي في الهيئة السعودية للمحامين.",
      },
      {
        title: "ترخيص الاستشارات العمالية",
        body: "حاصل على ترخيص لممارسة الاستشارات العمالية.",
      },
      {
        title: "محكّم معتمد",
        body: "مركز هيئة المحامين للتسوية والتحكيم — اعتماد ساري وفق الشهادة المرفقة.",
      },
      {
        title: "الاعتماد المهني للقانونيين",
        body: "حاصل على شهادة إتمام معايير الاعتماد المهني السعودي للقانونيين من الهيئة السعودية للمحامين.",
      },
      {
        title: "وسيط امتياز تجاري معتمد",
        body: "حاصل على رخصة وسيط امتياز تجاري معتمد من مركز الامتياز التجاري التابع للهيئة العامة للمنشآت الصغيرة والمتوسطة «منشآت».",
      },
      {
        title: "خبير معتمد — منصة خبرة",
        body: "معتمد كخبير لدى منصة «خبرة» التابعة لوزارة العدل، لتقديم الخبرة الفنية والقانونية في المسائل القضائية.",
      },
    ],
    approach: [
      "لا تبدأ معالجة المسألة القانونية من النص وحده، وإنما من فهم الوقائع والهدف الذي يريد العميل الوصول إليه.",
      "يبدأ العمل بتحديد السؤال القانوني والمخاطر، ثم مراجعة المستندات والإطار النظامي وبناء الخيارات المتاحة. وبعد اختيار المسار المناسب ينتقل العمل إلى المخرج المطلوب، سواء كان رأيًا قانونيًا، أو عقدًا، أو تفاوضًا، أو مذكرة، أو إجراءً قضائيًا أو تحكيميًا.",
      "ويهدف هذا المنهج إلى أن تكون النتيجة القانونية قابلة للاستخدام في القرار أو إدارة النزاع، لا مجرد عرض نظري للحكم النظامي.",
    ],
    hoursNote:
      "تركي النايف خبير معتمد لدى منصة «خبرة» التابعة لوزارة العدل، ومحكّم معتمد لدى مركز هيئة المحامين للتسوية والتحكيم، إلى جانب عمله مستشارًا لعدد من الشركات وممارسته في المنازعات والمسائل التجارية وإدارة صفقات الرعايات التجارية.",
    practiceAreas: [
      { label: "الشركات والأعمال", href: "/services/corporate-contracts" },
      { label: "العقود والمعاملات التجارية", href: "/services/corporate-contracts" },
      { label: "المنازعات التجارية", href: "/services/disputes-arbitration" },
      { label: "التحكيم والتسوية", href: "/services/disputes-arbitration" },
      { label: "المشورة القانونية للأعمال", href: "/services/legal-advisory" },
      { label: "الامتياز التجاري", href: "/services/franchise" },
    ],
  },
];

export type AuthorBoxVariant = "default" | "arbitration" | "franchise" | "individuals";

export const authorBoxCopy: Record<AuthorBoxVariant, { role: string; body: string }> = {
  individuals: {
    role: "المحامي تركي النايف",
    body: "مؤسس ومدير تركي النايف وشركاؤه، وله خبرة في الاستشارات القانونية والترافع في عدد من القضايا النوعية.",
  },
  default: {
    role: "المحامي تركي النايف",
    body: "مؤسس ومدير تركي النايف وشركاؤه، وله خبرة في تقديم الاستشارات القانونية للشركات والمسائل التجارية.",
  },
  arbitration: {
    role: "المحامي والمحكم تركي النايف",
    body: "مؤسس ومدير المكتب، ومحكم معتمد لدى مركز هيئة المحامين للتسوية والتحكيم.",
  },
  franchise: {
    role: "المحامي تركي النايف",
    body: "مؤسس ومدير المكتب ووسيط امتياز تجاري معتمد من مركز الامتياز التجاري.",
  },
};

// محور «رحلة العميل» الذي يندرج تحته كل خط ممارسة متخصص
export const lineAxis: Record<string, string> = {
  "real-estate-construction": "corporate-contracts",
  "employment-labor": "corporate-contracts",
  franchise: "corporate-contracts",
  "intellectual-property": "corporate-contracts",
  "family-business": "corporate-contracts",
  "government-contracts": "corporate-contracts",
  "banking-islamic-finance": "corporate-contracts",
  "capital-markets": "corporate-contracts",
  "mergers-acquisitions": "corporate-contracts",
  "foreign-investment": "corporate-contracts",
  "ppp-privatization": "corporate-contracts",
  "energy-mining": "corporate-contracts",
  "healthcare-pharma": "corporate-contracts",
  "transport-logistics-aviation": "corporate-contracts",
  "sports-entertainment": "corporate-contracts",
  "endowments-nonprofits": "corporate-contracts",
  insurance: "compliance-governance",
  "tax-zakat": "compliance-governance",
  "listed-company-governance": "compliance-governance",
  "competition-law": "compliance-governance",
  "personal-data-protection": "compliance-governance",
  "consumer-protection": "compliance-governance",
  "white-collar-aml": "compliance-governance",
  "cyber-crime": "technology-data",
  "bankruptcy-restructuring": "enforcement-recovery",
};
