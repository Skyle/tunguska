import { prisma } from "..";
import { verifyUserOrThrow } from "../auth/auth.services";
import { CommentResolvers, MutationResolvers } from "../graphql/generated";

// Mutations
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

// Mutations
export const deleteComment: MutationResolvers["deleteComment"] = async (
  root,
  { id },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const comment = await prisma.commentDB.findUnique({
    where: { id },
    include: { createdBy: true },
  });
  if (!comment) {
    console.log(
      new Date(),
      verifiedUser.name,
      "tried to delete non-existing comment",
      id
    );
    throw new Error("Comment does not exist");
  }

  if (comment.createdBy.id === verifiedUser.id) {
    try {
      await prisma.commentDB.delete({ where: { id: comment.id } });
      console.log(new Date(), verifiedUser.name, "deleted comment", comment.id);
      return "Comment " + comment.id + " deleted";
    } catch (error) {
      console.error(error);
      throw new Error("Comment " + comment.id + " could not be deleted");
    }
  } else {
    console.error(
      verifiedUser.name,
      "tried and failed to delete comment",
      comment.id
    );
    throw new Error("Could cot delete foreign comment");
  }
};

// FieldResolvers

export const commentCreatedByFieldResolver: CommentResolvers["createdBy"] =
  async (root) => {
    console.log(root);

    const createdBy = await prisma.commentDB
      .findUnique({ where: { id: root.id } })
      .createdBy();

    if (!createdBy) throw new Error("Comment should have a creator");
    return createdBy;
  };

export const commentActivityFieldResolver: CommentResolvers["activity"] =
  async (root) => {
    const activity = await prisma.commentDB
      .findUnique({ where: { id: root.id } })
      .activity();

    if (!activity) throw new Error("Comment should have an activity");
    return activity;
  };
