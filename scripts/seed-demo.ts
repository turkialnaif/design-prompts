import { db } from "../lib/db";
import { clientContacts, clientUsers, clients, docTemplates, events, expenses, matterNotes, matterParties, matterTeam, matters, tasks, timeEntries, users } from "../lib/db/schema";
import { hashPassword } from "../lib/auth/crypto";

async function main() {
  if (process.env.DATABASE_URL && !process.argv.includes("--force")) {
    console.error("Refusing to seed a real database. Use --force if you are sure.");
    process.exit(1);
  }
  const d = await db();
  const pw = await hashPassword("Demo-Pass-2026x");
  const mk = async (username: string, fullName: string, role: "partner" | "lawyer" | "paralegal" | "accountant" | "secretary", rate?: string) => {
    const [row] = await d.insert(users).values({ username, fullName, role, passwordHash: pw, mustChangePassword: false, hourlyRate: rate, email: `${username}@example.com` }).onConflictDoNothing().returning({ id: users.id });
    return row?.id;
  };
  const partner = await mk("partner.demo", "تركي النايف (تجريبي)", "partner", "1500");
  const lawyer = await mk("lawyer.demo", "محامٍ تجريبي", "lawyer", "800");
  await mk("paralegal.demo", "مساعد قانوني تجريبي", "paralegal", "300");
  await mk("accountant.demo", "محاسب تجريبي", "accountant");
  await mk("secretary.demo", "سكرتارية تجريبية", "secretary");
  if (!partner || !lawyer) {
    console.log("Demo users already exist.");
    process.exit(0);
  }

  const [c1] = await d.insert(clients).values({ type: "company", name: "شركة الأمل للتجارة (تجريبي)", identifier: "1010123456", email: "amal@example.com", phone: "0500000001", city: "الرياض" }).returning();
  const [c2] = await d.insert(clients).values({ type: "individual", name: "خالد بن سعد (تجريبي)", identifier: "1098765432", phone: "0500000002", city: "جدة" }).returning();
  await d.insert(clientContacts).values({ clientId: c1.id, name: "مدير الشؤون القانونية", title: "المدير", email: "legal@example.com" });
  await d.insert(clientUsers).values({ clientId: c1.id, username: "amal.client", fullName: "ممثل شركة الأمل", passwordHash: pw, mustChangePassword: false });

  const [m1] = await d.insert(matters).values({ number: `${new Date().getFullYear()}-0001`, title: "مطالبة مالية ضد شركة النور للمقاولات", clientId: c1.id, practiceArea: "التقاضي التجاري", matterType: "مطالبة مالية", court: "المحكمة التجارية", courtCaseNumber: "4512345678", claimValue: "850000", responsibleId: lawyer, billingType: "hourly", hourlyRate: "800", description: "مطالبة بمستحقات عقد توريد." }).returning();
  const [m2] = await d.insert(matters).values({ number: `${new Date().getFullYear()}-0002`, title: "مراجعة عقد امتياز تجاري", clientId: c1.id, practiceArea: "الامتياز التجاري", responsibleId: partner, billingType: "fixed", fixedFee: "25000" }).returning();
  const [m3] = await d.insert(matters).values({ number: `${new Date().getFullYear()}-0003`, title: "إنهاء علاقة عمل ومستحقات", clientId: c2.id, practiceArea: "العمل والعمال", court: "المحكمة العمالية", responsibleId: lawyer }).returning();
  await d.insert(matterTeam).values([{ matterId: m1.id, userId: lawyer, role: "lead" }, { matterId: m1.id, userId: partner }, { matterId: m2.id, userId: partner, role: "lead" }, { matterId: m3.id, userId: lawyer, role: "lead" }]);
  await d.insert(matterParties).values([{ matterId: m1.id, role: "opposing", name: "شركة النور للمقاولات", identifier: "1010999888" }, { matterId: m3.id, role: "opposing", name: "شركة الأمل للتجارة" }]);
  await d.insert(matterNotes).values([{ matterId: m1.id, userId: lawyer, kind: "note", body: "تم استلام المستندات من العميل وجارٍ إعداد لائحة الدعوى.", visibleToClient: true }]);

  const day = (n: number, h = 10) => { const x = new Date(); x.setDate(x.getDate() + n); x.setHours(h, 0, 0, 0); return x; };
  await d.insert(events).values([
    { matterId: m1.id, kind: "hearing", title: "جلسة مرافعة أولى", startsAt: day(3), location: "المحكمة التجارية - الدائرة ٥", assigneeId: lawyer, visibleToClient: true },
    { matterId: m1.id, kind: "deadline", title: "آخر موعد لتقديم المذكرة الجوابية", startsAt: day(6, 15), assigneeId: lawyer },
    { matterId: m3.id, kind: "meeting", title: "اجتماع مع العميل", startsAt: day(1, 12), assigneeId: lawyer },
  ]);
  await d.insert(tasks).values([
    { matterId: m1.id, title: "إعداد لائحة الدعوى", assigneeId: lawyer, dueOn: day(2).toISOString().slice(0, 10), priority: "high" },
    { matterId: m1.id, title: "جمع كشوف الحساب من العميل", assigneeId: lawyer, dueOn: day(-1).toISOString().slice(0, 10), priority: "urgent" },
    { matterId: m2.id, title: "مراجعة بنود الحصرية", assigneeId: partner, dueOn: day(5).toISOString().slice(0, 10) },
  ]);
  await d.insert(timeEntries).values([
    { matterId: m1.id, userId: lawyer, minutes: 150, description: "دراسة المستندات وإعداد اللائحة", rate: "800" },
    { matterId: m1.id, userId: partner, minutes: 60, description: "مراجعة الاستراتيجية", rate: "1500" },
    { matterId: m3.id, userId: lawyer, minutes: 90, description: "اجتماع وتحليل العقد", rate: "800" },
  ]);
  await d.insert(expenses).values({ matterId: m1.id, userId: lawyer, amount: "300", category: "fees", description: "رسوم قيد الدعوى" });
  await d.insert(docTemplates).values([
    { name: "خطاب مطالبة ودية", category: "correspondence", body: "# خطاب مطالبة\n\nالتاريخ: {{date}} م الموافق {{hijri_date}}\n\nإلى: {{opposing}}\n\nالموضوع: مطالبة مالية — {{matter.title}}\n\nتحية طيبة، وبعد:\n\nنحن {{firm.name}}، وكلاء {{client.name}} (هوية/سجل: {{client.identifier}}) في المسألة المشار إليها.\n\nنطالبكم بسداد المبلغ المستحق ({{matter.claimValue}} ريال) خلال مهلة ______ من تاريخ استلام هذا الخطاب، وإلا اضطررنا إلى اتخاذ الإجراءات النظامية اللازمة.\n\nوتفضلوا بقبول فائق التحية والتقدير،\n\n{{lawyer.name}}\n{{firm.name}}\n{{firm.phone}}" },
    { name: "اتفاقية أتعاب (مسودة للمراجعة)", category: "contract", body: "# اتفاقية أتعاب\n\nأُبرمت هذه الاتفاقية بتاريخ {{date}} بين:\n\n## الطرف الأول\n{{firm.name}}، رخصة رقم {{firm.licenseNumber}}، وعنوانه {{firm.address}}.\n\n## الطرف الثاني\n{{client.name}}، هوية/سجل: {{client.identifier}}، وعنوانه {{client.address}}.\n\n## موضوع التكليف\n{{matter.title}} — رقم القضية {{matter.number}}.\n\n## الأتعاب\n______\n\n## أحكام أخرى\n______\n\nالطرف الأول: ______      الطرف الثاني: ______" },
    { name: "مذكرة جوابية (هيكل)", category: "pleading", body: "# مذكرة جوابية\n\nالمحكمة: {{matter.court}}\nرقم الدعوى: {{matter.courtCaseNumber}}\nالمدعى عليه (موكلنا): {{client.name}}\nالمدعي: {{opposing}}\n\n## أولًا: الوقائع\n______\n\n## ثانيًا: الدفوع\n______\n\n## ثالثًا: الطلبات\n______\n\n{{lawyer.name}}\nرقم الترخيص: {{lawyer.barNumber}}" },
  ]);
  console.log("Demo data created. Logins (password Demo-Pass-2026x): partner.demo, lawyer.demo, paralegal.demo, accountant.demo, secretary.demo; portal: amal.client");
  process.exit(0);
}
main();
