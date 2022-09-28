import { PrismaClient, UserDB } from "@prisma/client";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import mercurius from "mercurius";
import mercuriusCodegen from "mercurius-codegen";
import MercuriusGQLUpload from "mercurius-upload";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { schema } from "./schema";
import { resolvers } from "./resolvers";
import { readFile } from "fs/promises";

export const prisma = new PrismaClient();

const app = Fastify();
app.register(cors);
app.register(jwt, {
  secret:
    "verynottopsecretpasswordjagarnichtsicherganzsicheraberdafuerlangundgutlesbarhaha",
});
app.register(MercuriusGQLUpload);

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
    user: null,
  };
};

app.route<{ Params: { imageName: string } }>({
  url: "/files/images/:imageName",
  method: "GET",
  handler: async (req, rep) => {
    try {
      const { imageName } = req.params;
      const [id] = imageName.split("_");
      const imageFromDB = await prisma.imageDB.findUnique({
        where: { id: id },
        include: { activity: true, user: true },
      });
      if (imageFromDB) {
        const stream = await readFile("./files/images/" + imageName);
        rep.send(stream);
      }
    } catch (error) {
      console.error("error", error);
      throw new Error("could not find image");
    }
  },
});

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
