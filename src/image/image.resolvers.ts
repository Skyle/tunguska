import { createWriteStream } from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { prisma } from "..";
import { MutationResolvers } from "../graphql/generated";

const uploadsDir = path.resolve("./files/images");

export const uploadImage: MutationResolvers["uploadImage"] = async (
  root,
  { image }
) => {
  try {
    console.log(image);
    const { file } = await image;
    const { filename, createReadStream } = file;
    const rs = createReadStream();
    const ws = createWriteStream(path.join(uploadsDir, filename));
    await pipeline(rs, ws);
    const newImage = await prisma.imageDB.create({ data: {} });
    console.log("newImage", newImage);
    return "lol";
  } catch (error) {
    console.error(error);
    return "error";
  }
};
