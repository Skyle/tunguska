import { createWriteStream, ReadStream } from "fs";
import path from "path";
import { prisma } from "..";
import { verifyUserOrThrow } from "../auth/auth.services";
import { MutationResolvers } from "../graphql/generated";
import sharp from "sharp";

const uploadsDir = path.resolve("./files/images");
export const uploadImage: MutationResolvers["uploadImage"] = async (
  root,
  { image },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const { file } = await image;
  const { createReadStream } = file;
  const rs: ReadStream = createReadStream();

  try {
    const resizer = sharp().resize(1920, 1920, { fit: "inside" }).webp();
    const newImage = await prisma.imageDB.create({
      data: { createdBy: { connect: { id: verifiedUser.id } } },
    });
    const ws = createWriteStream(
      path.join(uploadsDir, newImage.id + "_large.webp")
    );
    rs.pipe(resizer)
      .pipe(ws)
      .on("finish", async () => {
        await prisma.imageDB.update({
          where: { id: newImage.id },
          data: { uploadCompleted: true },
        });
      });
    return newImage;
  } catch (error) {
    console.error(error);
    rs.destroy();
    throw new Error("could not upload image");
  }
};
