-- DropForeignKey
ALTER TABLE "ActivityDB" DROP CONSTRAINT "ActivityDB_createdById_fkey";

-- DropForeignKey
ALTER TABLE "FollowDB" DROP CONSTRAINT "FollowDB_byId_fkey";

-- DropForeignKey
ALTER TABLE "FollowDB" DROP CONSTRAINT "FollowDB_towardsId_fkey";

-- DropForeignKey
ALTER TABLE "ImageDB" DROP CONSTRAINT "ImageDB_createdById_fkey";

-- AddForeignKey
ALTER TABLE "ActivityDB" ADD CONSTRAINT "ActivityDB_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "UserDB"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageDB" ADD CONSTRAINT "ImageDB_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "UserDB"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowDB" ADD CONSTRAINT "FollowDB_towardsId_fkey" FOREIGN KEY ("towardsId") REFERENCES "UserDB"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowDB" ADD CONSTRAINT "FollowDB_byId_fkey" FOREIGN KEY ("byId") REFERENCES "UserDB"("id") ON DELETE CASCADE ON UPDATE CASCADE;
