/*
  Warnings:

  - You are about to drop the column `buildId` on the `ArchivedTouch` table. All the data in the column will be lost.
  - Added the required column `archivedBuildId` to the `ArchivedTouch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArchivedTouch" DROP CONSTRAINT "ArchivedTouch_buildId_fkey";

-- AlterTable
ALTER TABLE "ArchivedTouch" DROP COLUMN "buildId",
ADD COLUMN     "archivedBuildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Build" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ArchivedBuild" (
    "id" TEXT NOT NULL,
    "buildName" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "editedById" TEXT,
    "buildId" TEXT NOT NULL,
    "instructions" TEXT,
    "notes" TEXT,
    "glassware" VARCHAR,
    "ice" VARCHAR(100),
    "version" INTEGER NOT NULL,

    CONSTRAINT "ArchivedBuild_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArchivedBuild" ADD CONSTRAINT "ArchivedBuild_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedBuild" ADD CONSTRAINT "ArchivedBuild_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedTouch" ADD CONSTRAINT "ArchivedTouch_archivedBuildId_fkey" FOREIGN KEY ("archivedBuildId") REFERENCES "ArchivedBuild"("id") ON DELETE CASCADE ON UPDATE CASCADE;
