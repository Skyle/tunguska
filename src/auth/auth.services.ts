import { FastifyJWT } from "@fastify/jwt";
import { MercuriusContext } from "mercurius";
import { prisma } from "..";

export async function userOrThrow(ctx: MercuriusContext) {
  const jwt = ctx.authorization?.split(" ")[1];
  if (!jwt) throw new Error("UNAUTHORIZED");
  try {
    const verifiedJWT: FastifyJWT["payload"] = ctx.app.jwt.verify(jwt);
    if (verifiedJWT.sub) {
      const user = await prisma.userDB.findUnique({
        where: { id: verifiedJWT.sub },
      });
      if (!user) throw new Error("UNAUTHORIZED");
      await prisma.userDB.update({
        where: { id: user.id },
        data: { lastVisitedAt: new Date() },
      });
      ctx.user = user;
      return user;
    } else {
      throw new Error("UNAUTHORIZED");
    }
  } catch (error) {
    throw new Error("UNAUTHORIZED");
  }
}
