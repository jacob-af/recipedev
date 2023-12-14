/*
  Warnings:

  - You are about to drop the column `editedAt` on the `ArchivedBuild` table. All the data in the column will be lost.
  - You are about to drop the column `editedById` on the `ArchivedBuild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArchivedBuild" DROP COLUMN "editedAt",
DROP COLUMN "editedById";
