import type { SectorExtraMap } from "./types";

export const part4: SectorExtraMap = {
  agriculture: {
    ar: {
      regulators: [
        ["وزارة البيئة والمياه والزراعة", "التراخيص الزراعية والمياه والثروة الحيوانية"],
        ["الهيئة العامة للغذاء والدواء", "سلامة الغذاء والتسجيل والفسح"],
        ["الهيئة العامة للأمن الغذائي", "سياسات الأمن الغذائي والمخزون"],
        ["هيئة الزكاة والضريبة والجمارك", "الاستيراد والتصدير والجمارك"],
        ["الهيئة السعودية للمواصفات والمقاييس والجودة", "مواصفات المنتجات الغذائية"],
      ],
      contracts: ["عقود التوريد الزراعي والتوزيع", "عقود إيجار الأراضي الزراعية والاستثمار فيها", "اتفاقيات الري والمياه", "عقود التصدير والاستيراد", "عقود الشراكة والمساهمة في المشاريع الزراعية", "عقود التسويق والنقل المبرد"],
      risks: [
        { t: "المخاطر الموسمية وتحديد المسؤولية", d: "تلف المحصول أو تأخر التوريد بسبب الطقس أو الآفات يحتاج بنودًا واضحة تحدد من يتحمل الخسارة وكيف تُثبَت." },
        { t: "جودة المنتج والمطابقة", d: "رفض شحنة بسبب المواصفات أو فحص الجودة يثير خلافات في الثمن والتعويض، فتُحدَّد معايير القبول سلفًا." },
        { t: "حقوق المياه والأراضي", d: "استثمار الأرض الزراعية يرتبط بالترخيص وحقوق المياه، وأي لبس فيها يهدد جدوى المشروع وتمويله." },
      ],
      faqs: [
        { q: "هل يمكن تأجير أرض زراعية للاستثمار؟", a: "نعم بحسب نوع الأرض وملكيتها وما تشترطه الجهة المختصة. يُراجع الصك والترخيص وحقوق المياه قبل التعاقد، وتُصاغ المدة والتجديد والإنهاء بوضوح." },
        { q: "ماذا لو رفض المشتري الشحنة بدعوى مخالفة الجودة؟", a: "يُرجع إلى معايير القبول في العقد وإجراءات الفحص والإخطار في وقتها. يُنصح بتوثيق الشحن والفحص في حضور الطرفين أو جهة محايدة." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Environment, Water and Agriculture", "Agricultural, water and livestock licences"],
        ["Saudi Food and Drug Authority", "Food safety, registration and clearance"],
        ["General Authority for Food Security", "Food-security policy and reserves"],
        ["Zakat, Tax and Customs Authority", "Imports, exports and customs"],
        ["Saudi Standards, Metrology and Quality Organization", "Food-product standards"],
      ],
      contracts: ["Agricultural supply and distribution contracts", "Leases and investment in agricultural land", "Irrigation and water agreements", "Export and import contracts", "Partnership and equity agreements for farm projects", "Marketing and cold-chain transport contracts"],
      risks: [
        { t: "Seasonal risk and allocating responsibility", d: "Crop loss or delivery delay from weather or pests needs clear terms on who bears the loss and how it is proven." },
        { t: "Product quality and conformity", d: "Rejecting a shipment over specifications or quality inspection stirs disputes over price and compensation, so acceptance criteria are fixed in advance." },
        { t: "Water and land rights", d: "Investing in farmland depends on licensing and water rights, and any uncertainty threatens the project's viability and financing." },
      ],
      faqs: [
        { q: "Can farmland be leased for investment?", a: "Yes, depending on the type and ownership of the land and what the competent authority requires. The deed, licence and water rights are reviewed before contracting, and the term, renewal and termination drafted clearly." },
        { q: "What if the buyer rejects a shipment for quality?", a: "Look to the acceptance criteria in the contract and the inspection and notice procedure, on time. We advise documenting shipping and inspection in the presence of both parties or a neutral body." },
      ],
    },
  },

  "energy-mining": {
    ar: {
      regulators: [
        ["وزارة الطاقة", "سياسات الطاقة والبترول والكهرباء"],
        ["وزارة الصناعة والثروة المعدنية", "تراخيص التعدين والاستكشاف"],
        ["هيئة تنظيم الكهرباء", "تراخيص الكهرباء والإنتاج المزدوج"],
        ["وزارة الاستثمار", "الاستثمار الأجنبي وتراخيصه"],
        ["المركز الوطني للتخصيص", "الشراكة مع القطاع الخاص"],
      ],
      contracts: ["اتفاقيات شراء الطاقة والكهرباء", "عقود الإنشاء والهندسة والتوريد (EPC)", "عقود التشغيل والصيانة", "تراخيص الاستكشاف والتعدين وتحويلها", "اتفاقيات المساهمين والمشاريع المشتركة", "عقود الوقود والتوريد طويلة الأجل"],
      risks: [
        { t: "الظروف الاستثنائية وتحمل المخاطر", d: "في العقود طويلة الأجل تحدد بنود القوة القاهرة وإعادة التوازن من يتحمل تقلب التكاليف والأسعار والتأخير." },
        { t: "ترخيص التعدين وشروط الاحتفاظ به", d: "التزامات الاستكشاف والإنفاق والتقارير شروط للاحتفاظ بالرخصة، والإخلال بها قد يؤدي إلى سحبها." },
        { t: "حل النزاعات في المشاريع الكبرى", d: "اختيار القانون والمقر ولغة التحكيم وتسلسل التسوية يحتاج عناية، فهو يحدد كلفة النزاع ومساره." },
      ],
      faqs: [
        { q: "ما الفرق بين اتفاقية شراء الطاقة وعقد التشغيل؟", a: "الأولى تحكم بيع الطاقة المنتجة وسعرها ومدتها، والثانية تحكم تشغيل المحطة وصيانتها وأداء المشغل. وكثيرًا ما يُربط بينهما وبين التمويل بنصوص متقابلة." },
        { q: "هل يُسمح للمستثمر الأجنبي بدخول التعدين؟", a: "بحسب ترخيص الاستثمار ونظام التعدين وما تحدده الجهة المختصة. نراجع هيكل الاستثمار والترخيصين قبل تقديم الطلب." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Energy", "Energy, petroleum and power policy"],
        ["Ministry of Industry and Mineral Resources", "Mining and exploration licences"],
        ["Electricity Regulatory Authority", "Electricity and cogeneration licences"],
        ["Ministry of Investment", "Foreign investment and its licences"],
        ["National Center for Privatization", "Partnership with the private sector"],
      ],
      contracts: ["Power- and energy-purchase agreements", "Engineering, procurement and construction (EPC) contracts", "Operation and maintenance contracts", "Exploration and mining licences and their transfer", "Shareholder and joint-venture agreements", "Long-term fuel and supply contracts"],
      risks: [
        { t: "Exceptional events and risk allocation", d: "In long-term contracts, force-majeure and rebalancing clauses decide who bears volatility in costs, prices and delay." },
        { t: "Mining licences and conditions to keep them", d: "Exploration, spending and reporting obligations are conditions to keep the licence, and breaching them can lead to its withdrawal." },
        { t: "Resolving disputes in major projects", d: "Choosing the law, seat, arbitration language and escalation sequence needs care; it decides the cost and path of a dispute." },
      ],
      faqs: [
        { q: "What is the difference between a power-purchase agreement and an operating contract?", a: "The first governs the sale of the energy produced, its price and term; the second governs operation and maintenance of the plant and the operator's performance. They are often tied together, and to financing, by mirrored terms." },
        { q: "Can a foreign investor enter mining?", a: "Subject to the investment licence, the mining law and what the competent authority decides. We review the investment structure and both licences before the application." },
      ],
    },
  },

  government: {
    ar: {
      regulators: [
        ["وزارة المالية", "نظام المنافسات والمشتريات الحكومية ومنصة اعتماد"],
        ["هيئة المحتوى المحلي والمشتريات الحكومية", "المحتوى المحلي وتنظيم المشتريات"],
        ["ديوان المراقبة العامة", "الرقابة المالية على الجهات الحكومية"],
        ["هيئة الرقابة ومكافحة الفساد", "النزاهة وضوابط تعارض المصالح"],
        ["المركز الوطني للتخصيص", "الشراكة مع القطاع الخاص"],
      ],
      contracts: ["عقود المنافسات الحكومية", "عقود التشغيل والصيانة للجهات", "عقود الاستشارات والدراسات", "اتفاقيات الشراكة مع القطاع الخاص", "أوامر التغيير والمستخلصات", "الضمانات البنكية الابتدائية والنهائية"],
      risks: [
        { t: "مدد الاعتراض في المنافسات", d: "للمتنافس مدد محددة للاعتراض على الترسية أو الاستبعاد، وفواتها يسقط الحق في التظلم." },
        { t: "الغرامات ومصادرة الضمانات", d: "الإخلال بالمدة أو المواصفات قد يرتب غرامات ومصادرة ضمان، فتُراجَع قبل الدفاع الأسباب وإجراءات الإخطار." },
        { t: "تعارض المصالح والنزاهة", d: "علاقات أعضاء لجان الترسية أو الموظفين بالمتنافسين تحتاج إفصاحًا وضوابط، وإلا هددت العقد والمنافسة." },
      ],
      faqs: [
        { q: "ما المدة المتاحة للاعتراض على قرار الترسية؟", a: "تحددها اللائحة التنفيذية لنظام المنافسات والمشتريات الحكومية، وتبدأ من الإخطار أو النشر. نراجع المدة بالتحديد في حالتك ونعد التظلم قبل فواتها." },
        { q: "هل يمكن للمقاول المطالبة بتعويض عن تأخر الجهة في تسليم الموقع؟", a: "قد يكون ممكنًا إذا ثبت أن التأخير من الجهة وأُخطرت به في وقته وفق العقد. نقيّم المستندات والإخطارات ونحدد المطالبة والمسار." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Finance", "The Government Tenders and Procurement Law and the Etimad platform"],
        ["Local Content and Government Procurement Authority", "Local content and procurement regulation"],
        ["General Court of Audit", "Financial oversight of government bodies"],
        ["Oversight and Anti-Corruption Authority", "Integrity and conflict-of-interest controls"],
        ["National Center for Privatization", "Partnership with the private sector"],
      ],
      contracts: ["Government tender contracts", "Operation and maintenance contracts for entities", "Consultancy and study contracts", "Public–private partnership agreements", "Variation orders and payment certificates", "Initial and final bank guarantees"],
      risks: [
        { t: "Objection periods in tenders", d: "A bidder has fixed periods to object to an award or exclusion, and missing them forfeits the right to complain." },
        { t: "Penalties and forfeiture of guarantees", d: "Breaching time or specification may bring penalties and forfeiture of a guarantee, so the grounds and notice procedure are reviewed before the defence." },
        { t: "Conflict of interest and integrity", d: "Ties between award-committee members or staff and bidders need disclosure and controls, or they threaten the contract and the competition." },
      ],
      faqs: [
        { q: "How long do I have to object to an award decision?", a: "The Implementing Regulations of the Government Tenders and Procurement Law set the period, running from notice or publication. We confirm the exact period in your case and prepare the complaint before it lapses." },
        { q: "Can a contractor claim compensation when the authority is late handing over the site?", a: "Possibly, if the delay is proved to be the authority's and was notified in time under the contract. We assess the documents and notices and set out the claim and route." },
      ],
    },
  },

  "family-businesses": {
    ar: {
      regulators: [
        ["وزارة التجارة", "نظام الشركات والسجل التجاري"],
        ["المحاكم المختصة", "قسمة التركات والمنازعات بين الورثة والشركاء"],
        ["وزارة العدل", "التوثيق وكتابات العدل"],
        ["هيئة السوق المالية", "الإدراج والطرح للشركات الراغبة"],
        ["المركز السعودي للتحكيم التجاري", "تسوية منازعات الشركاء بالتحكيم"],
      ],
      contracts: ["ميثاق الأسرة ودستور العائلة", "عقد تأسيس الشركة وملحق الشركاء", "اتفاقيات المساهمين وانتقال الأسهم", "وصايا وأوقاف أسرية", "عقود إدارة وتعيين المديرين", "اتفاقيات الخروج وشراء الحصص"],
      risks: [
        { t: "انتقال الملكية بين الأجيال", d: "غياب خطة لانتقال الملكية والإدارة عند وفاة المؤسس يفتح نزاعات بين الورثة تعطل الشركة وتهدد قيمتها." },
        { t: "الفصل بين مال الأسرة ومال الشركة", d: "الخلط بين النفقات الشخصية وحسابات الشركة يضعف الحماية القانونية ويثير نزاعات حول الحقوق والأرباح." },
        { t: "حقوق الأقلية والخروج", d: "الشريك الذي لا يرضى بالإدارة يحتاج مسارًا منظمًا للخروج وتقييمًا عادلًا لحصته، وإلا طال النزاع." },
      ],
      faqs: [
        { q: "هل ميثاق الأسرة ملزم قانونًا؟", a: "يختلف أثره بحسب صياغته وتوثيقه وربطه بعقد الشركة ونظامها الأساس. نصوغه ليكون جزءًا من منظومة وثائق ملزمة لا مجرد اتفاق أدبي." },
        { q: "كيف أحمي الشركة من نزاع الورثة؟", a: "بوثائق مبكرة: اتفاق مساهمين، وشروط انتقال الأسهم، وأولوية الشراء، وآلية تقييم وتحكيم. ويُنسَّق ذلك مع الوصية والتخطيط للتركة." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Commerce", "Companies law and the commercial register"],
        ["Competent courts", "Division of estates and disputes among heirs and partners"],
        ["Ministry of Justice", "Notarisation and notary offices"],
        ["Capital Market Authority", "Listing and offering for companies that intend to list"],
        ["Saudi Center for Commercial Arbitration", "Arbitration of partner disputes"],
      ],
      contracts: ["Family charter and constitution", "Articles of association and partners' annex", "Shareholder agreements and share transfers", "Wills and family endowments", "Management and director appointment contracts", "Exit and buy-out agreements"],
      risks: [
        { t: "Transfer of ownership across generations", d: "Without a plan for transferring ownership and management when the founder dies, disputes among heirs stall the company and threaten its value." },
        { t: "Separating family money from company money", d: "Mixing personal spending with company accounts weakens legal protection and breeds disputes over rights and profits." },
        { t: "Minority rights and exit", d: "A partner who does not accept the management needs an orderly exit and a fair valuation of their stake, or the dispute drags on." },
      ],
      faqs: [
        { q: "Is a family charter legally binding?", a: "Its effect depends on its drafting, documentation and link to the company's contract and articles. We draft it as part of a system of binding documents, not a moral understanding." },
        { q: "How do I protect the company from a dispute among heirs?", a: "With early documents: a shareholders' agreement, share-transfer conditions, pre-emption, and a valuation and arbitration mechanism. It is coordinated with the will and estate planning." },
      ],
    },
  },

  "nonprofit-endowments": {
    ar: {
      regulators: [
        ["المركز الوطني لتنمية القطاع غير الربحي", "تنظيم المؤسسات الأهلية والجمعيات"],
        ["الهيئة العامة للأوقاف", "الأوقاف وإدارتها واستثمارها"],
        ["وزارة الموارد البشرية والتنمية الاجتماعية", "تراخيص الجمعيات والتبرعات"],
        ["هيئة الزكاة والضريبة والجمارك", "الإعفاءات الزكوية والضريبية"],
        ["الهيئة السعودية للبيانات والذكاء الاصطناعي", "حماية بيانات المستفيدين والمتبرعين"],
      ],
      contracts: ["صكوك الوقف ووثائقه", "لوائح الحوكمة والسياسات الداخلية", "اتفاقيات الشراكة مع الجهات المانحة", "عقود المتطوعين والعاملين", "اتفاقيات التبرع والتمويل المشروط", "عقود استثمار أصول الوقف"],
      risks: [
        { t: "التبرعات والتمويل المشروط", d: "شروط المانح على استخدام التبرع تُلزم المنظمة، وتجاوزها يرتب مساءلة وسحب التمويل." },
        { t: "تعارض المصالح في مجالس الإدارة", d: "التعاقد مع أطراف ذات صلة بأعضاء المجلس دون إفصاح وموافقة يعرّض المنظمة للمخالفة ويضعف الثقة." },
        { t: "إدارة أصول الوقف واستثمارها", d: "الوقف مقيد بشرط الواقف وأحكام النظام، وأي تصرف في أصله أو ريعه يخالفهما قد يُبطل أو يُسأل عنه الناظر." },
      ],
      faqs: [
        { q: "ما الفرق بين الوقف والجمعية الأهلية؟", a: "الوقف يقوم على أصل محبوس يُنفق ريعه في وجه الخير بشرط الواقف، أما الجمعية فشخصية اعتبارية بأعضاء وجمعية عمومية. ولكل منهما نظام وحوكمة وحدود تصرف." },
        { q: "كيف نضبط التعاقد مع أطراف ذات صلة في منظمة غير ربحية؟", a: "بسياسة مكتوبة لتعارض المصالح، وإفصاح سابق، وموافقة من غير ذوي المصلحة، وتوثيق التعاقد بسعر السوق. نراجع النظام الأساسي والسياسة قبل التعاقد." },
      ],
    },
    en: {
      regulators: [
        ["National Center for Non-Profit Sector Development", "Regulation of civil institutions and associations"],
        ["General Authority for Awqaf", "Endowments, their management and investment"],
        ["Ministry of Human Resources and Social Development", "Association licences and donations"],
        ["Zakat, Tax and Customs Authority", "Zakat and tax exemptions"],
        ["Saudi Data and AI Authority", "Protection of beneficiary and donor data"],
      ],
      contracts: ["Endowment deeds and documents", "Governance regulations and internal policies", "Partnership agreements with donors", "Volunteer and staff contracts", "Donation and conditional-funding agreements", "Endowment-asset investment contracts"],
      risks: [
        { t: "Donations and conditional funding", d: "A donor's conditions on the use of a donation bind the organisation, and exceeding them brings liability and withdrawal of funding." },
        { t: "Conflicts of interest on boards", d: "Contracting with parties related to board members without disclosure and approval exposes the organisation to violations and weakens trust." },
        { t: "Managing and investing endowment assets", d: "A waqf is bound by the founder's condition and the law; any disposal of its principal or income that breaches them may be voided or answered for by the administrator." },
      ],
      faqs: [
        { q: "What is the difference between a waqf and a civil association?", a: "A waqf rests on a dedicated asset whose income is spent on charity under the founder's condition; an association is a legal person with members and a general assembly. Each has its own law, governance and limits on dealing." },
        { q: "How do we control related-party contracting in a non-profit?", a: "With a written conflict-of-interest policy, prior disclosure, approval by those without an interest, and contracting at market price. We review the articles and the policy before contracting." },
      ],
    },
  },
};
