import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  password: varchar('password').notNull()
  // role: text("role").$type<"admin" | "customer">(),
  // createdAt: timestamp('created_at'),
});
