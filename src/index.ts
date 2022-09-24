import { PrismaClient, UserDB } from "@prisma/client";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import mercurius from "mercurius";
import mercuriusCodegen from "mercurius-codegen";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { schema } from "./schema";
import { resolvers } from "./resolvers";

export const prisma = new PrismaClient();

const app = Fastify();
app.register(cors);
app.register(jwt, {
  secret:
    "verynottopsecretpasswordjagarnichtsicherganzsicheraberdafuerlangundgutlesbarhaha",
});

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
    user: null,
  };
};

app.register(mercurius, {
  schema: schema,
  resolvers: resolvers,
  graphiql: true,
  context: buildContext,
});

mercuriusCodegen(app, {
  targetPath: "./src/graphql/generated.ts",
  codegenConfig: {
    scalars: {
      DateTime: "Date",
      JWT: "string",
    },
  },
}).catch(console.error);

app.listen({ port: 5022 }).then(() => {
  console.log("server started");
});

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module "mercurius" {
  interface MercuriusContext
    extends PromiseType<ReturnType<typeof buildContext>> {
    user: null | UserDB;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string };
  }
}
