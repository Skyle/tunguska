import { MutationResolvers } from "../graphql/generated";
import * as argon2 from "argon2";
import { prisma } from "..";

export const signUp: MutationResolvers["signUp"] = async (
  root,
  { credentials },
  ctx
) => {
  const { name, password } = credentials;
  if (password.length < 6 || name === "" || name.length < 2)
    throw new Error("name or password are too short");
  const hashedPassword = await argon2.hash(password);
  try {
    const newUser = await prisma.userDB.create({
      data: { name: name, password: hashedPassword },
    });
    const jwt = ctx.app.jwt.sign({ sub: newUser.id });
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
  console.log(user?.name, " erstellt");
  if (!user) throw new Error("can not sign in");
  const passwordValid = await argon2.verify(user.password, password);
  if (!passwordValid) throw new Error("can not sign in");
  const jwt = ctx.app.jwt.sign({ sub: user.id });
  return jwt;
};
