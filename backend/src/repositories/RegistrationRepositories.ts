import { db } from '../drizzle/db';
import { and, eq } from 'drizzle-orm';
import { RegistrationPortuguese } from '../drizzle/schemas/RegistrationPortuguese';

class RegistrationRepositories {
  async listRegistrations() {
    const registrations = await db.query.RegistrationPortuguese.findMany();

    return registrations;
  }

  async insertRegistrations(matricula: number) {
    await db.insert(RegistrationPortuguese).values({
      matricula: matricula
    });
  }

  async confirmateDayliPresence(matricula: number) {
    await db
      .update(RegistrationPortuguese)
      .set({
        presencaDiaria: true
      })
      .where(eq(RegistrationPortuguese.matricula, matricula));
  }

  async savePresences() {
    const alunos = await db.select().from(RegistrationPortuguese);

    console.log(alunos);

    alunos.forEach(async (aluno) => {
      if (!aluno.faltas) {
        aluno.faltas = 0;
      }

      if (!aluno.presencaDiaria) {
        aluno.presencaDiaria = false;
      }
      await db
        .update(RegistrationPortuguese)
        .set({ faltas: aluno.faltas + 1 })
        .where(
          and(
            eq(RegistrationPortuguese.matricula, aluno.matricula),
            eq(RegistrationPortuguese.presencaDiaria, false)
          )
        );

      await db.update(RegistrationPortuguese).set({
        presencaDiaria: false
      });
    });
  }

  async deleteRegistration(matricula: number) {
    await db
      .delete(RegistrationPortuguese)
      .where(eq(RegistrationPortuguese.matricula, matricula));
  }
}

export { RegistrationRepositories };
