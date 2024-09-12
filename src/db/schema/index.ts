import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull()
})
