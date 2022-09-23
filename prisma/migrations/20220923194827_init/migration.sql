-- CreateTable
CREATE TABLE "UserDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastVisitedAt" DATETIME
);

-- CreateTable
CREATE TABLE "ActivityAttendanceDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    CONSTRAINT "ActivityAttendanceDB_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDB" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ActivityAttendanceDB_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityDB" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActivityDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "venue" TEXT,
    "geoLocation" TEXT,
    "startsAt" DATETIME,
    "endsAt" DATETIME,
    "barrierfree" BOOLEAN,
    "public" BOOLEAN,
    CONSTRAINT "ActivityDB_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "UserDB" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDB_name_key" ON "UserDB"("name");
