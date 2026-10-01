import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const ROLES = ["admin", "partner", "lawyer", "paralegal", "accountant", "secretary"] as const;
export type Role = (typeof ROLES)[number];

const id = () => uuid("id").primaryKey().default(sql`gen_random_uuid()`);
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

export const users = pgTable(
  "users",
  {
    id: id(),
    username: text("username").notNull(),
    fullName: text("full_name").notNull(),
    email: text("email"),
    phone: text("phone"),
    role: text("role").$type<Role>().notNull().default("lawyer"),
    passwordHash: text("password_hash").notNull(),
    mustChangePassword: boolean("must_change_password").notNull().default(true),
    totpSecret: text("totp_secret"),
    totpEnabled: boolean("totp_enabled").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    failedLogins: integer("failed_logins").notNull().default(0),
    lockedUntil: timestamp("locked_until", { withTimezone: true }),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    hourlyRate: numeric("hourly_rate", { precision: 12, scale: 2 }),
    barNumber: text("bar_number"),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("users_username_uq").on(t.username)],
);

export const clients = pgTable(
  "clients",
  {
    id: id(),
    type: text("type").$type<"individual" | "company" | "institution">().notNull().default("individual"),
    name: text("name").notNull(),
    identifier: text("identifier"),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    city: text("city"),
    notes: text("notes"),
    archived: boolean("archived").notNull().default(false),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: createdAt(),
  },
  (t) => [index("clients_name_idx").on(t.name)],
);

