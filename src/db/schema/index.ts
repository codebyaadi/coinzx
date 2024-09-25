import { relations } from "drizzle-orm";
import { numeric, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const OAuthProviderEnum = pgEnum("oauth_providers", ["google"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  profileImg: varchar("profile_img", { length: 1023 }),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  oauth_provider: OAuthProviderEnum("oauth_provider").notNull(),
  oauth_id: varchar("oauth_id", { length: 255 }).default("")
});

export const inrWallets = pgTable("inr_wallets", {
  id: uuid("id").primaryKey().defaultRandom(),
  balance: numeric("balance", { precision: 12, scale: 2 }),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
});

export const solWallets = pgTable("sol_wallets", {
  id: uuid("id").primaryKey().defaultRandom(),
  publicKey: varchar("public_key", { length: 255 }).notNull(),
  privateKey: varchar("private_key", { length: 255 }).notNull(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
});

export const usersRelations = relations(users, ({ one }) => ({
  inrWallet: one(inrWallets, {
    fields: [users.id],
    references: [inrWallets.userId],
  }),
  solWallet: one(solWallets, {
    fields: [users.id],
    references: [solWallets.userId],
  }),
}));

export const solWalletsRelations = relations(solWallets, ({ one }) => ({
  user: one(users, {
    fields: [solWallets.userId],
    references: [users.id],
  }),
}));

export const inrWalletsRelations = relations(inrWallets, ({ one }) => ({
  user: one(users, {
    fields: [inrWallets.userId],
    references: [users.id],
  }),
}));
