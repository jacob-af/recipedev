/*
  Warnings:

  - Made the column `createdById` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_createdById_fkey";

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "createdById" SET NOT NULL,
ALTER COLUMN "createdById" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
