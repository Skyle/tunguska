-- CreateTable
CREATE TABLE "UserDB" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastVisitedAt" TIMESTAMP(3),

    CONSTRAINT "UserDB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipationDB" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "ParticipationDB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityDB" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "venueName" TEXT,
    "geoLocation" TEXT,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "barrierFree" BOOLEAN,
    "public" BOOLEAN,
    "freeWifiAvailable" BOOLEAN,
    "toilettsAvailable" BOOLEAN,
    "hygienePolicy" TEXT,
    "kidsWelcome" BOOLEAN,
    "petsWelcome" BOOLEAN,

    CONSTRAINT "ActivityDB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDB_name_key" ON "UserDB"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipationDB_userId_activityId_key" ON "ParticipationDB"("userId", "activityId");

-- AddForeignKey
ALTER TABLE "ParticipationDB" ADD CONSTRAINT "ParticipationDB_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDB"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipationDB" ADD CONSTRAINT "ParticipationDB_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityDB"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityDB" ADD CONSTRAINT "ActivityDB_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "UserDB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
