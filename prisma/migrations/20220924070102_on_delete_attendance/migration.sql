-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AttendanceDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    CONSTRAINT "AttendanceDB_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDB" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AttendanceDB_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityDB" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AttendanceDB" ("activityId", "createdAt", "id", "updatedAt", "userId") SELECT "activityId", "createdAt", "id", "updatedAt", "userId" FROM "AttendanceDB";
DROP TABLE "AttendanceDB";
ALTER TABLE "new_AttendanceDB" RENAME TO "AttendanceDB";
CREATE UNIQUE INDEX "AttendanceDB_userId_activityId_key" ON "AttendanceDB"("userId", "activityId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
