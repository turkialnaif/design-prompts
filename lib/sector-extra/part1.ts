import type { SectorExtraMap } from "./types";

export const part1: SectorExtraMap = {
  construction: {
    ar: {
      regulators: [
        ["الهيئة السعودية للمقاولين", "تصنيف المقاولين وتنظيم مزاولة المهنة"],
        ["وزارة البلديات والإسكان", "التراخيص البلدية واشتراطات البناء"],
        ["منصة اعتماد (وزارة المالية)", "المنافسات والمشتريات الحكومية وعقودها"],
        ["الهيئة السعودية للمهندسين", "تسجيل المهندسين والمكاتب الاستشارية"],
        ["المركز السعودي للتحكيم التجاري", "فصل منازعات المشاريع بالتحكيم"],
      ],
      contracts: ["عقد المقاولة (مبلغ مقطوع أو قياس كميات)", "عقد المقاولة من الباطن", "عقد الاستشارات الهندسية والإشراف", "عقود التوريد والتركيب", "كفالات حسن التنفيذ والدفعة المقدمة", "محاضر الاستلام الابتدائي والنهائي"],
      risks: [
        { t: "إخطارات المطالبة في وقتها", d: "كثير من العقود تشترط إخطارًا مكتوبًا خلال مدة محددة عند التأخير أو التغيير، وفوات المدة قد يُضعف المطالبة أو يُسقطها." },
        { t: "أولوية مستندات العقد", d: "إن لم يُحدَّد ترتيب أولوية العقد والشروط الخاصة والمواصفات والجداول فقد يتحول التعارض بينها إلى بؤرة نزاع." },
        { t: "الدفع المشروط للمقاول من الباطن", d: "ربط دفع المقاول من الباطن باستلام المالك مستخلصه يحتاج صياغة دقيقة تحميه من تجمّد الدفعات وتحمي المقاول الرئيس من مطالبة لا يقابلها تحصيل." },
      ],
      faqs: [
        { q: "من يتحمل مسؤولية العيوب بعد التسليم؟", a: "يُرجع أولًا إلى العقد ثم إلى أحكام نظام المعاملات المدنية في ضمان العيوب، وتختلف المدة والمسؤولية بحسب طبيعة العمل. لذلك تُوثَّق محاضر الاستلام وملاحظات الفحص بدقة." },
        { q: "هل الكفالة البنكية مستقلة عن العقد؟", a: "تُصاغ الكفالات غالبًا على أنها التزام مستقل مستحق عند الطلب، لكن الأثر النهائي يتوقف على صيغة الكفالة نفسها. تُراجَع قبل التوقيع وقبل أي مطالبة أو اعتراض." },
      ],
    },
    en: {
      regulators: [
        ["Saudi Contractors Authority", "Contractor classification and regulation of the trade"],
        ["Ministry of Municipal, Rural Affairs and Housing", "Municipal permits and building requirements"],
        ["Etimad platform (Ministry of Finance)", "Government tenders, procurement and contracts"],
        ["Saudi Council of Engineers", "Registration of engineers and consulting offices"],
        ["Saudi Center for Commercial Arbitration (SCCA)", "Arbitration of project disputes"],
      ],
      contracts: ["Construction contract (lump sum or remeasurement)", "Subcontract", "Engineering consultancy and supervision agreement", "Supply and installation contracts", "Performance and advance-payment guarantees", "Initial and final handover records"],
      risks: [
        { t: "Claim notices on time", d: "Many contracts require written notice within a set period for delay or change; missing the period may weaken or forfeit the claim." },
        { t: "Order of precedence of contract documents", d: "If the ranking of the contract, special conditions, specifications and schedules is not fixed, conflicts between them become a source of dispute." },
        { t: "Conditional payment to subcontractors", d: "Tying a subcontractor's payment to the owner's payment of the main contractor needs careful drafting, so payments do not freeze and the main contractor is not exposed to claims it cannot recover." },
      ],
      faqs: [
        { q: "Who is responsible for defects after handover?", a: "Look first to the contract and then to the defects provisions of the Civil Transactions Law; the period and liability vary with the nature of the work. Handover records and inspection notes should be documented carefully." },
        { q: "Is a bank guarantee independent of the contract?", a: "Guarantees are often drafted as independent on-demand undertakings, but the final effect depends on the wording of the guarantee itself. Review it before signing and before any demand or objection." },
      ],
    },
  },

  technology: {
    ar: {
      regulators: [
        ["هيئة الاتصالات والفضاء والتقنية", "ترخيص الخدمات الرقمية والاتصالات"],
        ["الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)", "نظام حماية البيانات الشخصية ولوائحه"],
        ["الهيئة الوطنية للأمن السيبراني", "الضوابط الأساسية والأمن السيبراني"],
        ["الهيئة السعودية للملكية الفكرية", "حماية العلامات وبراءات الاختراع وحقوق المؤلف"],
        ["وزارة التجارة", "التجارة الإلكترونية وحماية المستهلك"],
      ],
      contracts: ["اتفاقيات تطوير البرمجيات والتراخيص", "اتفاقيات الخدمة (SLA) والدعم", "شروط الاستخدام وسياسة الخصوصية", "اتفاقيات معالجة البيانات ونقلها", "اتفاقيات السرية وعدم الإفصاح", "اتفاقيات المستثمرين والشركاء المؤسسين"],
      risks: [
        { t: "ملكية الشيفرة والمنتج", d: "حين يطوّر طرف ثالث البرنامج دون نص صريح على نقل الملكية أو الترخيص قد لا تملك الشركة ما دفعت مقابله." },
        { t: "نقل البيانات خارج المملكة", d: "نقل البيانات الشخصية أو استضافتها خارج المملكة يخضع لضوابط وشروط، وتجاهلها يعرّض المنشأة للمساءلة والإيقاف." },
        { t: "مسؤولية الخدمة عند الانقطاع", d: "غياب سقف للمسؤولية وتعريف واضح لمستوى الخدمة يفتح الباب لمطالبات تفوق قيمة العقد." },
      ],
      faqs: [
        { q: "هل أحتاج سياسة خصوصية لتطبيقي؟", a: "متى جمعتَ بيانات شخصية لمستخدمين في المملكة فعليك الالتزام بنظام حماية البيانات الشخصية، ومنه إعلان الغرض وحقوق أصحاب البيانات. تُصاغ السياسة بحسب البيانات التي تجمعها فعلًا." },
        { q: "كيف أحمي فكرة مشروعي قبل عرضها على مستثمر؟", a: "باتفاقية سرية قبل الإفصاح، وبتسجيل ما يمكن تسجيله من العلامات وحقوق المؤلف، وبتحديد ما يُعرض وما يُحجب. الاتفاقية تحمي المعلومة لا الفكرة المجردة." },
      ],
    },
    en: {
      regulators: [
        ["Communications, Space and Technology Commission (CST)", "Licensing of digital and telecom services"],
        ["Saudi Data and AI Authority (SDAIA)", "Personal Data Protection Law and its regulations"],
        ["National Cybersecurity Authority", "Essential cybersecurity controls"],
        ["Saudi Authority for Intellectual Property", "Trademarks, patents and copyright"],
        ["Ministry of Commerce", "E-commerce and consumer protection"],
      ],
      contracts: ["Software development and licence agreements", "Service-level (SLA) and support agreements", "Terms of use and privacy policy", "Data processing and transfer agreements", "Non-disclosure agreements", "Investor and founder agreements"],
      risks: [
        { t: "Ownership of the code and product", d: "When a third party develops the software without an express assignment or licence, the company may not own what it paid for." },
        { t: "Transferring data outside the Kingdom", d: "Transferring or hosting personal data abroad is subject to conditions; ignoring them exposes the business to liability and orders to stop." },
        { t: "Liability for outages", d: "Without a liability cap and a clear service level, claims can exceed the value of the contract." },
      ],
      faqs: [
        { q: "Does my app need a privacy policy?", a: "Whenever you collect personal data of users in the Kingdom you must comply with the Personal Data Protection Law, including stating the purpose and respecting data subjects' rights. The policy is drafted around the data you actually collect." },
        { q: "How do I protect my idea before pitching an investor?", a: "With a non-disclosure agreement before disclosure, by registering what can be registered (marks, copyright), and by deciding what is shown and what is withheld. An NDA protects the information, not a bare idea." },
      ],
    },
  },

  education: {
    ar: {
      regulators: [
        ["وزارة التعليم", "ترخيص المدارس الأهلية والأنظمة التعليمية"],
        ["هيئة تقويم التعليم والتدريب", "الاعتماد الأكاديمي وجودة المؤسسات"],
        ["المؤسسة العامة للتدريب التقني والمهني", "ترخيص مراكز ومعاهد التدريب"],
        ["وزارة الموارد البشرية والتنمية الاجتماعية", "العلاقات العمالية والتوطين"],
      ],
      contracts: ["عقود التسجيل والرسوم الدراسية", "عقود المعلمين والكوادر", "عقود الشراكة مع جهات التدريب والاعتماد", "عقود النقل والتغذية والخدمات المساندة", "تراخيص المناهج والمحتوى", "عقود الاستحواذ على المدارس والمعاهد"],
      risks: [
        { t: "استرداد الرسوم عند الانسحاب", d: "غياب نص واضح على استرداد الرسوم عند الانسحاب أو الإغلاق من أكثر مصادر الشكاوى والمنازعات مع أولياء الأمور." },
        { t: "حماية بيانات القاصرين", d: "بيانات الطلاب والقاصرين ذات حساسية خاصة، ويحتاج جمعها واستخدامها ومشاركتها مع الأطراف الخارجية إلى ضوابط واضحة." },
        { t: "ترخيص المحتوى والمناهج", d: "استخدام مناهج أو محتوى تدريبي من طرف آخر دون ترخيص مكتوب قد يعرّض المنشأة لمطالبات الملكية الفكرية." },
      ],
      faqs: [
        { q: "هل يجوز تعديل الرسوم الدراسية خلال العام؟", a: "يحكم ذلك عقد التسجيل والأنظمة والضوابط التي تصدرها الجهة المنظمة. الأصل الالتزام بما وُقّع عليه، وأي تعديل يحتاج مسوغًا نظاميًا وإعلانًا واضحًا." },
        { q: "ما المخاطر النظامية عند استقطاب معلمين أجانب؟", a: "تتعلق بسلامة الإقامة والتأهيل المهني والعقود ونسب التوطين. نراجع العقود والإجراءات قبل التعاقد حتى لا تتحول المخالفة الإدارية إلى نزاع." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Education", "Licensing of private schools and education systems"],
        ["Education and Training Evaluation Commission", "Academic accreditation and institutional quality"],
        ["Technical and Vocational Training Corporation", "Licensing of training centres and institutes"],
        ["Ministry of Human Resources and Social Development", "Employment relations and Saudisation"],
      ],
      contracts: ["Enrolment and tuition agreements", "Teacher and staff employment contracts", "Partnerships with training and accreditation bodies", "Transport, catering and support-service contracts", "Curriculum and content licences", "School and institute acquisition agreements"],
      risks: [
        { t: "Refunds on withdrawal", d: "A missing clause on refunds when a student withdraws or the school closes is one of the most common sources of disputes with parents." },
        { t: "Protecting minors' data", d: "Student and minor data is particularly sensitive; collecting, using and sharing it with third parties needs clear controls." },
        { t: "Licensing content and curricula", d: "Using another party's curriculum or training content without a written licence can expose the institution to intellectual-property claims." },
      ],
      faqs: [
        { q: "Can tuition fees be changed during the year?", a: "That is governed by the enrolment contract and the rules issued by the regulator. The starting point is to honour what was signed; any change needs a legal basis and clear notice." },
        { q: "What are the legal risks of hiring foreign teachers?", a: "They concern residency status, professional qualification, contracts and Saudisation ratios. We review the contracts and procedures before hiring so an administrative breach does not become a dispute." },
      ],
    },
  },

  healthcare: {
    ar: {
      regulators: [
        ["وزارة الصحة", "ترخيص المنشآت الصحية والرقابة عليها"],
        ["الهيئة العامة للغذاء والدواء", "تسجيل الأدوية والأجهزة الطبية والمستحضرات"],
        ["مجلس الضمان الصحي", "شركات التأمين الصحي ومقدمو الخدمة"],
        ["الهيئة السعودية للتخصصات الصحية", "تصنيف الممارسين الصحيين وتسجيلهم"],
        ["الهيئة السعودية للبيانات والذكاء الاصطناعي", "حماية البيانات الصحية"],
      ],
      contracts: ["عقود الأطباء والكوادر الصحية", "اتفاقيات شركات التأمين وشبكات مقدمي الخدمة", "عقود التوريد للأدوية والأجهزة الطبية", "عقود الوكالة والتوزيع", "عقود تشغيل المستشفيات والمراكز", "إقرارات المرضى والموافقة المستنيرة"],
      risks: [
        { t: "الخطأ الطبي وتوثيق الموافقة", d: "سلامة الملف الطبي وتوثيق الموافقة المستنيرة من أهم ما يُبنى عليه الدفاع في دعاوى المسؤولية الطبية." },
        { t: "مطالبات التأمين الصحي المرفوضة", d: "الخلاف مع شركات التأمين على الموافقات والمستحقات يتكرر، ومرجعه غالبًا نصوص الاتفاقية وإجراءات المطالبة والمدد." },
        { t: "تسجيل المنتجات وإعلانها", d: "تسويق دواء أو جهاز أو مستحضر قبل التسجيل أو بادعاءات غير معتمدة يعرّض للإيقاف والغرامات." },
      ],
      faqs: [
        { q: "متى تقوم المسؤولية الطبية للمنشأة؟", a: "تُبحث وقائع كل حالة: الخطأ المهني وعلاقته بالضرر، وتوثيق الإجراءات والموافقة. وتتولى جهات مختصة تقدير الجانب الفني، وتبقى صياغة الدفاع والإجراءات نظامية." },
        { q: "هل يمكن لمنشأة صحية مشاركة بيانات المرضى مع طرف آخر؟", a: "الأصل حماية خصوصية المريض، ولا تُشارك إلا في الحالات والضوابط التي يجيزها النظام. نراجع سياسة البيانات والعقود مع المعالجين الخارجيين." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Health", "Licensing and supervision of health facilities"],
        ["Saudi Food and Drug Authority", "Registration of drugs, medical devices and preparations"],
        ["Council of Health Insurance", "Health insurers and service providers"],
        ["Saudi Commission for Health Specialties", "Classification and registration of practitioners"],
        ["Saudi Data and AI Authority", "Protection of health data"],
      ],
      contracts: ["Physician and clinical-staff contracts", "Insurer agreements and provider-network terms", "Supply contracts for drugs and devices", "Agency and distribution agreements", "Hospital and clinic operating agreements", "Patient forms and informed consent"],
      risks: [
        { t: "Medical error and documented consent", d: "A sound medical file and documented informed consent are what a defence in a medical-liability claim is built on." },
        { t: "Rejected health-insurance claims", d: "Disputes with insurers over approvals and payments recur, and usually turn on the agreement's wording, claim procedure and time limits." },
        { t: "Registering and advertising products", d: "Marketing a drug, device or preparation before registration, or with unapproved claims, exposes the business to suspension and fines." },
      ],
      faqs: [
        { q: "When is a facility liable for medical error?", a: "Each case turns on its facts: the professional error and its link to the harm, and the documentation of the procedure and consent. The technical assessment is for the competent bodies; the defence and procedure remain legal work." },
        { q: "Can a health facility share patient data with a third party?", a: "The starting point is patient privacy; data is shared only in the cases and under the controls the law allows. We review the data policy and contracts with outside processors." },
      ],
    },
  },

  "sports-entertainment": {
    ar: {
      regulators: [
        ["وزارة الرياضة", "ترخيص الأندية والأكاديميات والأنشطة الرياضية"],
        ["الهيئة العامة للترفيه", "ترخيص الفعاليات والمنشآت الترفيهية"],
        ["الهيئة السعودية للملكية الفكرية", "حقوق المؤلف والعلامات والتراخيص"],
        ["الهيئة العامة لتنظيم الإعلام", "المحتوى الإعلامي والبث والإعلان"],
      ],
      contracts: ["عقود اللاعبين والمدربين والوكلاء", "عقود الرعاية والإعلان", "حقوق البث والنقل", "عقود تنظيم الفعاليات والتذاكر", "تراخيص العلامات والمنتجات المرخصة", "عقود المنشآت والمرافق"],
      risks: [
        { t: "بنود الفسخ والشرط الجزائي في عقود اللاعبين", d: "تحديد حالات الفسخ والتعويض ومدة العقد بوضوح يمنع نزاعات حادة بين الأندية واللاعبين ووكلائهم." },
        { t: "حقوق الصورة والعلامة", d: "استخدام اسم اللاعب أو صورته أو شعار النادي تجاريًا دون ترخيص مكتوب يفتح مطالبات ملكية فكرية." },
        { t: "سلامة الفعاليات والمسؤولية", d: "المسؤولية عن الإصابات وإلغاء الفعاليات وإعادة التذاكر تحتاج بنودًا وتأمينًا مناسبًا قبل الإعلان." },
      ],
      faqs: [
        { q: "هل يحق للاعب فسخ العقد من جانب واحد؟", a: "يُنظر في بنود العقد وأحكام النظام ولوائح الاتحاد المنظِّم. الفسخ دون سبب مشروع قد يرتب تعويضًا، ولذلك نوصي بدراسة العقد قبل أي خطوة." },
        { q: "ما الذي يلزم لتنظيم فعالية ترفيهية؟", a: "ترخيص من الجهة المختصة، وعقود مع الموقع والموردين والرعاة، وتأمين، وتنظيم للتذاكر وسياسة الاسترداد. نرتب العقود والتراخيص قبل فتح البيع." },
      ],
    },
    en: {
      regulators: [
        ["Ministry of Sport", "Licensing of clubs, academies and sporting activities"],
        ["General Entertainment Authority", "Licensing of events and entertainment venues"],
        ["Saudi Authority for Intellectual Property", "Copyright, trademarks and licences"],
        ["General Authority for Media Regulation", "Media content, broadcasting and advertising"],
      ],
      contracts: ["Player, coach and agent contracts", "Sponsorship and advertising agreements", "Broadcast and media rights", "Event organisation and ticketing terms", "Trademark and licensed-merchandise licences", "Venue and facility agreements"],
      risks: [
        { t: "Termination and penalty clauses in player contracts", d: "Defining termination events, compensation and term clearly prevents sharp disputes between clubs, players and their agents." },
        { t: "Image and brand rights", d: "Using a player's name or image, or a club's badge, commercially without a written licence invites intellectual-property claims." },
        { t: "Event safety and liability", d: "Liability for injuries, event cancellation and ticket refunds needs the right clauses and insurance before the event is announced." },
      ],
      faqs: [
        { q: "Can a player terminate unilaterally?", a: "The contract terms, the law and the governing federation's rules are examined. Termination without just cause may carry compensation, so we recommend studying the contract before any step." },
        { q: "What is needed to organise an entertainment event?", a: "A licence from the competent authority, contracts with the venue, suppliers and sponsors, insurance, and ticketing and refund terms. We arrange contracts and licences before sales open." },
      ],
    },
  },
};
