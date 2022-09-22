import { MercuriusContext } from "mercurius";
import { prisma } from "..";

export async function userOrThrow(ctx: MercuriusContext) {
  const jwt = ctx.authorization?.split(" ")[1];
  if (!jwt) throw new Error("UNAUTHORIZED");
  try {
    const verifiedJWT: any = ctx.app.jwt.verify(jwt);
    if (verifiedJWT.sub) {
      const user = await prisma.userDB.findUnique({
        where: { id: verifiedJWT.sub },
      });
      if (!user) throw new Error("UNAUTHORIZED");
      return user;
    } else {
      throw new Error("UNAUTHORIZED");
    }
  } catch (error) {
    throw new Error("UNAUTHORIZED");
  }
}
