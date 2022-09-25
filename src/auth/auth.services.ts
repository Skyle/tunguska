import { FastifyJWT } from "@fastify/jwt";
import { UserDB } from "@prisma/client";
import { MercuriusContext } from "mercurius";
import { prisma } from "..";

async function updateLastVisited(user: UserDB) {
  await prisma.userDB.update({
    where: { id: user.id },
    data: { lastVisitedAt: new Date() },
  });
}

export async function verifyUserOrThrow(ctx: MercuriusContext) {
  const jwt = ctx.authorization?.split(" ")[1];
  if (jwt) {
    return await tokenToUser(jwt, ctx);
  } else {
    throw new Error("UNAUTHORIZED");
  }
}

export async function verifyUser(
  ctx: MercuriusContext
): Promise<UserDB | null> {
  const jwt = ctx.authorization?.split(" ")[1];
  if (jwt) {
    return await tokenToUser(jwt, ctx);
  } else {
    return null;
  }
}

export async function tokenToUser(
  jwt: string,
  ctx: MercuriusContext
): Promise<UserDB> {
  try {
    const verifiedJWT: FastifyJWT["payload"] = ctx.app.jwt.verify(jwt);
    if (verifiedJWT.sub) {
      const user = await prisma.userDB.findUnique({
        where: { id: verifiedJWT.sub },
      });
      if (!user) throw new Error("UNAUTHORIZED");
      updateLastVisited(user);
      ctx.user = user;
      return user;
    } else {
      throw new Error("UNAUTHORIZED");
    }
  } catch (error) {
    throw new Error("UNAUTHORIZED");
  }
}
