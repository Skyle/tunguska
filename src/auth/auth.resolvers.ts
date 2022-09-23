import { MutationResolvers } from "../graphql/generated";
import * as argon2 from "argon2";
import { prisma } from "..";

export const signUp: MutationResolvers["signUp"] = async (
  parent,
  { credentials }
) => {
  const { name, password } = credentials;
  if (password.length < 6 || name === "" || name.length < 2)
    throw new Error("password oder name sind zu kurz");
  const hashedPassword = await argon2.hash(password);
  try {
    return await prisma.userDB.create({
      data: { name: name, password: hashedPassword },
    });
  } catch (error) {
    console.error(error);
    throw new Error("kann User nicht erstellen");
  }
};

export const signIn: MutationResolvers["signIn"] = async (
  parent,
  { credentials },
  ctx
) => {
  const { name, password } = credentials;

  const user = await prisma.userDB.findUnique({
    where: { name: name },
  });
  if (!user) throw new Error("kann signIn nicht durchführen");
  const passwordValid = await argon2.verify(user.password, password);
  if (!passwordValid) throw new Error("kann signIn nicht durchführen");
  const jwt = ctx.app.jwt.sign({ sub: user.id });
  return jwt;
};
