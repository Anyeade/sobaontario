import { pgTable, text, timestamp, integer, boolean, decimal, uuid } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  yearOfEntry: integer("year_of_entry").notNull(),
  residentialAddress: text("residential_address").notNull(),
  telephoneNumber: text("telephone_number").notNull(),
  emailAddress: text("email_address").notNull().unique(),
  password: text("password"),
  potentialMembers: text("potential_members"),
  registrationFee: decimal("registration_fee", { precision: 10, scale: 2 }).default("100.00"),
  isPaid: boolean("is_paid").default(false),
  isActive: boolean("is_active").default(true),
  role: text("role").default("member"),
  profileImage: text("profile_image"),
  stripeCustomerId: text("stripe_customer_id"),
  emailVerified: timestamp("email_verified"),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => members.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  userId: uuid("user_id").notNull().references(() => members.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const donations = pgTable("donations", {
  id: uuid("id").defaultRandom().primaryKey(),
  donorName: text("donor_name"),
  donorEmail: text("donor_email"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("CAD"),
  message: text("message"),
  isAnonymous: boolean("is_anonymous").default(false),
  category: text("category").notNull(), // Sports & Recreation, Volunteer Programs, etc.
  paymentMethod: text("payment_method").default("card"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  status: text("status").default("pending"), // pending, completed, failed, refunded
  createdAt: timestamp("created_at").defaultNow(),
});

export const membershipTypes = pgTable("membership_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(), // in months
  benefits: text("benefits").notNull(), // JSON array of benefits
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: timestamp("event_date").notNull(),
  location: text("location"),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const news = pgTable("news", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  author: text("author"),
  category: text("category"),
  tags: text("tags"), // JSON array of tags
  featuredImage: text("featured_image"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const storeItems = pgTable("store_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url"),
  category: text("category"), // Coat of Arms, Ties, Shirts, etc.
  inStock: boolean("in_stock").default(true),
  stockQuantity: integer("stock_quantity").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const storeOrders = pgTable("store_orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  memberId: uuid("member_id").references(() => members.id),
  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name").notNull(),
  items: text("items").notNull(), // JSON array of items
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"), // pending, confirmed, shipped, delivered, cancelled
  paymentStatus: text("payment_status").default("pending"), // pending, paid, failed, refunded
  shippingAddress: text("shipping_address").notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  trackingNumber: text("tracking_number"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const volunteers = pgTable("volunteers", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  emailAddress: text("email_address").notNull(),
  telephoneNumber: text("telephone_number"),
  interests: text("interests").notNull(), // Areas of interest
  experience: text("experience"), // Previous volunteer experience
  availability: text("availability"), // When they're available
  status: text("status").default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const eventRegistrations = pgTable("event_registrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: text("event_id").notNull(), // We'll use string IDs since events are hardcoded
  eventTitle: text("event_title").notNull(),
  memberEmail: text("member_email").notNull(),
  memberName: text("member_name").notNull(),
  memberId: uuid("member_id").references(() => members.id),
  registrationDate: timestamp("registration_date").defaultNow(),
  status: text("status").default("interested"), // interested, confirmed, cancelled
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  emailAddress: text("email_address").notNull(),
  subject: text("subject").notNull(),
  phoneNumber: text("phone_number"),
  message: text("message").notNull(),
  consentGiven: boolean("consent_given").default(false),
  status: text("status").default("new"), // new, read, responded, closed
  adminNotes: text("admin_notes"),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}); 