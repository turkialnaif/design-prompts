import type { SectorExtraMap } from "./types";

export const part2: SectorExtraMap = {
  "hospitality-tourism": {
    ar: {
      regulators: [
        ["وزارة السياحة", "ترخيص المنشآت السياحية وتصنيفها"],
        ["وزارة البلديات والإسكان", "التراخيص البلدية واشتراطات الصحة والسلامة"],
        ["المديرية العامة للدفاع المدني", "اشتراطات السلامة والوقاية"],
        ["وزارة الموارد البشرية والتنمية الاجتماعية", "التوطين وعلاقات العمل في المنشآت السياحية"],
        ["الهيئة العامة للنقل", "تنظيم تأجير السيارات والنقل السياحي"],
      ],
      contracts: ["عقود إدارة الفنادق والتشغيل", "عقود الامتياز التجاري (الفرنشايز) للمطاعم والفنادق", "عقود الإيجار للمواقع التجارية", "اتفاقيات وكالات السفر والحجوزات", "عقود الموردين والمقاولين", "عقود العاملين والتوطين"],
      risks: [
        { t: "عقود إدارة الفنادق طويلة الأجل", d: "تحديد أتعاب المشغّل ومؤشرات الأداء وحق الإنهاء عند ضعف النتائج من أكثر ما يُنازَع فيه بين المالك والمشغّل." },
        { t: "الإلغاء واسترداد الحجوزات", d: "سياسات الإلغاء والاسترداد تحتاج وضوحًا يحمي المنشأة من شكاوى المستهلكين ومن مطالبات بوابات الحجز." },
        { t: "تراخيص التشغيل وتجديدها", d: "انتهاء ترخيص أو مخالفة اشتراطات السلامة قد يوقف التشغيل ويؤثر على عقود الإيجار والتأمين معًا." },
      ],
      faqs: [
        { q: "هل يحق للمالك إنهاء عقد إدارة الفندق إذا تراجع الأداء؟", a: "يتوقف ذلك على بنود الأداء وحالات الإنهاء والإخطار في العقد. نراجع مؤشرات الأداء وسجل الإخطارات قبل اتخاذ الخطوة حتى لا تتحول إلى إخلال بالعقد." },
        { q: "ما أهم ما يُراعى في عقد امتياز مطعم أو فندق؟", a: "الرسوم والإتاوة، ومدة الامتياز وتجديده، وحقوق العلامة، ومعايير التشغيل، والتنازل والإنهاء. وتختلف النتيجة بحسب قوة التفاوض والتزامات كل طرف." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Tourism", "Licensing and classification of tourism establishments"],
        ["Ministry of Municipal, Rural Affairs and Housing", "Municipal licences and health and safety requirements"],
        ["General Directorate of Civil Defense", "Safety and prevention requirements"],
        ["Ministry of Human Resources and Social Development", "Saudisation and employment in tourism businesses"],
        ["Transport General Authority", "Car rental and tourist transport"],
      ],
      contracts: ["Hotel management and operating agreements", "Franchise agreements for restaurants and hotels", "Leases for commercial sites", "Travel-agency and booking agreements", "Supplier and contractor contracts", "Employment contracts and Saudisation"],
      risks: [
        { t: "Long-term hotel management agreements", d: "Operator fees, performance indicators and the right to terminate for weak results are among the most disputed terms between owner and operator." },
        { t: "Cancellation and refunds", d: "Cancellation and refund policies need clarity that protects the business from consumer complaints and claims from booking platforms." },
        { t: "Operating licences and renewal", d: "An expired licence or a breach of safety requirements can halt operations and affect the lease and insurance together." },
      ],
      faqs: [
        { q: "Can an owner terminate a hotel management agreement if performance falls?", a: "It depends on the performance terms, the termination events and the notice provisions. We review the indicators and the notice record before the step so it does not become a breach of the contract." },
        { q: "What matters most in a restaurant or hotel franchise?", a: "Fees and royalty, the term and renewal, brand rights, operating standards, assignment and termination. The outcome depends on bargaining strength and each side's obligations." },
      ],
    },
  },

  "transport-logistics": {
    ar: {
      regulators: [
        ["الهيئة العامة للنقل", "ترخيص النقل البري وتنظيمه"],
        ["الهيئة العامة للطيران المدني", "تنظيم النقل الجوي والمطارات"],
        ["الهيئة العامة للموانئ", "الموانئ والنقل البحري"],
        ["هيئة الزكاة والضريبة والجمارك", "الإجراءات الجمركية والاستيراد والتصدير"],
        ["وزارة النقل والخدمات اللوجستية", "السياسات والتراخيص اللوجستية"],
      ],
      contracts: ["عقود النقل والشحن", "اتفاقيات التخزين والمستودعات", "عقود التخليص الجمركي", "اتفاقيات المناولة الأرضية والخدمات", "عقود تأجير المركبات والمعدات", "وثائق التأمين على البضائع"],
      risks: [
        { t: "تحديد مسؤولية الناقل عن الهلاك والتأخير", d: "سقف مسؤولية الناقل وشروط الإخطار بالتلف والتأخير يحدد غالبًا ما يمكن استرداده فعلًا عند وقوع الضرر." },
        { t: "التأمين على البضائع", d: "الفجوة بين ما يغطيه التأمين وما يتحمله الناقل أو الشاحن تظهر عند أول مطالبة، فيُراجَع التغطيان قبل الشحن." },
        { t: "التأخير الجمركي والغرامات", d: "تأخر التخليص أو خطأ في البيانات الجمركية قد يرتب غرامات وتخزينًا إضافيًا يدور حولهما نزاع بين الأطراف." },
      ],
      faqs: [
        { q: "من يتحمل تلف الشحنة أثناء النقل؟", a: "يتحدد غالبًا بشروط عقد النقل والتسليم والتأمين، وبتوثيق حالة الشحنة عند الاستلام والتسليم. لذلك يُوصى بمحاضر استلام وصور وإخطار كتابي فوري." },
        { q: "هل تُعد الظروف الاستثنائية سببًا لإعفاء الناقل من التأخير؟", a: "قد تكون كذلك إذا توافرت شروطها في العقد أو النظام، وبشرط إثباتها والإخطار بها في وقتها. وتُقدَّر الوقائع بحسب كل حالة." },
      ],
    },
    en: {
      regulators: [
        ["Transport General Authority", "Licensing and regulation of road transport"],
        ["General Authority of Civil Aviation", "Air transport and airports"],
        ["Saudi Ports Authority (Mawani)", "Ports and maritime transport"],
        ["Zakat, Tax and Customs Authority", "Customs procedures, imports and exports"],
        ["Ministry of Transport and Logistic Services", "Logistics policy and licences"],
      ],
      contracts: ["Carriage and freight contracts", "Storage and warehousing agreements", "Customs-clearance contracts", "Ground-handling and service agreements", "Vehicle and equipment leases", "Cargo insurance policies"],
      risks: [
        { t: "The carrier's liability for loss and delay", d: "The carrier's liability cap and the notice conditions for damage and delay often decide what can actually be recovered when loss occurs." },
        { t: "Cargo insurance", d: "The gap between what insurance covers and what the carrier or shipper bears appears at the first claim, so both are reviewed before shipping." },
        { t: "Customs delay and penalties", d: "Late clearance or errors in customs data can trigger penalties and extra storage, which become the subject of disputes between the parties." },
      ],
      faqs: [
        { q: "Who bears damage to a shipment in transit?", a: "It is usually decided by the carriage, delivery and insurance terms and by documenting the cargo's condition at pickup and delivery. We recommend receipt records, photographs and immediate written notice." },
        { q: "Are exceptional circumstances a ground to excuse a carrier's delay?", a: "They can be where their conditions are met in the contract or the law, and provided they are proven and notified in time. The facts are assessed case by case." },
      ],
    },
  },

  "banking-finance": {
    ar: {
      regulators: [
        ["البنك المركزي السعودي (ساما)", "ترخيص البنوك وشركات التمويل والمدفوعات"],
        ["هيئة السوق المالية", "الأوراق المالية والاستثمار والإفصاح"],
        ["وحدة التحريات المالية", "الإبلاغ عن العمليات المشبوهة ومكافحة غسل الأموال"],
        ["وزارة التجارة", "الشركات والإفلاس وسجل الضمانات"],
        ["وزارة العدل", "محاكم التنفيذ وسندات الدين"],
      ],
      contracts: ["اتفاقيات التمويل والتسهيلات", "عقود المرابحة والإجارة والتورق", "عقود الرهن وسندات الأمر", "اتفاقيات المساهمين والاستثمار", "اتفاقيات الضمان والكفالة", "عقود الخدمات المالية والدفع"],
      risks: [
        { t: "الضمانات وقابليتها للتنفيذ", d: "سلامة الرهن وسندات الأمر والكفالات من حيث الصياغة والإجراءات هي ما يحدد قدرة الدائن على التنفيذ لاحقًا." },
        { t: "الامتثال لمتطلبات مكافحة غسل الأموال", d: "ضعف إجراءات معرفة العميل ومراقبة العمليات يعرّض المؤسسة المالية وموظفيها لعقوبات إدارية وجزائية." },
        { t: "الصيغ الشرعية للتمويل", d: "اختلال الهيكلة الشرعية للمنتج قد يثير نزاعًا حول صحة العقد أو الربح، فتُراجَع الصياغة وقرارات الهيئة الشرعية." },
      ],
      faqs: [
        { q: "كيف يستردّ المقرض دينه المتعثر؟", a: "يبدأ بمراجعة العقد والضمانات والمدد، ثم الإنذار والتفاوض، ثم التنفيذ أو الدعوى بحسب السند. الأسرع غالبًا هو السند التنفيذي المكتمل الشروط." },
        { q: "ما أبرز مخاطر ضعف إجراءات مكافحة غسل الأموال؟", a: "عقوبات إدارية وغرامات وتقييد للنشاط، ومسؤولية جزائية في بعض الحالات. نراجع السياسات والتقارير وسجلات العملاء ونساعد في معالجة الفجوات." },
      ],
    },
    en: {
      regulators: [
        ["Saudi Central Bank (SAMA)", "Licensing of banks, finance and payment companies"],
        ["Capital Market Authority", "Securities, investment and disclosure"],
        ["Financial Intelligence Unit", "Suspicious-transaction reporting and anti-money-laundering"],
        ["Ministry of Commerce", "Companies, bankruptcy and the security register"],
        ["Ministry of Justice", "Enforcement courts and debt instruments"],
      ],
      contracts: ["Financing and facility agreements", "Murabaha, ijara and tawarruq contracts", "Mortgages and promissory notes", "Shareholder and investment agreements", "Guarantee and surety agreements", "Financial-services and payment contracts"],
      risks: [
        { t: "Security and its enforceability", d: "The soundness of mortgages, notes and guarantees, in drafting and procedure, decides the creditor's ability to enforce later." },
        { t: "Compliance with anti-money-laundering requirements", d: "Weak know-your-customer procedures and transaction monitoring expose the institution and its staff to administrative and criminal penalties." },
        { t: "Shari'a structures for financing", d: "A flawed Shari'a structure can provoke a dispute over the validity of the contract or the profit, so the drafting and the Shari'a board's decisions are reviewed." },
      ],
      faqs: [
        { q: "How does a lender recover a defaulted debt?", a: "It begins with a review of the contract, security and time limits, then demand and negotiation, then enforcement or a claim depending on the instrument. The fastest route is usually an enforceable instrument that meets its conditions." },
        { q: "What are the main risks of weak anti-money-laundering procedures?", a: "Administrative penalties, fines and restrictions on activity, and in some cases criminal liability. We review policies, reports and customer records and help close the gaps." },
      ],
    },
  },

  telecommunications: {
    ar: {
      regulators: [
        ["هيئة الاتصالات والفضاء والتقنية", "ترخيص خدمات الاتصالات وتنظيمها"],
        ["الهيئة السعودية للبيانات والذكاء الاصطناعي", "حماية البيانات الشخصية ومعالجتها"],
        ["الهيئة الوطنية للأمن السيبراني", "الضوابط السيبرانية للجهات"],
        ["وزارة الاتصالات وتقنية المعلومات", "السياسات الرقمية والاستثمار في التقنية"],
      ],
      contracts: ["اتفاقيات الربط البيني والمشاركة في البنية", "عقود خدمات الاتصالات والاستضافة", "اتفاقيات الخدمة (SLA) ومراكز البيانات", "عقود التوريد والتركيب للشبكات", "اتفاقيات معالجة البيانات", "عقود شراكة مع مزوّدي المحتوى والمنصات"],
      risks: [
        { t: "تراخيص الخدمة وشروطها", d: "العمل خارج نطاق الترخيص أو مخالفة شروطه يعرّض لغرامات وتعليق للخدمة، وتؤثر على عقود العملاء والشركاء." },
        { t: "التزامات خصوصية بيانات المشتركين", d: "المشغّل يتعامل مع بيانات واسعة عن المشتركين، ومشاركتها مع أطراف ثالثة دون أساس نظامي تُحاسَب عليه المنشأة." },
        { t: "اتفاقيات مستوى الخدمة والتعويض", d: "انقطاع الخدمة وحدود التعويض وآلية احتساب الاعتمادية بنود تتكرر فيها المنازعات مع العملاء المؤسسيين." },
      ],
      faqs: [
        { q: "هل أحتاج ترخيصًا لتقديم خدمة اتصالات أو إنترنت؟", a: "غالبًا نعم، بحسب نوع الخدمة ونطاقها. تحدد الهيئة المنظمة أنواع التراخيص والشروط، ونراجع طبيعة نشاطك قبل الإطلاق لتفادي مخالفة الترخيص." },
        { q: "ما مسؤولية المنشأة عند تسرب بيانات العملاء؟", a: "قد تترتب التزامات بالإبلاغ ومسؤولية إدارية ومدنية بحسب الوقائع. نراجع خطة الاستجابة والعقود مع المعالجين ونحدد الإجراءات اللازمة." },
      ],
    },
    en: {
      regulators: [
        ["Communications, Space and Technology Commission", "Licensing and regulation of telecom services"],
        ["Saudi Data and AI Authority", "Protection and processing of personal data"],
        ["National Cybersecurity Authority", "Cybersecurity controls for entities"],
        ["Ministry of Communications and Information Technology", "Digital policy and technology investment"],
      ],
      contracts: ["Interconnection and infrastructure-sharing agreements", "Telecom and hosting service contracts", "SLAs and data-centre agreements", "Network supply and installation contracts", "Data-processing agreements", "Partnerships with content providers and platforms"],
      risks: [
        { t: "Service licences and their conditions", d: "Operating outside the licence or breaching its conditions exposes the business to fines and suspension, and affects customer and partner contracts." },
        { t: "Subscriber privacy obligations", d: "A carrier handles wide data on subscribers, and sharing it with third parties without a legal basis is something the business answers for." },
        { t: "Service levels and compensation", d: "Outages, compensation limits and how availability is calculated are terms that recur in disputes with enterprise customers." },
      ],
      faqs: [
        { q: "Do I need a licence to offer a telecom or internet service?", a: "Usually yes, depending on the type and scope of the service. The regulator defines the licence types and conditions, and we review your activity before launch to avoid breaching the licence." },
        { q: "What is a company's responsibility if customer data leaks?", a: "There may be notification duties and administrative and civil liability depending on the facts. We review the response plan and contracts with processors and set out the steps required." },
      ],
    },
  },

  "retail-trade": {
    ar: {
      regulators: [
        ["وزارة التجارة", "السجلات التجارية وحماية المستهلك والتجارة الإلكترونية"],
        ["الهيئة العامة للمنافسة", "منع الممارسات الاحتكارية ومراقبة التركّز"],
        ["هيئة الزكاة والضريبة والجمارك", "الزكاة وضريبة القيمة المضافة والاستيراد"],
        ["الهيئة السعودية للمواصفات والمقاييس والجودة", "مطابقة المنتجات والمواصفات"],
        ["الهيئة العامة للغذاء والدواء", "الأغذية ومستحضرات التجميل"],
      ],
      contracts: ["عقود التوريد والتوزيع", "عقود الوكالات التجارية", "عقود إيجار المحلات والمراكز التجارية", "عقود الامتياز التجاري", "شروط البيع والضمان والاستبدال", "اتفاقيات المنصات الإلكترونية والتوصيل"],
      risks: [
        { t: "الوكالات التجارية وإنهاؤها", d: "إنهاء الوكالة أو عدم تجديدها دون مسوغ قد يرتب تعويضًا، وتُراجَع أحكام نظام الوكالات التجارية وبنود العقد." },
        { t: "تحصيل مستحقات الأجل", d: "البيع الآجل دون سند تنفيذي أو ضمان يترك المورّد أمام دعوى طويلة، لذلك تُوثَّق الفواتير والإقرارات منذ البداية." },
        { t: "ادعاءات المنتج والمطابقة", d: "عرض منتج بادعاءات غير مطابقة أو دون الشهادات المطلوبة يعرّض لمخالفات وسحب وتعويضات للمستهلكين." },
      ],
      faqs: [
        { q: "كيف أحمي نفسي كمورّد عند البيع بالأجل؟", a: "بعقد واضح يحدد المدة والمستحقات والفوائد التأخيرية، وبسند تنفيذي أو كفالة، وبتوثيق التسليم والفواتير. وكلما اكتملت المستندات كان التحصيل أسرع." },
        { q: "هل يحق للمستهلك إرجاع منتج اشتراه إلكترونيًا؟", a: "يخضع لأنظمة حماية المستهلك والتجارة الإلكترونية وشروط البائع المعلنة. تُراجَع سياسة الاستبدال والإرجاع في متجرك لتتوافق مع النظام." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Commerce", "Commercial registers, consumer protection and e-commerce"],
        ["General Authority for Competition", "Preventing anti-competitive practices and reviewing concentration"],
        ["Zakat, Tax and Customs Authority", "Zakat, VAT and imports"],
        ["Saudi Standards, Metrology and Quality Organization", "Product conformity and standards"],
        ["Saudi Food and Drug Authority", "Food and cosmetics"],
      ],
      contracts: ["Supply and distribution agreements", "Commercial agency agreements", "Shop and mall leases", "Franchise agreements", "Terms of sale, warranty and exchange", "Online-platform and delivery agreements"],
      risks: [
        { t: "Commercial agencies and ending them", d: "Ending or not renewing an agency without justification may carry compensation, and the Commercial Agencies law and the contract terms are reviewed." },
        { t: "Collecting credit-sale receivables", d: "Credit sales without an enforceable instrument or security leave a supplier facing a long claim, so invoices and acknowledgements are documented from the start." },
        { t: "Product claims and conformity", d: "Offering a product with non-conforming claims or without the required certificates exposes the business to violations, recalls and consumer compensation." },
      ],
      faqs: [
        { q: "How do I protect myself as a supplier on credit sales?", a: "With a clear contract fixing the term, amounts due and late-payment charges, an enforceable instrument or guarantee, and documented delivery and invoices. The more complete the documents, the faster recovery is." },
        { q: "Can a consumer return a product bought online?", a: "It is subject to the consumer-protection and e-commerce rules and the seller's published terms. We review your exchange and return policy so it complies." },
      ],
    },
  },
};
