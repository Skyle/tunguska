-- CreateTable
CREATE TABLE "CommentDB" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "CommentDB_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentDB" ADD CONSTRAINT "CommentDB_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "UserDB"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDB" ADD CONSTRAINT "CommentDB_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityDB"("id") ON DELETE CASCADE ON UPDATE CASCADE;
