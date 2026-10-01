import type { Role } from "@/lib/db/schema";

export type Cap =
  | "clients:read" | "clients:write"
  | "matters:read" | "matters:write" | "matters:all"
  | "events:write" | "tasks:write"
  | "docs:read" | "docs:write"
  | "time:write" | "expenses:write"
  | "billing:read" | "billing:write"
  | "templates:write"
  | "reports:read" | "reports:firm"
  | "users:manage" | "settings:manage" | "audit:read" | "portal:manage" | "export:data";

const ALL: Cap[] = [
  "clients:read", "clients:write", "matters:read", "matters:write", "matters:all", "events:write", "tasks:write",
  "docs:read", "docs:write", "time:write", "expenses:write", "billing:read", "billing:write", "templates:write",
  "reports:read", "reports:firm", "users:manage", "settings:manage", "audit:read", "portal:manage", "export:data",
];

const MATRIX: Record<Role, Cap[]> = {
  admin: ALL,
  partner: ALL.filter((c) => !["users:manage", "settings:manage"].includes(c)),
  lawyer: [
    "clients:read", "clients:write", "matters:read", "matters:write", "events:write", "tasks:write",
    "docs:read", "docs:write", "time:write", "expenses:write", "templates:write", "reports:read", "portal:manage",
  ],
  paralegal: ["clients:read", "matters:read", "events:write", "tasks:write", "docs:read", "docs:write", "time:write", "expenses:write"],
  accountant: ["clients:read", "matters:read", "matters:all", "billing:read", "billing:write", "expenses:write", "reports:read", "reports:firm"],
  secretary: ["clients:read", "clients:write", "matters:read", "events:write", "tasks:write", "docs:read", "docs:write"],
};

export const can = (role: Role, cap: Cap) => MATRIX[role].includes(cap);

export const roleLabels: Record<Role, string> = {
  admin: "مدير النظام",
  partner: "شريك",
  lawyer: "محامٍ",
  paralegal: "مساعد قانوني",
  accountant: "محاسب",
  secretary: "سكرتارية",
};

/** يرى الملفات كلها: من يملك matters:all */
export const seesAllMatters = (role: Role) => can(role, "matters:all");
