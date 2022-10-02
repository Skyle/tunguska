/*
  Warnings:

  - Made the column `text` on table `CommentDB` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CommentDB" ALTER COLUMN "text" SET NOT NULL;
