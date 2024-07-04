import { pgTable, bigint, integer, boolean } from 'drizzle-orm/pg-core';

export const RegistrationPortuguese = pgTable('portugues', {
  matricula: bigint('matricula', { mode: 'number' }).primaryKey().unique(),
  faltas: integer('faltas').default(0),
  presencaDiaria: boolean('presencaDiaria').default(false) // 0 para não-presente e 1 para presente
});
