import { prisma } from "..";
import { MutationResolvers } from "../graphql/generated";

export const uploadImage: MutationResolvers["uploadImage"] = async (
  root,
  args
) => {
  console.log(args.file);

  return "lol";
};
