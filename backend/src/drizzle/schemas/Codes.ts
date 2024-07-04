import { randomUUID } from 'crypto';
import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const CodesTable = pgTable('codes', {
  code_id: uuid('code_id').primaryKey().defaultRandom(),
  code: varchar('code'),
  discipline: varchar('discipline').notNull(),
  class_id: uuid('class_id').notNull() // id da turma
});
