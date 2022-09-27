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
  const { file } = await image;
  const { createReadStream } = file;
  const rs: ReadStream = createReadStream();
  const chunks = [];
  for await (let chunk of rs) {
    chunks.push(chunk);
  }
  const imageBuffer = Buffer.concat(chunks);
  const verifiedUser = await verifyUserOrThrow(ctx);

  try {
    const newImage = await prisma.imageDB.create({
      data: { createdBy: { connect: { id: verifiedUser.id } } },
    });

    await sharp(imageBuffer)
      .resize(1920, 1920, { fit: "inside" })
      .webp()
      .toFile(path.join(uploadsDir, newImage.id + "_large.webp"));

    await sharp(imageBuffer)
      .resize(1280, 1280, { fit: "inside" })
      .webp()
      .toFile(path.join(uploadsDir, newImage.id + "_normal.webp"));

    await sharp(imageBuffer)
      .resize(640, 640, { fit: "inside" })
      .webp()
      .toFile(path.join(uploadsDir, newImage.id + "_small.webp"));

    const updatedImage = await prisma.imageDB.update({
      where: { id: newImage.id },
      data: { uploadCompleted: true },
    });
    return updatedImage;
  } catch (error) {
    console.error(error);
    throw new Error("could not upload image");
  }
};