export const clientContacts = pgTable("client_contacts", {
  id: id(),
  clientId: uuid("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  title: text("title"),
  email: text("email"),
  phone: text("phone"),
});

export const matters = pgTable(
  "matters",
  {
    id: id(),
    number: text("number").notNull(),
    title: text("title").notNull(),
    clientId: uuid("client_id").notNull().references(() => clients.id),
    practiceArea: text("practice_area"),
    matterType: text("matter_type"),
    court: text("court"),
    courtCaseNumber: text("court_case_number"),
    status: text("status").$type<"open" | "pending" | "on_hold" | "closed" | "archived">().notNull().default("open"),
    stage: text("stage"),
    openedOn: date("opened_on").notNull().default(sql`current_date`),
    closedOn: date("closed_on"),
    claimValue: numeric("claim_value", { precision: 16, scale: 2 }),
    description: text("description"),
    responsibleId: uuid("responsible_id").references(() => users.id),
    billingType: text("billing_type").$type<"hourly" | "fixed" | "retainer" | "contingency">().notNull().default("hourly"),
    fixedFee: numeric("fixed_fee", { precision: 16, scale: 2 }),
    hourlyRate: numeric("hourly_rate", { precision: 12, scale: 2 }),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("matters_number_uq").on(t.number), index("matters_client_idx").on(t.clientId)],
);

export const matterParties = pgTable(
  "matter_parties",
  {
    id: id(),
    matterId: uuid("matter_id").notNull().references(() => matters.id, { onDelete: "cascade" }),
    role: text("role").$type<"opposing" | "co_party" | "opposing_counsel" | "witness" | "other">().notNull().default("opposing"),
    name: text("name").notNull(),
    identifier: text("identifier"),
    notes: text("notes"),
  },
  (t) => [index("matter_parties_name_idx").on(t.name)],
);

export const matterTeam = pgTable(
  "matter_team",
  {
    matterId: uuid("matter_id").notNull().references(() => matters.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull().default("member"),
  },
  (t) => [uniqueIndex("matter_team_uq").on(t.matterId, t.userId)],
);

export const matterNotes = pgTable("matter_notes", {
  id: id(),
  matterId: uuid("matter_id").notNull().references(() => matters.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id),
  kind: text("kind").$type<"note" | "status" | "system">().notNull().default("note"),
  body: text("body").notNull(),
  visibleToClient: boolean("visible_to_client").notNull().default(false),
  createdAt: createdAt(),
});

export const events = pgTable(
  "events",
  {
    id: id(),
    matterId: uuid("matter_id").references(() => matters.id, { onDelete: "cascade" }),
    kind: text("kind").$type<"hearing" | "deadline" | "meeting" | "filing" | "other">().notNull().default("hearing"),
    title: text("title").notNull(),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    location: text("location"),
    status: text("status").$type<"scheduled" | "done" | "postponed" | "cancelled">().notNull().default("scheduled"),
    notes: text("notes"),
    assigneeId: uuid("assignee_id").references(() => users.id),
    remindDaysBefore: integer("remind_days_before").notNull().default(2),
    lastRemindedAt: timestamp("last_reminded_at", { withTimezone: true }),
    visibleToClient: boolean("visible_to_client").notNull().default(false),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: createdAt(),
  },
  (t) => [index("events_starts_idx").on(t.startsAt)],
);

export const tasks = pgTable(
  "tasks",
  {
    id: id(),
    matterId: uuid("matter_id").references(() => matters.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    assigneeId: uuid("assignee_id").references(() => users.id),
    createdBy: uuid("created_by").references(() => users.id),
    dueOn: date("due_on"),
    priority: text("priority").$type<"low" | "normal" | "high" | "urgent">().notNull().default("normal"),
    status: text("status").$type<"todo" | "doing" | "done">().notNull().default("todo"),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("tasks_assignee_idx").on(t.assigneeId)],
);

export const documents = pgTable(
  "documents",
  {
    id: id(),
    matterId: uuid("matter_id").references(() => matters.id, { onDelete: "cascade" }),
    clientId: uuid("client_id").references(() => clients.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    category: text("category").notNull().default("general"),
    mimeType: text("mime_type").notNull(),
    size: integer("size").notNull(),
    storageKind: text("storage_kind").$type<"local" | "blob" | "s3" | "s3e">().notNull(),
    storageKey: text("storage_key").notNull(),
    sharedWithClient: boolean("shared_with_client").notNull().default(false),
    uploadedBy: uuid("uploaded_by").references(() => users.id),
    createdAt: createdAt(),
  },
  (t) => [index("documents_matter_idx").on(t.matterId)],
);

export const docTemplates = pgTable("doc_templates", {
  id: id(),
  name: text("name").notNull(),
  category: text("category").notNull().default("general"),
  body: text("body").notNull(),
  createdBy: uuid("created_by").references(() => users.id),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const timeEntries = pgTable(
  "time_entries",
  {
    id: id(),
    matterId: uuid("matter_id").notNull().references(() => matters.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id),
    workedOn: date("worked_on").notNull().default(sql`current_date`),
    minutes: integer("minutes").notNull(),
    description: text("description").notNull(),
    billable: boolean("billable").notNull().default(true),
    rate: numeric("rate", { precision: 12, scale: 2 }),
    invoiceId: uuid("invoice_id"),
    createdAt: createdAt(),
  },
  (t) => [index("time_matter_idx").on(t.matterId), index("time_user_idx").on(t.userId)],
);

export const activeTimers = pgTable("active_timers", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  matterId: uuid("matter_id").notNull().references(() => matters.id, { onDelete: "cascade" }),
  description: text("description"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
});

export const expenses = pgTable("expenses", {
  id: id(),
  matterId: uuid("matter_id").notNull().references(() => matters.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id),
  spentOn: date("spent_on").notNull().default(sql`current_date`),
  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  category: text("category").notNull().default("other"),
  description: text("description").notNull(),
  billable: boolean("billable").notNull().default(true),
  invoiceId: uuid("invoice_id"),
  createdAt: createdAt(),
});

export const invoices = pgTable(
  "invoices",
  {
    id: id(),
    number: text("number").notNull(),
    clientId: uuid("client_id").notNull().references(() => clients.id),
    matterId: uuid("matter_id").references(() => matters.id),
    issuedOn: date("issued_on").notNull().default(sql`current_date`),
    dueOn: date("due_on"),
    status: text("status").$type<"draft" | "issued" | "partial" | "paid" | "void">().notNull().default("draft"),
    subtotal: numeric("subtotal", { precision: 16, scale: 2 }).notNull().default("0"),
    vatRate: numeric("vat_rate", { precision: 5, scale: 2 }).notNull().default("15"),
    vatAmount: numeric("vat_amount", { precision: 16, scale: 2 }).notNull().default("0"),
    total: numeric("total", { precision: 16, scale: 2 }).notNull().default("0"),
    notes: text("notes"),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("invoices_number_uq").on(t.number)],
);

export const invoiceItems = pgTable("invoice_items", {
  id: id(),
  invoiceId: uuid("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  quantity: numeric("quantity", { precision: 12, scale: 2 }).notNull().default("1"),
  unitPrice: numeric("unit_price", { precision: 14, scale: 2 }).notNull().default("0"),
  amount: numeric("amount", { precision: 16, scale: 2 }).notNull().default("0"),
  source: text("source").$type<"time" | "expense" | "manual">().notNull().default("manual"),
  sourceId: uuid("source_id"),
});

export const payments = pgTable("payments", {
  id: id(),
  invoiceId: uuid("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 16, scale: 2 }).notNull(),
  paidOn: date("paid_on").notNull().default(sql`current_date`),
  method: text("method").notNull().default("transfer"),
  reference: text("reference"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: createdAt(),
});

export const clientUsers = pgTable(
  "client_users",
  {
    id: id(),
    clientId: uuid("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
    username: text("username").notNull(),
    fullName: text("full_name").notNull(),
    email: text("email"),
    passwordHash: text("password_hash").notNull(),
    mustChangePassword: boolean("must_change_password").notNull().default(true),
    isActive: boolean("is_active").notNull().default(true),
    failedLogins: integer("failed_logins").notNull().default(0),
    lockedUntil: timestamp("locked_until", { withTimezone: true }),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("client_users_username_uq").on(t.username)],
);

export const messages = pgTable("messages", {
  id: id(),
  matterId: uuid("matter_id").notNull().references(() => matters.id, { onDelete: "cascade" }),
  fromKind: text("from_kind").$type<"staff" | "client">().notNull(),
  fromId: uuid("from_id").notNull(),
  body: text("body").notNull(),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: createdAt(),
});

export const sessions = pgTable(
  "sessions",
  {
    tokenHash: text("token_hash").primaryKey(),
    kind: text("kind").$type<"staff" | "client">().notNull(),
    subjectId: uuid("subject_id").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ip: text("ip"),
    userAgent: text("user_agent"),
    createdAt: createdAt(),
  },
  (t) => [index("sessions_subject_idx").on(t.subjectId)],
);

export const auditLog = pgTable(
  "audit_log",
  {
    id: id(),
    actorKind: text("actor_kind").notNull().default("staff"),
    actorId: uuid("actor_id"),
    actorName: text("actor_name"),
    action: text("action").notNull(),
    entityType: text("entity_type"),
    entityId: text("entity_id"),
    meta: jsonb("meta"),
    ip: text("ip"),
    createdAt: createdAt(),
  },
  (t) => [index("audit_created_idx").on(t.createdAt)],
);

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
});
