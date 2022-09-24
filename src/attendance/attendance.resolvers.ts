// FieldResolvers

import { prisma } from "..";
import { AttendanceResolvers } from "../graphql/generated";

export const user: AttendanceResolvers["user"] = async (root) => {
  const user = await prisma.attendanceDB
    .findUnique({ where: { id: root.id } })
    .user();

  if (!user) throw new Error("Attendance should always have a user");
  return user;
};
