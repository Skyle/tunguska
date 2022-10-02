import { prisma } from "..";
import { verifyUserOrThrow } from "../auth/auth.services";
import { MutationResolvers } from "../graphql/generated";

// Queries
export const createComment: MutationResolvers["createComment"] = async (
  root,
  { text, activityId },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const activity = await prisma.activityDB.findUnique({
    where: { id: activityId },
  });
  if (!activity) {
    throw new Error("Activity does not exist");
  }
  const newComment = await prisma.commentDB.create({
    data: {
      text: text,
      createdBy: { connect: { id: verifiedUser.id } },
      activity: { connect: { id: activity.id } },
    },
  });
  console.log(new Date(), verifiedUser.name, "created comment", newComment.id);
  return newComment;
};
