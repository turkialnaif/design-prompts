import type { SectorExtraMap } from "./types";

export const part3: SectorExtraMap = {
  "real-estate": {
    ar: {
      regulators: [
        ["الهيئة العامة للعقار", "تنظيم الوساطة والتطوير والتسويق العقاري"],
        ["وزارة العدل", "التوثيق ونقل الملكية والسجل العقاري"],
        ["وزارة البلديات والإسكان", "التراخيص والمخططات ومنصة إيجار"],
        ["الهيئة العامة لعقارات الدولة", "عقارات الدولة وتأجيرها واستثمارها"],
        ["وزارة الاستثمار", "تملك غير السعوديين وتراخيص الاستثمار"],
      ],
      contracts: ["عقود البيع والشراء العقاري", "عقود الإيجار الموحدة (إيجار)", "عقود الوساطة والتسويق", "اتفاقيات التطوير والشراكة العقارية", "عقود البيع على الخارطة", "التوكيلات العقارية"],
      risks: [
        { t: "التحقق من الصك وسلامة الملكية", d: "قبل أي شراء أو تطوير يُتحقق من الصك والقيود والرهون وحدود المخطط، فخلل واحد قد يعطل الصفقة كلها." },
        { t: "البيع على الخارطة وضمانات المشتري", d: "تأخر التسليم أو تغيير المواصفات يحتاج نصوصًا تحدد التعويض وحقوق الفسخ والضمانات بحسب ضوابط البيع على الخارطة." },
        { t: "التوكيل العقاري وحدوده", d: "منح وكالة عامة لوكيل في بيع عقار دون قيود قد يعرّض الموكل لتصرفات لا يريدها، وتُحدَّد صلاحياتها بدقة." },
      ],
      faqs: [
        { q: "ما أول ما أتحقق منه قبل شراء عقار؟", a: "الصك وصحة الملكية، والقيود والرهون، وصلاحية المخطط والاستخدام، والتزامات البائع للجهات. ثم يُصاغ العقد بدفعات مرتبطة بإنجاز النقل." },
        { q: "هل يمكن إخلاء مستأجر قبل نهاية العقد؟", a: "حالات الإخلاء محددة بالنظام وبنود العقد، ومن أهمها التخلف عن السداد بعد الإنذار. تُرفع الدعوى بحسب الإجراءات المقررة مع توثيق العقد على المنصة المعتمدة." },
      ],
    },
    en: {
      regulators: [
        ["Real Estate General Authority", "Regulation of brokerage, development and marketing"],
        ["Ministry of Justice", "Notarisation, transfer of title and the real-estate register"],
        ["Ministry of Municipal, Rural Affairs and Housing", "Licences, plans and the Ejar platform"],
        ["General Authority for State Properties", "State properties, leasing and investment"],
        ["Ministry of Investment", "Foreign ownership and investment licences"],
      ],
      contracts: ["Sale and purchase contracts", "Unified lease contracts (Ejar)", "Brokerage and marketing agreements", "Development and joint-venture agreements", "Off-plan sale contracts", "Real-estate powers of attorney"],
      risks: [
        { t: "Verifying the deed and the soundness of title", d: "Before any purchase or development, the deed, encumbrances, mortgages and plan boundaries are checked; a single defect can stall the whole deal." },
        { t: "Off-plan sales and buyer protections", d: "Late delivery or changed specifications need terms fixing compensation, termination rights and safeguards under the off-plan sales rules." },
        { t: "Real-estate powers of attorney and their limits", d: "A general power given to an agent to sell property without limits can expose the principal to acts they did not want, so the authority is defined precisely." },
      ],
      faqs: [
        { q: "What should I check first before buying property?", a: "The deed and soundness of title, encumbrances and mortgages, the plan and permitted use, and the seller's obligations to authorities. Then the contract is drafted with payments tied to the transfer." },
        { q: "Can a tenant be evicted before the lease ends?", a: "Eviction grounds are fixed by law and the lease terms, chiefly non-payment after notice. The claim follows the prescribed procedure, with the lease documented on the approved platform." },
      ],
    },
  },

  "security-defense": {
    ar: {
      regulators: [
        ["الهيئة العامة للصناعات العسكرية", "ترخيص الصناعات العسكرية وتوطينها"],
        ["هيئة المحتوى المحلي والمشتريات الحكومية", "المحتوى المحلي والمشتريات"],
        ["الهيئة الوطنية للأمن السيبراني", "الأمن السيبراني للجهات الحساسة"],
        ["هيئة الرقابة ومكافحة الفساد", "النزاهة ومكافحة الفساد"],
      ],
      contracts: ["عقود التوريد والمشتريات الحكومية", "اتفاقيات الشراكة والتوطين", "عقود الصيانة والدعم", "اتفاقيات السرية والتعامل مع المعلومات المصنفة", "عقود الوكالة والتمثيل التجاري", "عقود التقنية والأنظمة الأمنية"],
      risks: [
        { t: "الوكلاء والعمولات", d: "التعامل مع وسطاء أو وكلاء دون ضوابط نزاهة يعرّض المنشأة لمخاطر جسيمة تتجاوز العقد نفسه." },
        { t: "المعلومات المصنفة وسريتها", d: "تداول وثائق أو بيانات ذات تصنيف دون اتباع الضوابط يرتب مسؤولية نظامية على المنشأة والأفراد." },
        { t: "المحتوى المحلي وشروط التأهيل", d: "عدم الوفاء بمتطلبات المحتوى المحلي والتأهيل المسبق قد يخرج العرض من المنافسة أو يعرّض العقد للمراجعة." },
      ],
      faqs: [
        { q: "ما أهم احترازات التعاقد مع الجهات الحكومية في هذا القطاع؟", a: "قراءة شروط المنافسة بدقة، والالتزام بنظام المنافسات والمشتريات الحكومية، وتوثيق التنفيذ والتسليم، وضبط العمولات والوسطاء ضمن سياسة نزاهة مكتوبة." },
        { q: "كيف نحمي معلومات المشروع الحساسة مع الشركاء؟", a: "باتفاقية سرية محددة النطاق، وتصنيف للمعلومات وضوابط وصول، وبنود صريحة على مسؤولية التسرب. وتُراجَع الضوابط السيبرانية إلزامًا." },
      ],
    },
    en: {
      regulators: [
        ["General Authority for Military Industries", "Licensing and localisation of military industries"],
        ["Local Content and Government Procurement Authority", "Local content and procurement"],
        ["National Cybersecurity Authority", "Cybersecurity for sensitive entities"],
        ["Oversight and Anti-Corruption Authority", "Integrity and anti-corruption"],
      ],
      contracts: ["Supply and government-procurement contracts", "Partnership and localisation agreements", "Maintenance and support contracts", "Confidentiality agreements and handling of classified information", "Agency and commercial-representation agreements", "Technology and security-systems contracts"],
      risks: [
        { t: "Agents and commissions", d: "Dealing with intermediaries or agents without integrity controls exposes the business to serious risks that extend beyond the contract itself." },
        { t: "Classified information and its secrecy", d: "Handling classified documents or data without following the controls creates legal liability for the business and individuals." },
        { t: "Local content and pre-qualification", d: "Failing local-content and pre-qualification requirements can take a bid out of the competition or expose the contract to review." },
      ],
      faqs: [
        { q: "What are the main precautions when contracting with government bodies in this sector?", a: "Read the tender conditions closely, comply with the Government Tenders and Procurement Law, document performance and delivery, and keep commissions and intermediaries within a written integrity policy." },
        { q: "How do we protect sensitive project information with partners?", a: "With a defined-scope confidentiality agreement, classification of information and access controls, and express terms on liability for leaks. Cybersecurity controls are reviewed as a requirement." },
      ],
    },
  },

  "environment-water": {
    ar: {
      regulators: [
        ["وزارة البيئة والمياه والزراعة", "السياسات والتراخيص البيئية والمائية"],
        ["المركز الوطني للرقابة على الالتزام البيئي", "الالتزام البيئي والتفتيش والمخالفات"],
        ["الشركة الوطنية للمياه", "عقود خدمات المياه والصرف"],
        ["المركز الوطني للتخصيص", "مشاريع الشراكة مع القطاع الخاص"],
      ],
      contracts: ["عقود تشغيل وصيانة محطات المياه والمعالجة", "اتفاقيات شراء المياه والطاقة", "عقود الاستشارات والدراسات البيئية", "عقود توريد المعدات وتركيبها", "عقود إدارة النفايات والتدوير", "اتفاقيات الشراكة مع القطاع الخاص"],
      risks: [
        { t: "التراخيص والموافقات البيئية قبل التشغيل", d: "بدء المشروع قبل استيفاء الموافقات يعرّضه للإيقاف والغرامات، ويؤثر على تمويله وعقوده." },
        { t: "المسؤولية عن التلوث والضرر البيئي", d: "تحديد المسؤولية بين المالك والمشغّل والمقاول عن التلوث والمعالجة أمر لا يُترك للافتراض." },
        { t: "مؤشرات الأداء في عقود التشغيل", d: "ربط الدفع بمؤشرات جودة المياه والتوافر يحتاج تعريفات دقيقة وآلية قياس متفقًا عليها لتفادي النزاع." },
      ],
      faqs: [
        { q: "هل أحتاج دراسة أثر بيئي لمشروعي؟", a: "يتوقف ذلك على نوع النشاط وحجمه وموقعه وما تشترطه الجهة المختصة. نراجع نشاطك مبكرًا لنحدد الموافقات اللازمة قبل التعاقد والبناء." },
        { q: "من يتحمل غرامة المخالفة البيئية: المالك أم المشغّل؟", a: "يحدده العقد ووقائع المخالفة وسببها. لذلك تُصاغ بنود المسؤولية والتعويض بين الأطراف بوضوح، وتُوثَّق ضوابط التشغيل." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Environment, Water and Agriculture", "Environmental and water policy and licences"],
        ["National Center for Environmental Compliance", "Environmental compliance, inspection and violations"],
        ["National Water Company", "Water and sanitation service contracts"],
        ["National Center for Privatization", "Public–private partnership projects"],
      ],
      contracts: ["Operation and maintenance of water and treatment plants", "Water- and power-purchase agreements", "Environmental consultancy and study contracts", "Equipment supply and installation contracts", "Waste-management and recycling contracts", "Public–private partnership agreements"],
      risks: [
        { t: "Environmental licences before operation", d: "Starting a project before obtaining approvals exposes it to suspension and fines, and affects its financing and contracts." },
        { t: "Liability for pollution and environmental harm", d: "Responsibility among owner, operator and contractor for pollution and remediation should not be left to assumption." },
        { t: "Performance indicators in operating contracts", d: "Tying payment to water-quality and availability indicators needs precise definitions and an agreed measurement method to avoid disputes." },
      ],
      faqs: [
        { q: "Does my project need an environmental impact study?", a: "It depends on the type, size and location of the activity and what the competent authority requires. We review your activity early to identify the approvals needed before contracting and building." },
        { q: "Who bears an environmental fine: the owner or the operator?", a: "The contract and the facts and cause of the violation decide. Liability and indemnity terms between the parties should be drafted clearly, and operating controls documented." },
      ],
    },
  },

  "municipal-housing": {
    ar: {
      regulators: [
        ["وزارة البلديات والإسكان", "التراخيص البلدية وبرامج الإسكان"],
        ["منصة إيجار", "توثيق عقود الإيجار السكنية والتجارية"],
        ["الهيئة العامة لعقارات الدولة", "استثمار عقارات الدولة"],
        ["منصة اعتماد (وزارة المالية)", "المنافسات والمشتريات الحكومية"],
        ["الهيئة السعودية للمقاولين", "تصنيف المقاولين"],
      ],
      contracts: ["عقود المقاولة للمشاريع البلدية", "عقود تأجير واستثمار المواقع البلدية", "اتفاقيات التطوير والشراكة السكنية", "عقود التشغيل والنظافة والصيانة", "عقود الإيجار السكنية", "عقود البيع على الخارطة للوحدات السكنية"],
      risks: [
        { t: "استثمار المواقع البلدية", d: "عقود الاستثمار بالمواقع البلدية تتضمن شروط تشغيل وسداد ورسوم تتطلب قراءة دقيقة، وأي إخلال قد يرتب فسخًا." },
        { t: "مطالبات المقاولين مع الجهات", d: "تأخر المستخلصات وأوامر التغيير مع جهة حكومية يحتاج توثيقًا وإخطارات في مواعيدها نظامًا وعقدًا." },
        { t: "حماية المستأجر والمؤجر على المنصة", d: "عدم توثيق العقد على المنصة المعتمدة قد يضعف الإثبات والتنفيذ، ويؤثر في الإخلاء والسداد." },
      ],
      faqs: [
        { q: "كيف أتعامل مع تأخر جهة حكومية في صرف مستخلصاتي؟", a: "بتوثيق الإنجاز والمستخلصات والإخطارات، ثم مراسلة رسمية تحدد المستحق والمدة، ثم المسار النظامي المناسب بحسب العقد. وتُراعى المدد النظامية لتقديم المطالبة." },
        { q: "هل عقد الإيجار غير الموثق ملزم؟", a: "العقد قد يكون ملزمًا بين طرفيه، لكن التوثيق على المنصة يؤثر في الإثبات والتنفيذ والآثار النظامية. ننصح دائمًا بالتوثيق قبل التسليم." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Municipal, Rural Affairs and Housing", "Municipal licences and housing programmes"],
        ["Ejar platform", "Documentation of residential and commercial leases"],
        ["General Authority for State Properties", "Investment of state properties"],
        ["Etimad platform (Ministry of Finance)", "Government tenders and procurement"],
        ["Saudi Contractors Authority", "Contractor classification"],
      ],
      contracts: ["Contracts for municipal projects", "Leasing and investment of municipal sites", "Housing development and partnership agreements", "Operation, cleaning and maintenance contracts", "Residential leases", "Off-plan sales of residential units"],
      risks: [
        { t: "Investing in municipal sites", d: "Investment contracts over municipal sites carry operating, payment and fee terms that need careful reading, and any breach can lead to termination." },
        { t: "Contractor claims against authorities", d: "Late certificates and variation orders with a government body need documentation and notices on time, under the law and the contract." },
        { t: "Protection of tenant and landlord on the platform", d: "Failing to document a lease on the approved platform can weaken proof and enforcement, and affect eviction and payment." },
      ],
      faqs: [
        { q: "How do I deal with a government body delaying payment of my certificates?", a: "By documenting progress, certificates and notices, then a formal letter fixing the amount and period, then the appropriate legal route under the contract. The legal time limits for filing a claim are observed." },
        { q: "Is an undocumented lease binding?", a: "The contract may bind its parties, but documentation on the platform affects proof, enforcement and legal effects. We always recommend documenting before handover." },
      ],
    },
  },

  "culture-media": {
    ar: {
      regulators: [
        ["وزارة الثقافة", "الفنون والمحتوى الثقافي والتراخيص"],
        ["الهيئة العامة لتنظيم الإعلام", "المحتوى الإعلامي والإعلان والترخيص"],
        ["الهيئة السعودية للملكية الفكرية", "حقوق المؤلف والعلامات"],
        ["هيئة الأفلام", "الإنتاج السينمائي والتصوير"],
        ["الهيئة السعودية للبيانات والذكاء الاصطناعي", "حماية البيانات في المحتوى والمنصات"],
      ],
      contracts: ["عقود الإنتاج والتمويل", "تراخيص حقوق المؤلف والتوزيع", "عقود المواهب والمؤثرين والإعلان", "عقود الرعاية والشراكات", "عقود المنصات الرقمية", "تنازلات حقوق الصورة والأداء"],
      risks: [
        { t: "ملكية المحتوى المنتَج", d: "العقد مع شركة إنتاج أو مبدع يجب أن ينص على من يملك المحتوى النهائي وحقوق استغلاله ومدته ومجاله." },
        { t: "إعلانات المؤثرين والالتزام بالتراخيص", d: "الإعلان عبر المؤثرين له ضوابط ترخيص وإفصاح، ومخالفتها تعرّض المعلِن والمؤثر للمساءلة." },
        { t: "الاقتباس والمواد المرخصة", d: "استخدام موسيقى أو صور أو مقاطع من أطراف أخرى دون ترخيص مكتوب سبب شائع للمطالبات وإزالة المحتوى." },
      ],
      faqs: [
        { q: "هل أحتاج ترخيصًا لنشر محتوى إعلاني أو بث؟", a: "قد يلزم ترخيص بحسب نوع النشاط والمنصة والمحتوى. نراجع طبيعة نشاطك والجهة المختصة قبل الإطلاق، ونصيغ عقود المحتوى والتنازل عن الحقوق." },
        { q: "من يملك المحتوى الذي ينتجه فريق مستقل لحسابي؟", a: "يحدده العقد قبل أي شيء، ولا يُفترض انتقال الملكية دون نص صريح. نكتب بنود التنازل أو الترخيص بوضوح قبل بدء الإنتاج." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Culture", "Arts, cultural content and licences"],
        ["General Authority for Media Regulation", "Media content, advertising and licensing"],
        ["Saudi Authority for Intellectual Property", "Copyright and trademarks"],
        ["Film Commission", "Film production and shooting"],
        ["Saudi Data and AI Authority", "Data protection in content and platforms"],
      ],
      contracts: ["Production and financing agreements", "Copyright and distribution licences", "Talent, influencer and advertising contracts", "Sponsorship and partnership agreements", "Digital-platform agreements", "Image and performance releases"],
      risks: [
        { t: "Ownership of produced content", d: "The contract with a production company or creator must say who owns the final content and its exploitation rights, term and field." },
        { t: "Influencer advertising and licensing", d: "Advertising through influencers has licensing and disclosure rules, and breaching them exposes both the advertiser and the influencer." },
        { t: "Quotation and licensed material", d: "Using music, images or clips from others without a written licence is a common cause of claims and takedowns." },
      ],
      faqs: [
        { q: "Do I need a licence to publish advertising or broadcast content?", a: "A licence may be needed depending on the activity, platform and content. We review your activity and the competent authority before launch and draft the content and rights-assignment contracts." },
        { q: "Who owns content an independent team produces for me?", a: "The contract decides first of all; ownership is not assumed to pass without an express term. We write the assignment or licence terms clearly before production begins." },
      ],
    },
  },
};
