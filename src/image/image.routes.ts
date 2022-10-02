import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { readFile } from "fs/promises";
import { prisma } from "..";

const imageRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify.route<{ Params: { imageName: string } }>({
    url: "/files/images/:imageName",
    method: "GET",
    handler: async (req, rep) => {
      try {
        const { imageName } = req.params;
        const [id] = imageName.split("_");
        const imageFromDB = await prisma.imageDB.findUnique({
          where: { id: id },
          include: { activity: true, user: true },
        });
        if (imageFromDB) {
          const stream = await readFile("./files/images/" + imageName);
          rep.send(stream);
        }
      } catch (error) {
        console.error("error", error);
        throw new Error("could not find image");
      }
    },
  });
};
export default fp(imageRoutes);
