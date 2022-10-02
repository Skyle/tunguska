/*
  Warnings:

  - A unique constraint covering the columns `[towardsId,byId]` on the table `FollowDB` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FollowDB_towardsId_byId_key" ON "FollowDB"("towardsId", "byId");
