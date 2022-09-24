/*
  Warnings:

  - You are about to drop the `AttendanceDB` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AttendanceDB";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ParticipationDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    CONSTRAINT "ParticipationDB_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDB" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ParticipationDB_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityDB" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipationDB_userId_activityId_key" ON "ParticipationDB"("userId", "activityId");
