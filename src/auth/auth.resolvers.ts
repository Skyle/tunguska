import { MutationResolvers } from "../graphql/generated";
import * as argon2 from "argon2";
import { prisma } from "..";

export const signUp: MutationResolvers["signUp"] = async (parent, args) => {
  if (args.password.length < 6 || args.name === "" || args.name.length < 2)
    throw new Error("password oder name sind zu kurz");
  const hashedPassword = await argon2.hash(args.password);
  try {
    return await prisma.userDB.create({
      data: { name: args.name, password: hashedPassword },
    });
  } catch (error) {
    console.error(error);
    throw new Error("kann User nicht erstellen");
  }
};

export const signIn: MutationResolvers["signIn"] = async (
  parent,
  args,
  ctx
) => {
  const user = await prisma.userDB.findUnique({
    where: { name: args.name },
  });
  if (!user) throw new Error("kann signIn nicht durchführen");
  const passwordValid = await argon2.verify(user.password, args.password);
  if (!passwordValid) throw new Error("kann signIn nicht durchführen");
  const jwt = ctx.app.jwt.sign({ sub: user.id });
  return jwt;
};
