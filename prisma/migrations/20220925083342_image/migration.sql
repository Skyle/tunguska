-- CreateTable
CREATE TABLE "ImageDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ActivityDB" (
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
INSERT INTO "new_ActivityDB" ("barrierFree", "createdAt", "createdById", "description", "endsAt", "freeWifiAvailable", "geoLocation", "hygienePolicy", "id", "kidsWelcome", "petsWelcome", "public", "startsAt", "title", "toilettsAvailable", "updatedAt", "venueName") SELECT "barrierFree", "createdAt", "createdById", "description", "endsAt", "freeWifiAvailable", "geoLocation", "hygienePolicy", "id", "kidsWelcome", "petsWelcome", "public", "startsAt", "title", "toilettsAvailable", "updatedAt", "venueName" FROM "ActivityDB";
DROP TABLE "ActivityDB";
ALTER TABLE "new_ActivityDB" RENAME TO "ActivityDB";
CREATE UNIQUE INDEX "ActivityDB_imageId_key" ON "ActivityDB"("imageId");
CREATE TABLE "new_UserDB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastVisitedAt" DATETIME,
    "imageId" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "UserDB_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "ImageDB" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserDB" ("createdAt", "id", "lastVisitedAt", "name", "password", "updatedAt") SELECT "createdAt", "id", "lastVisitedAt", "name", "password", "updatedAt" FROM "UserDB";
DROP TABLE "UserDB";
ALTER TABLE "new_UserDB" RENAME TO "UserDB";
CREATE UNIQUE INDEX "UserDB_name_key" ON "UserDB"("name");
CREATE UNIQUE INDEX "UserDB_imageId_key" ON "UserDB"("imageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
