import 'dotenv/config';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import jwt from 'jsonwebtoken';

import { RegistrationRepositories } from './repositories/RegistrationRepositories';
import fastifyCors from '@fastify/cors';
import { UserRepositories } from './repositories/UserRepositories';
import randomstring from "randomstring"
import { CodeRepositories } from './repositories/CodeRepositories';

const app = Fastify({
  logger: true
});

app.register(cors);
// const applyCors = async () => {
//   await app.register(cors, {
//     origin: 'localhost:5431'
//   });
// };

app.register(fastifyCookie);

interface IRegistration {
  matricula: number;
}

interface loginData {
  username: string;
  password: string;
}

interface AuthenticatedRequest extends FastifyRequest {
  cookies: {
    token?: string;
  };
}

interface createCodeRequest {
  discipline: string
  class_id: string
}

const registrationRepositories = new RegistrationRepositories();
const userRepositories = new UserRepositories();
const codeRepositories = new CodeRepositories();

const secret = process.env.SECRET_KEY;

app.post<{ Body: loginData }>('/register', async (request, reply) => {
  const { username, password } = request.body;

  await userRepositories.registerUser({
    username,
    password
  });

  return reply.status(201).send();
});

app.post(
  '/login',
  async (request: FastifyRequest<{ Body: loginData }>, reply) => {
    const { username, password } = request.body;

    const userData = await userRepositories.validateInfo({
      username,
      password
    });

    const token = jwt.sign({ username, id: userData.id }, String(secret));

    reply
      .setCookie('token', token, {
        path: '/',
        httpOnly: true
      })
      .send({
        id: userData.id,
        username
      });
  }
);

app.post('/logout', (request, reply) => {
  reply.cookie('token', '').send();
});

// Declare a route
app.get('/portugues', async () => {
  console.log(process.env.SECRET_KEY);
  const allRegistrations = await registrationRepositories.listRegistrations();

  return allRegistrations;
});

app.post<{ Body: IRegistration }>('/portugues', async (request, reply) => {
  const { matricula } = request.body;

  try {
    await registrationRepositories.insertRegistrations(matricula);
  } catch (err) {
    console.error(err);
    reply.status(400).send('error while inserting a new registration!');
  } finally {
    reply.status(201).send('inserted!');
  }
});

app.patch<{ Body: IRegistration }>('/portugues', async (request, reply) => {
  const { matricula } = request.body;

  try {
    await registrationRepositories.confirmateDayliPresence(matricula);
  } catch (err) {
    console.error(err);
    reply.status(400).send();
  } finally {
    reply.status(200).send();
  }
});

app.patch(
  '/portugues/salvar',
  async (request: AuthenticatedRequest, reply: FastifyReply) => {
    const { token } = request.cookies;

    if (!token) {
      return reply.status(401).send({ message: 'Missing authorization' });
    }

    const splitToken = token.split(' ');

    if (!splitToken) {
      return reply.status(401).send({ message: 'missing token' });
    }

    try {
      const decoded = jwt.verify(token, String(secret));

      if (decoded) {
        await registrationRepositories.savePresences();
      }
    } catch (err) {
      reply.status(400).send();
    } finally {
      reply.status(200).send();
    }
  }
);

app.delete<{ Body: IRegistration }>('/portugues', async (request, reply) => {
  const { matricula } = request.body;
  await registrationRepositories.deleteRegistration(matricula);
  return reply.status(200).send();
});

app.post<{ Body: createCodeRequest }>("/code", async (request, reply) => { // indexpage uses this
  const { discipline, class_id } = request.body

  const { code } = await codeRepositories.create(discipline, class_id)

  return code
})

app.post<{ Body: createCodeRequest }>("/listcode", async (request, reply) => { // app of routes makes the get to only get code
  const { discipline, class_id } = request.body

  const { getCode } = await codeRepositories.listUsingParams(discipline, class_id)

  return {
    getCode,
  }
})

// Run the server!
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
