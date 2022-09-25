/*
  Warnings:

  - Made the column `uploadCompleted` on table `ImageDB` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ImageDB" ALTER COLUMN "uploadCompleted" SET NOT NULL;
