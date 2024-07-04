import { db } from '../drizzle/db';
import { UserTable } from '../drizzle/schemas/Users'
import { eq } from 'drizzle-orm'
import bcrypt from "bcrypt"

const salt = bcrypt.genSaltSync(10)

interface loginData {
  username: string;
  password: string;
}

class UserRepositories {
  async registerUser({ username, password }: loginData): Promise<void> {
    try {
      await db.insert(UserTable).values({
        name: username,
        password: bcrypt.hashSync(password, salt)
      })
    } catch (err) {
      console.log(err)
    }
  }

  async validateInfo({ username, password }: loginData) {
    const userData = await db.query.UserTable.findFirst({
      where: eq(UserTable.name, username)
    })
    if (!userData) throw new Error("User not found")
    const passOk = bcrypt.compareSync(password, userData.password)

    if (!passOk) {
      throw new Error("invalid credentials")
    }

    return userData
  }
}

export { UserRepositories }
