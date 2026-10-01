import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { roleLabels } from "@/lib/auth/perms";
import { Badge, Card, PageHeader, Table, Td, Th, fmtDateTime } from "@/components/admin/ui";
import { CreateUserForm, ResetPasswordButton } from "@/components/admin/UserForms";
import { updateUserAction } from "@/lib/erp/user-actions";

export const metadata = { title: "المستخدمون" };

export default async function UsersPage() {
  const me = await requireStaff("users:manage");
  const d = await db();
  const rows = await d.select().from(users).orderBy(asc(users.createdAt));
  const btn = "rounded-lg border border-[#e3ddcb] px-2.5 py-1 text-xs font-semibold hover:border-[#d0a751]";

  return (
    <>
      <PageHeader title="المستخدمون والصلاحيات" sub="لكل محامٍ اسم مستخدم خاص به، وتُسجَّل كل عملية دخول وتعديل." />
      <Card title="إضافة مستخدم" className="mb-6"><CreateUserForm /></Card>
      <Card title={`الحسابات (${rows.length})`}>
        <Table>
          <thead><tr><Th>الاسم</Th><Th>المستخدم</Th><Th>الدور</Th><Th>الحالة</Th><Th>٢FA</Th><Th>آخر دخول</Th><Th>إجراءات</Th></tr></thead>
          <tbody>
            {rows.map((u) => {
              const locked = u.lockedUntil && u.lockedUntil > new Date();
              return (
                <tr key={u.id}>
                  <Td><p className="font-semibold">{u.fullName}</p><p className="text-xs text-ink-soft/60">{u.email ?? ""}</p></Td>
                  <Td className="font-mono text-xs" >{u.username}</Td>
                  <Td>
                    <form action={updateUserAction} className="flex items-center gap-1">
                      <input type="hidden" name="id" value={u.id} /><input type="hidden" name="intent" value="role" />
                      <select name="role" defaultValue={u.role} disabled={u.id === me.id} className="rounded-lg border border-[#e3ddcb] bg-white px-2 py-1 text-xs">
                        {Object.entries(roleLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                      </select>
                      {u.id !== me.id && <button className={btn}>حفظ</button>}
                    </form>
                  </Td>
                  <Td>{!u.isActive ? <Badge tone="red">موقوف</Badge> : locked ? <Badge tone="gold">مقفل</Badge> : <Badge tone="green">نشط</Badge>}</Td>
                  <Td>{u.totpEnabled ? <Badge tone="green">مفعّلة</Badge> : <Badge>لا</Badge>}</Td>
                  <Td className="whitespace-nowrap text-xs">{fmtDateTime(u.lastLoginAt)}</Td>
                  <Td>
                    <div className="flex flex-wrap items-start gap-1.5">
                      <ResetPasswordButton id={u.id} />
                      {locked && <form action={updateUserAction}><input type="hidden" name="id" value={u.id} /><input type="hidden" name="intent" value="unlock" /><button className={btn}>فك القفل</button></form>}
                      {u.totpEnabled && <form action={updateUserAction}><input type="hidden" name="id" value={u.id} /><input type="hidden" name="intent" value="reset2fa" /><button className={btn}>إعادة ضبط ٢FA</button></form>}
                      {u.id !== me.id && (
                        <form action={updateUserAction}>
                          <input type="hidden" name="id" value={u.id} />
                          <input type="hidden" name="intent" value={u.isActive ? "deactivate" : "activate"} />
                          <button className={btn}>{u.isActive ? "إيقاف" : "تفعيل"}</button>
                        </form>
                      )}
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
