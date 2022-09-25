-- CreateTable
CREATE TABLE "UserDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastVisitedAt" DATETIME,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "profileImageId" TEXT,
    CONSTRAINT "UserDB_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "ImageDB" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

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

-- CreateTable
CREATE TABLE "ActivityDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "venueName" TEXT,
    "geoLocation" TEXT,
    "startsAt" DATETIME,
    "endsAt" DATETIME,
    "barrierFree" BOOLEAN,
    "public" BOOLEAN,
    "freeWifiAvailable" BOOLEAN,
    "toilettsAvailable" BOOLEAN,
    "hygienePolicy" TEXT,
    "kidsWelcome" BOOLEAN,
    "petsWelcome" BOOLEAN,
    "smokingAllowed" BOOLEAN,
    "imageId" TEXT,
    CONSTRAINT "ActivityDB_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "UserDB" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ActivityDB_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "ImageDB" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImageDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "ImageDB_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "UserDB" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDB_name_key" ON "UserDB"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserDB_profileImageId_key" ON "UserDB"("profileImageId");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipationDB_userId_activityId_key" ON "ParticipationDB"("userId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityDB_imageId_key" ON "ActivityDB"("imageId");
