import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
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
