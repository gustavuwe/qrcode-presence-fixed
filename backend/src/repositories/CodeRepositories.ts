import { and, eq } from 'drizzle-orm';
import { db } from '../drizzle/db';
import { CodesTable } from '../drizzle/schemas';
import randomstring from 'randomstring'
import { stringify } from 'querystring';

class CodeRepositories {
  async create(discipline: string, class_id: string) {
    let code = ""
    try {
      const alreadyHaveOneUp = await db.select().from(CodesTable).where(and(eq(CodesTable.discipline, discipline), eq(CodesTable.class_id, class_id)))

      if (alreadyHaveOneUp) {
        await db.delete(CodesTable).where(and(eq(CodesTable.discipline, discipline), eq(CodesTable.class_id, class_id)))
      }

      code = randomstring.generate(10)
      await db.insert(CodesTable).values({
        code: code,
        discipline: "portugues", // TODO: fix me (add dynamic system to fix it by getting discipline by params)
        class_id: "2e7b239f-f0e6-4ad2-99ca-90b0871b1fb2" // TODO: fix me (add dynamic system to fix it by getting class_id by params)
      })
    } catch (err) {
      console.log(err)
      throw new Error("An error have ocurred")
    }

    return {
      code,
    }
  }

  async listUsingParams(discipline: string, class_id: string) {
    const getCode = await db.select().from(CodesTable).where(and(eq(CodesTable.discipline, discipline), eq(CodesTable.class_id, class_id)))

    return {
      getCode,
    }
  }
}

export {  CodeRepositories }
