import { MutationResolvers } from "../graphql/generated";
import * as argon2 from "argon2";
import { prisma } from "..";

export const signUp: MutationResolvers["signUp"] = async (
  root,
  { credentials },
  ctx
) => {
  const { name, password } = credentials;

  const hashedPassword = await argon2.hash(password);
  try {
    const newUser = await prisma.userDB.create({
      data: { name: name, password: hashedPassword },
    });
    const jwt = ctx.app.jwt.sign({ sub: newUser.id });
    console.log(new Date(), newUser.name, "signed up");
    return jwt;
  } catch (error) {
    console.error(error);
    throw new Error("User could not be created");
  }
};

export const signIn: MutationResolvers["signIn"] = async (
  root,
  { credentials },
  ctx
) => {
  const { name, password } = credentials;

  const user = await prisma.userDB.findUnique({
    where: { name: name },
  });
  if (!user) throw new Error("can not sign in");
  const passwordValid = await argon2.verify(user.password, password);
  if (!passwordValid) throw new Error("can not sign in");
  console.log(new Date(), user.name, "signed in");
  const jwt = ctx.app.jwt.sign({ sub: user.id });
  return jwt;
};
